"use client";

import Link from "next/link";
import { Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { QuerySection } from "@/components/query-section";
import { CategoryStrip } from "@/components/category-strip";
import { TodaysShayari } from "@/components/todays-shayari";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}

      <section className="relative py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-[var(--muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            Thousands of verses across languages
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            Where words find
            <br />
            their <span className="text-gradient">rhythm</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted)]">
            A curated home for shayari, poetry and verses that speak the
            language of the heart. Read, feel, bookmark and share what moves
            you.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/trending">
              <Button size="lg" className="gap-2">
                <TrendingUp className="h-4 w-4" /> Explore Trending
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="gap-2">
                Browse Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Today's pick */}
      <section className="py-8">
        <TodaysShayari />
      </section>

      {/* Categories */}
      <section className="py-12">
        <SectionHeading
          eyebrow="Browse by mood"
          title="Categories"
          href="/categories"
        />
        <CategoryStrip />
      </section>

      {/* Trending */}
      <section className="py-12">
        <SectionHeading
          eyebrow="Most loved right now"
          title="Trending Shayari"
          href="/trending"
        />
        <QuerySection kind="trending" limit={6} />
      </section>

      {/* Featured */}
      <section className="py-12">
        <SectionHeading
          eyebrow="Handpicked"
          title="Editor's Picks"
          href="/shayari"
        />
        <QuerySection kind="featured" limit={3} />
      </section>

      {/* Latest */}
      <section className="py-12">
        <SectionHeading
          eyebrow="Fresh off the press"
          title="Latest Verses"
          href="/shayari"
        />
        <QuerySection kind="latest" limit={6} />
      </section>
    </div>
  );
}
