import { Contract } from "ethers";
import { getProvider } from "@/lib/provider";
import { CONTRACTS } from "@/lib/constants";
import ABI from "@/abi/FSKCommunityRewards.json";

export async function getCommunityRewards(user: string) {
  const provider = getProvider();
  const contract = new Contract(
    CONTRACTS.COMMUNITY_REWARDS,
    ABI,
    provider
  );

  const [
    totalRewards,
    claimable,
    rewardsStruct,
    tgeTime,
  ] = await Promise.all([
    contract.totalRewardsOf(user),
    contract.claimableAtTGE(user),
    contract.rewards(user),
    contract.tgeTime(),
  ]);

  return {
    totalRewards,
    claimable,
    tgeTime,
    claimedAtTGE: rewardsStruct.tgeClaimed,
  };
}
