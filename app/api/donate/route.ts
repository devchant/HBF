import { NextResponse } from "next/server";
import { createAdminClient, DONATION_PROOF_BUCKET, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getMediaQuota, uploadBlockedReason } from "@/lib/storage-quota";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

function safeFileName(name: string) {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return base || "proof";
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Donations are not connected yet. Set Supabase keys on the server." },
        { status: 503 },
      );
    }

    const form = await request.formData();
    const region = String(form.get("region") ?? "");
    const anonymous = form.get("anonymous") === "true";
    const donorName = String(form.get("donorName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const amount = String(form.get("amount") ?? "").trim();
    const proof = form.get("proof");

    if (region !== "ng" && region !== "ca") {
      return NextResponse.json({ error: "Invalid region." }, { status: 400 });
    }
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Enter an email so we can confirm your gift." }, { status: 400 });
    }
    if (!anonymous && !donorName) {
      return NextResponse.json({ error: "Enter the donor name." }, { status: 400 });
    }
    if (!(proof instanceof File) || proof.size === 0) {
      return NextResponse.json({ error: "Upload proof of payment." }, { status: 400 });
    }
    if (proof.size > MAX_BYTES) {
      return NextResponse.json({ error: "Proof file must be 8 MB or smaller." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(proof.type)) {
      return NextResponse.json(
        { error: "Proof must be a PDF or image (JPEG, PNG, WebP)." },
        { status: 400 },
      );
    }

    const reference = `HBF-${region.toUpperCase()}-${Date.now().toString(36)}`;
    const currency = region === "ng" ? "NGN" : "CAD";
    const proofPath = `${region}/${reference}/${safeFileName(proof.name)}`;
    const supabase = createAdminClient();
    try {
      const quota = await getMediaQuota(supabase);
      const blocked = uploadBlockedReason(quota, proof.size);
      if (blocked) {
        return NextResponse.json(
          { error: "Storage is full. HBF cannot accept proof uploads right now." },
          { status: 503 },
        );
      }
    } catch {
      return NextResponse.json({ error: "Could not check storage space." }, { status: 500 });
    }
    const fileBytes = Buffer.from(await proof.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(DONATION_PROOF_BUCKET)
      .upload(proofPath, fileBytes, { contentType: proof.type, upsert: false });

    if (uploadError) {
      console.error("[donate] storage", uploadError.message);
      return NextResponse.json({ error: "Could not save proof of payment." }, { status: 500 });
    }

    const { error: insertError } = await supabase.from("donations").insert({
      reference,
      region,
      anonymous,
      donor_name: anonymous ? null : donorName,
      email: email || null,
      amount,
      currency,
      proof_path: proofPath,
      proof_mime: proof.type,
    });

    if (insertError) {
      console.error("[donate] insert", insertError.message);
      await supabase.storage.from(DONATION_PROOF_BUCKET).remove([proofPath]);
      return NextResponse.json({ error: "Could not save your donation." }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      reference,
      message:
        "Thank you. Your proof of payment was received. HBF will confirm your gift after review.",
    });
  } catch {
    return NextResponse.json({ error: "Could not process your donation." }, { status: 500 });
  }
}
