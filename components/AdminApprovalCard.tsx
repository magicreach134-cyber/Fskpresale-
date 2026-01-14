"use client";

import { useState } from "react";
import { signRewardApproval } from "@/lib/signReward";
import { formatUnits, parseUnits } from "ethers";

export function AdminApprovalCard() {
  const [user, setUser] = useState("");
  const [task, setTask] = useState(0);
  const [amount, setAmount] = useState("0");
  const [nonce, setNonce] = useState(0);
  const [signature, setSignature] = useState("");

  return (
    <div className="bg-black border border-yellow-500 p-4 rounded mt-6">
      <h3 className="text-yellow-400 text-lg mb-4">
        Admin Reward Approval
      </h3>

      <input
        placeholder="User wallet"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full mb-2 p-2 bg-neutral-900"
      />

      <select
        value={task}
        onChange={(e) => setTask(Number(e.target.value))}
        className="w-full mb-2 p-2 bg-neutral-900"
      >
        <option value={0}>X Follow</option>
        <option value={1}>X Post / Repost</option>
        <option value={2}>Telegram</option>
        <option value={3}>YouTube Short</option>
        <option value={4}>YouTube Video</option>
      </select>

      <input
        placeholder="Reward (FSK)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 bg-neutral-900"
      />

      <input
        placeholder="Nonce (unique number)"
        type="number"
        value={nonce}
        onChange={(e) => setNonce(Number(e.target.value))}
        className="w-full mb-4 p-2 bg-neutral-900"
      />

      <button
        onClick={async () => {
          const sig = await signRewardApproval(
            user,
            task,
            parseUnits(amount, 18),
            nonce
          );
          setSignature(sig);
        }}
        className="w-full bg-yellow-500 text-black py-2 rounded"
      >
        Sign Approval
      </button>

      {signature && (
        <textarea
          readOnly
          value={signature}
          className="w-full mt-3 p-2 bg-neutral-900 text-xs"
        />
      )}
    </div>
  );
}
