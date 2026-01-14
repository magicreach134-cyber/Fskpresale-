"use client";

import { useEffect, useState } from "react";
import { fetchPresaleMetrics } from "@/lib/presaleMetrics";
import { percent, formatUSDT } from "@/lib/format";
import { Skeleton } from "@/components/Skeleton";

export function PresaleProgress() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchPresaleMetrics().then(setData);
  }, []);

  if (!data) {
    return <Skeleton height={36} />;
  }

  const progress = percent(data.raisedUSDT, data.hardCap);

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Raised: ${formatUSDT(data.raisedUSDT)}</span>
        <span>Hard Cap: ${formatUSDT(data.hardCap)}</span>
      </div>

      <div className="w-full bg-neutral-800 rounded h-3">
        <div
          className="bg-yellow-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-2 text-neutral-400">
        <span>Soft Cap: ${formatUSDT(data.softCap)}</span>
        <span>{progress}% Filled</span>
      </div>
    </div>
  );
}
