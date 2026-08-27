"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { saveRoastVideo, deleteRoastVideo } from "@/lib/videos";

function revalidateVideos() {
  revalidatePath("/admin/videos");
  revalidatePath("/roast");
}

function parseCommentary(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  const watchMatch = trimmed.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = trimmed.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = trimmed.match(/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];
  return trimmed;
}

export async function createVideo(formData: FormData) {
  await requireAdmin();

  await saveRoastVideo({
    id: crypto.randomUUID(),
    title: String(formData.get("title") ?? "").trim(),
    youtubeId: extractYoutubeId(String(formData.get("youtubeId") ?? "")),
    commentary: parseCommentary(String(formData.get("commentary") ?? "")),
  });

  revalidateVideos();
  redirect("/admin/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await requireAdmin();

  await saveRoastVideo({
    id,
    title: String(formData.get("title") ?? "").trim(),
    youtubeId: extractYoutubeId(String(formData.get("youtubeId") ?? "")),
    commentary: parseCommentary(String(formData.get("commentary") ?? "")),
  });

  revalidateVideos();
  redirect("/admin/videos");
}

export async function removeVideo(id: string) {
  await requireAdmin();
  await deleteRoastVideo(id);
  revalidateVideos();
  redirect("/admin/videos");
}
