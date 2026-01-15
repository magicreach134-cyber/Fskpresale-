"use client";

import { useEffect, useState, useCallback } from "react";
import { Contract, formatUnits, parseUnits, BrowserProvider } from "ethers";
import { readProvider } from "./useProvider";
import { CONTRACTS } from "@/lib/constants";
import PRESALE_ABI from "@/lib/abis/FSKTokenPresale.json";

const USDT_DECIMALS = 6;
const FSK_DECIMALS = 18;

export function usePresale() {
  const [loading, setLoading] = useState(true);

  const [phase, setPhase] = useState<string>("—");
  const [priceUSDT, setPriceUSDT] = useState<string>("0");
  const [tokensSold, setTokensSold] = useState<string>("0");
  const [raisedUSDT, setRaisedUSDT] = useState<string>("0");
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const presaleRead = new Contract(
    CONTRACTS.PRESALE,
    PRESALE_ABI,
    readProvider
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [
        _phase,
        _price,
        _sold,
        _raised,
        _start,
        _end,
      ] = await Promise.all([
        presaleRead.currentPhase(),
        presaleRead.currentPriceUSDT(),
        presaleRead.tokensSold(),
        presaleRead.totalRaisedUSDTEquivalent(),
        presaleRead.startTime(),
        presaleRead.endTime(),
      ]);

      setPhase(_phase);
      setPriceUSDT(formatUnits(_price, USDT_DECIMALS));
      setTokensSold(formatUnits(_sold, FSK_DECIMALS));
      setRaisedUSDT(formatUnits(_raised, USDT_DECIMALS));
      setStartTime(Number(_start));
      setEndTime(Number(_end));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * BUY WITH USDT
   */
  const buyWithUSDT = async (
    provider: BrowserProvider,
    amountUSDT: string
  ) => {
    const signer = await provider.getSigner();
    const presaleWrite = presaleRead.connect(signer);

    const amt = parseUnits(amountUSDT, USDT_DECIMALS);
    const tx = await presaleWrite.buyWithUSDT(amt);
    await tx.wait();

    await load();
  };

  /**
   * BUY WITH BNB
   */
  const buyWithBNB = async (
    provider: BrowserProvider,
    amountBNB: string
  ) => {
    const signer = await provider.getSigner();
    const presaleWrite = presaleRead.connect(signer);

    const value = parseUnits(amountBNB, 18);
    const tx = await presaleWrite.buyWithBNB({ value });
    await tx.wait();

    await load();
  };

  return {
    loading,

    // data
    phase,
    priceUSDT,
    tokensSold,
    raisedUSDT,
    startTime,
    endTime,

    // actions
    buyWithUSDT,
    buyWithBNB,

    // reload
    refresh: load,
  };
}
