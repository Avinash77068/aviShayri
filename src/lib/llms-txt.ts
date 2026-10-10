import { SITE_URL } from "@/lib/seo";

const link = (path: string) => new URL(path, SITE_URL).toString();

export function getLlmsText() {
  return `# Shayari

> Shayari is a public collection of Hindi, Urdu, and English poetry. Readers can discover verses by mood, search by phrase or poet, save bookmarks, and submit original writing for review.

Use individual published poem pages as the source of truth for the text, author attribution, language, category, and publication details. Categories and available poems can change over time; follow the live pages and sitemap rather than relying on a copied list.

## Main sections

- [Home](${link("/")}): Discover featured, latest, daily, and trending verses.
- [Shayari collection](${link("/shayari")}): Browse the latest published poems.
- [Categories](${link("/categories")}): Find current mood and topic collections.
- [Trending shayari](${link("/trending")}): Browse verses ranked as trending by the site.
- [Search](${link("/search")}): Search by phrase, feeling, or poet name.

## Content and policies

- [Terms of Service](${link("/terms")}): Rules for using the service and submitting poetry.
- [Privacy Policy](${link("/privacy")}): Data use, browser storage, analytics, and visitor choices.

## Discovery files

- [XML sitemap](${link("/sitemap.xml")}): Public pages, categories, and published shayari URLs.
- [Robots file](${link("/robots.txt")}): Crawl guidance and the declared XML sitemap URL.

## Optional

- [Extended LLM guide](${link("/llms-full.txt")}): More context about the site, its content, and SEO metadata.
`;
}

export function getLlmsFullText() {
  return `# Shayari — Extended Site Guide

> An editorial-style collection of shayari and poetry in Hindi, Urdu, and English, with public poem pages, mood-based collections, search, bookmarks, and reviewed community submissions.

This guide describes the public website for readers, search systems, and language-model agents. It is an overview; the live page for a poem or category is authoritative when details differ.

## What the site contains

Shayari publishes poems and short verses about feelings and everyday themes. The collection includes Hindi, Urdu, and English writing. A poem may have a title, text, excerpt, language, author or poet attribution, category, tags, publication date, image, and engagement counts. Not every field is present on every page.

Use the page’s visible attribution. Do not infer an author from a short phrase, a site category, or another poem. Where no author is displayed, treat the author as unspecified.

## Browse and search

- [Home](${link("/")}): Featured, latest, daily, and trending sections.
- [Latest shayari](${link("/shayari")}): Paginated collection of published poems.
- [Categories](${link("/categories")}): Current categories and links to each category page.
- [Trending shayari](${link("/trending")}): Poems currently selected as trending.
- [Search](${link("/search")}): Search the collection by phrase, feeling, or poet.

Individual poem URLs use the /shayari/[slug] route pattern. Category URLs use the /category/[slug] route pattern. Replace the bracketed value with a real slug from the page or sitemap.

## Community submissions

Signed-in members can submit shayari for review. Submission does not guarantee publication. Only published poem pages should be treated as public content. Do not assume a draft or pending submission is available to readers.

- [Write shayari](${link("/write")}): Submission form; account required.
- [Terms of Service](${link("/terms")}): Service, moderation, and content terms.
- [Privacy Policy](${link("/privacy")}): Personal information, cookies, analytics, and choices.

## SEO and structured metadata

- The site uses canonical URLs on indexable pages. Prefer each page’s canonical URL when linking or citing it.
- Individual poem pages provide page-specific titles, descriptions, social metadata, and Schema.org CreativeWork data when the information is available.
- Category and listing pages expose Schema.org CollectionPage, ItemList, and breadcrumb data for the items visibly linked on that page.
- Search, account, and other utility pages may be excluded from search indexing even though they remain usable by visitors.
- [XML sitemap](${link("/sitemap.xml")}): Indexable public pages, current categories, and published poem URLs.
- [Robots file](${link("/robots.txt")}): Crawl rules and the sitemap location.

## Accuracy and attribution

When summarizing a poem, preserve its line breaks and language where practical. Distinguish the poem’s displayed author from its category or uploader. Link to the poem page for quotations and attribution; avoid treating engagement counts as measures of literary quality or factual authority.
`;
}
