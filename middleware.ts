import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { hostRegion, requestHost, societyOrigin } from "@/lib/hosts";

function stripPrefix(pathname: string, prefix: string) {
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length) || "/";
  return pathname;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = requestHost(request);
  const region = hostRegion(host);

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const email = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!email) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (!region) {
    if (pathname === "/about") return NextResponse.redirect(new URL("/ng/about", request.url));
    if (pathname === "/programs") return NextResponse.redirect(new URL("/ng/programs", request.url));
    if (pathname === "/donate-nigeria") return NextResponse.redirect(new URL("/ng/donate", request.url));
    return NextResponse.next();
  }

  const ownPrefix = region === "ng" ? "/ng" : "/ca";
  const otherPrefix = region === "ng" ? "/ca" : "/ng";
  const otherOrigin = societyOrigin(region === "ng" ? "ca" : "ng");

  if (pathname === otherPrefix || pathname.startsWith(`${otherPrefix}/`)) {
    const dest = new URL(stripPrefix(pathname, otherPrefix), `${otherOrigin}/`);
    dest.search = request.nextUrl.search;
    dest.hash = request.nextUrl.hash;
    return NextResponse.redirect(dest, 308);
  }

  if (pathname === ownPrefix || pathname.startsWith(`${ownPrefix}/`)) {
    const dest = request.nextUrl.clone();
    dest.pathname = stripPrefix(pathname, ownPrefix);
    return NextResponse.redirect(dest, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? ownPrefix : `${ownPrefix}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png|images/|videos/|.*\\..*).*)"],
};
