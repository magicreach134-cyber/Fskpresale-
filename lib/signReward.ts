import { keccak256, solidityPacked, BrowserProvider } from "ethers";
import { CONTRACTS } from "@/lib/constants";

export async function signRewardApproval(
  user: string,
  task: number,
  amount: bigint,
  nonce: number
) {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const chainId = (await provider.getNetwork()).chainId;

  const digest = keccak256(
    solidityPacked(
      ["address", "uint8", "uint256", "uint256", "address", "uint256"],
      [user, task, amount, nonce, CONTRACTS.COMMUNITY_REWARDS, chainId]
    )
  );

  const signature = await signer.signMessage(
    new Uint8Array(Buffer.from(digest.slice(2), "hex"))
  );

  return signature;
}
