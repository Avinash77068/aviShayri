import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search shayari, poets and moods across the collection.",
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ q?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "" } = await searchParams;
  return (
    <>
      <PageHero emoji="🔍" title="Search" subtitle="Find the verse that speaks to you." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <SearchResults q={q.trim()} />
      </div>
    </>
  );
}
