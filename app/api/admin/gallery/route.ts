import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMediaQuota, uploadBlockedReason } from "@/lib/storage-quota";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const form = await request.formData();
  const region = String(form.get("region") ?? "");
  const caption = String(form.get("caption") ?? "").trim();
  const alt = String(form.get("alt") ?? "").trim();
  const sortOrder = Number(form.get("sortOrder") ?? 0);
  const file = form.get("file");

  if (region !== "ng" && region !== "ca") {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose a photograph." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Use JPEG, PNG, or WebP." }, { status: 400 });
  }

  const supabase = createAdminClient();
  try {
    const quota = await getMediaQuota(supabase);
    const blocked = uploadBlockedReason(quota, file.size);
    if (blocked) return NextResponse.json({ error: blocked }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Could not check storage space." }, { status: 500 });
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `gallery/${region}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("site-media")
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: true });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
  const imageUrl = supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;

  const { error: insertError } = await supabase.from("gallery").insert({
    region,
    image_url: imageUrl,
    caption,
    alt: alt || caption || "Gallery photograph",
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
