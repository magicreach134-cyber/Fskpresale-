import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8">
      <Skeleton height={64} />   {/* Header */}
      <Skeleton height={320} />  {/* Presale card */}
      <Skeleton height={200} />  {/* Rewards card */}
    </div>
  );
}
