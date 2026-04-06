import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
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
            <span className="block w-full pr-8 text-left leading-snug sm:pr-0 sm:text-center">
              掲載内容は正確性・最新性の確保に努めていますが、一次情報をご確認ください。
            </span>
          </Banner>
          {children}
          {isVercelRuntime ? <Analytics /> : null}
          {isVercelRuntime ? <SpeedInsights /> : null}
        </RootProvider>
      </body>
    </html>
  );
}
