import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";

export const metadata: Metadata = {
  title: "Trending Shayari",
  description: "The most loved shayari and verses trending right now.",
};

export default function TrendingPage() {
  return (
    <>
      <PageHero emoji="🔥" title="Trending Now" subtitle="The verses everyone is reading, loving and sharing this week." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <ShayariList params={{ trending: "true", sort: "-popularityScore" }} />
      </div>
    </>
  );
}
