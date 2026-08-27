import fs from "node:fs/promises";
import path from "node:path";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  credit?: string;
  date: string;
};

const GALLERY_FILE = path.join(process.cwd(), "content", "gallery.json");

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const raw = await fs.readFile(GALLERY_FILE, "utf8");
  const items = JSON.parse(raw) as GalleryItem[];
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}
