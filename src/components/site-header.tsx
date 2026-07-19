"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Feather, Menu, X, TrendingUp, Grid3x3, Sparkles, PenLine } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const canWrite = user && (user.role === "admin" || user.role === "editor");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl [background-image:var(--grad-1)] shadow-md">
            <Feather className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Shayari<span className="text-gradient">.</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-[var(--surface-2)] text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {canWrite && (
            <Link href="/write" className="hidden sm:block">
              <Button size="sm" variant="outline" className="gap-1.5">
                <PenLine className="h-4 w-4" /> Write
              </Button>
            </Link>
          )}
          <ThemeToggle />
          {userLoading ? (
            <span className="h-9 w-9 rounded-full skeleton" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button size="sm" variant="primary">
                Sign in
              </Button>
            </Link>
          )}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass border-t border-[var(--border)] px-4 py-4 md:hidden">
          <SearchBar className="mb-4" />
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-[var(--surface-2)]"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            {!user && (
              <Link href="/login" className="mt-2">
                <Button className="w-full" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
            {user && (
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] px-3 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white [background-image:var(--grad-1)]">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-[var(--muted)]">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
