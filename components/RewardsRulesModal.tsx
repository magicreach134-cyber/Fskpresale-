"use client";

export function RewardsRulesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-black border border-yellow-500 max-w-lg w-full p-6 rounded relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-yellow-400"
        >
          ✕
        </button>

        <h2 className="text-yellow-400 text-xl mb-4">
          Community Rewards Rules
        </h2>

        <div className="text-sm text-neutral-300 space-y-3">
          <p>
            Rewards are distributed in <strong>FSK</strong>.  
            USDT values are shown for reference only.
          </p>

          <p>
            <strong>Maximum rewards per wallet:</strong> 30 USDT equivalent.
          </p>

          <p>
            <strong>Claim:</strong> 25% unlocked at TGE. Remaining rewards unlock later.
          </p>

          <hr className="border-neutral-700" />

          <ul className="list-disc pl-4 space-y-1">
            <li>X Follow — 5 USDT</li>
            <li>X Post / Repost — 5 USDT</li>
            <li>X Pin — 3 USDT</li>
            <li>Telegram Join — 7 USDT</li>
            <li>YouTube Shorts (≥50 followers) — 10 USDT</li>
            <li>YouTube Video 2–3 min (≥150 followers) — 20 USDT</li>
          </ul>

          <p>
            YouTube rewards require manual review.  
            Submit links in the official Telegram group.
          </p>

          <p className="text-yellow-400">
            One wallet per participant. Fraud leads to disqualification.
          </p>
        </div>
      </div>
    </div>
  );
}
