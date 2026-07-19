"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  TrendingUp,
  Grid3x3,
  PenLine,
  User as UserIcon,
  LogIn,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/categories", label: "Categories", icon: Grid3x3 },
];

export function MobileBottomBar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] glass pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-2">
        {TABS.slice(0, 2).map((tab) => (
          <Tab key={tab.href} {...tab} active={isActive(tab.href)} />
        ))}

        {/* Center Write button */}
        <Link
          href={user ? "/write" : "/login"}
          aria-label="Write Shayari"
          className="-mt-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full [background-image:var(--grad-1)] text-white shadow-lg ring-4 ring-[var(--background)]"
        >
          <PenLine className="h-6 w-6" />
        </Link>

        {TABS.slice(2).map((tab) => (
          <Tab key={tab.href} {...tab} active={isActive(tab.href)} />
        ))}

        {user ? (
          <Tab href="/profile" label="Profile" icon={UserIcon} active={isActive("/profile")} />
        ) : (
          <Tab href="/login" label="Sign in" icon={LogIn} active={isActive("/login")} />
        )}
      </div>
    </nav>
  );
}

function Tab({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
        active
          ? "text-[var(--primary)]"
          : "text-[var(--muted)] hover:text-[var(--foreground)]",
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
