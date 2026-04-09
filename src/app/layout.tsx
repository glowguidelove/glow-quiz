import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/MetaPixel";
import CookieConsent from "@/components/CookieConsent";
import UtmCapture from "@/components/UtmCapture";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlowGuide — Find Your Perfect Skincare Routine",
  description:
    "Take our 60-second skin quiz and get a personalized skincare routine matched to your skin type, concerns, and budget. Free, science-backed recommendations.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://glowguide.love"),
  openGraph: {
    title: "GlowGuide — Find Your Perfect Skincare Routine",
    description:
      "Take our 60-second skin quiz and get a personalized skincare routine matched to your skin type, concerns, and budget.",
    type: "website",
    siteName: "GlowGuide",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowGuide — Find Your Perfect Skincare Routine",
    description:
      "Take our 60-second skin quiz and get a personalized skincare routine matched to your skin type, concerns, and budget.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.paulaschoice.com" />
        <link rel="dns-prefetch" href="https://theordinary.com" />
        <link rel="dns-prefetch" href="https://www.tula.com" />
        <link rel="dns-prefetch" href="https://eltamd.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        <UtmCapture />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
