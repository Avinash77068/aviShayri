
export type KeywordEntry = { keyword: string; volume?: number };

/** Verified keywords grouped by topic, highest volume first. */
const VERIFIED: Record<string, KeywordEntry[]> = {
  alone: [
    { keyword: "alone sad shayari", volume: 60500 },
    { keyword: "alone shayari", volume: 14800 },
    { keyword: "alone shayari in hindi", volume: 14800 },
    { keyword: "alone in hindi", volume: 4400 },
    { keyword: "alone quotes hindi", volume: 4400 },
    { keyword: "alone quotes in hindi", volume: 4400 },
    { keyword: "heart touching alone quotes", volume: 4400 },
    { keyword: "alone sad quotes in hindi", volume: 3600 },
    { keyword: "akelapan shayari in hindi", volume: 2400 },
    { keyword: "akelepan ki shayari" },
  ],
};

/** Category/tag names that should also pull another topic's keywords. */
const TOPIC_ALIASES: Record<string, string[]> = {
  sad: ["alone"],
  alone: ["alone"],
  akelapan: ["alone"],
  tanha: ["alone"],
};

const PATTERNS = [
  "{t} shayari",
  "{t} shayari in hindi",
  "{t} shayari 2 line",
  "{t} status",
  "{t} quotes in hindi",
  "best {t} shayari",
];

/** The highest-volume verified keywords overall, for site-wide meta keywords. */
export function topVerifiedKeywords(limit = 10): string[] {
  return Object.values(VERIFIED)
    .flat()
    .filter((e) => e.volume)
    .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
    .slice(0, limit)
    .map((e) => e.keyword);
}

/** Keywords for a category/tag name: verified (by volume) first, then generated patterns. */
export function keywordsForTopic(name: string, limit = 12): string[] {
  const topic = name.trim().toLowerCase();
  if (!topic) return [];
  const verified = (TOPIC_ALIASES[topic] ?? [])
    .flatMap((key) => VERIFIED[key] ?? [])
    .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
    .map((e) => e.keyword);
  const generated = PATTERNS.map((p) => p.replace("{t}", topic));
  return Array.from(new Set([...verified, ...generated])).slice(0, limit);
}
