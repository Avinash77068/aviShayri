"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api, unwrap } from "@/lib/api";
import { useCurrentUser } from "@/hooks/use-auth";
import { ShayariGrid } from "@/components/shayari-grid";
import { Button } from "@/components/ui/button";
import type { Shayari } from "@/lib/types";

export function BookmarksView() {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["me", "bookmarks"],
    enabled: Boolean(user),
    queryFn: async (): Promise<Shayari[]> => {
      try {
        return (await unwrap<Shayari[]>(api.get("/users/me/bookmarks", { params: { limit: 60 } }))).data ?? [];
      } catch {
        return [];
      }
    },
  });

  if (!userLoading && !user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="text-4xl">🔖</span>
        <h1 className="mt-6 text-2xl font-bold">Save what moves you</h1>
        <p className="mt-3 text-[var(--muted)]">Sign in to bookmark verses and find them here anytime.</p>
        <Link href="/login" className="mt-8">
          <Button size="lg">Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Your Bookmarks</h1>
      <p className="mt-2 text-[var(--muted)]">Verses you&apos;ve saved to revisit.</p>
      <div className="mt-8">
        <ShayariGrid items={data} loading={userLoading || isLoading} skeletonCount={6} />
      </div>
    </div>
  );
}
