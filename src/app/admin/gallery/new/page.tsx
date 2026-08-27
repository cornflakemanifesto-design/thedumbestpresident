import { requireAdmin } from "@/lib/require-admin";
import { createGalleryItem } from "../actions";
import { AdminField, inputClass, buttonClass } from "@/components/admin/AdminField";

export default async function NewGalleryItemPage(props: PageProps<"/admin/gallery/new">) {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === "missing-image";

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add photo</h1>
      {hasError && (
        <p className="mt-2 text-sm text-red-400">Please choose an image file.</p>
      )}
      <form
        action={createGalleryItem}
        encType="multipart/form-data"
        className="mt-6 flex max-w-xl flex-col gap-4"
      >
        <AdminField label="Image (up to ~4MB)">
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="text-sm text-neutral-300"
          />
        </AdminField>
        <AdminField label="Caption">
          <input name="caption" required className={inputClass} />
        </AdminField>
        <AdminField label="Credit (optional)">
          <input name="credit" className={inputClass} placeholder="e.g. Official White House Photo by ..." />
        </AdminField>
        <AdminField label="Date">
          <input name="date" type="date" defaultValue={today} required className={inputClass} />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Upload
        </button>
      </form>
    </div>
  );
}
