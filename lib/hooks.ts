// lib/hooks.ts
import { BrowserProvider, Contract } from "ethers";
import { CONTRACTS, ABIS } from "./contracts";

declare global {
  interface Window {
    ethereum?: any;
  }
}

/* ================= READ ================= */

export function getReadProvider() {
  return new BrowserProvider(window.ethereum);
}

export function getPresaleReadContract() {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(
    CONTRACTS.PRESALE,
    ABIS.PRESALE,
    provider
  );
}

export function getRewardsReadContract() {
  const provider = new BrowserProvider(window.ethereum);
  return new Contract(
    CONTRACTS.COMMUNITY_REWARDS,
    ABIS.COMMUNITY_REWARDS,
    provider
  );
}

/* ================= WRITE ================= */

export async function getPresaleWriteContract(provider: BrowserProvider) {
  const signer = await provider.getSigner();
  return new Contract(
    CONTRACTS.PRESALE,
    ABIS.PRESALE,
    signer
  );
}

export async function getRewardsWriteContract(provider: BrowserProvider) {
  const signer = await provider.getSigner();
  return new Contract(
    CONTRACTS.COMMUNITY_REWARDS,
    ABIS.COMMUNITY_REWARDS,
    signer
  );
}
