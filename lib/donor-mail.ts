import { SITE } from "@/lib/links";
import type { DonationRecord } from "@/lib/donations";

export function donorMailto(donation: DonationRecord) {
  if (!donation.email) return null;
  const { subject, text } = donorEmailCopy(donation);
  return `mailto:${encodeURIComponent(donation.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

export function donorEmailCopy(donation: DonationRecord) {
  const society =
    donation.region === "ng" ? "Humanitarian Betterment Foundation (HBF Nigeria)" : "Humanitarian Betterment Foundation Canada Society";
  const greeting = donation.anonymous || !donation.donorName ? "Hello" : `Dear ${donation.donorName}`;
  const amount = `${donation.currency} ${donation.amount}`;
  const subject = `We received your gift — ${donation.reference}`;
  const text = `${greeting},

Thank you. ${society} has confirmed your gift of ${amount}.

Reference: ${donation.reference}

This email is your receipt. Please keep it for your records.

With gratitude,
${society}
${donation.region === "ng" ? SITE.nigeria.email : SITE.canada.label}`;
  return { subject, text };
}

export async function sendDonorEmail(donation: DonationRecord) {
  if (!donation.email) return { ok: false as const, error: "This donor did not leave an email address." };
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false as const, error: "RESEND_API_KEY is not set. Use Email donor to send from your inbox." };
  }

  const { subject, text } = donorEmailCopy(donation);
  const from =
    donation.region === "ng"
      ? `HBF Nigeria <${SITE.nigeria.email}>`
      : `HBF Canada Society <${SITE.nigeria.email}>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [donation.email],
      subject,
      text,
    }),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    return { ok: false as const, error: body.message ?? "Could not send the email." };
  }
  return { ok: true as const };
}
