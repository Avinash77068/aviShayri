"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderTree, Users, MessageSquare, PenLine, Home, Lock } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shayari", label: "Shayari", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Skeleton className="h-96 w-full rounded-[var(--radius)]" />
      </div>
    );
  }

  const isStaff = user && (user.role === "admin" || user.role === "editor");
  if (!isStaff) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl [background-image:var(--grad-soft)]">
          <Lock className="h-7 w-7 text-[var(--primary)]" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Admin area</h1>
        <p className="mt-3 text-[var(--muted)]">You need editor or admin access to view this.</p>
        <Link href={user ? "/" : "/login"} className="mt-8">
          <Button size="lg">{user ? "Back home" : "Sign in"}</Button>
        </Link>
      </div>
    );
  }

  const items = NAV.filter((n) => !n.adminOnly || user.role === "admin");

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-20 md:self-start">
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="mb-2 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Admin</p>
            <p className="mt-1 truncate text-sm font-medium">{user.name}</p>
          </div>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-white [background-image:var(--grad-1)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-1 hidden h-px bg-[var(--border)] md:block" />
            <Link
              href="/write"
              className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)]"
            >
              <PenLine className="h-4 w-4" /> Write
            </Link>
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)]"
            >
              <Home className="h-4 w-4" /> View site
            </Link>
          </nav>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
