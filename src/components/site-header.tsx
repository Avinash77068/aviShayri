"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Feather,
  Menu,
  X,
  TrendingUp,
  Grid3x3,
  Sparkles,
  PenLine,
} from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { UserMenu } from "./user-menu";
import { useCurrentUser } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/categories", label: "Categories", icon: Grid3x3 },
];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user, isLoading: userLoading } = useCurrentUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
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
          <div className="ml-auto hidden max-w-xs flex-1 md:block">
            <SearchBar />
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {user && (
              <Link href="/write" className="hidden sm:block">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <PenLine className="h-4 w-4" />
                  Write
                </Button>
              </Link>
            )}

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

            {/* Mobile Write Button */}
            {user && (
              <Link
                href="/write"
                aria-label="Write Shayari"
                className="flex h-10 w-10 items-center justify-center rounded-full [background-image:var(--grad-1)] text-white shadow-md md:hidden"
              >
                <PenLine className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================= */}
      {/* Mobile Drawer */}
      {/* ========================= */}

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[70%] px-2  border-r border-[var(--border)] bg-[var(--background)] shadow-2xl transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl [background-image:var(--grad-1)]">
              <Feather className="h-5 w-5 text-white" />
            </span>

            <span className="font-bold">Menu</span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--surface-2)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <SearchBar className="mb-5" />

          <nav className="space-y-2">
            {NAV.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                    active
                      ? "bg-[var(--surface-2)] text-[var(--foreground)]"
                      : "hover:bg-[var(--surface-2)]",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {user ? (
            <>
              <Link href="/write" className="mt-5 block">
                <Button className="w-full">
                  <PenLine className="mr-2 h-4 w-4" />
                  Write Shayari
                </Button>
              </Link>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-[var(--border)] p-3" onClick={() => router.push("/profile")}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-white [background-image:var(--grad-1)]">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>

                <div className="min-w-0">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {user.email}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className="mt-5 block">
              <Button className="w-full">Sign in</Button>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
