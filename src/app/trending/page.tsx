import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { buildKeywords } from "@/lib/seo";
import { getShayariList } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Trending Shayari",
  description: "The most loved shayari and verses trending right now — the lines everyone is reading and sharing.",
  keywords: buildKeywords(["trending shayari", "popular shayari", "viral shayari"]),
  alternates: { canonical: "/trending" },
};

export default async function TrendingPage() {
  const { items, meta } = await getShayariList({ trending: "true", sort: "-popularityScore" }, 9);
  return (
    <>
      <PageHero emoji="🔥" title="Trending Now" subtitle="The verses everyone is reading, loving and sharing this week." />
      <ShayariBrowseLayout>
        <ShayariList params={{ trending: "true", sort: "-popularityScore" }} initialItems={items} initialMeta={meta} />
      </ShayariBrowseLayout>
    </>
  );
}
