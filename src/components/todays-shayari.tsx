"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { shayariQueries } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function TodaysShayari() {
  const { data, isLoading } = useQuery(shayariQueries.todays());

  if (isLoading) {
    return <Skeleton className="h-56 w-full rounded-[var(--radius)]" />;
  }
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass relative overflow-hidden rounded-[calc(var(--radius)+0.5rem)] p-8 sm:p-12"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 opacity-10">
        <Quote className="h-48 w-48" />
      </div>
      <Badge variant="solid" className="mb-5">
        ✨ Today&apos;s Shayari
      </Badge>
      <blockquote className="shayari-body max-w-2xl text-xl font-medium sm:text-2xl">{data.content}</blockquote>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
        <span className="font-semibold text-[var(--foreground)]">— {data.author?.name ?? "Unknown"}</span>
        {data.category && <span>· {data.category.name}</span>}
        <Link
          href={`/shayari/${data.slug}`}
          className="group ml-auto flex items-center gap-1 font-medium text-[var(--primary)]"
        >
          Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
