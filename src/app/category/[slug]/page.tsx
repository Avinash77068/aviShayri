import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShayariList } from "@/components/shayari-list";
import { sampleCategories } from "@/lib/sample-data";

type Params = Promise<{ slug: string }>;

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const name = titleCase(slug);
  return {
    title: `${name} Shayari`,
    description: `Read the best ${name.toLowerCase()} shayari, poetry and verses.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cat = sampleCategories.find((c) => c.slug === slug);
  const name = cat?.name ?? titleCase(slug);

  return (
    <>
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
