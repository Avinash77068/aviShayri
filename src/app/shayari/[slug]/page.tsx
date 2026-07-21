import type { Metadata } from "next";
import { ShayariDetail } from "@/components/shayari-detail";
import { sampleShayari } from "@/lib/sample-data";
import { API_BASE } from "@/lib/api";
import { SITE_NAME, SITE_URL, buildKeywords } from "@/lib/seo";
import type { Shayari } from "@/lib/types";

type Params = Promise<{ slug: string }>;

/** Fetch on the server for SEO; fall back to sample data if the API is down. */
async function getShayari(slug: string): Promise<Shayari | null> {
  try {
    const res = await fetch(`${API_BASE}/shayari/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("not ok");
    const json = await res.json();
    return json.data?.shayari ?? null;
  } catch {
    return sampleShayari.find((s) => s.slug === slug) ?? null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = await getShayari(slug);
  if (!s) return { title: "Shayari not found", robots: { index: false, follow: true } };

  const description = s.seoDescription || s.excerpt || s.content.slice(0, 160);
  const author = s.author?.name || s.createdBy?.name;
  const tagNames = s.tags?.map((t) => t.name) ?? [];
  const categoryKeyword = s.category?.name ? `${s.category.name.toLowerCase()} shayari` : undefined;

  return {
    title: s.seoTitle || s.title,
    description,
    keywords: buildKeywords(
      [...(s.seoKeywords ?? []), categoryKeyword, ...tagNames].filter(Boolean) as string[]
    ),
    alternates: { canonical: `/shayari/${s.slug}` },
    openGraph: {
      type: "article",
      title: s.title,
      description,
      url: `${SITE_URL}/shayari/${s.slug}`,
      publishedTime: s.publishedAt || s.createdAt,
      section: s.category?.name,
      tags: tagNames,
      authors: author ? [author] : undefined,
      images: s.featuredImage ? [{ url: s.featuredImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: s.title, description },
  };
}

export default async function ShayariDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const s = await getShayari(slug);

  const jsonLd = s
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            "@id": `${SITE_URL}/shayari/${s.slug}#work`,
            url: `${SITE_URL}/shayari/${s.slug}`,
            name: s.title,
            headline: s.title,
            text: s.content,
            inLanguage: s.language?.code ?? "hi",
            author: { "@type": "Person", name: s.author?.name || s.createdBy?.name || "Unknown" },
            genre: s.category?.name,
            keywords: (s.seoKeywords ?? s.tags?.map((t) => t.name) ?? []).join(", ") || undefined,
            datePublished: s.publishedAt || s.createdAt,
            image: s.featuredImage || undefined,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            interactionStatistic: [
              { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: s.likes },
              { "@type": "InteractionCounter", interactionType: "https://schema.org/ViewAction", userInteractionCount: s.views },
            ],
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Shayari", item: `${SITE_URL}/shayari` },
              ...(s.category
                ? [{ "@type": "ListItem", position: 3, name: s.category.name, item: `${SITE_URL}/category/${s.category.slug}` }]
                : []),
              {
                "@type": "ListItem",
                position: s.category ? 4 : 3,
                name: s.title,
                item: `${SITE_URL}/shayari/${s.slug}`,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ShayariDetail slug={slug} />
    </>
  );
}
