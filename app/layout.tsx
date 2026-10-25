import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
