import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? '',
  token: process.env.KV_REST_API_TOKEN ?? '',
});

// Generous limit: once per session per visitor, but tolerant of retries
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '60 s'),
  prefix: 'leadshop_ping',
});

const RETENTION = 60 * 60 * 24 * 400; // ~13 months

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const ip =
    (typeof req.headers['x-forwarded-for'] === 'string'
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : '') ||
    req.socket?.remoteAddress ||
    'unknown';

  try {
    const { success } = await ratelimit.limit(`ping:${ip}`);
    if (!success) return res.status(429).end();
  } catch {
    // If Redis is unreachable, still count below may fail too — continue anyway
  }

  const day = new Date().toISOString().slice(0, 10);
  // Unique visitor = sha256(ip + day). Never store raw IPs.
  const uid = crypto
    .createHash('sha256')
    .update(`${ip}:${day}`)
    .digest('hex')
    .slice(0, 16);

  try {
    await redis.incr(`stats:visits:${day}`);
    await redis.sadd(`stats:uniq:${day}`, uid);
    await redis.expire(`stats:visits:${day}`, RETENTION);
    await redis.expire(`stats:uniq:${day}`, RETENTION);
  } catch (err) {
    console.error('ping store failed', err);
  }

  return res.status(204).end();
}
