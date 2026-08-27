import { getRedisClient } from "./redis-store";

function voteKey(pollId: string): string {
  return `votes:${pollId}`;
}

export async function getPollVotes(pollId: string): Promise<Record<string, number>> {
  const client = await getRedisClient();
  const raw = await client.hGetAll(voteKey(pollId));
  const counts: Record<string, number> = {};
  for (const [optionId, value] of Object.entries(raw)) {
    counts[optionId] = Number(value);
  }
  return counts;
}

export async function incrementVote(pollId: string, optionId: string): Promise<void> {
  const client = await getRedisClient();
  await client.hIncrBy(voteKey(pollId), optionId, 1);
}

export async function resetPollVotes(pollId: string): Promise<void> {
  const client = await getRedisClient();
  await client.del(voteKey(pollId));
}
