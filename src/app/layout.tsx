import Script from "next/script";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shayari — where words find their rhythm",
    template: "%s | Shayari",
  },
  description:
    "Discover the finest shayari, poetry and verses across languages — love, sad, motivational and more. Read, bookmark, and share what moves you.",
  keywords: [
    "shayari",
    "poetry",
    "urdu shayari",
    "hindi shayari",
    "love shayari",
    "sad shayari",
  ],
  openGraph: {
    type: "website",
    siteName: "Shayari",
    title: "Shayari — where words find their rhythm",
    description:
      "Discover the finest shayari, poetry and verses across languages.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shayari — where words find their rhythm",
    description:
      "Discover the finest shayari, poetry and verses across languages.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VR3HJE41CZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VR3HJE41CZ');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>
          <div className="aurora" aria-hidden />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
