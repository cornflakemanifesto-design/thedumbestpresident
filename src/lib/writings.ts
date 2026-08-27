import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");

export type WritingFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
};

export type WritingSummary = WritingFrontmatter & {
  slug: string;
  readingTime: string;
};

async function readSlugs() {
  const files = await fs.readdir(WRITINGS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllWritings(): Promise<WritingSummary[]> {
  const slugs = await readSlugs();

  const writings = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(
        path.join(WRITINGS_DIR, `${slug}.mdx`),
        "utf8"
      );
      const { data, content } = matter(raw);
      const frontmatter = data as WritingFrontmatter;

      return {
        ...frontmatter,
        slug,
        readingTime: readingTime(content).text,
      };
    })
  );

  return writings.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getWritingSource(slug: string) {
  const raw = await fs.readFile(
    path.join(WRITINGS_DIR, `${slug}.mdx`),
    "utf8"
  );
  return raw;
}

export async function getWritingSlugs() {
  return readSlugs();
}
