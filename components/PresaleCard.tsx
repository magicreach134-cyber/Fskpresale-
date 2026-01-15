"use client";

import { useEffect, useState } from "react";
import { formatUnits, parseUnits, BrowserProvider } from "ethers";
import Countdown from "./Countdown";
import Skeleton from "./ui/Skeleton";
import { getPresaleReadContract, getPresaleWriteContract } from "@/lib/hooks";

const START_TIME = 1777507200;
const USDT_DECIMALS = 6;

export default function PresaleCard() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [loading, setLoading] = useState(true);

  const [phase, setPhase] = useState("—");
  const [priceUSDT, setPriceUSDT] = useState("0");
  const [raisedUSDT, setRaisedUSDT] = useState("0");
  const [tokensSold, setTokensSold] = useState("0");
  const [usdtAmount, setUsdtAmount] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const c = getPresaleReadContract();
        setPhase(await c.currentPhase());
        setPriceUSDT(formatUnits(await c.currentPriceUSDT(), USDT_DECIMALS));
        setRaisedUSDT(
          formatUnits(await c.totalRaisedUSDTEquivalent(), USDT_DECIMALS)
        );
        setTokensSold(formatUnits(await c.tokensSold(), 18));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function buyWithUSDT() {
    if (!provider) return alert("Connect wallet");
    const c = await getPresaleWriteContract(provider);
    const amt = parseUnits(usdtAmount, USDT_DECIMALS);
    const tx = await c.buyWithUSDT(amt);
    await tx.wait();
  }

  async function buyWithBNB() {
    if (!provider) return alert("Connect wallet");
    const c = await getPresaleWriteContract(provider);
    const tx = await c.buyWithBNB({
      value: parseUnits(usdtAmount, 18),
    });
    await tx.wait();
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Presale</h2>

      {loading ? (
        <>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-full" />
        </>
      ) : (
        <>
          <div><b>Status:</b> {phase}</div>
          <div><b>Starts in:</b> <Countdown target={START_TIME} /></div>
          <div><b>Price:</b> {priceUSDT} USDT / FSK</div>

          <hr />

          <div><b>Total Raised:</b> {raisedUSDT} USDT</div>
          <div><b>Tokens Sold:</b> {tokensSold} FSK</div>

          <input
            className="input"
            placeholder="Amount (USDT or BNB)"
            value={usdtAmount}
            onChange={(e) => setUsdtAmount(e.target.value)}
          />

          <div className="flex gap-3">
            <button onClick={buyWithUSDT}>Buy with USDT</button>
            <button onClick={buyWithBNB}>Buy with BNB</button>
          </div>
        </>
      )}
    </div>
  );
}
