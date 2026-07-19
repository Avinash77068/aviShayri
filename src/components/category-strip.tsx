"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { categoryQueries } from "@/lib/queries";
import { formatCount } from "@/lib/utils";

export function CategoryStrip() {
  const { data: categories } = useQuery(categoryQueries.all());

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
            className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
              style={{ background: `${c.color}22` }}
            >
              {c.icon}
            </span>
            <span className="text-sm font-semibold">{c.name}</span>
            <span className="text-xs text-[var(--muted)]">{formatCount(c.shayariCount)} verses</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
