"use client";

import { useNetworkGuard } from "@/lib/useNetworkGuard";

export default function NetworkGuard() {
  const { isCorrectNetwork, switchToBNBTestnet } = useNetworkGuard();

  if (isCorrectNetwork) return null;

  return (
    <div
      style={{
        background: "#2a1f00",
        border: "1px solid #d4af37",
        padding: "12px 16px",
        borderRadius: 8,
        marginBottom: 16,
        color: "#d4af37",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span>
        ⚠️ Wrong Network — Please switch to <b>BNB Chain Testnet</b>
      </span>

      <button
        onClick={switchToBNBTestnet}
        style={{
          background: "#d4af37",
          color: "#000",
          padding: "6px 12px",
          borderRadius: 6,
          fontWeight: 600,
        }}
      >
        Switch Network
      </button>
    </div>
  );
}
