import fs from "node:fs/promises";
import path from "node:path";
import { readVotes } from "./votes-store";

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

const POLLS_FILE = path.join(process.cwd(), "content", "polls.json");

export async function getPollDefinitions(): Promise<PollDefinition[]> {
  const raw = await fs.readFile(POLLS_FILE, "utf8");
  return JSON.parse(raw) as PollDefinition[];
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
