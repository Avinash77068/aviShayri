import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SearchResults } from "@/components/search-results";
import { SearchBar } from "@/components/search-bar";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";

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
      <div className="mx-auto -mt-2 max-w-3xl px-4 pb-8">
        <SearchBar prominent initialQuery={q.trim()} />
        <p className="mt-3 text-center text-xs text-[var(--muted)]">Search by a feeling, a phrase, or a poet&apos;s name.</p>
      </div>
      <ShayariBrowseLayout>
        <SearchResults q={q.trim()} />
      </ShayariBrowseLayout>
    </>
  );
}
