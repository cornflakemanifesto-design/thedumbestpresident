import { getJSON, putJSON } from "./redis-store";

const VOTES_PATH = "data/votes.json";

export type VoteCounts = Record<string, Record<string, number>>;

export async function readVotes(): Promise<VoteCounts> {
  return getJSON<VoteCounts>(VOTES_PATH, {});
}

export async function incrementVote(pollId: string, optionId: string) {
  const votes = await readVotes();
  votes[pollId] ??= {};
  votes[pollId][optionId] = (votes[pollId][optionId] ?? 0) + 1;
  await putJSON(VOTES_PATH, votes);
}

export async function resetPollVotes(pollId: string) {
  const votes = await readVotes();
  delete votes[pollId];
  await putJSON(VOTES_PATH, votes);
}
