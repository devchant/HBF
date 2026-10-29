import { AdminShell } from "@/components/admin/AdminShell";
import { DonationManager } from "@/components/admin/DonationManager";
import { getDonations } from "@/lib/donations";

export const dynamic = "force-dynamic";

export default async function AdminDonationsPage() {
  const donations = await getDonations();
  return (
    <AdminShell>
      <p className="admin-kicker">Giving</p>
      <h1>Donations</h1>
      <p className="admin-lead">
        Review Nigeria and Canada receipts, confirm the bank transfer, then email the donor. Use Send thank-you email
        if a mail key is set, or Email from inbox to send from your own mail.
      </p>
      <DonationManager donations={donations} />
    </AdminShell>
  );
}
