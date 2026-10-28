import { SITE } from "@/lib/links";

export function normalizeHost(host: string) {
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export function hostRegion(host: string): "ng" | "ca" | null {
  const h = normalizeHost(host);
  if (h === "humanitarianbettermentf.org" || h === "www.humanitarianbettermentf.org") return "ng";
  if (h === "hbfcanada.ca" || h === "www.hbfcanada.ca") return "ca";
  return null;
}

export function societyOrigin(region: "ng" | "ca") {
  return region === "ng" ? SITE.nigeria.href : SITE.canada.href;
}

export function requestHost(request: { headers: Headers }) {
  return request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
}
