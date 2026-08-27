"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { saveSiteCopy, DEFAULT_SITE_COPY } from "@/lib/site-copy";

export async function updateSiteCopy(formData: FormData) {
  await requireAdmin();

  const updates: Record<string, string> = {};
  for (const key of Object.keys(DEFAULT_SITE_COPY)) {
    const value = formData.get(key);
    if (typeof value === "string") updates[key] = value;
  }

  await saveSiteCopy(updates);
  revalidatePath("/", "layout");
  redirect("/admin/copy?saved=1");
}
