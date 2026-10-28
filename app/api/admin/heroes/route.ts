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
  const slot = String(form.get("slot") ?? "home");
  const alt = String(form.get("alt") ?? "").trim();
  const file = form.get("file");
  if (region !== "ng" && region !== "ca") {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }
  if (slot !== "home" && slot !== "about" && slot !== "programs") {
    return NextResponse.json({ error: "Invalid banner." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose a hero image." }, { status: 400 });
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
  const path = `heroes/${region}-${slot}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("site-media")
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: true });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }
  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  const { error: updateError } = await supabase
    .from("heroes")
    .upsert(
      { region, slot, image_url: data.publicUrl, alt: alt || "Banner photograph", updated_at: new Date().toISOString() },
      { onConflict: "region,slot" },
    );
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, imageUrl: data.publicUrl });
}
