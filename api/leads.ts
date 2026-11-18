import { kv } from '@vercel/kv';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? '',
  token: process.env.KV_REST_API_TOKEN ?? '',
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  prefix: 'leadshop_rl',
});

const MAX_LEN = 2000;

function clean(value: unknown, max = MAX_LEN): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // GET /api/leads — returns all stored leads, newest first
  // Auth: x-admin-key header only (query-string keys leak into logs)
  if (req.method === 'GET') {
    const adminKey = process.env.ADMIN_KEY;
    const provided = clean(req.headers['x-admin-key'], 200);
    if (!adminKey || provided !== adminKey) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
    try {
      const raw = await kv.lrange<unknown>('leads', 0, -1);
      const leads = raw
        .map((item) => {
          if (item && typeof item === 'object') return item;
          try {
            return JSON.parse(String(item));
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .reverse();
      return res.status(200).json({ ok: true, leads });
    } catch (err) {
      console.error('leads read failed', err);
      return res.status(500).json({ ok: false, error: 'Read failed' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Rate limit: 5 submissions per 10s per IP
  const ip =
    clean(req.headers['x-forwarded-for'], 100).split(',')[0].trim() ||
    clean(req.socket?.remoteAddress, 100) ||
    'unknown';
  try {
    const { success } = await ratelimit.limit(`lead:${ip}`);
    if (!success) {
      return res.status(429).json({ ok: false, error: 'Too many requests' });
    }
  } catch {
    // If Redis is unreachable, don't block legitimate submissions
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill hidden fields, humans don't
  if (clean(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const contact = clean(body.contact, 200);
  const targetDesc = clean(body.targetDesc, MAX_LEN);
  const source = clean(body.source, 40) || 'contact';
  const plan = clean(body.plan, 60);
  const lang = clean(body.lang, 8) || 'es';
  const query = clean(body.query, MAX_LEN);
  const country = clean(body.country, 80);
  const termsAccepted = body.termsAccepted === true;

  if (!contact || (!targetDesc && !query) || (!name && !company && source === 'contact')) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  if (source === 'order' && !termsAccepted) {
    return res.status(400).json({ ok: false, error: 'Terms not accepted' });
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    company,
    contact,
    targetDesc: targetDesc || query,
    query,
    country,
    source,
    plan,
    lang,
    termsAccepted,
    userAgent: clean(req.headers['user-agent'], 300),
  };

  try {
    await kv.rpush('leads', JSON.stringify(lead));
    await kv.expire('leads', 60 * 60 * 24 * 365); // keep 1 year
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('leads store failed', err);
    return res.status(500).json({ ok: false, error: 'Store failed' });
  }
}
