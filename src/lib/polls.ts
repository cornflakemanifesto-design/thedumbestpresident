import { getJSON, putJSON } from "./redis-store";
import { readVotes, resetPollVotes } from "./votes-store";

export type PollOption = {
  id: string;
  label: string;
};

export type PollDefinition = {
  id: string;
  question: string;
  options: PollOption[];
};

export type PollWithResults = PollDefinition & {
  counts: Record<string, number>;
  total: number;
};

const POLLS_PATH = "data/polls.json";

export async function getPollDefinitions(): Promise<PollDefinition[]> {
  return getJSON<PollDefinition[]>(POLLS_PATH, []);
}

export async function getPollDefinition(
  id: string
): Promise<PollDefinition | null> {
  const polls = await getPollDefinitions();
  return polls.find((p) => p.id === id) ?? null;
}

export async function savePollDefinition(poll: PollDefinition): Promise<void> {
  const polls = await getPollDefinitions();
  const idx = polls.findIndex((p) => p.id === poll.id);
  if (idx >= 0) polls[idx] = poll;
  else polls.push(poll);
  await putJSON(POLLS_PATH, polls);
}

export async function deletePollDefinition(id: string): Promise<void> {
  const polls = await getPollDefinitions();
  await putJSON(
    POLLS_PATH,
    polls.filter((p) => p.id !== id)
  );
  await resetPollVotes(id);
}

export async function getPollsWithResults(): Promise<PollWithResults[]> {
  const [polls, votes] = await Promise.all([getPollDefinitions(), readVotes()]);

  return polls.map((poll) => {
    const counts = votes[poll.id] ?? {};
    const total = poll.options.reduce(
      (sum, option) => sum + (counts[option.id] ?? 0),
      0
    );
    return { ...poll, counts, total };
  });
}
