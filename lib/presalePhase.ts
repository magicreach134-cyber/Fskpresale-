import { Contract } from "ethers";
import { getProvider } from "@/lib/provider";
import { CONTRACTS } from "@/lib/constants";
import ABI from "@/abi/FSKTOKENPRESALE.json";

export async function getPresalePhase() {
  const provider = getProvider();
  const presale = new Contract(
    CONTRACTS.PRESALE,
    ABI,
    provider
  );

  const [
    startTime,
    endTime,
    privateSaleEnd,
  ] = await Promise.all([
    presale.startTime(),
    presale.endTime(),
    presale.privateSaleEnd(),
  ]);

  const now = Math.floor(Date.now() / 1000);

  if (now < startTime) {
    return { phase: "NOT_STARTED", next: startTime };
  }

  if (now >= startTime && now < privateSaleEnd) {
    return { phase: "PRIVATE", next: privateSaleEnd };
  }

  if (now >= privateSaleEnd && now <= endTime) {
    return { phase: "PUBLIC", next: endTime };
  }

  return { phase: "ENDED", next: null };
}
