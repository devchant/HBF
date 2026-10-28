import { AdminShell } from "@/components/admin/AdminShell";
import { EventManager } from "@/components/admin/EventManager";
import { getEvents } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const [ng, ca] = await Promise.all([getEvents("ng"), getEvents("ca")]);
  return (
    <AdminShell>
      <p className="admin-kicker">Calendar</p>
      <h1>Events</h1>
      <p className="admin-lead">
        Add upcoming events, move finished ones into event history, or delete them from history. History also shows on the public programs pages.
      </p>
      <EventManager events={[...ng, ...ca]} />
    </AdminShell>
  );
}
