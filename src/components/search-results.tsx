"use client";

import { useQuery } from "@tanstack/react-query";
import { shayariQueries } from "@/lib/queries";
import { ShayariGrid } from "./shayari-grid";

export function SearchResults({ q }: { q: string }) {
  const { data, isLoading } = useQuery({ ...shayariQueries.search(q), enabled: q.length >= 1 });
  const items = data?.items ?? [];

  if (!q) {
    return <p className="py-16 text-center text-[var(--muted)]">Type something to search the collection.</p>;
  }

  return (
    <div>
      {!isLoading && (
        <p className="mb-6 text-sm text-[var(--muted)]">
          {items.length > 0 ? `${items.length} result${items.length > 1 ? "s" : ""} for` : "No results for"}{" "}
          <span className="font-semibold text-[var(--foreground)]">“{q}”</span>
        </p>
      )}
      <ShayariGrid items={items} loading={isLoading} skeletonCount={6} />
    </div>
  );
}
