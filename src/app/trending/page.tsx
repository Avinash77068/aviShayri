import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildKeywords, collectionJsonLd, pageSocialMetadata, SITE_NAME, serializeJsonLd } from "@/lib/seo";
import { getShayariList } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Trending Shayari",
  description: "The most loved shayari and verses trending right now — the lines everyone is reading and sharing.",
  keywords: buildKeywords(["trending shayari", "popular shayari", "viral shayari"]),
  alternates: { canonical: "/trending" },
  ...pageSocialMetadata({
    title: "Trending Shayari",
    description: "The most loved shayari and verses trending right now — the lines everyone is reading and sharing.",
    path: "/trending",
  }),
};

export default async function TrendingPage() {
  const { items, meta } = await getShayariList({ trending: "true", sort: "-popularityScore" }, 9);
  const jsonLd = collectionJsonLd({
    name: "Trending Shayari",
    description: "Browse shayari currently selected as trending on Shayari.",
    path: "/trending",
    items: items.map((item) => ({ name: item.title, path: `/shayari/${item.slug}` })),
    breadcrumbs: [
      { name: SITE_NAME, path: "/" },
      { name: "Trending Shayari", path: "/trending" },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Breadcrumbs items={[{ name: SITE_NAME, path: "/" }, { name: "Trending Shayari", path: "/trending" }]} />
      <PageHero emoji="🔥" title="Trending Now" subtitle="The verses everyone is reading, loving and sharing this week." />
      <ShayariBrowseLayout>
        <ShayariList params={{ trending: "true", sort: "-popularityScore" }} initialItems={items} initialMeta={meta} />
      </ShayariBrowseLayout>
    </>
  );
}
