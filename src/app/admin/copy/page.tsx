import { requireAdmin } from "@/lib/require-admin";
import { getSiteCopy, SITE_COPY_GROUPS } from "@/lib/site-copy";
import { updateSiteCopy } from "./actions";
import { AdminField, inputClass, proseTextareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function AdminCopyPage(props: PageProps<"/admin/copy">) {
  await requireAdmin();
  const [copy, searchParams] = await Promise.all([getSiteCopy(), props.searchParams]);
  const saved = searchParams.saved === "1";

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Site text</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Edit any of the copy that appears across the site — nav labels, headings, taglines, descriptions.
      </p>
      {saved && <p className="mt-2 text-sm text-green-400">Saved.</p>}

      <form action={updateSiteCopy} className="mt-6 flex max-w-2xl flex-col gap-8">
        {SITE_COPY_GROUPS.map((group) => (
          <fieldset key={group.label} className="flex flex-col gap-4">
            <legend className="mb-1 text-sm font-bold uppercase tracking-wide text-orange-500">
              {group.label}
            </legend>
            {group.keys.map((key) => {
              const value = copy[key];
              const long = value.length > 80;
              return (
                <AdminField key={key} label={key}>
                  {long ? (
                    <textarea name={key} defaultValue={value} className={proseTextareaClass} />
                  ) : (
                    <input name={key} defaultValue={value} className={inputClass} />
                  )}
                </AdminField>
              );
            })}
          </fieldset>
        ))}
        <button type="submit" className={buttonClass}>
          Save all
        </button>
      </form>
    </div>
  );
}
