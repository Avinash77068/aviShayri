import { SITE_URL } from "@/lib/seo";

const link = (path: string) => new URL(path, SITE_URL).toString();

export function getLlmsText() {
  return `# Shayari

> A collection of Hindi, Urdu, and English shayari and poetry. Readers can explore verses by category, search the collection, save bookmarks, and share their own writing for review.

Published shayari pages are the source of truth for each poem and its attribution. Community submissions are reviewed before publication.

## Explore

- [Shayari collection](${link("/shayari")}): Browse published shayari.
- [Categories](${link("/categories")}): Explore poetry by mood and category.
- [Trending shayari](${link("/trending")}): See popular verses.
- [Search](${link("/search")}): Find shayari in the collection.

## Community and policies

- [Write shayari](${link("/write")}): Submit a verse for review (account required).
- [Terms of Service](${link("/terms")}): Rules for using the website and submitting content.
- [Privacy Policy](${link("/privacy")}): Information about data use, browser storage, and analytics.

## Site map

- [XML sitemap](${link("/sitemap.xml")}): Index of public pages and published shayari.
`;
}
