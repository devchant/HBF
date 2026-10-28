"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteEvent } from "@/lib/cms";
import type { SiteRegion } from "@/lib/site";

export function EventManager({ events }: { events: SiteEvent[] }) {
  const router = useRouter();
  const [region, setRegion] = useState<SiteRegion>("ng");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<SiteEvent | null>(null);
  const visible = events.filter((event) => event.region === region);
  const current = visible.filter((event) => event.status !== "past");
  const history = [...visible.filter((event) => event.status === "past")].sort((a, b) =>
    (b.eventDate ?? b.createdAt ?? "").localeCompare(a.eventDate ?? a.createdAt ?? ""),
  );

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    form.set("region", region);
    const res = await fetch("/api/admin/events", { method: "POST", body: form });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setStatus(data.error ?? "Could not add event.");
      return;
    }
    formEl.reset();
    setStatus("Event added.");
    router.refresh();
  }

  useEffect(() => {
    if (!editing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEditing(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [editing]);

  async function save(id: string, form: FormData) {
    const res = await fetch(`/api/admin/events/${id}`, { method: "PATCH", body: form });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setStatus(data.error ?? "Could not update.");
      return false;
    }
    setStatus("Event updated.");
    setEditing(null);
    router.refresh();
    return true;
  }

  async function archive(id: string) {
    const form = new FormData();
    form.set("status", "past");
    const res = await fetch(`/api/admin/events/${id}`, { method: "PATCH", body: form });
    if (!res.ok) {
      setStatus("Could not move this event to history.");
      return;
    }
    setStatus("Moved to event history.");
    router.refresh();
  }

  async function restore(id: string) {
    const form = new FormData();
    form.set("status", "upcoming");
    const res = await fetch(`/api/admin/events/${id}`, { method: "PATCH", body: form });
    if (!res.ok) {
      setStatus("Could not restore this event.");
      return;
    }
    setStatus("Restored from history.");
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this event from history? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setStatus("Could not delete.");
      return;
    }
    setStatus("Event removed from history.");
    router.refresh();
  }

  return (
    <div className="admin-events">
      <div className="donate-tabs admin-region-tabs">
        <button type="button" className={region === "ng" ? "is-active" : ""} onClick={() => setRegion("ng")}>
          Nigeria
        </button>
        <button type="button" className={region === "ca" ? "is-active" : ""} onClick={() => setRegion("ca")}>
          Canada
        </button>
      </div>
      {status ? <p className="admin-status">{status}</p> : null}

      <form className="admin-card" onSubmit={create}>
        <h2>Add {region === "ng" ? "Nigeria" : "Canada"} event</h2>
        <label className="admin-field">
          Title
          <input name="title" required placeholder="Event title" />
        </label>
        <label className="admin-field">
          Summary
          <textarea name="summary" rows={3} placeholder="Short description" />
        </label>
        <div className="admin-grid-2">
          <label className="admin-field">
            Status
            <select name="status" defaultValue="upcoming">
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past (history)</option>
            </select>
          </label>
          <label className="admin-field">
            Date
            <input type="date" name="eventDate" />
          </label>
        </div>
        <label className="admin-field">
          Sort order
          <input type="number" name="sortOrder" defaultValue={0} />
        </label>
        <label className="admin-field">
          Photograph (optional)
          <input type="file" name="file" accept="image/*" />
        </label>
        <button className="btn gold" type="submit">
          Add event
        </button>
      </form>

      <h2 className="admin-section-title">Current events</h2>
      <div className="admin-event-list">
        {current.length === 0 ? <p>No upcoming or ongoing events.</p> : null}
        {current.map((item) => (
          <EventRow key={item.id} event={item} onSave={save} onArchive={archive} />
        ))}
      </div>

      <h2 className="admin-section-title">Event history</h2>
      <p className="admin-lead">Past events stay here until you delete them.</p>
      <div className="admin-history">
        {history.length === 0 ? <p>No events in history yet.</p> : null}
        {history.map((item) => (
          <article className="admin-history-row" key={item.id}>
            {item.imageUrl ? <img src={item.imageUrl} alt="" /> : <div className="admin-history-ph" />}
            <div>
              <p className="admin-kicker">{item.eventDate || "No date"}</p>
              <h3>{item.title}</h3>
              {item.summary ? <p>{item.summary}</p> : null}
            </div>
            <div className="admin-row-actions">
              <button className="btn gold" type="button" onClick={() => setEditing(item)}>
                Edit
              </button>
              <button className="btn alt ink" type="button" onClick={() => void restore(item.id)}>
                Restore
              </button>
              <button className="btn alt ink" type="button" onClick={() => void remove(item.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing ? (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setEditing(null)}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="history-edit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="donate-modal-close" onClick={() => setEditing(null)} aria-label="Close">
              ×
            </button>
            <p className="admin-kicker">Event history</p>
            <h2 id="history-edit-title">Edit event</h2>
            <HistoryEditForm
              event={editing}
              onCancel={() => setEditing(null)}
              onSave={async (form) => {
                await save(editing.id, form);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HistoryEditForm({
  event,
  onSave,
  onCancel,
}: {
  event: SiteEvent;
  onSave: (form: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="admin-modal-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await onSave(new FormData(e.currentTarget));
        setBusy(false);
      }}
    >
      {event.imageUrl ? <img className="admin-preview small" src={event.imageUrl} alt="" /> : null}
      <label className="admin-field">
        Title
        <input name="title" defaultValue={event.title} required />
      </label>
      <label className="admin-field">
        Summary
        <textarea name="summary" rows={4} defaultValue={event.summary} />
      </label>
      <div className="admin-grid-2">
        <label className="admin-field">
          Status
          <select name="status" defaultValue={event.status}>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past (history)</option>
          </select>
        </label>
        <label className="admin-field">
          Date
          <input type="date" name="eventDate" defaultValue={event.eventDate ?? ""} />
        </label>
      </div>
      <label className="admin-field">
        Sort order
        <input type="number" name="sortOrder" defaultValue={event.sortOrder} />
      </label>
      <label className="admin-field">
        Replace photograph
        <input type="file" name="file" accept="image/*" />
      </label>
      <div className="admin-row-actions">
        <button className="btn gold" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
        <button className="btn alt ink" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function EventRow({
  event,
  onSave,
  onArchive,
}: {
  event: SiteEvent;
  onSave: (id: string, form: FormData) => Promise<void>;
  onArchive: (id: string) => Promise<void>;
}) {
  return (
    <form
      className="admin-card"
      onSubmit={(e) => {
        e.preventDefault();
        void onSave(event.id, new FormData(e.currentTarget));
      }}
    >
      {event.imageUrl ? <img className="admin-preview small" src={event.imageUrl} alt="" /> : null}
      <label className="admin-field">
        Title
        <input name="title" defaultValue={event.title} required />
      </label>
      <label className="admin-field">
        Summary
        <textarea name="summary" rows={3} defaultValue={event.summary} />
      </label>
      <div className="admin-grid-2">
        <label className="admin-field">
          Status
          <select name="status" defaultValue={event.status}>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past (history)</option>
          </select>
        </label>
        <label className="admin-field">
          Date
          <input type="date" name="eventDate" defaultValue={event.eventDate ?? ""} />
        </label>
      </div>
      <label className="admin-field">
        Sort order
        <input type="number" name="sortOrder" defaultValue={event.sortOrder} />
      </label>
      <label className="admin-field">
        Replace photograph
        <input type="file" name="file" accept="image/*" />
      </label>
      <div className="admin-row-actions">
        <button className="btn gold" type="submit">
          Update
        </button>
        <button className="btn alt ink" type="button" onClick={() => void onArchive(event.id)}>
          Move to history
        </button>
      </div>
    </form>
  );
}
