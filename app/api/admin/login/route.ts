import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, adminCredentialsMatch, signAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");
  if (!adminCredentialsMatch(email, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await signAdminSession(email.trim().toLowerCase()), adminCookieOptions());
  return res;
}
