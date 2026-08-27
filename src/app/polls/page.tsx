import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getPollsWithResults } from "@/lib/polls";
import { PollCard } from "@/components/PollCard";

export const metadata: Metadata = {
  title: "Polls",
};

export default async function PollsPage() {
  const [polls, cookieStore] = await Promise.all([
    getPollsWithResults(),
    cookies(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">Polls</h1>
      <p className="mt-2 text-neutral-400">
        Vote on the dumbest moments, and settle who&apos;s dumber than who.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            votedOptionId={cookieStore.get(`voted_${poll.id}`)?.value}
          />
        ))}
      </div>
    </div>
  );
}
