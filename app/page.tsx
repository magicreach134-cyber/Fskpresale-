import { Suspense } from "react";
import { NetworkGuard } from "@/components/NetworkGuard";
import Header from "@/components/Header";
import PresaleCard from "@/components/PresaleCard";
import RewardsCard from "@/components/RewardsCard";

import {
  HeaderSkeleton,
  PresaleCardSkeleton,
  RewardsCardSkeleton,
} from "@/components/skeletons";

export default function Page() {
  return (
    <>
      <NetworkGuard />

      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <main className="max-w-6xl mx-auto px-4 space-y-8">
        <Suspense fallback={<PresaleCardSkeleton />}>
          <PresaleCard />
        </Suspense>

        <Suspense fallback={<RewardsCardSkeleton />}>
          <RewardsCard />
        </Suspense>
      </main>
    </>
  );
}
