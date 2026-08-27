import { cookies } from "next/headers";
import { getPollsWithResults } from "@/lib/polls";
import { getSiteCopy } from "@/lib/site-copy";
import { PollCard } from "@/components/PollCard";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["polls.heading"] };
}

export default async function PollsPage() {
  const [polls, cookieStore, copy] = await Promise.all([
    getPollsWithResults(),
    cookies(),
    getSiteCopy(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">
        {copy["polls.heading"]}
      </h1>
      <p className="mt-2 text-neutral-400">{copy["polls.description"]}</p>

      <div className="mt-10 flex flex-col gap-6">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            votedOptionId={cookieStore.get(`voted_${poll.id}`)?.value}
          />
        ))}
        {polls.length === 0 && (
          <p className="text-neutral-500">No polls yet.</p>
        )}
      </div>
    </div>
  );
}
