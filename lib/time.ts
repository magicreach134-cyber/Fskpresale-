export function getTimeLeft(target: number) {
  const now = Math.floor(Date.now() / 1000);
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}
