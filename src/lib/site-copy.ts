import { getJSON, putJSON } from "./redis-store";

export const DEFAULT_SITE_COPY = {
  "site.title": "The Dumbest President",
  "site.tagline":
    "A running, always-evolving exhibition of the Trump presidencies — the dumbest chapter in American political history, documented in real time.",
  "site.metaDescription":
    "A running, always-evolving exhibition of the dumbest moments of the Trump presidencies.",
  "site.footerDisclaimer":
    "Satire and opinion. Not affiliated with any political party, campaign, or candidate.",

  "nav.writings": "Writings",
  "nav.gallery": "Gallery",
  "nav.roast": "The Roast",
  "nav.polls": "Polls",

  "home.latestWritingLabel": "Latest writing",
  "home.section.writings.title": "Writings",
  "home.section.writings.description":
    "Essays and running commentary on the current state of things.",
  "home.section.gallery.title": "Gallery",
  "home.section.gallery.description":
    "Photos of Donald Trump looking, saying, or doing something dumb.",
  "home.section.roast.title": "The Roast",
  "home.section.roast.description":
    "Video clips with running commentary, MST3K-style.",
  "home.section.polls.title": "Polls",
  "home.section.polls.description":
    "Vote on the dumbest moments, and settle who's dumber than who.",

  "writings.heading": "Writings",
  "writings.description":
    "Essays and running commentary on the current state of things.",

  "gallery.heading": "Gallery",
  "gallery.description":
    "Photos of Donald Trump looking, saying, or doing something dumb.",

  "roast.heading": "The Roast",
  "roast.description": "Video clips with running commentary, MST3K-style.",

  "polls.heading": "Polls",
  "polls.description":
    "Vote on the dumbest moments, and settle who's dumber than who.",
} as const;

export type SiteCopyKey = keyof typeof DEFAULT_SITE_COPY;
export type SiteCopy = Record<SiteCopyKey, string>;

const SITE_COPY_PATH = "data/site-copy.json";

export async function getSiteCopy(): Promise<SiteCopy> {
  const stored = await getJSON<Partial<SiteCopy>>(SITE_COPY_PATH, {});
  return { ...DEFAULT_SITE_COPY, ...stored };
}

export async function saveSiteCopy(
  updates: Partial<Record<SiteCopyKey, string>>
): Promise<void> {
  const stored = await getJSON<Partial<SiteCopy>>(SITE_COPY_PATH, {});
  await putJSON(SITE_COPY_PATH, { ...stored, ...updates });
}

export const SITE_COPY_GROUPS: { label: string; keys: SiteCopyKey[] }[] = [
  { label: "Site-wide", keys: ["site.title", "site.tagline", "site.metaDescription", "site.footerDisclaimer"] },
  { label: "Navigation", keys: ["nav.writings", "nav.gallery", "nav.roast", "nav.polls"] },
  {
    label: "Homepage",
    keys: [
      "home.latestWritingLabel",
      "home.section.writings.title",
      "home.section.writings.description",
      "home.section.gallery.title",
      "home.section.gallery.description",
      "home.section.roast.title",
      "home.section.roast.description",
      "home.section.polls.title",
      "home.section.polls.description",
    ],
  },
  { label: "Writings page", keys: ["writings.heading", "writings.description"] },
  { label: "Gallery page", keys: ["gallery.heading", "gallery.description"] },
  { label: "Roast page", keys: ["roast.heading", "roast.description"] },
  { label: "Polls page", keys: ["polls.heading", "polls.description"] },
];
