
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
  // Remaining topics from docs/shayari-keywords.csv (no volume data yet).
  friendship: ["friendship shayari", "friendship shayari in hindi", "friendship shayari 2 line", "friendship status", "friendship quotes in hindi"],
  "good morning": ["good morning shayari", "good morning shayari in hindi", "good morning shayari 2 line", "good morning status", "good morning quotes in hindi"],
  "good night": ["good night shayari", "good night shayari in hindi", "good night shayari 2 line", "good night status", "good night quotes in hindi"],
  bewafa: ["bewafa shayari", "bewafa shayari in hindi", "bewafa shayari 2 line", "bewafa status", "bewafa quotes in hindi"],
  dard: ["dard shayari", "dard shayari in hindi", "dard shayari 2 line", "dard status", "dard quotes in hindi"],
  judai: ["judai shayari", "judai shayari in hindi", "judai shayari 2 line", "judai status", "judai quotes in hindi"],
  ishq: ["ishq shayari", "ishq shayari in hindi", "ishq shayari 2 line", "ishq status", "ishq quotes in hindi"],
  mohabbat: ["mohabbat shayari", "mohabbat shayari in hindi", "mohabbat shayari 2 line", "mohabbat status", "mohabbat quotes in hindi"],
  akelapan: ["akelapan shayari", "akelapan shayari in hindi", "akelapan shayari 2 line", "akelapan status", "akelapan quotes in hindi"],
  tanha: ["tanha shayari", "tanha shayari in hindi", "tanha shayari 2 line", "tanha status", "tanha quotes in hindi"],
  "miss you": ["miss you shayari", "miss you shayari in hindi", "miss you shayari 2 line", "miss you status", "miss you quotes in hindi"],
  yaad: ["yaad shayari", "yaad shayari in hindi", "yaad shayari 2 line", "yaad status", "yaad quotes in hindi"],
  intezaar: ["intezaar shayari", "intezaar shayari in hindi", "intezaar shayari 2 line", "intezaar status", "intezaar quotes in hindi"],
  birthday: ["birthday shayari", "birthday shayari in hindi", "birthday shayari 2 line", "birthday status", "birthday quotes in hindi"],
  maa: ["maa shayari", "maa shayari in hindi", "maa shayari 2 line", "maa status", "maa quotes in hindi"],
  papa: ["papa shayari", "papa shayari in hindi", "papa shayari 2 line", "papa status", "papa quotes in hindi"],
  bhai: ["bhai shayari", "bhai shayari in hindi", "bhai shayari 2 line", "bhai status", "bhai quotes in hindi"],
  behan: ["behan shayari", "behan shayari in hindi", "behan shayari 2 line", "behan status", "behan quotes in hindi"],
  husband: ["husband shayari", "husband shayari in hindi", "husband shayari 2 line", "husband status", "husband quotes in hindi"],
  wife: ["wife shayari", "wife shayari in hindi", "wife shayari 2 line", "wife status", "wife quotes in hindi"],
  girlfriend: ["girlfriend shayari", "girlfriend shayari in hindi", "girlfriend shayari 2 line", "girlfriend status", "girlfriend quotes in hindi"],
  boyfriend: ["boyfriend shayari", "boyfriend shayari in hindi", "boyfriend shayari 2 line", "boyfriend status", "boyfriend quotes in hindi"],
  pyar: ["pyar shayari", "pyar shayari in hindi", "pyar shayari 2 line", "pyar status", "pyar quotes in hindi"],
  dil: ["dil shayari", "dil shayari in hindi", "dil shayari 2 line", "dil status", "dil quotes in hindi"],
  dhokha: ["dhokha shayari", "dhokha shayari in hindi", "dhokha shayari 2 line", "dhokha status", "dhokha quotes in hindi"],
  sorry: ["sorry shayari", "sorry shayari in hindi", "sorry shayari 2 line", "sorry status", "sorry quotes in hindi"],
  "thank you": ["thank you shayari", "thank you shayari in hindi", "thank you shayari 2 line", "thank you status", "thank you quotes in hindi"],
  anniversary: ["anniversary shayari", "anniversary shayari in hindi", "anniversary shayari 2 line", "anniversary status", "anniversary quotes in hindi"],
  marriage: ["marriage shayari", "marriage shayari in hindi", "marriage shayari 2 line", "marriage status", "marriage quotes in hindi"],
  "new year": ["new year shayari", "new year shayari in hindi", "new year shayari 2 line", "new year status", "new year quotes in hindi"],
  diwali: ["diwali shayari", "diwali shayari in hindi", "diwali shayari 2 line", "diwali status", "diwali quotes in hindi"],
  holi: ["holi shayari", "holi shayari in hindi", "holi shayari 2 line", "holi status", "holi quotes in hindi"],
  rakhi: ["rakhi shayari", "rakhi shayari in hindi", "rakhi shayari 2 line", "rakhi status", "rakhi quotes in hindi"],
  eid: ["eid shayari", "eid shayari in hindi", "eid shayari 2 line", "eid status", "eid quotes in hindi"],
  "republic day": ["republic day shayari", "republic day shayari in hindi", "republic day shayari 2 line", "republic day status", "republic day quotes in hindi"],
  "independence day": ["independence day shayari", "independence day shayari in hindi", "independence day shayari 2 line", "independence day status", "independence day quotes in hindi"],
  valentine: ["valentine shayari", "valentine shayari in hindi", "valentine shayari 2 line", "valentine status", "valentine quotes in hindi"],
  "rose day": ["rose day shayari", "rose day shayari in hindi", "rose day shayari 2 line", "rose day status", "rose day quotes in hindi"],
  "propose day": ["propose day shayari", "propose day shayari in hindi", "propose day shayari 2 line", "propose day status", "propose day quotes in hindi"],
  "hug day": ["hug day shayari", "hug day shayari in hindi", "hug day shayari 2 line", "hug day status", "hug day quotes in hindi"],
  "kiss day": ["kiss day shayari", "kiss day shayari in hindi", "kiss day shayari 2 line", "kiss day status", "kiss day quotes in hindi"],
  "promise day": ["promise day shayari", "promise day shayari in hindi", "promise day shayari 2 line", "promise day status", "promise day quotes in hindi"],
  "teddy day": ["teddy day shayari", "teddy day shayari in hindi", "teddy day shayari 2 line", "teddy day status", "teddy day quotes in hindi"],
  "chocolate day": ["chocolate day shayari", "chocolate day shayari in hindi", "chocolate day shayari 2 line", "chocolate day status", "chocolate day quotes in hindi"],
  "raksha bandhan": ["raksha bandhan shayari", "raksha bandhan shayari in hindi", "raksha bandhan shayari 2 line", "raksha bandhan status", "raksha bandhan quotes in hindi"],
  "teachers day": ["teachers day shayari", "teachers day shayari in hindi", "teachers day shayari 2 line", "teachers day status", "teachers day quotes in hindi"],
  "mothers day": ["mothers day shayari", "mothers day shayari in hindi", "mothers day shayari 2 line", "mothers day status", "mothers day quotes in hindi"],
  "fathers day": ["fathers day shayari", "fathers day shayari in hindi", "fathers day shayari 2 line", "fathers day status", "fathers day quotes in hindi"],
  "friendship day": ["friendship day shayari", "friendship day shayari in hindi", "friendship day shayari 2 line", "friendship day status", "friendship day quotes in hindi"],
  "childrens day": ["childrens day shayari", "childrens day shayari in hindi", "childrens day shayari 2 line", "childrens day status", "childrens day quotes in hindi"],
  navratri: ["navratri shayari", "navratri shayari in hindi", "navratri shayari 2 line", "navratri status", "navratri quotes in hindi"],
  "durga puja": ["durga puja shayari", "durga puja shayari in hindi", "durga puja shayari 2 line", "durga puja status", "durga puja quotes in hindi"],
  "ganesh chaturthi": ["ganesh chaturthi shayari", "ganesh chaturthi shayari in hindi", "ganesh chaturthi shayari 2 line", "ganesh chaturthi status", "ganesh chaturthi quotes in hindi"],
  "karwa chauth": ["karwa chauth shayari", "karwa chauth shayari in hindi", "karwa chauth shayari 2 line", "karwa chauth status", "karwa chauth quotes in hindi"],
  christmas: ["christmas shayari", "christmas shayari in hindi", "christmas shayari 2 line", "christmas status", "christmas quotes in hindi"],
  baarish: ["baarish shayari", "baarish shayari in hindi", "baarish shayari 2 line", "baarish status", "baarish quotes in hindi"],
  chai: ["chai shayari", "chai shayari in hindi", "chai shayari 2 line", "chai status", "chai quotes in hindi"],
  raat: ["raat shayari", "raat shayari in hindi", "raat shayari 2 line", "raat status", "raat quotes in hindi"],
  chand: ["chand shayari", "chand shayari in hindi", "chand shayari 2 line", "chand status", "chand quotes in hindi"],
  safar: ["safar shayari", "safar shayari in hindi", "safar shayari 2 line", "safar status", "safar quotes in hindi"],
  sapne: ["sapne shayari", "sapne shayari in hindi", "sapne shayari 2 line", "sapne status", "sapne quotes in hindi"],
  waqt: ["waqt shayari", "waqt shayari in hindi", "waqt shayari 2 line", "waqt status", "waqt quotes in hindi"],
  zakhm: ["zakhm shayari", "zakhm shayari in hindi", "zakhm shayari 2 line", "zakhm status", "zakhm quotes in hindi"],
  aansu: ["aansu shayari", "aansu shayari in hindi", "aansu shayari 2 line", "aansu status", "aansu quotes in hindi"],
  khamoshi: ["khamoshi shayari", "khamoshi shayari in hindi", "khamoshi shayari 2 line", "khamoshi status", "khamoshi quotes in hindi"],
  gussa: ["gussa shayari", "gussa shayari in hindi", "gussa shayari 2 line", "gussa status", "gussa quotes in hindi"],
  jealousy: ["jealousy shayari", "jealousy shayari in hindi", "jealousy shayari 2 line", "jealousy status", "jealousy quotes in hindi"],
  ego: ["ego shayari", "ego shayari in hindi", "ego shayari 2 line", "ego status", "ego quotes in hindi"],
  sher: ["sher shayari", "sher shayari in hindi", "sher shayari 2 line", "sher status", "sher quotes in hindi"],
  nazm: ["nazm shayari", "nazm shayari in hindi", "nazm shayari 2 line", "nazm status", "nazm quotes in hindi"],
  ghazal: ["ghazal shayari", "ghazal shayari in hindi", "ghazal shayari 2 line", "ghazal status", "ghazal quotes in hindi"],
  gulzar: ["gulzar shayari", "gulzar shayari in hindi", "gulzar shayari 2 line", "gulzar status", "gulzar quotes in hindi"],
  "mirza ghalib": ["mirza ghalib shayari", "mirza ghalib shayari in hindi", "mirza ghalib shayari 2 line", "mirza ghalib status", "mirza ghalib quotes in hindi"],
  "jaun elia": ["jaun elia shayari", "jaun elia shayari in hindi", "jaun elia shayari 2 line", "jaun elia status", "jaun elia quotes in hindi"],
  "rahat indori": ["rahat indori shayari", "rahat indori shayari in hindi", "rahat indori shayari 2 line", "rahat indori status", "rahat indori quotes in hindi"],
  "faiz ahmed faiz": ["faiz ahmed faiz shayari", "faiz ahmed faiz shayari in hindi", "faiz ahmed faiz shayari 2 line", "faiz ahmed faiz status", "faiz ahmed faiz quotes in hindi"],
  "ahmed faraz": ["ahmed faraz shayari", "ahmed faraz shayari in hindi", "ahmed faraz shayari 2 line", "ahmed faraz status", "ahmed faraz quotes in hindi"],
  "parveen shakir": ["parveen shakir shayari", "parveen shakir shayari in hindi", "parveen shakir shayari 2 line", "parveen shakir status", "parveen shakir quotes in hindi"],
  "bashir badr": ["bashir badr shayari", "bashir badr shayari in hindi", "bashir badr shayari 2 line", "bashir badr status", "bashir badr quotes in hindi"],
  "munawwar rana": ["munawwar rana shayari", "munawwar rana shayari in hindi", "munawwar rana shayari 2 line", "munawwar rana status", "munawwar rana quotes in hindi"],
  "dushyant kumar": ["dushyant kumar shayari", "dushyant kumar shayari in hindi", "dushyant kumar shayari 2 line", "dushyant kumar status", "dushyant kumar quotes in hindi"],
  kabir: ["kabir shayari", "kabir shayari in hindi", "kabir shayari 2 line", "kabir status", "kabir quotes in hindi"],
  rumi: ["rumi shayari", "rumi shayari in hindi", "rumi shayari 2 line", "rumi status", "rumi quotes in hindi"],
  "zakir khan": ["zakir khan shayari", "zakir khan shayari in hindi", "zakir khan shayari 2 line", "zakir khan status", "zakir khan quotes in hindi"],
  "kumar vishwas": ["kumar vishwas shayari", "kumar vishwas shayari in hindi", "kumar vishwas shayari 2 line", "kumar vishwas status", "kumar vishwas quotes in hindi"],
  sufi: ["sufi shayari", "sufi shayari in hindi", "sufi shayari 2 line", "sufi status", "sufi quotes in hindi"],
  islamic: ["islamic shayari", "islamic shayari in hindi", "islamic shayari 2 line", "islamic status", "islamic quotes in hindi"],
  urdu: ["urdu shayari", "urdu shayari in hindi", "urdu shayari 2 line", "urdu status", "urdu quotes in hindi"],
  punjabi: ["punjabi shayari", "punjabi shayari in hindi", "punjabi shayari 2 line", "punjabi status", "punjabi quotes in hindi"],
  bhojpuri: ["bhojpuri shayari", "bhojpuri shayari in hindi", "bhojpuri shayari 2 line", "bhojpuri status", "bhojpuri quotes in hindi"],
  english: ["english shayari", "english shayari in hindi", "english shayari 2 line", "english status", "english quotes in hindi"],
  hinglish: ["hinglish shayari", "hinglish shayari in hindi", "hinglish shayari 2 line", "hinglish status", "hinglish quotes in hindi"],
  politics: ["politics shayari", "politics shayari in hindi", "politics shayari 2 line", "politics status", "politics quotes in hindi"],
  army: ["army shayari", "army shayari in hindi", "army shayari 2 line", "army status", "army quotes in hindi"],
  soldier: ["soldier shayari", "soldier shayari in hindi", "soldier shayari 2 line", "soldier status", "soldier quotes in hindi"],
  "desh bhakti": ["desh bhakti shayari", "desh bhakti shayari in hindi", "desh bhakti shayari 2 line", "desh bhakti status", "desh bhakti quotes in hindi"],
  mahakal: ["mahakal shayari", "mahakal shayari in hindi", "mahakal shayari 2 line", "mahakal status", "mahakal quotes in hindi"],
  krishna: ["krishna shayari", "krishna shayari in hindi", "krishna shayari 2 line", "krishna status", "krishna quotes in hindi"],
  "radha krishna": ["radha krishna shayari", "radha krishna shayari in hindi", "radha krishna shayari 2 line", "radha krishna status", "radha krishna quotes in hindi"],
  shiv: ["shiv shayari", "shiv shayari in hindi", "shiv shayari 2 line", "shiv status", "shiv quotes in hindi"],
  ram: ["ram shayari", "ram shayari in hindi", "ram shayari 2 line", "ram status", "ram quotes in hindi"],
  hanuman: ["hanuman shayari", "hanuman shayari in hindi", "hanuman shayari 2 line", "hanuman status", "hanuman quotes in hindi"],
  "sai baba": ["sai baba shayari", "sai baba shayari in hindi", "sai baba shayari 2 line", "sai baba status", "sai baba quotes in hindi"],
  bholenath: ["bholenath shayari", "bholenath shayari in hindi", "bholenath shayari 2 line", "bholenath status", "bholenath quotes in hindi"],
  sardar: ["sardar shayari", "sardar shayari in hindi", "sardar shayari 2 line", "sardar status", "sardar quotes in hindi"],
  nawab: ["nawab shayari", "nawab shayari in hindi", "nawab shayari 2 line", "nawab status", "nawab quotes in hindi"],
  badmash: ["badmash shayari", "badmash shayari in hindi", "badmash shayari 2 line", "badmash status", "badmash quotes in hindi"],
  killer: ["killer shayari", "killer shayari in hindi", "killer shayari 2 line", "killer status", "killer quotes in hindi"],
  royal: ["royal shayari", "royal shayari in hindi", "royal shayari 2 line", "royal status", "royal quotes in hindi"],
  swag: ["swag shayari", "swag shayari in hindi", "swag shayari 2 line", "swag status", "swag quotes in hindi"],
  dhoka: ["dhoka shayari", "dhoka shayari in hindi", "dhoka shayari 2 line", "dhoka status", "dhoka quotes in hindi"],
  bewafai: ["bewafai shayari", "bewafai shayari in hindi", "bewafai shayari 2 line", "bewafai status", "bewafai quotes in hindi"],
  mausam: ["mausam shayari", "mausam shayari in hindi", "mausam shayari 2 line", "mausam status", "mausam quotes in hindi"],
  garmi: ["garmi shayari", "garmi shayari in hindi", "garmi shayari 2 line", "garmi status", "garmi quotes in hindi"],
  sardi: ["sardi shayari", "sardi shayari in hindi", "sardi shayari 2 line", "sardi status", "sardi quotes in hindi"],
  barish: ["barish shayari", "barish shayari in hindi", "barish shayari 2 line", "barish status", "barish quotes in hindi"],
  subah: ["subah shayari", "subah shayari in hindi", "subah shayari 2 line", "subah status", "subah quotes in hindi"],
  shaam: ["shaam shayari", "shaam shayari in hindi", "shaam shayari 2 line", "shaam status", "shaam quotes in hindi"],
  sunset: ["sunset shayari", "sunset shayari in hindi", "sunset shayari 2 line", "sunset status", "sunset quotes in hindi"],
  mehfil: ["mehfil shayari", "mehfil shayari in hindi", "mehfil shayari 2 line", "mehfil status", "mehfil quotes in hindi"],
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
