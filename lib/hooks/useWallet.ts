"use client";

import { useEffect, useState, useCallback } from "react";
import { BrowserProvider } from "ethers";
import { useProvider } from "./useProvider";

/**
 * BNB Testnet chain id
 */
const BNB_TESTNET_CHAIN_ID = 97;

export function useWallet() {
  const { provider, hasWallet } = useProvider();

  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (!provider) throw new Error("Wallet not available");
    setConnecting(true);
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const network = await provider.getNetwork();

      setAddress(addr);
      setChainId(Number(network.chainId));
    } finally {
      setConnecting(false);
    }
  }, [provider]);

  const disconnect = useCallback(() => {
    // MetaMask does not support programmatic disconnect
    setAddress(null);
    setChainId(null);
  }, []);

  useEffect(() => {
    if (!provider || !hasWallet) return;

    const eth = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts?.[0] ?? null);
    };

    const handleChainChanged = (hexChainId: string) => {
      setChainId(parseInt(hexChainId, 16));
    };

    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);

    return () => {
      eth.removeListener("accountsChanged", handleAccountsChanged);
      eth.removeListener("chainChanged", handleChainChanged);
    };
  }, [provider, hasWallet]);

  return {
    provider,
    address,
    chainId,
    isConnected: !!address,
    isCorrectNetwork: chainId === BNB_TESTNET_CHAIN_ID,
    connecting,
    connect,
    disconnect,
  };
}
