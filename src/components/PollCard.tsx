import { castVote } from "@/lib/actions";
import type { PollWithResults } from "@/lib/polls";

export function PollCard({
  poll,
  votedOptionId,
}: {
  poll: PollWithResults;
  votedOptionId?: string;
}) {
  const hasVoted = Boolean(votedOptionId);

  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
      <h2 className="text-lg font-bold text-white">{poll.question}</h2>

      <div className="mt-4 flex flex-col gap-3">
        {poll.options.map((option) => {
          const count = poll.counts[option.id] ?? 0;
          const pct = poll.total > 0 ? Math.round((count / poll.total) * 100) : 0;
          const isPick = votedOptionId === option.id;

          if (hasVoted) {
            return (
              <div key={option.id} className="relative overflow-hidden rounded-lg bg-neutral-800">
                <div
                  className="absolute inset-y-0 left-0 bg-orange-600/40"
                  style={{ width: `${pct}%` }}
                />
                <div className="relative flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                  <span className={isPick ? "font-semibold text-white" : "text-neutral-200"}>
                    {option.label}
                    {isPick ? " (your vote)" : ""}
                  </span>
                  <span className="shrink-0 text-neutral-400">
                    {pct}% &middot; {count}
                  </span>
                </div>
              </div>
            );
          }

          const voteWithArgs = castVote.bind(null, poll.id, option.id);
          return (
            <form key={option.id} action={voteWithArgs}>
              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-800 px-4 py-2.5 text-left text-sm text-neutral-100 transition-colors hover:bg-orange-600/30"
              >
                {option.label}
              </button>
            </form>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        {poll.total} vote{poll.total === 1 ? "" : "s"}
      </p>
    </div>
  );
}
