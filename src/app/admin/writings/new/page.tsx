import { requireAdmin } from "@/lib/require-admin";
import { createWriting } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function NewWritingPage(props: PageProps<"/admin/writings/new">) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === "1";

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">New writing</h1>
      {hasError && (
        <p className="mt-2 text-sm text-red-400">Title is required.</p>
      )}
      <form action={createWriting} className="mt-6 flex max-w-2xl flex-col gap-4">
        <AdminField label="Title">
          <input name="title" required className={inputClass} />
        </AdminField>
        <AdminField label="Date">
          <input name="date" type="date" defaultValue={today} required className={inputClass} />
        </AdminField>
        <AdminField label="Excerpt">
          <input name="excerpt" className={inputClass} />
        </AdminField>
        <AdminField label="Tags (comma-separated)">
          <input name="tags" className={inputClass} />
        </AdminField>
        <AdminField label="Body (Markdown / MDX)">
          <textarea name="body" className={textareaClass} />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Publish
        </button>
      </form>
    </div>
  );
}
