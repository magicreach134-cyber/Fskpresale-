import { BrowserProvider, Contract } from "ethers";
import PRESALE_ABI from "@/abi/FSKTokenPresale.json";
import REWARDS_ABI from "@/abi/FSKCommunityRewards.json";
import VESTING_ABI from "@/abi/FSKVesting.json";
import ERC20_ABI from "@/abi/ERC20.json";
import { CONTRACTS } from "@/lib/constants";

export function getReadProvider() {
  return new BrowserProvider(window.ethereum);
}

export async function getWriteSigner() {
  const provider = new BrowserProvider(window.ethereum);
  return provider.getSigner();
}

// Presale
export function presaleRead() {
  return new Contract(CONTRACTS.PRESALE, PRESALE_ABI, getReadProvider());
}
export async function presaleWrite() {
  return new Contract(CONTRACTS.PRESALE, PRESALE_ABI, await getWriteSigner());
}

// Rewards
export function rewardsRead() {
  return new Contract(CONTRACTS.COMMUNITY_REWARDS, REWARDS_ABI, getReadProvider());
}
export async function rewardsWrite() {
  return new Contract(CONTRACTS.COMMUNITY_REWARDS, REWARDS_ABI, await getWriteSigner());
}

// Vesting
export function vestingRead() {
  return new Contract(CONTRACTS.VESTING, VESTING_ABI, getReadProvider());
}

// ERC20
export function erc20Read(address: string) {
  return new Contract(address, ERC20_ABI, getReadProvider());
}
