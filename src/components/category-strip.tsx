"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { categoryQueries } from "@/lib/queries";
import { formatCount } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryStrip() {
  const { data: categories, isLoading } = useQuery(categoryQueries.all());

  // Hide the whole section (heading included) when there are no categories.
  if (!isLoading && (!categories || categories.length === 0)) return null;

  return (
    <section className="py-6">
      <SectionHeading
        eyebrow="Start with a feeling"
        title="Find your mood"
        href="/categories"
      />
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {(categories ?? []).map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                href={`/category/${c.slug}`}
                aria-label={`Browse ${c.name} shayari, ${formatCount(c.shayariCount)} verses`}
                className="card-hover flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center sm:p-5"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: c.color ? `${c.color}22` : "var(--surface-2)" }}
                >
                  {c.icon}
                </span>
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-xs text-[var(--muted)]">{formatCount(c.shayariCount)} verses</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
