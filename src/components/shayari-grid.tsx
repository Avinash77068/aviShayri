import { ShayariCard } from "./shayari-card";
import { ShayariCardSkeleton } from "./ui/skeleton";
import type { Shayari } from "@/lib/types";

export function ShayariGrid({
  items,
  loading,
  skeletonCount = 6,
}: {
  items?: Shayari[];
  loading?: boolean;
  skeletonCount?: number;
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 ">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ShayariCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-dashed border-[var(--border)] py-20 text-center">
        <span className="text-4xl">🕊️</span>
        <p className="mt-3 text-[var(--muted)]">No shayari found here yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 ">
      {items.map((s, i) => (
        <ShayariCard key={s._id} shayari={s} index={i} />
      ))}
    </div>
  );
}
