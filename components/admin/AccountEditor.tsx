"use client";

import { useState } from "react";
import type { DonateAccount } from "@/lib/donate-accounts";
import type { SiteRegion } from "@/lib/site";

type Props = { region: SiteRegion; account: DonateAccount };

export function AccountEditor({ region, account }: Props) {
  const [form, setForm] = useState(account);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const title = region === "ng" ? "Nigeria donate account" : "Canada donate account";

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const res = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ region, ...form }),
    });
    const data = (await res.json()) as { error?: string };
    setBusy(false);
    setStatus(res.ok ? "Saved. Donate pages will show these details." : data.error ?? "Could not save.");
  }

  function set<K extends keyof DonateAccount>(key: K, value: DonateAccount[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form className="admin-card" onSubmit={save}>
      <p className="admin-kicker">{region === "ng" ? "Nigeria" : "Canada"}</p>
      <h2>{title}</h2>
      <label className="admin-field">
        Bank
        <input value={form.bankName} onChange={(e) => set("bankName", e.target.value)} required />
      </label>
      <label className="admin-field">
        Account name
        <input value={form.accountName} onChange={(e) => set("accountName", e.target.value)} required />
      </label>
      <label className="admin-field">
        Account number
        <input value={form.accountNumber} onChange={(e) => set("accountNumber", e.target.value)} required />
      </label>
      <label className="admin-field">
        Currency
        <input value={form.currency} onChange={(e) => set("currency", e.target.value)} required />
      </label>
      <label className="admin-field">
        Note shown to donors
        <textarea value={form.note} onChange={(e) => set("note", e.target.value)} rows={3} />
      </label>
      {status ? <p className="admin-status">{status}</p> : null}
      <button className="btn gold" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save account"}
      </button>
    </form>
  );
}
