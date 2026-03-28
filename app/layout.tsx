import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Banner } from "fumadocs-ui/components/banner";
import { RootProvider } from "fumadocs-ui/provider/next";
import "katex/dist/katex.min.css";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Noto_Serif_JP({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const codeFont = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "shindanshi",
    template: "%s | shindanshi",
  },
  description: "中小企業診断士試験の学習用 wiki",
};

const isVercelRuntime = process.env.VERCEL === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} ${codeFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ options: { allowClear: true } }}>
          <Banner id="exam-guide-reminder">
            制度情報と日程は毎年更新されます。受験前は{" "}
            <Link href="/docs/reference/exam-guide" className="underline underline-offset-4">
              受験ガイド
            </Link>{" "}
            で確認日つきの一次情報を確認してください。
          </Banner>
          {children}
          {isVercelRuntime ? <Analytics /> : null}
          {isVercelRuntime ? <SpeedInsights /> : null}
        </RootProvider>
      </body>
    </html>
  );
}
