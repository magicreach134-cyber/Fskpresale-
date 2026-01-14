// components/WalletButton.tsx
"use client";

import { useState } from "react";
import { BrowserProvider, Signer } from "ethers";
import {
  getInjectedProvider,
  getWalletConnectProvider,
} from "@/lib/provider";

export default function WalletButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  async function connectMetaMask() {
    const p = await getInjectedProvider();
    if (!p) return alert("MetaMask not found");

    const signer: Signer = await p.getSigner();
    const addr = await signer.getAddress();

    setProvider(p);
    setAddress(addr);
  }

  async function connectWalletConnect() {
    const p = await getWalletConnectProvider();
    const signer: Signer = await p.getSigner();
    const addr = await signer.getAddress();

    setProvider(p);
    setAddress(addr);
  }

  function disconnect() {
    setProvider(null);
    setAddress(null);
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {!address ? (
        <>
          <button onClick={connectMetaMask}>MetaMask</button>
          <button onClick={connectWalletConnect}>WalletConnect</button>
        </>
      ) : (
        <>
          <span>
            {address.slice(0, 6)}…{address.slice(-4)}
          </span>
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
}
