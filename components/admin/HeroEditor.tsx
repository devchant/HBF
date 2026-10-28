"use client";

import { useState } from "react";
import type { HeroContent, HeroSlot } from "@/lib/cms";

const SLOT_LABEL: Record<HeroSlot, string> = {
  home: "Home hero",
  about: "About banner",
  programs: "Programs banner",
};

export function HeroEditor({ heroes }: { heroes: HeroContent[] }) {
  return (
    <div className="admin-grid-2">
      {heroes.map((hero) => (
        <HeroCard key={`${hero.region}-${hero.slot}`} hero={hero} />
      ))}
    </div>
  );
}

function HeroCard({ hero }: { hero: HeroContent }) {
  const [alt, setAlt] = useState(hero.alt);
  const [preview, setPreview] = useState(hero.imageUrl);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const society = hero.region === "ng" ? "Nigeria" : "Canada";

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = new FormData(event.currentTarget).get("file");
    if (!(file instanceof File) || file.size === 0) {
      setStatus("Choose a new photograph first.");
      return;
    }
    setBusy(true);
    setStatus("");
    const form = new FormData();
    form.set("region", hero.region);
    form.set("slot", hero.slot);
    form.set("alt", alt);
    form.set("file", file);
    const res = await fetch("/api/admin/heroes", { method: "POST", body: form });
    const data = (await res.json()) as { ok?: boolean; error?: string; imageUrl?: string };
    setBusy(false);
    if (!res.ok) {
      setStatus(data.error ?? "Could not save.");
      return;
    }
    if (data.imageUrl) setPreview(data.imageUrl);
    setStatus("Saved. The public page will show this image.");
  }

  return (
    <form className="admin-card" onSubmit={save}>
      <p className="admin-kicker">{society}</p>
      <h2>{SLOT_LABEL[hero.slot]}</h2>
      <img className="admin-preview" src={preview} alt="" />
      <label className="admin-field">
        Alt text
        <input value={alt} onChange={(e) => setAlt(e.target.value)} />
      </label>
      <label className="admin-field">
        New photograph
        <input type="file" name="file" accept="image/jpeg,image/png,image/webp" required />
      </label>
      {status ? <p className="admin-status">{status}</p> : null}
      <button className="btn gold" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Update image"}
      </button>
    </form>
  );
}
