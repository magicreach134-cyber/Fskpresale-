import { NetworkGuard } from "@/components/NetworkGuard";
import Header from "@/components/Header";
import PresaleCard from "@/components/PresaleCard";
import RewardsCard from "@/components/RewardsCard";

export default function Page() {
  return (
    <>
      <NetworkGuard />
      <Header />
      <main className="max-w-6xl mx-auto px-4 space-y-8">
        <PresaleCard />
        <RewardsCard />
      </main>
    </>
  );
}
