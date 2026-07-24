"use client";

import { useQuery } from "@tanstack/react-query";
import { api, unwrap } from "@/lib/api";
import { useCurrentUser } from "@/hooks/use-auth";
import { ShayariGrid } from "@/components/shayari-grid";
import type { Shayari } from "@/lib/types";

/**
 * Works signed-in or anonymous — a signed-out visitor's bookmarks are keyed
 * server-side by a long-lived cookie (see backend `identifyVisitor`), so
 * favourites persist across visits on the same browser without an account.
 */
export function BookmarksView() {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["bookmarks", user?._id ?? "anon"],
    enabled: !userLoading,
    queryFn: async (): Promise<Shayari[]> => {
      try {
        const endpoint = user ? "/users/me/bookmarks" : "/shayari/bookmarks/mine";
        return (await unwrap<Shayari[]>(api.get(endpoint, { params: { limit: 60 } }))).data ?? [];
      } catch {
        return [];
      }
    },
  });

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
