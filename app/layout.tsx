import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/portfolio";
import { MotionSystem } from "@/components/motion-system";

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: { default: "Julius Joseph | Tron — Engineering Portfolio", template: "%s | Julius Joseph · Tron" },
  description: "Julius Joseph, known as Tron. Software Engineering graduate working across hardware development, embedded firmware, Python and connected applications.",
  robots: { index: false, follow: false },
  openGraph: { title: "Julius Joseph | Tron", description: "Hardware, firmware and connected software by Julius Joseph.", type: "website", siteName: "Tron" },
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
