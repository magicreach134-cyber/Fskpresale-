"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@/components/WalletConnect";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="border-b border-yellow-600/20 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="FSK"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-yellow-500">
            FressKing (FSK)
          </span>
        </div>

        <ConnectButton />
      </div>
    </header>
  );
}

/* ---------------- Skeleton ---------------- */

function HeaderSkeleton() {
  return (
    <header className="border-b border-yellow-600/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-800" />
          <div className="h-5 w-32 bg-gray-800 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-800 rounded" />
      </div>
    </header>
  );
}
