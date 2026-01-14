export function percent(value: bigint, total: bigint): number {
  if (total === 0n) return 0;
  return Number((value * 100n) / total);
}

export function formatUSDT(value: bigint): string {
  return (Number(value) / 1e6).toLocaleString(); // USDT = 6 decimals
}
