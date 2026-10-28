import { AccountEditor } from "@/components/admin/AccountEditor";
import { AdminShell } from "@/components/admin/AdminShell";
import { getDonateAccount } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  const [ng, ca] = await Promise.all([getDonateAccount("ng"), getDonateAccount("ca")]);
  return (
    <AdminShell>
      <p className="admin-kicker">Giving</p>
      <h1>Bank accounts</h1>
      <p className="admin-lead">These details appear on /ng/donate and /ca/donate.</p>
      <div className="admin-grid-2">
        <AccountEditor region="ng" account={ng} />
        <AccountEditor region="ca" account={ca} />
      </div>
    </AdminShell>
  );
}
