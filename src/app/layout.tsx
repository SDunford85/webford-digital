import type { Metadata } from "next";
import "@fontsource-variable/sora/wght.css";
import "@fontsource-variable/dm-sans/wght.css";
import "./globals.css";
import { allowIndexing } from "@/content/site";

export const metadata: Metadata = {
  // Preview mode: hide from search engines until launch (see allowIndexing in src/content/site.ts)
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004"),
  title: {
    default: "Hexford Digital — bespoke websites with a personal service",
    template: "%s · Hexford Digital",
  },
  description:
    "Bespoke, hand-built websites for small businesses and sole traders, from someone with 10+ years in IT and software. Online shops, bookings, admin sites you can update yourself, and a real person to talk to. Working with businesses across the UK.",
  openGraph: {
    siteName: "Hexford Digital",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="antialiased">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-white text-ink">{children}</body>
    </html>
  );
}
