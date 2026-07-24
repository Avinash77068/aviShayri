"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Feather,
  TrendingUp,
  Grid3x3,
  Sparkles,
  PenLine,
  Bookmark,
} from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";
import { useCurrentUser } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/categories", label: "Categories", icon: Grid3x3 },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const { data: user, isLoading: userLoading } = useCurrentUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl [background-image:var(--grad-1)] shadow-md">
            <Feather className="h-5 w-5 text-white" />
          </span>

          <span className="text-lg font-bold tracking-tight">
            Shayari<span className="text-gradient">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--surface-2)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Search */}
        <div className="ml-auto max-w-xs flex-1 md:ml-auto">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2">
          {user && (
            <Link href="/write" className="hidden sm:block">
              <Button size="sm" variant="outline" className="gap-1.5">
                <PenLine className="h-4 w-4" />
                Write
              </Button>
            </Link>
          )}

          {/* Favourites work signed-in or anonymous, so this is always shown. */}
          <Link
            href="/bookmarks"
            aria-label="Bookmarks"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-2)]",
              pathname === "/bookmarks" && "text-[var(--primary)]"
            )}
          >
            <Bookmark className="h-5 w-5" />
          </Link>

          <ThemeToggle />

          {userLoading ? (
            <span className="skeleton h-9 w-9 rounded-full" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button size="sm" variant="primary">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
