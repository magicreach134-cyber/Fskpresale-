"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, JsonRpcProvider } from "ethers";

/**
 * BNB Testnet RPC (locked)
 */
const RPC_URL = "https://data-seed-prebsc-1-s1.bnbchain.org:8545";

/**
 * Read-only provider (no wallet required)
 */
export const readProvider = new JsonRpcProvider(RPC_URL);

/**
 * Wallet provider hook (MetaMask / WalletConnect)
 */
export function useProvider() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).ethereum) {
      const p = new BrowserProvider((window as any).ethereum);
      setProvider(p);
    }
  }, []);

  return {
    provider,
    readProvider,
    hasWallet: typeof window !== "undefined" && !!(window as any).ethereum,
  };
}
