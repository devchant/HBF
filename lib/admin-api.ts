import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";

export async function requireAdmin() {
  const email = await getAdminFromCookies();
  if (!email) {
    return { email: null, error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { email, error: null };
}
