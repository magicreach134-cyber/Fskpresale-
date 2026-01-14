"use client";

import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Skeleton } from "@/components/Skeleton";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const isAdmin = useAdminGuard();

  if (isAdmin === null) {
    return <Skeleton height={120} />;
  }

  if (!isAdmin) {
    return (
      <div className="text-center text-red-400 mt-12">
        Access denied. Admin wallet required.
      </div>
    );
  }

  return <>{children}</>;
}
