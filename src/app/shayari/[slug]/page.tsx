import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShayariDetail } from "@/components/shayari-detail";
import { breadcrumbJsonLd, buildKeywords, canonical, SITE_NAME, serializeJsonLd } from "@/lib/seo";
import { getShayariDetail } from "@/lib/server-data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getShayariDetail(slug);
  const s = data?.shayari;
  if (!s) return { title: "Shayari not found", robots: { index: false, follow: true } };

  const description = s.seoDescription || s.excerpt || s.content.slice(0, 160);
  const image = s.featuredImage || "/opengraph-image";
  const author = s.author?.name || s.createdBy?.name;
  const tagNames = Array.from(new Set([
    ...(s.seoKeywords ?? []),
    ...(s.tags?.map((tag) => tag.name) ?? []),
    ...(s.category?.name ? [s.category.name] : []),
  ]));
  const categoryKeyword = s.category?.name ? `${s.category.name.toLowerCase()} shayari` : undefined;

  return {
    title: s.seoTitle || s.title,
    description,
    keywords: buildKeywords([...tagNames, ...(categoryKeyword ? [categoryKeyword] : [])]),
    alternates: { canonical: `/shayari/${s.slug}` },
    openGraph: {
      type: "article",
      title: s.title,
      description,
      url: canonical(`/shayari/${s.slug}`),
      siteName: SITE_NAME,
      locale: "en_IN",
      publishedTime: s.publishedAt || s.createdAt,
      section: s.category?.name,
      tags: tagNames,
      authors: author ? [author] : undefined,
      images: [{ url: image, alt: s.title }],
    },
    twitter: { card: "summary_large_image", title: s.title, description, images: [image] },
  };
}

export default async function ShayariDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getShayariDetail(slug);
  if (!data) notFound();
  const s = data.shayari;
  const workUrl = canonical(`/shayari/${s.slug}`);
  const authorName = s.author?.name || s.createdBy?.name;
  const tagNames = Array.from(new Set([
    ...(s.seoKeywords ?? []),
    ...(s.tags?.map((tag) => tag.name) ?? []),
    ...(s.category?.name ? [s.category.name] : []),
  ]));
  const breadcrumbs = [
    { name: SITE_NAME, path: "/" },
    { name: "Shayari", path: "/shayari" },
    ...(s.category ? [{ name: s.category.name, path: `/category/${s.category.slug}` }] : []),
    { name: s.title, path: `/shayari/${s.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${workUrl}#work`,
        url: workUrl,
        name: s.title,
        headline: s.title,
        text: s.content,
        description: s.seoDescription || s.excerpt || undefined,
        inLanguage: s.language?.code || undefined,
        author: authorName ? { "@type": "Person", name: authorName } : undefined,
        genre: s.category?.name,
        keywords: tagNames.join(", ") || undefined,
        datePublished: s.publishedAt || s.createdAt,
        image: s.featuredImage || undefined,
        isPartOf: { "@id": `${canonical("/")}#website` },
        publisher: { "@id": `${canonical("/")}#organization` },
        mainEntityOfPage: { "@id": workUrl },
        interactionStatistic: [
          { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: s.likes },
          { "@type": "InteractionCounter", interactionType: "https://schema.org/ViewAction", userInteractionCount: s.views },
        ],
      },
      breadcrumbJsonLd(breadcrumbs)!,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Breadcrumbs items={breadcrumbs} widthClass="max-w-3xl" />
      <ShayariDetail slug={slug} initialData={data} />
    </>
  );
}
