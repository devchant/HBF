export type SiteRegion = "ng" | "ca";

export function siteBase(region: SiteRegion) {
  return region === "ng" ? "/ng" : "/ca";
}
