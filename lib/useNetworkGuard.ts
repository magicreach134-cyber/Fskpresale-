"use client";

import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { BNB_TESTNET } from "./network";

export function useNetworkGuard() {
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    if (!(window as any).ethereum) return;

    const provider = new BrowserProvider((window as any).ethereum);

    async function check() {
      const network = await provider.getNetwork();
      const cid = Number(network.chainId);
      setChainId(cid);
      setIsCorrectNetwork(cid === BNB_TESTNET.chainId);
    }

    check();

    (window as any).ethereum.on("chainChanged", () => {
      check();
    });

    return () => {
      (window as any).ethereum.removeListener("chainChanged", check);
    };
  }, []);

  async function switchToBNBTestnet() {
    if (!(window as any).ethereum) return;

    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BNB_TESTNET.chainIdHex }],
      });
    } catch (err: any) {
      // If chain not added, add it
      if (err.code === 4902) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: BNB_TESTNET.chainIdHex,
              chainName: BNB_TESTNET.name,
              rpcUrls: BNB_TESTNET.rpcUrls,
              nativeCurrency: BNB_TESTNET.nativeCurrency,
              blockExplorerUrls: BNB_TESTNET.blockExplorerUrls,
            },
          ],
        });
      }
    }
  }

  return {
    isCorrectNetwork,
    chainId,
    switchToBNBTestnet,
  };
}
