// lib/hooks/useCommunityRewards.ts
import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
import { getCommunityReadContract } from "./contracts";

export function useCommunityRewards(account?: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!account) return;

    async function load() {
      try {
        const c = getCommunityReadContract();
        const total = await c.totalRewardsOf(account);
        const tge = await c.claimableAtTGE(account);

        setData({
          total: formatUnits(total, 18),
          tge: formatUnits(tge, 18),
        });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [account]);

  return { loading, data };
}
