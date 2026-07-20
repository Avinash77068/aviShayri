/**
 * Central SEO configuration. Keeping site-wide constants here keeps titles,
 * descriptions and keywords consistent across every route and structured-data
 * block, and gives us a single place to tune what search engines see.
 */

export const SITE_NAME = "Shayari";
export const SITE_TAGLINE = "where words find their rhythm";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const DEFAULT_DESCRIPTION =
  "Read the best shayari, poetry and 2 line verses in Hindi, Urdu and English — " +
  "love, sad, attitude, romantic, motivational and dosti shayari. " +
  "Discover, bookmark and share the words that move you.";

/**
 * A broad, intent-rich keyword set: the real high-volume search queries people
 * type, in English + Roman-Hindi + native Devanagari. (Google ignores the
 * keywords meta tag, but Bing and several regional engines still read it, and
 * these terms double as our content/heading vocabulary.)
 */
export const SITE_KEYWORDS = [
  "shayari",
  "hindi shayari",
  "shayari in hindi",
  "love shayari",
  "sad shayari",
  "attitude shayari",
  "2 line shayari",
  "romantic shayari",
  "urdu shayari",
  "motivational shayari",
  "friendship shayari",
  "dosti shayari",
  "zindagi shayari",
  "life shayari",
  "breakup shayari",
  "good morning shayari",
  "best shayari",
  "shayari collection",
  "hindi poetry",
  "poetry",
  "शायरी",
  "हिंदी शायरी",
  "प्यार शायरी",
];

/** Build a per-page keyword list: page-specific terms first, then the core set. */
export function buildKeywords(extra: string[] = []): string[] {
  return Array.from(new Set([...extra, ...SITE_KEYWORDS]));
}

/** Absolute canonical URL for a given path (path should start with "/"). */
export function canonical(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
