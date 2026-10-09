import Link from "next/link";
import { ArrowRight, Feather } from "lucide-react";

const COLUMNS = [
  { title: "Explore", links: [["Home", "/"], ["Trending", "/trending"], ["Categories", "/categories"], ["Search", "/search"]] },
  { title: "Moods", links: [["Love", "/category/love"], ["Sad", "/category/sad"], ["Motivational", "/category/motivational"], ["Life", "/category/life"]] },
  { title: "Account", links: [["Sign in", "/login"], ["Register", "/register"], ["Bookmarks", "/bookmarks"], ["Profile", "/profile"]] },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl [background-image:var(--grad-1)]">
                <Feather className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-bold">
                Shayari<span className="text-gradient">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-[var(--muted)]">
              Where words find their rhythm. A home for the finest shayari, poetry and verses across languages.
            </p>
            <Link
              href="/categories"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
            >
              Browse the collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Shayari. Crafted with ♥ and verses.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)]">Terms</Link>
            <a href="/rss.xml" className="hover:text-[var(--foreground)]">RSS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
