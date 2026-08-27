import { requireAdmin } from "@/lib/require-admin";
import { createPoll } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function NewPollPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">New poll</h1>
      <form action={createPoll} className="mt-6 flex max-w-xl flex-col gap-4">
        <AdminField label="Question">
          <input name="question" required className={inputClass} />
        </AdminField>
        <AdminField label="Options (one per line)">
          <textarea name="options" className={textareaClass} required />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Create
        </button>
      </form>
    </div>
  );
}
