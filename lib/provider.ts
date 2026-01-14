import { BrowserProvider } from "ethers";
import { NETWORK } from "./constants";

export async function getProvider() {
  if (!window.ethereum) throw new Error("No wallet found");
  const provider = new BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();

  if (Number(network.chainId) !== NETWORK.chainId) {
    throw new Error("Wrong network");
  }

  return provider;
}
