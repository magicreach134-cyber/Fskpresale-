"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./Skeleton";
import { formatUnits } from "ethers";
import { getCommunityRewardsContract } from "@/lib/hooks";

export default function RewardsCard() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("0");
  const [tge, setTge] = useState("0");

  useEffect(() => {
    async function load() {
      try {
        const c = getCommunityRewardsContract();
        const addr = await c.signer?.getAddress?.();

        if (!addr) return;

        setTotal(formatUnits(await c.totalRewardsOf(addr), 18));
        setTge(formatUnits(await c.claimableAtTGE(addr), 18));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="card">
      <h3>Community Rewards</h3>

      <p>
        Total Rewards:{" "}
        {loading ? <Skeleton width={60} /> : `${total} FSK`}
      </p>

      <p>
        Claimable at TGE:{" "}
        {loading ? <Skeleton width={60} /> : `${tge} FSK`}
      </p>

      <ul className="mt-4 space-y-1 text-sm">
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
