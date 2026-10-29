import { createAdminClient, DONATION_PROOF_BUCKET } from "@/lib/supabase/admin";
import type { SiteRegion } from "@/lib/site";

export type DonationPaymentStatus = "pending" | "confirmed";

export type DonationRecord = {
  id: string;
  reference: string;
  region: SiteRegion;
  anonymous: boolean;
  donorName: string | null;
  email: string | null;
  amount: string;
  currency: string;
  proofPath: string;
  proofMime: string;
  proofUrl: string | null;
  paymentStatus: DonationPaymentStatus;
  createdAt: string;
  confirmedAt: string | null;
  emailSentAt: string | null;
};

function formatAmount(value: unknown) {
  const n = Number(value);
  if (Number.isNaN(n)) return String(value ?? "");
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export async function getDonations(): Promise<DonationRecord[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("donations")
    .select(
      "id, reference, region, anonymous, donor_name, email, amount, currency, proof_path, proof_mime, payment_status, created_at, confirmed_at, email_sent_at",
    )
    .order("created_at", { ascending: false });
  if (error || !data) return [];

  return Promise.all(
    data.map(async (row) => {
      const { data: signed } = await supabase.storage
        .from(DONATION_PROOF_BUCKET)
        .createSignedUrl(row.proof_path, 60 * 60);
      return {
        id: row.id,
        reference: row.reference,
        region: row.region as SiteRegion,
        anonymous: Boolean(row.anonymous),
        donorName: row.donor_name,
        email: row.email,
        amount: formatAmount(row.amount),
        currency: row.currency,
        proofPath: row.proof_path,
        proofMime: row.proof_mime ?? "",
        proofUrl: signed?.signedUrl ?? null,
        paymentStatus: (row.payment_status as DonationPaymentStatus) || "pending",
        createdAt: row.created_at,
        confirmedAt: row.confirmed_at,
        emailSentAt: row.email_sent_at,
      };
    }),
  );
}

export async function getDonationCounts() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("donations").select("region, payment_status");
  const rows = data ?? [];
  return {
    total: rows.length,
    pending: rows.filter((item) => item.payment_status !== "confirmed").length,
    nigeria: rows.filter((item) => item.region === "ng").length,
    canada: rows.filter((item) => item.region === "ca").length,
  };
}
