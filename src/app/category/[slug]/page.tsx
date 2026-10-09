import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { ShayariBrowseLayout } from "@/components/shayari-browse-layout";
import { SITE_NAME, SITE_URL, buildKeywords, serializeJsonLd } from "@/lib/seo";
import { getCategoryBySlug, getShayariList } from "@/lib/server-data";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category not found", robots: { index: false, follow: true } };
  const name = cat.name;
  const description =
    cat.description ||
    `Read the best ${name.toLowerCase()} shayari — heart-touching ${name.toLowerCase()} poetry and 2 line verses in Hindi, Urdu and English.`;

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
    openGraph: {
      type: "website",
      title: `${name} Shayari`,
      description,
      url: `${SITE_URL}/category/${slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${name} Shayari` }],
    },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [cat, list] = await Promise.all([getCategoryBySlug(slug), getShayariList({ category: slug }, 9)]);
  if (!cat) notFound();
  const name = cat.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} Shayari`,
    description: cat.description || `The best ${name.toLowerCase()} shayari collection.`,
    url: `${SITE_URL}/category/${slug}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/categories` },
        { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/category/${slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <PageHero
        emoji={cat.icon ?? "🏷️"}
        title={`${name} Shayari`}
        subtitle={cat.description ?? `Verses that capture the feeling of ${name.toLowerCase()}.`}
      />
      <ShayariBrowseLayout>
        <ShayariList params={{ category: slug }} initialItems={list.items} initialMeta={list.meta} />
      </ShayariBrowseLayout>
    </>
  );
}
