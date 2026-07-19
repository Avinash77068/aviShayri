import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
        >
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
