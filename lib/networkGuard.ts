import { BrowserProvider } from "ethers";

export const BNB_TESTNET_CHAIN_ID = 97;

export async function ensureBNBTestnet(provider: BrowserProvider) {
  const network = await provider.getNetwork();

  if (Number(network.chainId) !== BNB_TESTNET_CHAIN_ID) {
    throw new Error("Please switch to BNB Testnet");
  }
}
