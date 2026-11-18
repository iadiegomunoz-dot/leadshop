import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? '',
  token: process.env.KV_REST_API_TOKEN ?? '',
});

const adminRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  prefix: 'leadshop_admin',
});

const DAYS = 14;

function dayKey(offset: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offset);
  return d.toISOString().slice(0, 10);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip =
    (typeof req.headers['x-forwarded-for'] === 'string'
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : '') ||
    req.socket?.remoteAddress ||
    'unknown';

  try {
    const { success } = await adminRatelimit.limit(`admin:${ip}`);
    if (!success) {
      return res.status(429).json({ ok: false, error: 'Too many requests' });
    }
  } catch {
    // don't block admin if Redis is unreachable
  }

  const adminKey = process.env.ADMIN_KEY;
  const provided =
    typeof req.headers['x-admin-key'] === 'string'
      ? req.headers['x-admin-key'].slice(0, 200)
      : '';
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  // Pipeline: for each of the last DAYS days -> GET visits + SCARD uniques
  try {
    const pipeline = redis.pipeline();
    for (let i = DAYS - 1; i >= 0; i--) {
      const k = dayKey(i);
      pipeline.get(`stats:visits:${k}`);
      pipeline.scard(`stats:uniq:${k}`);
    }
    const results = (await pipeline.exec()) as unknown[];
    const days: { date: string; visits: number; uniques: number }[] = [];
    for (let i = 0; i < DAYS; i++) {
      const visits = Number(results[i * 2]) || 0;
      const uniques = Number(results[i * 2 + 1]) || 0;
      days.push({ date: dayKey(DAYS - 1 - i), visits, uniques });
    }
    const sum = (arr: typeof days, f: (d: (typeof days)[0]) => number, n: number) =>
      arr.slice(-n).reduce((a, d) => a + f(d), 0);
    return res.status(200).json({
      ok: true,
      days,
      today: days[days.length - 1],
      last7: { visits: sum(days, (d) => d.visits, 7), uniques: sum(days, (d) => d.uniques, 7) },
      last30: null, // we only track 14 days of detail; monthly comes from Vercel Analytics
    });
  } catch (err) {
    console.error('stats read failed', err);
    return res.status(500).json({ ok: false, error: 'Read failed' });
  }
}
