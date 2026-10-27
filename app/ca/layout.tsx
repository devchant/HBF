import { SiteFooter } from "@/components/Footer";
import { SiteHeader } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HBF Canada Society",
    template: "%s | HBF Canada Society",
  },
  description:
    "HBF Canada Society, BC registration S0086143, Surrey. Community programs in British Columbia. Affiliated with HBF Nigeria.",
};

export default function CanadaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader region="ca" />
      {children}
      <SiteFooter region="ca" />
    </>
  );
}
