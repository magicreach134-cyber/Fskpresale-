// components/PresaleCard.tsx
"use client";

import { useEffect, useState } from "react";
import { formatUnits, parseUnits, BrowserProvider } from "ethers";
import Countdown from "./Countdown";
import { getPresaleReadContract, getPresaleWriteContract } from "@/lib/hooks";

const START_TIME = 1777507200; // confirmed
const USDT_DECIMALS = 6;

export default function PresaleCard() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [phase, setPhase] = useState<string>("—");
  const [priceUSDT, setPriceUSDT] = useState<string>("0");
  const [raisedUSDT, setRaisedUSDT] = useState<string>("0");
  const [tokensSold, setTokensSold] = useState<string>("0");
  const [usdtAmount, setUsdtAmount] = useState<string>("");

  useEffect(() => {
    async function load() {
      const c = getPresaleReadContract();

      setPhase(await c.currentPhase());
      setPriceUSDT(formatUnits(await c.currentPriceUSDT(), USDT_DECIMALS));
      setRaisedUSDT(formatUnits(await c.totalRaisedUSDTEquivalent(), USDT_DECIMALS));
      setTokensSold(formatUnits(await c.tokensSold(), 18));
    }
    load();
  }, []);

  async function buyWithUSDT() {
    if (!provider) return alert("Connect wallet");
    const c = await getPresaleWriteContract(provider);

    const amt = parseUnits(usdtAmount, USDT_DECIMALS);
    const tx = await c.buyWithUSDT(amt);
    await tx.wait();
    alert("Purchase successful");
  }

  async function buyWithBNB() {
    if (!provider) return alert("Connect wallet");
    const c = await getPresaleWriteContract(provider);

    const tx = await c.buyWithBNB({
      value: parseUnits(usdtAmount, 18), // BNB amount input
    });
    await tx.wait();
    alert("Purchase successful");
  }

  return (
    <div className="card">
      <h2>Presale</h2>

      <div><b>Status:</b> {phase}</div>
      <div><b>Starts in:</b> <Countdown target={START_TIME} /></div>
      <div><b>Price:</b> {priceUSDT} USDT / FSK</div>

      <hr />

      <div><b>Total Raised:</b> {raisedUSDT} USDT</div>
      <div><b>Tokens Sold:</b> {tokensSold} FSK</div>

      <hr />

      <input
        placeholder="Amount (USDT or BNB)"
        value={usdtAmount}
        onChange={(e) => setUsdtAmount(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={buyWithUSDT}>Buy with USDT</button>
        <button onClick={buyWithBNB}>Buy with BNB</button>
      </div>
    </div>
  );
}
