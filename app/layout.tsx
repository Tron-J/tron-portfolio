import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/portfolio";
import { MotionSystem } from "@/components/motion-system";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: "Tron",
  description: "Julius Joseph, known as Tron. Software Engineering graduate working across hardware development, embedded firmware, Python and connected applications.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "Tron", description: "Hardware, firmware and connected software by Julius Joseph.", type: "website", siteName: "Tron", url: "/" },
  twitter: { card: "summary", title: "Tron", description: "Hardware, firmware and connected software by Julius Joseph." },
  icons: {
    icon: "/brand/favicon-tile.png",
    shortcut: "/brand/favicon-tile.png",
    apple: "/brand/apple-touch-icon-tile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<MotionSystem /></body>
    </html>
  );
}
