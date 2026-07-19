import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CategoryStrip } from "@/components/category-strip";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse shayari by mood and theme — love, sad, motivational, life and more.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero emoji="🎭" title="Browse by Mood" subtitle="Find the words that match exactly how you feel." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CategoryStrip />
      </div>
    </>
  );
}
