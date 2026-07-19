"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { shayariQueries } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
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
      <form onSubmit={submit} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search shayari, poets, moods…"
          className="h-11 w-full rounded-full border border-[var(--border)] bg-[var(--surface)] pl-11 pr-10 text-sm placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />
        {isFetching && debounced.length >= 2 && (
          <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[var(--muted)]" />
        )}
      </form>

      {open && debounced.length >= 2 && suggestions.length > 0 && (
        <div className="glass absolute z-50 mt-2 w-full overflow-hidden rounded-2xl p-2 shadow-xl">
          {suggestions.map((s) => (
            <Link
              key={s._id}
              href={`/shayari/${s.slug}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[var(--surface-2)]"
            >
              <span className="font-medium">{s.title}</span>
              <span className="ml-2 text-[var(--muted)]">{s.category?.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
