import Link from "next/link";
import { getGalleryItems } from "@/lib/gallery";
import { requireAdmin } from "@/lib/require-admin";
import { removeGalleryItem } from "./actions";
import { buttonClass, dangerButtonClass, secondaryLinkClass } from "@/components/admin/AdminField";

export default async function AdminGalleryPage() {
  await requireAdmin();
  const items = await getGalleryItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>
        <Link href="/admin/gallery/new" className={buttonClass}>
          Add photo
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-neutral-900 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.caption}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <p className="mt-2 text-sm text-neutral-300">{item.caption}</p>
            <div className="mt-3 flex gap-2">
              <Link href={`/admin/gallery/${item.id}`} className={secondaryLinkClass}>
                Edit
              </Link>
              <form action={removeGalleryItem.bind(null, item.id)}>
                <button type="submit" className={dangerButtonClass}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-neutral-500">No photos yet.</p>}
      </div>
    </div>
  );
}
