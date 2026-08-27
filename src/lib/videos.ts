import { getJSON, putJSON } from "./redis-store";

export type RoastVideo = {
  id: string;
  title: string;
  youtubeId: string;
  commentary: string[];
};

const VIDEOS_PATH = "data/videos.json";

export async function getRoastVideos(): Promise<RoastVideo[]> {
  return getJSON<RoastVideo[]>(VIDEOS_PATH, []);
}

export async function getRoastVideo(id: string): Promise<RoastVideo | null> {
  const videos = await getJSON<RoastVideo[]>(VIDEOS_PATH, []);
  return videos.find((v) => v.id === id) ?? null;
}

export async function saveRoastVideo(video: RoastVideo): Promise<void> {
  const videos = await getJSON<RoastVideo[]>(VIDEOS_PATH, []);
  const idx = videos.findIndex((v) => v.id === video.id);
  if (idx >= 0) videos[idx] = video;
  else videos.push(video);
  await putJSON(VIDEOS_PATH, videos);
}

export async function deleteRoastVideo(id: string): Promise<void> {
  const videos = await getJSON<RoastVideo[]>(VIDEOS_PATH, []);
  await putJSON(
    VIDEOS_PATH,
    videos.filter((v) => v.id !== id)
  );
}
