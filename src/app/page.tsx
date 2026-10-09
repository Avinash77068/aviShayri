import type { Metadata } from "next";
import Link from "next/link";
import { QuerySection } from "@/components/query-section";
import { TodaysShayari } from "@/components/todays-shayari";
import { SearchBar } from "@/components/search-bar";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <ShayariBrowseLayout home>
      <section className="grid  gap-10 py-10 sm:pt-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 ">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full [background-image:var(--grad-1)]" />
            A verse for every feeling
          </span>
          <h1 className="max-w-[12ch] text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Find the words your <span className="font-[var(--font-serif)] font-medium italic text-gradient">heart</span> is looking for.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            Explore shayari for love, longing, friendship and all the feelings in between. Save the lines that feel like yours.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchBar className="max-w-none" prominent />
          </div>

          <Link
            href="/categories"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
          >
            Explore all moods <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="lg:pl-3">
          <TodaysShayari />
        </div>
      </section>

      {/* Trending */}
      <QuerySection
        kind="trending"
        limit={6}
        eyebrow="Most loved right now"
        title="Trending Shayari"
        href="/trending"
      />

      {/* Featured */}
      <QuerySection
        kind="featured"
        limit={3}
        eyebrow="Handpicked"
        title="Editor's Picks"
        href="/shayari"
      />

      {/* Latest */}
      <QuerySection
        kind="latest"
        limit={6}
        eyebrow="Fresh off the press"
        title="Latest Verses"
        href="/shayari"
      />
    </ShayariBrowseLayout>
  );
}
