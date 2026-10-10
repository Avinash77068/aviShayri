import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildKeywords, collectionJsonLd, pageSocialMetadata, serializeJsonLd, SITE_NAME } from "@/lib/seo";
import { getCategoryBySlug, getShayariList } from "@/lib/server-data";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

function categoryDescription(name: string, description?: string) {
  return description || `Read ${name.toLowerCase()} shayari and poems in Hindi, Urdu, and English.`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category not found", robots: { index: false, follow: true } };
  const name = cat.name;
  const description = categoryDescription(name, cat.description);

  return {
    title: `${name} Shayari`,
    description,
    keywords: buildKeywords([
      `${name.toLowerCase()} shayari`,
      `${name.toLowerCase()} shayari in hindi`,
      `${name.toLowerCase()} poetry`,
      `2 line ${name.toLowerCase()} shayari`,
    ]),
    alternates: { canonical: `/category/${slug}` },
    ...pageSocialMetadata({ title: `${name} Shayari`, description, path: `/category/${slug}` }),
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [cat, list] = await Promise.all([getCategoryBySlug(slug), getShayariList({ category: slug }, 9)]);
  if (!cat) notFound();
  const name = cat.name;

  const description = categoryDescription(name, cat.description);
  const jsonLd = collectionJsonLd({
    name: `${name} Shayari`,
    description,
    path: `/category/${slug}`,
    items: list.items.map((item) => ({ name: item.title, path: `/shayari/${item.slug}` })),
    breadcrumbs: [
      { name: SITE_NAME, path: "/" },
      { name: "Categories", path: "/categories" },
      { name: `${name} Shayari`, path: `/category/${slug}` },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Breadcrumbs items={[
        { name: SITE_NAME, path: "/" },
        { name: "Categories", path: "/categories" },
        { name: `${name} Shayari`, path: `/category/${slug}` },
      ]} />
      <PageHero
        emoji={cat.icon ?? "🏷️"}
        title={`${name} Shayari`}
        subtitle={description}
      />
      <ShayariBrowseLayout>
        <ShayariList params={{ category: slug }} initialItems={list.items} initialMeta={list.meta} />
      </ShayariBrowseLayout>
    </>
  );
}
