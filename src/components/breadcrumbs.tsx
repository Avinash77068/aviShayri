import Link from "next/link";
import type { BreadcrumbLink } from "@/lib/seo";

export function Breadcrumbs({
  items,
  widthClass = "max-w-6xl",
}: {
  items: BreadcrumbLink[];
  widthClass?: string;
}) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={`mx-auto ${widthClass} px-4 pt-6 text-sm text-[var(--muted)]`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {current ? (
                <span aria-current="page" className="text-[var(--foreground)]">{item.name}</span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-[var(--foreground)]">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
