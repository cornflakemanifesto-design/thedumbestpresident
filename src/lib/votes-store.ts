import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// File-based vote storage. The repo's data/votes.json is the seed/baseline.
// Most serverless hosts (Vercel included) run a read-only project filesystem,
// so writes fall back to the OS tmp dir, which IS writable but is local to a
// single warm function instance and wiped on cold start/redeploy — votes
// won't be consistent across instances or durable long-term. This is a
// stopgap so voting doesn't error out in production; swap this module for a
// real datastore (Vercel KV, Upstash Redis, Postgres, etc.) for correct,
// durable, cross-instance vote counts.

const DATA_FILE = path.join(process.cwd(), "data", "votes.json");
const TMP_FILE = path.join(os.tmpdir(), "thedumbestpresident-votes.json");

export type VoteCounts = Record<string, Record<string, number>>;

async function readJSONFile(file: string): Promise<VoteCounts | null> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as VoteCounts;
  } catch {
    return null;
  }
}

export async function readVotes(): Promise<VoteCounts> {
  return (await readJSONFile(TMP_FILE)) ?? (await readJSONFile(DATA_FILE)) ?? {};
}

export async function incrementVote(pollId: string, optionId: string) {
  const votes = await readVotes();
  votes[pollId] ??= {};
  votes[pollId][optionId] = (votes[pollId][optionId] ?? 0) + 1;

  const serialized = JSON.stringify(votes, null, 2);
  try {
    await fs.writeFile(DATA_FILE, serialized);
  } catch {
    await fs.writeFile(TMP_FILE, serialized);
  }
}
