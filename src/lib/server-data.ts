import { API_BASE } from "@/lib/api-config";
import { sampleCategories, sampleShayari } from "@/lib/sample-data";
import type { Category, PageMeta, Shayari } from "@/lib/types";

export interface ShayariListResult {
  items: Shayari[];
  meta?: PageMeta;
}

interface ApiResult<T> {
  data: T | null;
  meta?: PageMeta;
}

function apiUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url;
}

async function fetchEnvelope<T>(
  path: string,
  revalidate: number,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<ApiResult<T> | null> {
  try {
    const response = await fetch(apiUrl(path, params), { next: { revalidate } });
    if (!response.ok) return null;
    const envelope = await response.json();
    return { data: (envelope?.data ?? null) as T | null, meta: envelope?.meta };
  } catch {
    return null;
  }
}

async function fetchData<T>(path: string, revalidate: number, params?: Record<string, string | number | boolean | undefined>) {
  return (await fetchEnvelope<T>(path, revalidate, params))?.data ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return (await fetchData<Category[]>("/categories/all", 3600)) ?? sampleCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug)
    ?? sampleCategories.find((category) => category.slug === slug)
    ?? null;
}

export async function getShayariList(
  params: Record<string, string | number | boolean | undefined> = {},
  limit = 9,
): Promise<ShayariListResult> {
  const result = await fetchEnvelope<Shayari[]>("/shayari", 300, {
    ...params,
    page: 1,
    limit,
  });

  if (result?.data) return { items: result.data, meta: result.meta };

  let items = [...sampleShayari];
  if (params.category) items = items.filter((shayari) => shayari.category?.slug === params.category);
  if (params.trending === "true") items = items.filter((shayari) => shayari.trending);
  if (params.featured === "true") items = items.filter((shayari) => shayari.featured);
  return { items: items.slice(0, limit) };
}

export async function getTrendingShayari(limit: number): Promise<Shayari[]> {
  const data = await fetchData<Shayari[]>("/shayari/trending", 300, { limit });
  return data ?? sampleShayari.filter((shayari) => shayari.trending).slice(0, limit);
}

export async function getLatestShayari(limit: number): Promise<Shayari[]> {
  const data = await fetchData<Shayari[]>("/shayari/latest", 300, { limit });
  return data ?? sampleShayari.slice(0, limit);
}

export async function getFeaturedShayari(limit: number): Promise<Shayari[]> {
  const result = await getShayariList({ featured: "true" }, limit);
  return result.items;
}

export async function getTodaysShayari(): Promise<Shayari | null> {
  const data = await fetchData<Shayari | null>("/shayari/todays", 3600);
  return data ?? sampleShayari[0] ?? null;
}

export async function getShayariSearch(q: string): Promise<ShayariListResult> {
  const result = await fetchEnvelope<Shayari[]>("/shayari/search", 300, { q, page: 1, limit: 9 });
  if (result?.data) return { items: result.data, meta: result.meta };

  const term = q.toLowerCase();
  return {
    items: sampleShayari.filter((shayari) =>
      [shayari.title, shayari.content, shayari.author?.name, shayari.createdBy?.name]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    ),
  };
}

export async function getShayariDetail(slug: string): Promise<{ shayari: Shayari; related: Shayari[] } | null> {
  const data = await fetchData<{ shayari: Shayari; related: Shayari[] }>(`/shayari/${encodeURIComponent(slug)}`, 300);
  if (data?.shayari) return data;

  const shayari = sampleShayari.find((item) => item.slug === slug);
  if (!shayari) return null;
  return {
    shayari,
    related: sampleShayari.filter((item) => item.slug !== slug).slice(0, 6),
  };
}
