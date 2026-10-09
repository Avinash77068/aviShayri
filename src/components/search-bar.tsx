"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Loader2, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { shayariQueries } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function SearchBar({
  className,
  prominent = false,
  initialQuery = "",
}: {
  className?: string;
  prominent?: boolean;
  initialQuery?: string;
}) {
  const router = useRouter();
  const suggestionsId = useId();
  const [q, setQ] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const { data, isFetching } = useQuery({
    ...shayariQueries.search(debounced),
    enabled: debounced.length >= 2,
  });

  const suggestions = data?.items?.slice(0, 6) ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className={cn("relative w-full", className)}>
      <form onSubmit={submit} role="search" className="relative">
        <Search className={cn("pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]", prominent ? "h-5 w-5" : "h-4 w-4")} />
        <input
          type="search"
          autoComplete="off"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          aria-label="Search shayari, poets, and moods"
          aria-expanded={open && debounced.length >= 2}
          aria-controls={suggestionsId}
          placeholder={prominent ? "Search by mood or poet…" : "Search shayari, poets, moods…"}
          className={cn(
            "w-full border border-[var(--border)] bg-[var(--surface)] text-sm placeholder:text-[var(--muted)] shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
            prominent ? "h-14 rounded-2xl pl-12 pr-24 text-base shadow-[0_10px_30px_-18px_rgba(40,25,60,0.5)]" : "h-11 rounded-full pl-11 pr-10",
          )}
        />
        {prominent && (
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 inline-flex h-11 -translate-y-1/2 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white [background-image:var(--grad-1)] transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Search <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
        {!prominent && isFetching && debounced.length >= 2 && (
          <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[var(--muted)]" />
        )}
      </form>

      {open && debounced.length >= 2 && (
        <div id={suggestionsId} className="glass absolute z-50 mt-2 w-full overflow-hidden rounded-2xl p-2 shadow-xl">
          {suggestions.length > 0 ? (
            <>
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Suggested verses</p>
              {suggestions.map((s) => (
                <Link
                  key={s._id}
                  href={`/shayari/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--surface-2)]"
                >
                  <span className="block truncate text-sm font-semibold">{s.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">{s.excerpt || s.content}</span>
                </Link>
              ))}
            </>
          ) : isFetching ? (
            <p className="px-3 py-4 text-sm text-[var(--muted)]">Finding verses…</p>
          ) : (
            <p className="px-3 py-4 text-sm text-[var(--muted)]">No quick matches. Search the full collection below.</p>
          )}
          <Link
            href={`/search?q=${encodeURIComponent(debounced)}`}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl border-t border-[var(--border)] px-3 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--surface-2)]"
          >
            Search all results for “{debounced}” <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
