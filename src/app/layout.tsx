import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { PromoStrip } from "@/components/promo-strip";
import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { SiteFooter } from "@/components/site-footer";
import {
  SITE_NAME,
  SITE_URL,
  canonical,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SITE_KEYWORDS,
  serializeJsonLd,
} from "@/lib/seo";
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

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "poetry",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: canonical("/"),
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} — Hindi, Urdu and English shayari` }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b14" },
  ],
};

// Site-wide structured data identifies the website and its publisher.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: canonical("/"),
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: ["hi", "ur", "en"],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: canonical("/"),
      description: DEFAULT_DESCRIPTION,
    },
  ],
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
        <link rel="describedby" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />
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
          <a
            href="#main-content"
            className="sr-only left-4 top-4 z-[100] rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-[var(--background)] focus:not-sr-only focus:fixed"
          >
            Skip to content
          </a>
          <div className="aurora" aria-hidden />
          <SiteHeader />
          <PromoStrip />
          <main id="main-content" tabIndex={-1} className="flex-1 pb-24 outline-none lg:pb-0">{children}</main>
          <SiteFooter />
          <MobileBottomBar />
        </Providers>
      </body>
    </html>
  );
}
