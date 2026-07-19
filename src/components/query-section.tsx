"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import { ShayariGrid } from "./shayari-grid";
import { SectionHeading } from "./section-heading";
import { shayariQueries } from "@/lib/queries";
import type { Shayari } from "@/lib/types";

type Kind = "trending" | "latest" | "featured";

export function QuerySection({
  kind,
  limit = 6,
  eyebrow,
  title,
  href,
}: {
  kind: Kind;
  limit?: number;
  eyebrow?: string;
  title?: string;
  href?: string;
}) {
  const query: { queryKey: QueryKey; queryFn: () => Promise<Shayari[]> } =
    kind === "trending"
      ? shayariQueries.trending(limit)
      : kind === "featured"
        ? shayariQueries.featured(limit)
        : shayariQueries.latest(limit);

  const { data, isLoading } = useQuery(query);

  // Hide the whole section (heading included) when there's no data.
  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <section className="py-6">
      {title && <SectionHeading eyebrow={eyebrow} title={title} href={href} />}
      <ShayariGrid items={data} loading={isLoading} skeletonCount={limit} />
    </section>
  );
}
