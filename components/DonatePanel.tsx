"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { DonateAccount } from "@/lib/donate-accounts";
import { SITE } from "@/lib/links";
import type { SiteRegion } from "@/lib/site";

type Tab = "named" | "anonymous";

type DonatePanelProps = {
  region: SiteRegion;
  account: DonateAccount;
};

export function DonatePanel({ region, account }: DonatePanelProps) {
  const contactEmail = region === "ng" ? SITE.nigeria.email : undefined;
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("named");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setDonorName("");
    setEmail("");
    setAmount("");
    setProof(null);
    if (fileRef.current) fileRef.current.value = "";
    setStatus("idle");
    setMessage("");
    setReference("");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    resetForm();
    setTab("named");
  }, [resetForm]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData();
    form.set("region", region);
    form.set("anonymous", tab === "anonymous" ? "true" : "false");
    if (tab === "named") form.set("donorName", donorName);
    form.set("email", email.trim());
    form.set("amount", amount);
    if (proof) form.set("proof", proof);

    try {
      const res = await fetch("/api/donate", { method: "POST", body: form });
      const data = (await res.json()) as { ok?: boolean; error?: string; reference?: string; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("done");
      setReference(data.reference ?? "");
      setMessage(data.message ?? "Thank you. We received your submission.");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  const currencyLabel = account.currency === "NGN" ? "₦" : "CA $";
  const bankName = account.bankName.replace(/\s*\(placeholder\)/i, "").trim();
  const noteLooksDraft = /placeholder|replace with|going live/i.test(account.note);
  const note =
    !account.note || noteLooksDraft
      ? region === "ng"
        ? "Transfer to this Sterling Bank account, then upload your proof of payment so HBF Nigeria can confirm your gift."
        : "Transfer to this account, then upload your proof of payment so HBF Canada Society can confirm your gift."
      : account.note;

  return (
    <>
      <article className="card donate-account-card">
        <p className="kicker">How to give</p>
        <h3>{region === "ng" ? "Donate to HBF Nigeria" : "Donate to HBF Canada Society"}</h3>
        <p className="donate-account-note">{note}</p>
        <dl className="donate-account-dl">
          <div>
            <dt>Account name</dt>
            <dd>{account.accountName}</dd>
          </div>
          <div>
            <dt>Bank</dt>
            <dd>{bankName}</dd>
          </div>
          <div>
            <dt>Account number</dt>
            <dd className="donate-account-number">{account.accountNumber}</dd>
          </div>
          {account.extraAccountNumber ? (
            <div>
              <dt>Bank account number</dt>
              <dd className="donate-account-number">{account.extraAccountNumber}</dd>
            </div>
          ) : null}
          {account.sortCode ? (
            <div>
              <dt>Sort code</dt>
              <dd className="donate-account-number">{account.sortCode}</dd>
            </div>
          ) : null}
          {account.swiftCode ? (
            <div>
              <dt>Swift code</dt>
              <dd className="donate-account-number">{account.swiftCode}</dd>
            </div>
          ) : null}
          <div>
            <dt>Currency</dt>
            <dd>{account.currency}</dd>
          </div>
        </dl>
        <p className="donate-steps">
          After you transfer, click <strong>Donate now</strong> to send your name or give anonymously, the amount, and
          a screenshot or PDF of the transfer.
        </p>
        <button type="button" className="btn gold donate-now-btn" onClick={() => setOpen(true)}>
          <Icon name="heart" />
          Donate now
        </button>
        {contactEmail ? (
          <p className="donate-alt-contact">
            Questions?{" "}
            <a href={`mailto:${contactEmail}?subject=Donation%20help`}>{contactEmail}</a> or 07085709872.
          </p>
        ) : null}
      </article>

      {open ? (
        <div className="donate-overlay" role="presentation" onClick={close}>
          <div
            ref={dialogRef}
            className="donate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="donate-modal-close" onClick={close} aria-label="Close">
              ×
            </button>
            <h2 id="donate-modal-title">Submit proof of payment</h2>
            <p className="donate-modal-lead">
              After you transfer to the account above, complete this form so HBF can match your gift.
            </p>

            {status === "done" ? (
              <div className="donate-success">
                <p>{message}</p>
                {reference ? <p className="donate-ref">Reference: <strong>{reference}</strong></p> : null}
                <button type="button" className="btn" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="donate-tabs" role="tablist" aria-label="Donation type">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "named"}
                    className={tab === "named" ? "is-active" : ""}
                    onClick={() => setTab("named")}
                  >
                    With your name
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "anonymous"}
                    className={tab === "anonymous" ? "is-active" : ""}
                    onClick={() => setTab("anonymous")}
                  >
                    Anonymous
                  </button>
                </div>

                <form className="donate-form" onSubmit={onSubmit}>
                  {tab === "named" ? (
                    <label className="donate-field">
                      <span>Donor name</span>
                      <input
                        type="text"
                        name="donorName"
                        required
                        autoComplete="name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Full name"
                      />
                    </label>
                  ) : null}

                  {tab === "anonymous" ? (
                    <label className="donate-field">
                      <span>Your email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="For confirmation only"
                      />
                      <small>We use this to confirm your gift. It is not shown publicly.</small>
                    </label>
                  ) : (
                    <label className="donate-field">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="For your receipt"
                      />
                      <small>Used to confirm your gift after HBF receives the transfer.</small>
                    </label>
                  )}

                  <label className="donate-field">
                    <span>Amount donated ({account.currency})</span>
                    <div className="donate-amount-wrap">
                      <span className="donate-amount-prefix" aria-hidden="true">{currencyLabel}</span>
                      <input
                        type="number"
                        name="amount"
                        required
                        min="1"
                        step="any"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </label>

                  <label className="donate-field">
                    <span>Proof of payment</span>
                    <input
                      ref={fileRef}
                      type="file"
                      name="proof"
                      required
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => setProof(e.target.files?.[0] ?? null)}
                    />
                    <small>Upload a screenshot or PDF of your transfer (max 8 MB).</small>
                  </label>

                  {status === "error" && message ? (
                    <p className="donate-error" role="alert">{message}</p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn gold donate-submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting…" : "Submit"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
