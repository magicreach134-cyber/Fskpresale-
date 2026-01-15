// lib/hooks.ts
import { Contract, BrowserProvider, JsonRpcProvider } from "ethers";
import { CONTRACTS } from "./constants";

import PresaleABI from "@/abis/FSKTOKENPRESALE.json";

const RPC = "https://data-seed-prebsc-1-s1.bnbchain.org:8545";

export function getPresaleReadContract() {
  const provider = new JsonRpcProvider(RPC);
  return new Contract(CONTRACTS.PRESALE, PresaleABI, provider);
}

export async function getPresaleWriteContract(provider: BrowserProvider) {
  const signer = await provider.getSigner();
  return new Contract(CONTRACTS.PRESALE, PresaleABI, signer);
}
