import type { MetadataRoute } from "next";
import { API_BASE } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";
import { sampleCategories } from "@/lib/sample-data";
import type { Shayari, Category } from "@/lib/types";

// Regenerate the sitemap at most once an hour rather than on every crawl.
export const revalidate = 3600;

const url = (path: string) => new URL(path, SITE_URL).toString();

// Backend caps page size at 100, so we page through the list until exhausted.
const PAGE_SIZE = 100;
const MAX_PAGES = 100; // safety cap: up to 10k shayari

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch {
    return null;
  }
}

/** Page through every published shayari, following the API's `hasNextPage` meta. */
async function fetchAllShayari(): Promise<Shayari[]> {
  const all: Shayari[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const res = await fetch(
        `${API_BASE}/shayari?status=published&limit=${PAGE_SIZE}&page=${page}`,
        { next: { revalidate } }
      );
      if (!res.ok) break;
      const json = await res.json();
      const batch: Shayari[] = json?.data ?? [];
      if (!batch.length) break;
      all.push(...batch);
      if (!json?.meta?.hasNextPage) break;
    } catch {
      break;
    }
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Public, indexable static routes.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: url("/shayari"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: url("/trending"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: url("/categories"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const [shayariList, categories] = await Promise.all([
    fetchAllShayari(),
    fetchJson<Category[]>("/categories/all"),
  ]);

  const cats = categories ?? sampleCategories;
  const categoryRoutes: MetadataRoute.Sitemap = cats.map((c) => ({
    url: url(`/category/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const shayariRoutes: MetadataRoute.Sitemap = (shayariList ?? [])
    .filter((s) => s?.slug)
    .map((s) => ({
      url: url(`/shayari/${s.slug}`),
      lastModified: s.publishedAt || s.createdAt ? new Date(s.publishedAt || s.createdAt!) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...shayariRoutes];
}
