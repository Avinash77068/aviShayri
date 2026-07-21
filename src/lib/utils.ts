import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Shayari } from "./types";

/** Merge conditional class names and de-duplicate Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Display name for a shayari: the dedicated poet/author if one is set,
 * otherwise the user who submitted it, and finally a safe fallback.
 */
export function authorName(shayari: Pick<Shayari, "author" | "createdBy">): string {
  return shayari.author?.name || shayari.createdBy?.name || "Unknown";
}

/** Format a large number compactly: 1200 → "1.2K". */
export function formatCount(n: number | undefined | null): string {
  const value = Number(n) || 0;
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return `${(value / 1_000_000).toFixed(1)}M`;
}

/** Human-friendly relative time. */
export function timeAgo(date: string | Date | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of units) {
    const interval = Math.floor(seconds / secs);
    if (interval >= 1) return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
