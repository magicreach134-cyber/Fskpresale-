import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { BNB_TESTNET } from "@/lib/network";

export function useNetworkGuard(provider?: BrowserProvider) {
  const [correctNetwork, setCorrectNetwork] = useState(false);

  useEffect(() => {
    if (!provider) return;

    provider.getNetwork().then((network) => {
      setCorrectNetwork(Number(network.chainId) === BNB_TESTNET.chainId);
    });
  }, [provider]);

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BNB_TESTNET.hexChainId }],
    });
  };

  return { correctNetwork, switchNetwork };
}
