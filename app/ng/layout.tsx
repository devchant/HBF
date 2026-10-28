import { SiteFooter } from "@/components/Footer";
import { SiteHeader } from "@/components/Header";
import { requestHost } from "@/lib/hosts";
import { urlModeForHost } from "@/lib/site";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "HBF Nigeria",
    template: "%s | HBF Nigeria",
  },
  description:
    "Humanitarian Betterment Foundation Nigeria. UN ECOSOC Special Consultative Status since 21 July 2026. Programs in Warri and Abuja.",
};

export default async function NigeriaLayout({ children }: { children: React.ReactNode }) {
  const host = requestHost({ headers: await headers() });
  const urlMode = urlModeForHost(host, "ng");
  return (
    <>
      <SiteHeader region="ng" urlMode={urlMode} />
      {children}
      <SiteFooter region="ng" urlMode={urlMode} />
    </>
  );
}
