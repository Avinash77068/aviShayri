import { api, unwrap } from "./api";
import type { Shayari, Category, PageMeta } from "./types";
import { sampleShayari, sampleCategories } from "./sample-data";

/**
 * Each fetcher tries the real API first and transparently falls back to local
 * sample data if the backend is unreachable — so the UI is never empty during
 * development or a backend outage.
 */
async function withFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

export interface ListResult {
  items: Shayari[];
  meta?: PageMeta;
}

export const shayariQueries = {
  list: (params: Record<string, unknown> = {}) => ({
    queryKey: ["shayari", "list", params] as const,
    queryFn: (): Promise<ListResult> =>
      withFallback<ListResult>(
        async () => {
          const { data, meta } = await unwrap<Shayari[]>(api.get("/shayari", { params }));
          return { items: data, meta };
        },
        { items: filterSample(params) }
      ),
  }),

  trending: (limit = 8) => ({
    queryKey: ["shayari", "trending", limit] as const,
    queryFn: (): Promise<Shayari[]> =>
      withFallback(
        async () => (await unwrap<Shayari[]>(api.get("/shayari/trending", { params: { limit } }))).data,
        sampleShayari.filter((s) => s.trending).slice(0, limit)
      ),
  }),

  latest: (limit = 8) => ({
    queryKey: ["shayari", "latest", limit] as const,
    queryFn: (): Promise<Shayari[]> =>
      withFallback(
        async () => (await unwrap<Shayari[]>(api.get("/shayari/latest", { params: { limit } }))).data,
        sampleShayari.slice(0, limit)
      ),
  }),

  featured: (limit = 6) => ({
    queryKey: ["shayari", "featured", limit] as const,
    queryFn: (): Promise<Shayari[]> =>
      withFallback(
        async () =>
          (await unwrap<Shayari[]>(api.get("/shayari", { params: { featured: "true", limit } }))).data,
        sampleShayari.filter((s) => s.featured).slice(0, limit)
      ),
  }),

  todays: () => ({
    queryKey: ["shayari", "todays"] as const,
    queryFn: (): Promise<Shayari | null> =>
      withFallback(
        async () => (await unwrap<Shayari>(api.get("/shayari/todays"))).data,
        sampleShayari[0]
      ),
  }),

  bySlug: (slug: string) => ({
    queryKey: ["shayari", "detail", slug] as const,
    queryFn: (): Promise<{ shayari: Shayari; related: Shayari[] }> =>
      withFallback(
        async () => (await unwrap<{ shayari: Shayari; related: Shayari[] }>(api.get(`/shayari/${slug}`))).data,
        {
          shayari: sampleShayari.find((s) => s.slug === slug) || sampleShayari[0],
          related: sampleShayari.slice(1, 5),
        }
      ),
  }),

  search: (q: string) => ({
    queryKey: ["shayari", "search", q] as const,
    queryFn: (): Promise<ListResult> =>
      withFallback<ListResult>(
        async () => {
          const { data, meta } = await unwrap<Shayari[]>(api.get("/shayari/search", { params: { q } }));
          return { items: data, meta };
        },
        { items: sampleShayari.filter((s) => (s.title + s.content).toLowerCase().includes(q.toLowerCase())) }
      ),
  }),
};

export const categoryQueries = {
  all: () => ({
    queryKey: ["categories", "all"] as const,
    queryFn: (): Promise<Category[]> =>
      withFallback(async () => (await unwrap<Category[]>(api.get("/categories/all"))).data, sampleCategories),
  }),
};

function filterSample(params: Record<string, unknown>): Shayari[] {
  let list = [...sampleShayari];
  if (params.category) list = list.filter((s) => s.category?.slug === params.category);
  if (params.trending === "true") list = list.filter((s) => s.trending);
  if (params.featured === "true") list = list.filter((s) => s.featured);
  return list;
}
