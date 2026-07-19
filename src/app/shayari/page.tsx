import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";

export const metadata: Metadata = {
  title: "All Shayari",
  description: "Browse the complete collection of shayari, poetry and verses.",
};

export default function ShayariIndexPage() {
  return (
    <>
      <PageHero emoji="📖" title="All Verses" subtitle="Explore the complete collection — every mood, every language." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <ShayariList />
      </div>
    </>
  );
}
