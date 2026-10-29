import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { sendDonorEmail } from "@/lib/donor-mail";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SiteRegion } from "@/lib/site";

type Ctx = { params: Promise<{ id: string }> };

async function loadDonation(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("donations")
    .select(
      "id, reference, region, anonymous, donor_name, email, amount, currency, proof_path, proof_mime, payment_status, created_at, confirmed_at, email_sent_at",
    )
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id,
    reference: data.reference,
    region: data.region as SiteRegion,
    anonymous: Boolean(data.anonymous),
    donorName: data.donor_name as string | null,
    email: data.email as string | null,
    amount: String(data.amount),
    currency: data.currency as string,
    proofPath: data.proof_path as string,
    proofMime: data.proof_mime as string,
    proofUrl: null,
    paymentStatus: (data.payment_status as "pending" | "confirmed") || "pending",
    createdAt: data.created_at as string,
    confirmedAt: data.confirmed_at as string | null,
    emailSentAt: data.email_sent_at as string | null,
  };
}

export async function PATCH(request: Request, ctx: Ctx) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await ctx.params;
  const body = (await request.json().catch(() => ({}))) as { action?: string };
  const donation = await loadDonation(id);
  if (!donation) return NextResponse.json({ error: "Donation not found." }, { status: 404 });

  const supabase = createAdminClient();

  if (body.action === "confirm") {
    const { error: updateError } = await supabase
      .from("donations")
      .update({ payment_status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("id", id);
    if (updateError) return NextResponse.json({ error: "Could not confirm this payment." }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "email") {
    if (donation.paymentStatus !== "confirmed") {
      return NextResponse.json({ error: "Confirm the payment before emailing the donor." }, { status: 400 });
    }
    const sent = await sendDonorEmail(donation);
    if (!sent.ok) return NextResponse.json({ error: sent.error }, { status: 400 });
    const { error: updateError } = await supabase
      .from("donations")
      .update({ email_sent_at: new Date().toISOString() })
      .eq("id", id);
    if (updateError) return NextResponse.json({ error: "Email sent, but the record was not updated." }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
