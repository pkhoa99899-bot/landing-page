/** Giới hạn tần suất theo IP — 5 lượt / 10 phút. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }

  hits.set(ip, [...recent, now]);

  if (hits.size > MAX_KEYS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}
