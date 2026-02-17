const bucket = new Map<string, { count: number; expires: number }>();

export function hitLimit(key: string): boolean {
  const now = Date.now();
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000);
  const max = Number(process.env.RATE_LIMIT_MAX ?? 20);
  const entry = bucket.get(key);
  if (!entry || entry.expires < now) {
    bucket.set(key, { count: 1, expires: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}
