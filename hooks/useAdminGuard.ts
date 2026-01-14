import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACTS } from "@/lib/constants";
import ABI from "@/abi/FSKCommunityRewards.json";

export function useAdminGuard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      if (!window.ethereum) {
        setIsAdmin(false);
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const rewards = new Contract(
        CONTRACTS.COMMUNITY_REWARDS,
        ABI,
        provider
      );

      const authorizedSigner = await rewards.authorizedSigner();

      setIsAdmin(
        userAddress.toLowerCase() === authorizedSigner.toLowerCase()
      );
    }

    check();
  }, []);

  return isAdmin;
}
