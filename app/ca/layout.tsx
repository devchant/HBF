import { SiteFooter } from "@/components/Footer";
import { SiteHeader } from "@/components/Header";
import { requestHost } from "@/lib/hosts";
import { urlModeForHost } from "@/lib/site";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "HBF Canada Society",
    template: "%s | HBF Canada Society",
  },
  description:
    "HBF Canada Society, BC registration S0086143, Surrey. Community programs in British Columbia. Affiliated with HBF Nigeria.",
};

export default async function CanadaLayout({ children }: { children: React.ReactNode }) {
  const host = requestHost({ headers: await headers() });
  const urlMode = urlModeForHost(host, "ca");
  return (
    <>
      <SiteHeader region="ca" urlMode={urlMode} />
      {children}
      <SiteFooter region="ca" urlMode={urlMode} />
    </>
  );
}
