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
