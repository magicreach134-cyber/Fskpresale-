import { AdminGuard } from "@/components/AdminGuard";
import { AdminApprovalCard } from "@/components/AdminApprovalCard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminApprovalCard />
    </AdminGuard>
  );
}
