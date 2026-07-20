import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { sampleCategories } from "@/lib/sample-data";
import { API_BASE } from "@/lib/api";
import { SITE_NAME, SITE_URL, buildKeywords } from "@/lib/seo";
import type { Category } from "@/lib/types";

type Params = Promise<{ slug: string }>;

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Resolve a category from the API, falling back to bundled sample data. */
async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/categories/all`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = await res.json();
      const list: Category[] = json.data ?? [];
      const found = list.find((c) => c.slug === slug);
      if (found) return found;
    }
  } catch {
    /* fall through to sample data */
  }
  return sampleCategories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  const name = cat?.name ?? titleCase(slug);
  const description =
    cat?.description ||
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
    },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cat = await getCategory(slug);
  const name = cat?.name ?? titleCase(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${name} Shayari`,
    description: cat?.description || `The best ${name.toLowerCase()} shayari collection.`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        emoji={cat?.icon ?? "🏷️"}
        title={`${name} Shayari`}
        subtitle={cat?.description ?? `Verses that capture the feeling of ${name.toLowerCase()}.`}
      />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <ShayariList params={{ category: slug }} />
      </div>
    </>
  );
}
