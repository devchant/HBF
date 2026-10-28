import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMediaQuota, uploadBlockedReason } from "@/lib/storage-quota";

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const form = await request.formData();
  const region = String(form.get("region") ?? "");
  const title = String(form.get("title") ?? "").trim();
  const summary = String(form.get("summary") ?? "").trim();
  const status = String(form.get("status") ?? "upcoming");
  const eventDate = String(form.get("eventDate") ?? "").trim();
  const sortOrder = Number(form.get("sortOrder") ?? 0);
  const file = form.get("file");

  if (region !== "ng" && region !== "ca") {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }
  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (!["upcoming", "ongoing", "past"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const supabase = createAdminClient();
  let imageUrl: string | null = null;
  if (file instanceof File && file.size > 0) {
    try {
      const quota = await getMediaQuota(supabase);
      const blocked = uploadBlockedReason(quota, file.size);
      if (blocked) return NextResponse.json({ error: blocked }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Could not check storage space." }, { status: 500 });
    }
    const ext = file.type.includes("png") ? "png" : file.type.includes("webp") ? "webp" : "jpg";
    const path = `events/${region}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("site-media")
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type || "image/jpeg", upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
    imageUrl = supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;
  }

  const { error: insertError } = await supabase.from("events").insert({
    region,
    title,
    summary,
    status,
    event_date: eventDate || null,
    image_url: imageUrl,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });
  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
