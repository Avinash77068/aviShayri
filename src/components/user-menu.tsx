"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User as UserIcon, Bookmark, LayoutDashboard, LogOut, ChevronDown, PenLine } from "lucide-react";
import { useLogout } from "@/hooks/use-auth";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

export function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  const isStaff = user.role === "admin" || user.role === "editor";
  const items = [
    { href: "/profile", label: "Profile", icon: UserIcon },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/write", label: "Write shayari", icon: PenLine },
    ...(isStaff ? [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }] : []),
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] py-1 pl-1 pr-2.5 transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
      >
        {user.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white [background-image:var(--grad-1)]">
            {initial}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">{user.name?.split(" ")[0]}</span>
        <ChevronDown className={cn("h-4 w-4 text-[var(--muted)] transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-3 py-2.5">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-[var(--muted)]">{user.email}</p>
          </div>
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[var(--surface-2)]"
              >
                <item.icon className="h-4 w-4 text-[var(--muted)]" />
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
