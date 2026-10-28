import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMediaQuota, uploadBlockedReason } from "@/lib/storage-quota";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const form = await request.formData();
  const supabase = createAdminClient();

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (form.has("title")) patch.title = String(form.get("title") ?? "").trim();
  if (form.has("summary")) patch.summary = String(form.get("summary") ?? "").trim();
  if (form.has("status")) patch.status = String(form.get("status") ?? "");
  if (form.has("eventDate")) patch.event_date = String(form.get("eventDate") ?? "").trim() || null;
  if (form.has("sortOrder")) patch.sort_order = Number(form.get("sortOrder") ?? 0);
  if (form.has("region")) patch.region = String(form.get("region") ?? "");

  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    try {
      const quota = await getMediaQuota(supabase);
      const blocked = uploadBlockedReason(quota, file.size);
      if (blocked) return NextResponse.json({ error: blocked }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Could not check storage space." }, { status: 500 });
    }
    const ext = file.type.includes("png") ? "png" : file.type.includes("webp") ? "webp" : "jpg";
    const path = `events/${id}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("site-media")
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type || "image/jpeg", upsert: true });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
    patch.image_url = supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;
  }

  const { error: updateError } = await supabase.from("events").update(patch).eq("id", id);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const supabase = createAdminClient();
  const { error: deleteError } = await supabase.from("events").delete().eq("id", id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
