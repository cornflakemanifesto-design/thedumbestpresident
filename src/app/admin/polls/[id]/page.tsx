import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getPollDefinition } from "@/lib/polls";
import { updatePoll } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function EditPollPage(props: PageProps<"/admin/polls/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const poll = await getPollDefinition(id);

  if (!poll) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit poll</h1>
      <form
        action={updatePoll.bind(null, poll.id)}
        className="mt-6 flex max-w-xl flex-col gap-4"
      >
        <AdminField label="Question">
          <input name="question" defaultValue={poll.question} required className={inputClass} />
        </AdminField>
        <AdminField label="Options (one per line)">
          <textarea
            name="options"
            defaultValue={poll.options.map((o) => o.label).join("\n")}
            className={textareaClass}
            required
          />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
