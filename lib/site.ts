import { hostRegion, societyOrigin } from "@/lib/hosts";

export type SiteRegion = "ng" | "ca";
export type UrlMode = "bare" | "prefixed";

export function urlModeForHost(host: string, region: SiteRegion): UrlMode {
  return hostRegion(host) === region ? "bare" : "prefixed";
}

export function siteBase(region: SiteRegion, mode: UrlMode = "prefixed") {
  if (mode === "bare") return "";
  return region === "ng" ? "/ng" : "/ca";
}

export function otherSocietyHref(region: SiteRegion, mode: UrlMode = "prefixed") {
  if (mode === "bare") return societyOrigin(region === "ng" ? "ca" : "ng");
  return region === "ng" ? "/ca" : "/ng";
}
