"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Quote, ArrowUpRight, Sparkles } from "lucide-react";
import { shayariQueries } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function TodaysShayari() {
  const { data, isLoading } = useQuery(shayariQueries.todays());

  if (isLoading) {
    return <Skeleton className="min-h-[390px] w-full rounded-[2rem] sm:min-h-[430px]" />;
  }
  if (!data) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative isolate flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_28px_80px_-40px_rgba(96,58,145,0.5)] sm:min-h-[430px] sm:p-9"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Badge variant="soft" className="gap-1.5 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Today&apos;s pick
        </Badge>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">A moment to read</span>
      </div>

      <Quote className="mt-9 h-8 w-8 text-[var(--primary)]/50" aria-hidden="true" />
      <blockquote className="shayari-body mt-4 max-w-xl flex-1 text-xl font-medium leading-[1.9] sm:text-2xl sm:leading-[1.9]">
        {data.content}
      </blockquote>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {data.author?.name || data.createdBy?.name || "From the community"}
          </p>
          {data.category && <p className="mt-1 text-xs text-[var(--muted)]">{data.category.name}</p>}
        </div>
        <Link
          href={`/shayari/${data.slug}`}
          className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--foreground)] px-4 text-sm font-semibold text-[var(--background)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          Read the verse <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
