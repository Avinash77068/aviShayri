"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { api, unwrap } from "@/lib/api";
import { ShayariGrid } from "./shayari-grid";
import { Button } from "./ui/button";
import type { Shayari } from "@/lib/types";
import { sampleShayari } from "@/lib/sample-data";

interface Props {
  params?: Record<string, string>;
  emptyLabel?: string;
}

const PAGE_SIZE = 9;

export function ShayariList({ params = {} }: Props) {
  const sentinel = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["shayari", "infinite", params],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      try {
        const { data: items, meta } = await unwrap<Shayari[]>(
          api.get("/shayari", { params: { ...params, page: pageParam, limit: PAGE_SIZE } })
        );
        return { items, nextPage: meta?.hasNextPage ? (pageParam as number) + 1 : undefined };
      } catch {
        // Fallback to local sample data (single page).
        let items = [...sampleShayari];
        if (params.category) items = items.filter((s) => s.category?.slug === params.category);
        if (params.trending === "true") items = items.filter((s) => s.trending);
        return { items, nextPage: undefined };
      }
    },
    getNextPageParam: (last) => last.nextPage,
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  useEffect(() => {
    if (!sentinel.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "400px" }
    );
    obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <ShayariGrid items={items} loading={isLoading} skeletonCount={PAGE_SIZE} />
      <div ref={sentinel} className="h-1" />
      {isFetchingNextPage && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted)]" />
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
