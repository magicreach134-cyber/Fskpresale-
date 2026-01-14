"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { getCommunityRewards } from "@/lib/communityRewards";
import { claimCommunityRewards } from "@/lib/claimCommunity";
import { Skeleton } from "@/components/Skeleton";

export function CommunityRewardsCard({ address }: { address: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    getCommunityRewards(address).then(setData);
  }, [address]);

  if (!data) return <Skeleton height={120} />;

  const now = Math.floor(Date.now() / 1000);
  const tgeReached = now >= Number(data.tgeTime);

  return (
    <div className="bg-black border border-yellow-500 rounded p-4 mt-6">
      <h3 className="text-yellow-400 text-lg mb-3">
        Community Rewards
      </h3>

      <div className="space-y-2 text-sm">
        <p>Total Rewards: {formatUnits(data.totalRewards, 18)} FSK</p>
        <p>Claimable at TGE: {formatUnits(data.claimable, 18)} FSK</p>
        <p>Already Claimed: {formatUnits(data.claimedAtTGE, 18)} FSK</p>
      </div>

      <button
        disabled={!tgeReached || loading || data.claimable === 0n}
        onClick={async () => {
          setLoading(true);
          await claimCommunityRewards();
          setLoading(false);
        }}
        className="mt-4 w-full bg-yellow-500 text-black py-2 rounded disabled:opacity-50"
      >
        {tgeReached ? "Claim Rewards" : "Claim Opens at TGE"}
      </button>
    </div>
  );
}
