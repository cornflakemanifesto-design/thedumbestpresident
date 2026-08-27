import fs from "node:fs/promises";
import path from "node:path";

export type RoastVideo = {
  id: string;
  title: string;
  youtubeId: string;
  commentary: string[];
};

const VIDEOS_FILE = path.join(process.cwd(), "content", "videos.json");

export async function getRoastVideos(): Promise<RoastVideo[]> {
  const raw = await fs.readFile(VIDEOS_FILE, "utf8");
  return JSON.parse(raw) as RoastVideo[];
}
