"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { savePollDefinition, deletePollDefinition, getPollDefinition, type PollOption } from "@/lib/polls";
import { resetPollVotes } from "@/lib/votes-store";
import { slugify } from "@/lib/slug";

function revalidatePolls() {
  revalidatePath("/admin/polls");
  revalidatePath("/polls");
}

// Reuses an existing option's id when its label is unchanged, so editing a
// poll's question or adding an option doesn't orphan votes already cast
// against the options that didn't change.
function parseOptions(raw: string, existing: PollOption[] = []): PollOption[] {
  const existingByLabel = new Map(existing.map((o) => [o.label, o.id]));
  const usedIds = new Set<string>();

  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((label) => {
      let id = existingByLabel.get(label);
      if (!id) {
        const base = slugify(label) || "option";
        let candidate = base;
        let n = 1;
        while (usedIds.has(candidate)) candidate = `${base}-${n++}`;
        id = candidate;
      }
      usedIds.add(id);
      return { id, label };
    });
}

export async function createPoll(formData: FormData) {
  await requireAdmin();

  const question = String(formData.get("question") ?? "").trim();
  const id = slugify(question) || crypto.randomUUID();

  await savePollDefinition({
    id,
    question,
    options: parseOptions(String(formData.get("options") ?? "")),
  });

  revalidatePolls();
  redirect("/admin/polls");
}

export async function updatePoll(id: string, formData: FormData) {
  await requireAdmin();

  const existing = await getPollDefinition(id);

  await savePollDefinition({
    id,
    question: String(formData.get("question") ?? "").trim(),
    options: parseOptions(String(formData.get("options") ?? ""), existing?.options ?? []),
  });

  revalidatePolls();
  redirect("/admin/polls");
}

export async function removePoll(id: string) {
  await requireAdmin();
  await deletePollDefinition(id);
  revalidatePolls();
  redirect("/admin/polls");
}

export async function resetPoll(id: string) {
  await requireAdmin();
  await resetPollVotes(id);
  revalidatePolls();
  redirect("/admin/polls");
}
