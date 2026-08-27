import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getWriting } from "@/lib/writings";
import { updateWriting } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function EditWritingPage(props: PageProps<"/admin/writings/[slug]">) {
  await requireAdmin();
  const { slug } = await props.params;
  const writing = await getWriting(slug);

  if (!writing) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit writing</h1>
      <form
        action={updateWriting.bind(null, writing.slug)}
        className="mt-6 flex max-w-2xl flex-col gap-4"
      >
        <AdminField label="Title">
          <input name="title" defaultValue={writing.title} required className={inputClass} />
        </AdminField>
        <AdminField label="Date">
          <input
            name="date"
            type="date"
            defaultValue={writing.date}
            required
            className={inputClass}
          />
        </AdminField>
        <AdminField label="Excerpt">
          <input name="excerpt" defaultValue={writing.excerpt} className={inputClass} />
        </AdminField>
        <AdminField label="Tags (comma-separated)">
          <input name="tags" defaultValue={writing.tags.join(", ")} className={inputClass} />
        </AdminField>
        <AdminField label="Body (Markdown / MDX)">
          <textarea name="body" defaultValue={writing.body} className={textareaClass} />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
