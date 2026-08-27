import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getGalleryItem } from "@/lib/gallery";
import { updateGalleryItem } from "../actions";
import { AdminField, inputClass, buttonClass } from "@/components/admin/AdminField";

export default async function EditGalleryItemPage(props: PageProps<"/admin/gallery/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const item = await getGalleryItem(id);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit photo</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.caption} className="mt-4 max-w-xs rounded-lg" />
      <form
        action={updateGalleryItem.bind(null, item.id)}
        encType="multipart/form-data"
        className="mt-6 flex max-w-xl flex-col gap-4"
      >
        <AdminField label="Replace image (optional, up to ~4MB)">
          <input name="image" type="file" accept="image/*" className="text-sm text-neutral-300" />
        </AdminField>
        <AdminField label="Caption">
          <input name="caption" defaultValue={item.caption} required className={inputClass} />
        </AdminField>
        <AdminField label="Credit (optional)">
          <input name="credit" defaultValue={item.credit ?? ""} className={inputClass} />
        </AdminField>
        <AdminField label="Date">
          <input name="date" type="date" defaultValue={item.date} required className={inputClass} />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
