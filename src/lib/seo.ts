import type { Metadata } from "next";

/**
 * Central SEO configuration. Keeping site-wide constants here keeps titles,
 * descriptions and keywords consistent across every route and structured-data
 * block, and gives us a single place to tune what search engines see.
 */

export const SITE_NAME = "Shayari";
export const SITE_TAGLINE = "where words find their rhythm";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const DEFAULT_DESCRIPTION =
  "Read the best shayari, poetry and 2 line verses in Hindi, Urdu and English — " +
  "love, sad, attitude, romantic, motivational and dosti shayari. " +
  "Discover, bookmark and share the words that move you.";

/** Shared search vocabulary in English, Roman Hindi and Devanagari. */
export const SITE_KEYWORDS = [
  "shayari",
  "hindi shayari",
  "shayari in hindi",
  "love shayari",
  "sad shayari",
  "attitude shayari",
  "2 line shayari",
  "romantic shayari",
  "urdu shayari",
  "motivational shayari",
  "friendship shayari",
  "dosti shayari",
  "zindagi shayari",
  "life shayari",
  "breakup shayari",
  "good morning shayari",
  "best shayari",
  "shayari collection",
  "hindi poetry",
  "poetry",
  "शायरी",
  "हिंदी शायरी",
  "प्यार शायरी",
];

/** Build a per-page keyword list: page-specific terms first, then the core set. */
export function buildKeywords(extra: string[] = []): string[] {
  return Array.from(new Set([...extra, ...SITE_KEYWORDS]));
}

/** Absolute canonical URL for a given path (path should start with "/"). */
export function canonical(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/** Per-route social previews that stay aligned with the canonical URL. */
export function pageSocialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = "/opengraph-image";
  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical(path),
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} | ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export interface StructuredLink {
  name: string;
  path: string;
  type?: "CreativeWork" | "CollectionPage";
}

export interface BreadcrumbLink {
  name: string;
  path: string;
}

/** Emit breadcrumb structured data only for real, multi-level trails. */
export function breadcrumbJsonLd(breadcrumbs: BreadcrumbLink[]) {
  if (breadcrumbs.length < 2) return undefined;

  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: canonical(crumb.path),
    })),
  };
}

/** Describe an index page and the items visibly linked from it. */
export function collectionJsonLd({
  name,
  description,
  path,
  items,
  breadcrumbs = [],
}: {
  name: string;
  description: string;
  path: string;
  items: StructuredLink[];
  breadcrumbs?: BreadcrumbLink[];
}) {
  const pageUrl = canonical(path);
  const breadcrumb = breadcrumbJsonLd(breadcrumbs);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: ["hi", "ur", "en"],
    isPartOf: { "@id": `${canonical("/")}#website` },
    publisher: { "@id": `${canonical("/")}#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => {
        const itemUrl = canonical(item.path);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": item.type ?? "CreativeWork",
            "@id": itemUrl,
            url: itemUrl,
            name: item.name,
          },
        };
      }),
    },
    ...(breadcrumb ? { breadcrumb } : {}),
  };
}

/** Escape script-closing characters before embedding JSON-LD in HTML. */
export function serializeJsonLd(value: unknown): string {
  return (JSON.stringify(value) ?? "null")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
