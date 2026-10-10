import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CategoryStrip } from "@/components/category-strip";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildKeywords, collectionJsonLd, pageSocialMetadata, SITE_NAME, serializeJsonLd } from "@/lib/seo";
import { getCategories } from "@/lib/server-data";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse shayari by mood and theme — love, sad, motivational, life and more.",
  keywords: buildKeywords(["shayari categories", "shayari by mood", "shayari topics"]),
  alternates: { canonical: "/categories" },
  ...pageSocialMetadata({
    title: "Categories",
    description: "Browse shayari by mood and theme — love, sad, motivational, life and more.",
    path: "/categories",
  }),
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const jsonLd = collectionJsonLd({
    name: "Shayari Categories",
    description: "Browse the current shayari categories and explore poems by mood or theme.",
    path: "/categories",
    items: categories.map((category) => ({
      name: `${category.name} Shayari`,
      path: `/category/${category.slug}`,
      type: "CollectionPage" as const,
    })),
    breadcrumbs: [
      { name: SITE_NAME, path: "/" },
      { name: "Categories", path: "/categories" },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Breadcrumbs items={[{ name: SITE_NAME, path: "/" }, { name: "Categories", path: "/categories" }]} />
      <PageHero emoji="🎭" title="Browse by Mood" subtitle="Find the words that match exactly how you feel." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CategoryStrip initialCategories={categories} />
      </div>
    </>
  );
}
