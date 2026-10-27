import { NextResponse } from "next/server";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

export async function POST(request: Request) {
  try {
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
    if (anonymous) {
      if (!email || !email.includes("@")) {
        return NextResponse.json({ error: "Email is required for anonymous gifts." }, { status: 400 });
      }
    } else if (!donorName) {
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

    console.info("[donate]", {
      reference,
      region,
      anonymous,
      donorName: anonymous ? undefined : donorName,
      email: anonymous ? email : email || undefined,
      amount,
      proofName: proof.name,
      proofSize: proof.size,
      proofType: proof.type,
    });

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
