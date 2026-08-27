import Link from "next/link";
import { getPollsWithResults } from "@/lib/polls";
import { requireAdmin } from "@/lib/require-admin";
import { removePoll, resetPoll } from "./actions";
import { buttonClass, dangerButtonClass, secondaryLinkClass } from "@/components/admin/AdminField";

export default async function AdminPollsPage() {
  await requireAdmin();
  const polls = await getPollsWithResults();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Polls</h1>
        <Link href="/admin/polls/new" className={buttonClass}>
          New poll
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {polls.map((poll) => (
          <div key={poll.id} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{poll.question}</p>
                <p className="text-xs text-neutral-500">
                  {poll.options.length} options &middot; {poll.total} votes
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/polls/${poll.id}`} className={secondaryLinkClass}>
                  Edit
                </Link>
                <form action={resetPoll.bind(null, poll.id)}>
                  <button type="submit" className={secondaryLinkClass}>
                    Reset votes
                  </button>
                </form>
                <form action={removePoll.bind(null, poll.id)}>
                  <button type="submit" className={dangerButtonClass}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {polls.length === 0 && <p className="text-neutral-500">No polls yet.</p>}
      </div>
    </div>
  );
}
