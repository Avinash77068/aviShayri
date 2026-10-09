"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Grid3x3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/lib/queries";
import { formatCount, cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySidebar({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const { data: categories = [], isLoading } = useQuery(categoryQueries.all());

  return (
    <aside
      aria-label="Browse shayari"
      className={cn("sticky hidden sm:block top-[6.5rem] z-20 mb-5 min-w-0", home ? "xl:mb-0" : "lg:mb-0")}
    >
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-sm backdrop-blur-xl lg:p-4">
        {home && (
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] xl:hidden">
            Browse moods
          </div>
        )}
        <div className={cn("mb-3 hidden items-center gap-2 px-2", home ? "xl:flex" : "lg:flex")}>
          <Grid3x3 className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
          <h2 className="text-sm font-semibold">Browse moods</h2>
        </div>

        <nav
          aria-label="Shayari categories"
          className={cn(
            "flex min-w-0 gap-2 overflow-x-auto pb-1",
            home
              ? "xl:max-h-[calc(100dvh-11rem)] xl:flex-col xl:overflow-x-hidden xl:overflow-y-auto xl:pb-0"
              : "lg:max-h-[calc(100dvh-11rem)] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0",
          )}
        >
          <SidebarLink href="/shayari" active={pathname === "/shayari"} home={home}>
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            All verses
          </SidebarLink>
          <SidebarLink href="/categories" active={pathname === "/categories"} home={home}>
            <Grid3x3 className="h-4 w-4 shrink-0" aria-hidden="true" />
            All moods
          </SidebarLink>

          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className={cn("h-10 w-32 shrink-0 rounded-xl", home ? "xl:w-full" : "lg:w-full")} />
              ))
            : categories.map((category) => (
                <SidebarLink
                  key={category._id}
                  href={`/category/${category.slug}`}
                  active={pathname === `/category/${category.slug}`}
                  count={category.shayariCount}
                  home={home}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-base" aria-hidden="true">
                    {category.icon || "✦"}
                  </span>
                  <span className="truncate">{category.name}</span>
                </SidebarLink>
              ))}
        </nav>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  active,
  count,
  home = false,
  children,
}: {
  href: string;
  active: boolean;
  count?: number;
  home?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        home ? "xl:w-full" : "lg:w-full",
        active
          ? "bg-[var(--surface-2)] text-[var(--primary)]"
          : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn("ml-auto hidden text-xs text-[var(--muted)]", home ? "xl:block" : "lg:block")}>
          {formatCount(count)}
        </span>
      )}
    </Link>
  );
}
