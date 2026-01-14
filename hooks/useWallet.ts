import { useState } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

export function useWallet() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string>("");

  const connect = async () => {
    const prov = new BrowserProvider(window.ethereum);
    await prov.send("eth_requestAccounts", []);
    const signer = await prov.getSigner();

    setProvider(prov);
    setSigner(signer);
    setAddress(await signer.getAddress());
  };

  return { provider, signer, address, connect };
}
