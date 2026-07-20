import type { Metadata } from "next";
import { QuerySection } from "@/components/query-section";
import { CategoryStrip } from "@/components/category-strip";
import { TodaysShayari } from "@/components/todays-shayari";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      
      {/* Today's pick */}
      <section className="py-8">
        <TodaysShayari />
      </section>

      {/* Categories */}
      <CategoryStrip />

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
    </div>
  );
}
