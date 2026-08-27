"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { incrementVote } from "./votes-store";

function votedCookieName(pollId: string) {
  return `voted_${pollId}`;
}

export async function castVote(pollId: string, optionId: string) {
  const cookieStore = await cookies();
  if (cookieStore.get(votedCookieName(pollId))) {
    return;
  }

  await incrementVote(pollId, optionId);

  cookieStore.set(votedCookieName(pollId), optionId, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });

  revalidatePath("/polls");
}
