import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  const region = String(body?.region ?? "");
  if (region !== "ng" && region !== "ca") {
    return NextResponse.json({ error: "Invalid region." }, { status: 400 });
  }
  const row = {
    region,
    bank_name: String(body?.bankName ?? "").trim(),
    account_name: String(body?.accountName ?? "").trim(),
    account_number: String(body?.accountNumber ?? "").trim(),
    currency: String(body?.currency ?? "").trim(),
    note: String(body?.note ?? "").trim(),
    updated_at: new Date().toISOString(),
  };
  if (!row.bank_name || !row.account_name || !row.account_number || !row.currency) {
    return NextResponse.json({ error: "Bank, account name, number, and currency are required." }, { status: 400 });
  }
  const supabase = createAdminClient();
  const { error: updateError } = await supabase.from("donate_accounts").upsert(row);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
