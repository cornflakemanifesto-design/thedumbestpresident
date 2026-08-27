"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { saveWriting, deleteWriting, slugify } from "@/lib/writings";

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function revalidateWritings(slug: string) {
  revalidatePath("/admin/writings");
  revalidatePath("/writings");
  revalidatePath(`/writings/${slug}`);
  revalidatePath("/");
}

export async function createWriting(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(title);
  if (!title || !slug) {
    redirect("/admin/writings/new?error=1");
  }

  await saveWriting({
    slug,
    title,
    date: String(formData.get("date") ?? ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    tags: parseTags(String(formData.get("tags") ?? "")),
    body: String(formData.get("body") ?? ""),
  });

  revalidateWritings(slug);
  redirect("/admin/writings");
}

export async function updateWriting(slug: string, formData: FormData) {
  await requireAdmin();

  await saveWriting({
    slug,
    title: String(formData.get("title") ?? "").trim(),
    date: String(formData.get("date") ?? ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    tags: parseTags(String(formData.get("tags") ?? "")),
    body: String(formData.get("body") ?? ""),
  });

  revalidateWritings(slug);
  redirect("/admin/writings");
}

export async function removeWriting(slug: string) {
  await requireAdmin();
  await deleteWriting(slug);
  revalidateWritings(slug);
  redirect("/admin/writings");
}
