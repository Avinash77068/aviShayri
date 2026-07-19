import type { Shayari, Category } from "./types";

/**
 * Local fallback content so the UI renders beautifully even before the backend
 * API is running/seeded. The data layer transparently falls back to this.
 */
export const sampleCategories: Category[] = [
  { _id: "c1", name: "Love", slug: "love", icon: "💗", color: "#ec4899", shayariCount: 128 },
  { _id: "c2", name: "Sad", slug: "sad", icon: "🥀", color: "#64748b", shayariCount: 96 },
  { _id: "c3", name: "Motivational", slug: "motivational", icon: "🔥", color: "#f59e0b", shayariCount: 74 },
  { _id: "c4", name: "Friendship", slug: "friendship", icon: "🤝", color: "#10b981", shayariCount: 51 },
  { _id: "c5", name: "Life", slug: "life", icon: "🌱", color: "#8b5cf6", shayariCount: 88 },
  { _id: "c6", name: "Romantic", slug: "romantic", icon: "🌹", color: "#f43f5e", shayariCount: 63 },
];

const mk = (
  i: number,
  title: string,
  content: string,
  cat: Category,
  author: string,
  extra: Partial<Shayari> = {}
): Shayari => ({
  _id: `s${i}`,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  content,
  excerpt: content.slice(0, 120),
  category: cat,
  author: { _id: `a${i}`, name: author, slug: author.toLowerCase().replace(/\s+/g, "-") },
  tags: [
    { _id: "t1", name: "ishq", slug: "ishq" },
    { _id: "t2", name: "zindagi", slug: "zindagi" },
  ],
  likes: 40 + ((i * 37) % 260),
  views: 300 + ((i * 173) % 4200),
  shares: 5 + ((i * 11) % 90),
  bookmarks: 10 + ((i * 19) % 140),
  commentCount: (i * 7) % 40,
  readingTime: 1,
  createdAt: new Date(Date.now() - i * 3600_000 * 9).toISOString(),
  publishedAt: new Date(Date.now() - i * 3600_000 * 9).toISOString(),
  ...extra,
});

const [love, sad, moti, dosti, life, romantic] = sampleCategories;

export const sampleShayari: Shayari[] = [
  mk(1, "Aankhon ki baat", "Teri aankhon ke sivaa duniya mein rakkha kya hai;\nyeh utha len to sitare, yeh jhuka len to jahaan.", love, "Gulzar", { trending: true, featured: true }),
  mk(2, "Dil hi to hai", "Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun;\nroyenge hum hazaar baar, koi humein sataaye kyun.", sad, "Mirza Ghalib", { trending: true }),
  mk(3, "Rise again", "The night was long, the road unkind —\nyet here I stand, with dawn in mind.\nFall if you must, but rise once more;\nthe sky belongs to those who soar.", moti, "Anonymous", { featured: true }),
  mk(4, "Dosti ka rishta", "Dosti ek aisa rishta hai jise koi naam nahi diya jaata;\npar isse nibhaane ke liye poori zindagi kam pad jaati hai.", dosti, "Anonymous", { trending: true }),
  mk(5, "Zindagi ka safar", "Zindagi ka safar hai yeh kaisa safar,\nkoi samjha nahi koi jaana nahi;\nhai yeh kaisi dagar chalte hain sab magar,\nkoi samjha nahi koi jaana nahi.", life, "Anonymous", { featured: true }),
  mk(6, "Tanha raatein", "Har raat tanha guzarti hai ab,\nteri yaadon ke siva koi saath nahi;\njaagti aankhon mein sapne to hain,\npar unmein tere siva koi baat nahi.", sad, "Gulzar", { trending: true }),
  mk(7, "Mohabbat", "Mohabbat mein nahin hai farq jeene aur marne ka;\nusi ko dekh kar jeete hain jis kaafir pe dam nikle.", romantic, "Mirza Ghalib", { featured: true }),
  mk(8, "Khwaab", "Khwaab dekhe hain to unhe poora bhi karna,\nzameen se aasmaan tak ek pul bhi banana;\nhaar kar baith jaana koi zindagi nahi,\ngir kar sambhalna hi asli fasaana.", moti, "Anonymous", { trending: true }),
  mk(9, "Baarish", "Baarishon mein teri yaadein bheeg jaati hain,\nhar boond mein teri baatein simat aati hain.", romantic, "Gulzar"),
  mk(10, "Umeed", "Toot kar bikhar jaana koi baat nahi,\nsameto khud ko phir se, yahi to zindagi hai.", life, "Anonymous"),
  mk(11, "Judaai", "Judaai ki shaam hai, chiraag bujhne ko hai;\ntere bina yeh dil ab dhadakna bhoolne ko hai.", sad, "Anonymous"),
  mk(12, "Pehli mulaqat", "Woh pehli mulaqat aaj bhi yaad hai mujhe,\ntere chehre pe woh sharmaana yaad hai mujhe.", love, "Gulzar"),
];
