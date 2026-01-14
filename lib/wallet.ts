import { BrowserProvider } from "ethers";
import { ensureBNBTestnet } from "./networkGuard";

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  await ensureBNBTestnet(provider);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}
