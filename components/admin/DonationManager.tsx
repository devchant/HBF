"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/links";
import type { DonationRecord } from "@/lib/donations";
import type { SiteRegion } from "@/lib/site";

function formatWhen(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleString();
}

function money(donation: DonationRecord) {
  const prefix = donation.currency === "NGN" ? "₦" : donation.currency === "CAD" ? "CA $" : `${donation.currency} `;
  return `${prefix}${donation.amount}`;
}

function mailtoFor(donation: DonationRecord) {
  if (!donation.email) return null;
  const society =
    donation.region === "ng"
      ? "Humanitarian Betterment Foundation (HBF Nigeria)"
      : "Humanitarian Betterment Foundation Canada Society";
  const greeting = donation.anonymous || !donation.donorName ? "Hello" : `Dear ${donation.donorName}`;
  const subject = `We received your gift — ${donation.reference}`;
  const text = `${greeting},

Thank you. ${society} has confirmed your gift of ${money(donation)}.

Reference: ${donation.reference}

This email is your receipt. Please keep it for your records.

With gratitude,
${society}
${donation.region === "ng" ? SITE.nigeria.email : SITE.canada.label}`;
  return `mailto:${encodeURIComponent(donation.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export function DonationManager({ donations }: { donations: DonationRecord[] }) {
  const router = useRouter();
  const [region, setRegion] = useState<SiteRegion>("ng");
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const rows = useMemo(() => donations.filter((item) => item.region === region), [donations, region]);
  const pending = rows.filter((item) => item.paymentStatus !== "confirmed");
  const confirmed = rows.filter((item) => item.paymentStatus === "confirmed");

  async function act(id: string, action: "confirm" | "email") {
    setBusyId(id);
    setStatus("");
    const res = await fetch(`/api/admin/donations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = (await res.json()) as { error?: string };
    setBusyId(null);
    if (!res.ok) {
      setStatus(data.error ?? "Could not update this donation.");
      return;
    }
    setStatus(action === "confirm" ? "Payment confirmed. You can now email the donor." : "Thank-you email sent.");
    router.refresh();
  }

  return (
    <div>
      <div className="donate-tabs admin-region-tabs">
        <button type="button" className={region === "ng" ? "is-active" : ""} onClick={() => setRegion("ng")}>
          Nigeria
        </button>
        <button type="button" className={region === "ca" ? "is-active" : ""} onClick={() => setRegion("ca")}>
          Canada
        </button>
      </div>
      {status ? <p className="admin-status">{status}</p> : null}

      <h2 className="admin-section-title">Awaiting confirmation</h2>
      {pending.length === 0 ? <p>No pending {region === "ng" ? "Nigeria" : "Canada"} receipts.</p> : null}
      <div className="admin-donation-list">
        {pending.map((item) => (
          <DonationCard
            key={item.id}
            donation={item}
            busy={busyId === item.id}
            onConfirm={() => void act(item.id, "confirm")}
            onEmail={() => void act(item.id, "email")}
          />
        ))}
      </div>

      <h2 className="admin-section-title">Confirmed</h2>
      {confirmed.length === 0 ? <p>No confirmed {region === "ng" ? "Nigeria" : "Canada"} gifts yet.</p> : null}
      <div className="admin-donation-list">
        {confirmed.map((item) => (
          <DonationCard
            key={item.id}
            donation={item}
            busy={busyId === item.id}
            onConfirm={() => void act(item.id, "confirm")}
            onEmail={() => void act(item.id, "email")}
          />
        ))}
      </div>
    </div>
  );
}

function DonationCard({
  donation,
  busy,
  onConfirm,
  onEmail,
}: {
  donation: DonationRecord;
  busy: boolean;
  onConfirm: () => void;
  onEmail: () => void;
}) {
  const mailto = mailtoFor(donation);
  const isImage = donation.proofMime.startsWith("image/");
  return (
    <article className="admin-donation">
      <div className="admin-donation-proof">
        {donation.proofUrl && isImage ? (
          <a href={donation.proofUrl} target="_blank" rel="noreferrer">
            <img src={donation.proofUrl} alt={`Proof ${donation.reference}`} />
          </a>
        ) : donation.proofUrl ? (
          <a className="admin-donation-file" href={donation.proofUrl} target="_blank" rel="noreferrer">
            Open receipt
          </a>
        ) : (
          <div className="admin-history-ph" />
        )}
      </div>
      <div>
        <p className="admin-kicker">
          {donation.paymentStatus === "confirmed" ? "Confirmed" : "Pending"} · {donation.reference}
        </p>
        <h3>{donation.anonymous ? "Anonymous donor" : donation.donorName || "Unnamed donor"}</h3>
        <dl className="admin-donation-dl">
          <div>
            <dt>Email</dt>
            <dd>{donation.email || "Not provided"}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd>{money(donation)}</dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{formatWhen(donation.createdAt)}</dd>
          </div>
          {donation.confirmedAt ? (
            <div>
              <dt>Confirmed</dt>
              <dd>{formatWhen(donation.confirmedAt)}</dd>
            </div>
          ) : null}
          {donation.emailSentAt ? (
            <div>
              <dt>Email sent</dt>
              <dd>{formatWhen(donation.emailSentAt)}</dd>
            </div>
          ) : null}
        </dl>
      </div>
      <div className="admin-row-actions admin-donation-actions">
        {donation.paymentStatus !== "confirmed" ? (
          <button className="btn gold" type="button" disabled={busy} onClick={onConfirm}>
            {busy ? "Saving…" : "Confirm payment"}
          </button>
        ) : donation.email ? (
          <button className="btn gold" type="button" disabled={busy} onClick={onEmail}>
            {busy ? "Sending…" : donation.emailSentAt ? "Send email again" : "Send thank-you email"}
          </button>
        ) : (
          <p className="admin-lead" style={{ margin: 0 }}>
            Confirmed. No email on file.
          </p>
        )}
        {mailto ? (
          <a className="btn alt ink" href={mailto}>
            Email from inbox
          </a>
        ) : null}
      </div>
    </article>
  );
}
