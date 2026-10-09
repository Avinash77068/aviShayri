import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoStrip() {
  return (
    <div className="sticky top-16 z-30 border-b border-[var(--border)] [background-image:var(--grad-1)] text-white">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <Sparkles className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
        <p className="whitespace-nowrap font-medium">
          <span className="sm:hidden">Earn 10 credits per shayari.</span>
          <span className="hidden sm:inline">Share your words and earn 10 credits for every published shayari.</span>
        </p>
        <Link
          href="/write"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-semibold transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="sm:hidden">Write</span>
          <span className="hidden sm:inline">Start writing</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
