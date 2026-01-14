import { Contract } from "ethers";
import PRESALE_ABI from "@/abi/FSKTokenPresale.json";
import { CONTRACTS } from "@/lib/contracts";

export function usePresale(provider: any) {
  if (!provider) return null;

  return new Contract(
    CONTRACTS.PRESALE,
    PRESALE_ABI,
    provider
  );
}
