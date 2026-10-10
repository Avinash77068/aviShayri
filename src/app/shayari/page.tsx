import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildKeywords, collectionJsonLd, pageSocialMetadata, SITE_NAME, serializeJsonLd } from "@/lib/seo";
import { getShayariList } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Latest Shayari",
  description:
    "Browse the latest shayari — love, sad, attitude, romantic and motivational verses in Hindi, Urdu and English.",
  keywords: buildKeywords(["all shayari", "latest shayari", "shayari collection"]),
  alternates: { canonical: "/shayari" },
  ...pageSocialMetadata({
    title: "Latest Shayari",
    description: "Browse the latest shayari — love, sad, attitude, romantic and motivational verses in Hindi, Urdu and English.",
    path: "/shayari",
  }),
};

export default async function ShayariIndexPage() {
  const { items, meta } = await getShayariList({}, 9);
  const jsonLd = collectionJsonLd({
    name: "Latest Shayari",
    description: "Browse the latest published shayari in Hindi, Urdu, and English.",
    path: "/shayari",
    items: items.map((item) => ({ name: item.title, path: `/shayari/${item.slug}` })),
    breadcrumbs: [
      { name: SITE_NAME, path: "/" },
      { name: "Shayari", path: "/shayari" },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Breadcrumbs items={[{ name: SITE_NAME, path: "/" }, { name: "Shayari", path: "/shayari" }]} />
      <PageHero emoji="📖" title="Latest Verses" subtitle="Fresh shayari across moods and languages." />
      <ShayariBrowseLayout>
        <ShayariList initialItems={items} initialMeta={meta} />
      </ShayariBrowseLayout>
    </>
  );
}
