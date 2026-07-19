"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
    >
      {mounted ? (
        current === "dark" ? (
          <Sun className="h-5 w-5 text-[var(--gold)]" />
        ) : (
          <Moon className="h-5 w-5 text-[var(--primary)]" />
        )
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
