"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { saveGalleryItem, deleteGalleryItem, getGalleryItem } from "@/lib/gallery";
import { putImage, deleteBlob } from "@/lib/blob-store";

function revalidateGallery() {
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function createGalleryItem(formData: FormData) {
  await requireAdmin();

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/gallery/new?error=missing-image");
  }

  const src = await putImage(file);

  await saveGalleryItem({
    id: crypto.randomUUID(),
    src,
    caption: String(formData.get("caption") ?? "").trim(),
    credit: String(formData.get("credit") ?? "").trim() || undefined,
    date: String(formData.get("date") ?? ""),
  });

  revalidateGallery();
  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  await requireAdmin();

  const existing = await getGalleryItem(id);
  if (!existing) redirect("/admin/gallery");

  let src = existing.src;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    src = await putImage(file);
    await deleteBlob(existing.src).catch(() => {});
  }

  await saveGalleryItem({
    id,
    src,
    caption: String(formData.get("caption") ?? "").trim(),
    credit: String(formData.get("credit") ?? "").trim() || undefined,
    date: String(formData.get("date") ?? ""),
  });

  revalidateGallery();
  redirect("/admin/gallery");
}

export async function removeGalleryItem(id: string) {
  await requireAdmin();
  const existing = await getGalleryItem(id);
  await deleteGalleryItem(id);
  if (existing) await deleteBlob(existing.src).catch(() => {});
  revalidateGallery();
  redirect("/admin/gallery");
}
