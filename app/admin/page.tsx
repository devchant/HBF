import { AdminShell } from "@/components/admin/AdminShell";
import { getEvents } from "@/lib/cms";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [ngEvents, caEvents] = await Promise.all([getEvents("ng"), getEvents("ca")]);
  return (
    <AdminShell>
      <p className="admin-kicker">Dashboard</p>
      <h1>Content studio</h1>
      <p className="admin-lead">Update public pages for HBF Nigeria and HBF Canada Society.</p>
      <div className="admin-grid-3">
        <Link className="admin-stat" href="/admin/heroes">
          <strong>Images</strong>
          <span>Home, about, and programs banners</span>
        </Link>
        <Link className="admin-stat" href="/admin/accounts">
          <strong>Accounts</strong>
          <span>Bank details on donate pages</span>
        </Link>
        <Link className="admin-stat" href="/admin/events">
          <strong>{ngEvents.length + caEvents.length}</strong>
          <span>Published events</span>
        </Link>
      </div>
    </AdminShell>
  );
}
