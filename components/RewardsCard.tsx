import { Skeleton } from "./Skeleton";

export function RewardsCard({ data }: { data: any }) {
  if (!data) return <Skeleton height={120} />;

  return (
    <div className="card">
      <h3>Community Rewards</h3>

      <p>Total Rewards: {data.total} FSK</p>
      <p>Claimable at TGE: {data.tge} FSK</p>

      <ul>
        <li>X Follow: 5 USDT</li>
        <li>X Post/Repost: 5 USDT</li>
        <li>X Pin: 3 USDT</li>
        <li>Telegram Join: 7 USDT</li>
        <li>YouTube Short (≥50 subs): 10 USDT</li>
        <li>YouTube Video 2–3 min (≥150 subs): 20 USDT</li>
      </ul>
    </div>
  );
}
