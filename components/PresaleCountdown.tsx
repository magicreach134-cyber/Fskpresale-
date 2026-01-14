"use client";

import { useEffect, useState } from "react";
import { getPresalePhase } from "@/lib/presalePhase";
import { getTimeLeft } from "@/lib/time";
import { Skeleton } from "@/components/Skeleton";

export function PresaleCountdown() {
  const [state, setState] = useState<any>(null);
  const [time, setTime] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const p = await getPresalePhase();
      setState(p);
      if (p.next) setTime(getTimeLeft(p.next));
    }

    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!state) return <Skeleton height={48} />;

  if (state.phase === "ENDED") {
    return (
      <div className="text-red-400 text-center mt-4">
        Presale Ended
      </div>
    );
  }

  if (!time) return null;

  return (
    <div className="text-center mt-4">
      <p className="text-yellow-400 text-sm mb-1">
        {state.phase === "PRIVATE"
          ? "Private Sale Ends In"
          : state.phase === "PUBLIC"
          ? "Public Sale Ends In"
          : "Presale Starts In"}
      </p>

      <div className="flex justify-center gap-4 text-white text-lg">
        <span>{time.days}d</span>
        <span>{time.hours}h</span>
        <span>{time.minutes}m</span>
        <span>{time.seconds}s</span>
      </div>
    </div>
  );
}
