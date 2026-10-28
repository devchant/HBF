"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { GalleryPhoto } from "@/lib/cms";
import type { SiteRegion } from "@/lib/site";

export function GalleryManager({ photos }: { photos: GalleryPhoto[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<SiteRegion | "all">("all");
  const [status, setStatus] = useState("");
  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((photo) => photo.region === filter)),
    [photos, filter],
  );

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const res = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(formEl) });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setStatus(data.error ?? "Could not add photograph.");
      return;
    }
    formEl.reset();
    setStatus("Photograph added.");
    router.refresh();
  }

  async function save(id: string, form: FormData) {
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "PATCH", body: form });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setStatus(data.error ?? "Could not update.");
      return;
    }
    setStatus("Photograph updated.");
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this photograph from the gallery?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setStatus("Could not delete.");
      return;
    }
    setStatus("Photograph removed.");
    router.refresh();
  }

  return (
    <div>
      <div className="donate-tabs admin-region-tabs" style={{ maxWidth: 480 }}>
        <button type="button" className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
          All
        </button>
        <button type="button" className={filter === "ng" ? "is-active" : ""} onClick={() => setFilter("ng")}>
          Nigeria
        </button>
        <button type="button" className={filter === "ca" ? "is-active" : ""} onClick={() => setFilter("ca")}>
          Canada
        </button>
      </div>
      {status ? <p className="admin-status">{status}</p> : null}

      <form className="admin-card" onSubmit={create}>
        <h2>Add photograph</h2>
        <label className="admin-field">
          Society
          <select name="region" defaultValue={filter === "ca" ? "ca" : "ng"}>
            <option value="ng">Nigeria</option>
            <option value="ca">Canada</option>
          </select>
        </label>
        <label className="admin-field">
          Caption
          <input name="caption" placeholder="Short description shown under the photo" />
        </label>
        <label className="admin-field">
          Alt text
          <input name="alt" placeholder="For screen readers" />
        </label>
        <label className="admin-field">
          Sort order
          <input type="number" name="sortOrder" defaultValue={0} />
        </label>
        <label className="admin-field">
          Photograph
          <input type="file" name="file" accept="image/*" required />
        </label>
        <button className="btn gold" type="submit">
          Add to gallery
        </button>
      </form>

      <p className="admin-lead" style={{ marginTop: 22 }}>
        {visible.length} photograph{visible.length === 1 ? "" : "s"}
        {filter === "all" ? "" : filter === "ng" ? " in Nigeria" : " in Canada"}.
      </p>
      <div className="admin-gallery-grid">
        {visible.map((photo) => (
          <form
            key={photo.id}
            className="admin-card"
            onSubmit={(e) => {
              e.preventDefault();
              void save(photo.id, new FormData(e.currentTarget));
            }}
          >
            <img className="admin-preview" src={photo.imageUrl} alt="" />
            <p className="admin-kicker">{photo.region === "ng" ? "Nigeria" : "Canada"}</p>
            <label className="admin-field">
              Society
              <select name="region" defaultValue={photo.region}>
                <option value="ng">Nigeria</option>
                <option value="ca">Canada</option>
              </select>
            </label>
            <label className="admin-field">
              Caption
              <textarea name="caption" rows={2} defaultValue={photo.caption} />
            </label>
            <label className="admin-field">
              Alt text
              <input name="alt" defaultValue={photo.alt} />
            </label>
            <label className="admin-field">
              Sort order
              <input type="number" name="sortOrder" defaultValue={photo.sortOrder} />
            </label>
            <label className="admin-field">
              Replace photograph
              <input type="file" name="file" accept="image/*" />
            </label>
            <div className="admin-row-actions">
              <button className="btn gold" type="submit">
                Update
              </button>
              <button className="btn alt ink" type="button" onClick={() => void remove(photo.id)}>
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
