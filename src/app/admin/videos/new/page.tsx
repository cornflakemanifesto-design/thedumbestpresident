import { requireAdmin } from "@/lib/require-admin";
import { createVideo } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function NewVideoPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add video</h1>
      <form action={createVideo} className="mt-6 flex max-w-2xl flex-col gap-4">
        <AdminField label="Title">
          <input name="title" required className={inputClass} />
        </AdminField>
        <AdminField label="YouTube URL or video ID">
          <input name="youtubeId" required className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
        </AdminField>
        <AdminField label="Commentary (one line per remark)">
          <textarea name="commentary" className={textareaClass} />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Add
        </button>
      </form>
    </div>
  );
}
