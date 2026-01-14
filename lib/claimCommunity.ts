import { Contract } from "ethers";
import { getProvider } from "@/lib/provider";
import { CONTRACTS } from "@/lib/constants";
import ABI from "@/abi/FSKCommunityRewards.json";

export async function claimCommunityRewards() {
  const provider = getProvider();
  const signer = await provider.getSigner();

  const contract = new Contract(
    CONTRACTS.COMMUNITY_REWARDS,
    ABI,
    signer
  );

  const tx = await contract.claimTGE();
  return tx.wait();
}
