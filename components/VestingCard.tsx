import Image from "next/image";
import { Lock } from "lucide-react";

export default function VestingCard() {
  return (
    <div className="bg-black/70 border border-yellow-500/30 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="text-yellow-400" size={18} />
        <h2 className="text-lg font-semibold text-yellow-400">
          Vesting & Release Schedule (Locked)
        </h2>
      </div>

      <Image
        src="/vesting.png"
        alt="FSK Vesting Schedule"
        width={1200}
        height={600}
        className="rounded-lg border border-yellow-500/20"
      />

      <p className="text-xs text-gray-400 mt-4">
        Vesting is enforced on-chain. No manual claims or overrides.
      </p>
    </div>
  );
}
