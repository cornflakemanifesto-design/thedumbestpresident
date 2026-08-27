import { cookies } from "next/headers";
import { getPollsWithResults } from "@/lib/polls";
import { getSiteCopy } from "@/lib/site-copy";
import { PollCard } from "@/components/PollCard";
import { PageHeader } from "@/components/PageHeader";

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
      <PageHeader heading={copy["polls.heading"]} description={copy["polls.description"]} />

      <div className="flex flex-col gap-6">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            votedOptionId={cookieStore.get(`voted_${poll.id}`)?.value}
          />
        ))}
        {polls.length === 0 && (
          <p className="text-foreground/50">No polls yet.</p>
        )}
      </div>
    </div>
  );
}
