"use client";

import { useQuery, type QueryKey } from "@tanstack/react-query";
import { ShayariGrid } from "./shayari-grid";
import { shayariQueries } from "@/lib/queries";
import type { Shayari } from "@/lib/types";

type Kind = "trending" | "latest" | "featured";

export function QuerySection({ kind, limit = 6 }: { kind: Kind; limit?: number }) {
  const query: { queryKey: QueryKey; queryFn: () => Promise<Shayari[]> } =
    kind === "trending"
      ? shayariQueries.trending(limit)
      : kind === "featured"
        ? shayariQueries.featured(limit)
        : shayariQueries.latest(limit);

  const { data, isLoading } = useQuery(query);
  return <ShayariGrid items={data} loading={isLoading} skeletonCount={limit} />;
}
