import { Contract, BrowserProvider } from "ethers";
import { CONTRACTS } from "./contracts";
import { ABIS } from "./abi";

export async function getPresaleData(provider: BrowserProvider) {
  const presale = new Contract(
    CONTRACTS.PRESALE,
    ABIS.PRESALE,
    provider
  );

  const [
    startTime,
    endTime,
    privateSaleEnd,
    privatePrice,
    publicPrice,
    totalRaised,
    tokensSold,
  ] = await Promise.all([
    presale.startTime(),
    presale.endTime(),
    presale.privateSaleEnd(),
    presale.privatePriceUSDT(),
    presale.publicPriceUSDT(),
    presale.totalRaisedUSDTEquivalent(),
    presale.tokensSold(),
  ]);

  return {
    startTime: Number(startTime),
    endTime: Number(endTime),
    privateSaleEnd: Number(privateSaleEnd),
    privatePrice,
    publicPrice,
    totalRaised,
    tokensSold,
  };
}
