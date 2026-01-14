import { Contract } from "ethers";
import { getProvider } from "@/lib/provider";
import PRESALE_ABI from "@/abi/FSKTOKENPRESALE.json";
import { CONTRACTS } from "@/lib/constants";

export async function fetchPresaleMetrics() {
  const provider = getProvider();
  const presale = new Contract(
    CONTRACTS.PRESALE,
    PRESALE_ABI,
    provider
  );

  const [
    raisedUSDT,
    softCap,
    hardCap,
    tokensSold,
  ] = await Promise.all([
    presale.totalRaisedUSDTEquivalent(),
    presale.softCapUSDT(),
    presale.hardCapUSDT(),
    presale.tokensSold(),
  ]);

  return {
    raisedUSDT,
    softCap,
    hardCap,
    tokensSold,
  };
}
