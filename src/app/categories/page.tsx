import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CategoryStrip } from "@/components/category-strip";
import { buildKeywords } from "@/lib/seo";
import { getCategories } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse shayari by mood and theme — love, sad, motivational, life and more.",
  keywords: buildKeywords(["shayari categories", "shayari by mood", "shayari topics"]),
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <PageHero emoji="🎭" title="Browse by Mood" subtitle="Find the words that match exactly how you feel." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CategoryStrip initialCategories={categories} />
      </div>
    </>
  );
}
