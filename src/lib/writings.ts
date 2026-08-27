import readingTime from "reading-time";
import { getJSON, putJSON } from "./redis-store";
export { slugify } from "./slug";

const WRITINGS_PATH = "data/writings.json";

export type Writing = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
};

export async function getAllWritings(): Promise<Writing[]> {
  const writings = await getJSON<Writing[]>(WRITINGS_PATH, []);
  return [...writings].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getWriting(slug: string): Promise<Writing | null> {
  const writings = await getJSON<Writing[]>(WRITINGS_PATH, []);
  return writings.find((w) => w.slug === slug) ?? null;
}

export function readingTimeFor(body: string): string {
  return readingTime(body).text;
}

export async function saveWriting(writing: Writing): Promise<void> {
  const writings = await getJSON<Writing[]>(WRITINGS_PATH, []);
  const idx = writings.findIndex((w) => w.slug === writing.slug);
  if (idx >= 0) writings[idx] = writing;
  else writings.push(writing);
  await putJSON(WRITINGS_PATH, writings);
}

export async function deleteWriting(slug: string): Promise<void> {
  const writings = await getJSON<Writing[]>(WRITINGS_PATH, []);
  await putJSON(
    WRITINGS_PATH,
    writings.filter((w) => w.slug !== slug)
  );
}
