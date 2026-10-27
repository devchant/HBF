import { SiteFooter } from "@/components/Footer";
import { SiteHeader } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HBF Nigeria",
    template: "%s | HBF Nigeria",
  },
  description:
    "Humanitarian Betterment Foundation Nigeria. UN ECOSOC Special Consultative Status since 21 July 2026. Programs in Warri and Abuja.",
};

export default function NigeriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader region="ng" />
      {children}
      <SiteFooter region="ng" />
    </>
  );
}
