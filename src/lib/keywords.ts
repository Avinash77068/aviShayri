
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


/**
 * Curated long-tail keywords per topic, ordered by expected demand. No volume
 * data yet: move an entry into VERIFIED once its real volume is known.
 */
const CURATED: Record<string, string[]> = {
  attitude: ["attitude shayari", "attitude shayari in hindi", "royal attitude shayari", "boys attitude shayari", "girls attitude shayari", "killer attitude shayari", "attitude status in hindi", "2 line attitude shayari"],
  love: ["love shayari", "love shayari in hindi", "love shayari for girlfriend", "love shayari for boyfriend", "pyar bhari shayari", "romantic love shayari", "2 line love shayari", "love shayari in english"],
  sad: ["sad shayari", "sad shayari in hindi", "dard bhari shayari", "heart touching sad shayari", "sad shayari 2 line", "emotional sad shayari", "sad status in hindi", "bewafa shayari"],
  dosti: ["dosti shayari", "dosti shayari in hindi", "friendship shayari in hindi", "best friend shayari", "yaari dosti shayari", "friendship quotes in hindi", "2 line dosti shayari"],
  romantic: ["romantic shayari", "romantic shayari in hindi", "romantic shayari for wife", "romantic shayari for husband", "2 line romantic shayari"],
  motivational: ["motivational shayari", "motivational shayari in hindi", "success shayari", "inspirational shayari in hindi", "motivational quotes in hindi", "2 line motivational shayari"],
  life: ["life shayari", "zindagi shayari", "zindagi shayari in hindi", "life quotes in hindi", "life status in hindi", "2 line life shayari"],
  zindagi: ["zindagi shayari", "zindagi shayari in hindi", "zindagi quotes in hindi", "zindagi status"],
  breakup: ["breakup shayari", "breakup shayari in hindi", "judai shayari", "bewafa shayari in hindi", "dhokha shayari", "breakup status in hindi"],
  funny: ["funny shayari", "funny shayari in hindi", "comedy shayari", "hasi mazak shayari"],
};

/** Category/tag names that should also pull another topic's keywords. */
const TOPIC_ALIASES: Record<string, string[]> = {
  sad: ["alone"],
  judai: ["breakup"],
  bewafa: ["breakup"],
  dard: ["sad"],
  ishq: ["love"],
  mohabbat: ["love"],
  pyar: ["love"],
  friendship: ["dosti"],
  motivation: ["motivational"],
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
  const curated = [topic, ...(TOPIC_ALIASES[topic] ?? [])].flatMap((key) => CURATED[key] ?? []);
  const generated = PATTERNS.map((p) => p.replace("{t}", topic));
  return Array.from(new Set([...verified, ...curated, ...generated])).slice(0, limit);
}
