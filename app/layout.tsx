import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: {
    default: "Humanitarian Betterment Foundation (HBF)",
    template: "%s | Humanitarian Betterment Foundation",
  },
  description:
    "Humanitarian Betterment Foundation (HBF). UN ECOSOC Special Consultative Status, Nigeria, since 21 July 2026. Affiliated in Canada as HBF Canada Society, BC registration S0086143.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
