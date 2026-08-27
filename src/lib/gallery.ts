import { getJSON, putJSON } from "./redis-store";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  credit?: string;
  date: string;
};

const GALLERY_PATH = "data/gallery.json";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await getJSON<GalleryItem[]>(GALLERY_PATH, []);
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const items = await getJSON<GalleryItem[]>(GALLERY_PATH, []);
  return items.find((i) => i.id === id) ?? null;
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const items = await getJSON<GalleryItem[]>(GALLERY_PATH, []);
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) items[idx] = item;
  else items.push(item);
  await putJSON(GALLERY_PATH, items);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const items = await getJSON<GalleryItem[]>(GALLERY_PATH, []);
  await putJSON(
    GALLERY_PATH,
    items.filter((i) => i.id !== id)
  );
}
