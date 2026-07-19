import type { Metadata } from "next";
import { ShayariDetail } from "@/components/shayari-detail";
import { sampleShayari } from "@/lib/sample-data";
import { API_BASE } from "@/lib/api";
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
  if (!s) return { title: "Shayari not found" };
  const description = s.seoDescription || s.excerpt || s.content.slice(0, 160);
  return {
    title: s.seoTitle || s.title,
    description,
    openGraph: {
      type: "article",
      title: s.title,
      description,
      images: s.featuredImage ? [{ url: s.featuredImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: s.title, description },
    alternates: { canonical: `/shayari/${s.slug}` },
  };
}

export default async function ShayariDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const s = await getShayari(slug);

  const jsonLd = s
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: s.title,
        text: s.content,
        author: { "@type": "Person", name: s.author?.name ?? "Unknown" },
        genre: s.category?.name,
        datePublished: s.publishedAt || s.createdAt,
        interactionStatistic: [
          { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: s.likes },
          { "@type": "InteractionCounter", interactionType: "https://schema.org/ViewAction", userInteractionCount: s.views },
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
