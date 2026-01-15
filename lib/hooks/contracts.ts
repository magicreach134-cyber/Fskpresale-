import { BrowserProvider, Contract } from "ethers";
import PRESALE_ABI from "@/abi/FSKPresale.json";
import REWARDS_ABI from "@/abi/FSKCommunityRewards.json";
import VESTING_ABI from "@/abi/FSKVesting.json";
import ERC20_ABI from "@/abi/ERC20.json";
import { CONTRACTS } from "@/lib/constants";

export function getPresaleReadContract() {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(CONTRACTS.PRESALE, PRESALE_ABI, provider);
}

export async function getPresaleWriteContract(provider: BrowserProvider) {
  const signer = await provider.getSigner();
  return new Contract(CONTRACTS.PRESALE, PRESALE_ABI, signer);
}

export function getRewardsReadContract() {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(CONTRACTS.COMMUNITY_REWARDS, REWARDS_ABI, provider);
}

export async function getRewardsWriteContract(provider: BrowserProvider) {
  const signer = await provider.getSigner();
  return new Contract(CONTRACTS.COMMUNITY_REWARDS, REWARDS_ABI, signer);
}

export function getVestingReadContract() {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(CONTRACTS.VESTING, VESTING_ABI, provider);
}

export function getERC20Read(address: string) {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(address, ERC20_ABI, provider);
}
