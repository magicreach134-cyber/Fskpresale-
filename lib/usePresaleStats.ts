import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { CONTRACTS } from "./constants";
import PresaleABI from "../abis/FSKTOKENPRESALE.json";

export function usePresaleStats(provider: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!provider) return;

    const presale = new Contract(
      CONTRACTS.PRESALE,
      PresaleABI,
      provider
    );

    async function load() {
      const [
        raisedUSDT,
        raisedBNB,
        sold,
        phase,
        price
      ] = await Promise.all([
        presale.totalRaisedUSDT(),
        presale.totalRaisedBNB(),
        presale.tokensSold(),
        presale.currentPhase(),
        presale.currentPriceUSDT(),
      ]);

      setData({
        raisedUSDT,
        raisedBNB,
        sold,
        phase,
        price,
      });
    }

    load();
  }, [provider]);

  return data;
}
