import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMediaQuota } from "@/lib/storage-quota";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const quota = await getMediaQuota(createAdminClient());
    return NextResponse.json(quota);
  } catch {
    return NextResponse.json({ error: "Could not read storage usage." }, { status: 500 });
  }
}
