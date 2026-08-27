import Link from "next/link";
import { getAllWritings } from "@/lib/writings";
import { requireAdmin } from "@/lib/require-admin";
import { removeWriting } from "./actions";
import { buttonClass, dangerButtonClass, secondaryLinkClass } from "@/components/admin/AdminField";

export default async function AdminWritingsPage() {
  await requireAdmin();
  const writings = await getAllWritings();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Writings</h1>
        <Link href="/admin/writings/new" className={buttonClass}>
          New writing
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {writings.map((w) => (
          <div
            key={w.slug}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900 p-4"
          >
            <div>
              <p className="font-semibold text-white">{w.title}</p>
              <p className="text-xs text-neutral-500">
                {w.date} &middot; /{w.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/writings/${w.slug}`} className={secondaryLinkClass}>
                Edit
              </Link>
              <form action={removeWriting.bind(null, w.slug)}>
                <button type="submit" className={dangerButtonClass}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {writings.length === 0 && (
          <p className="text-neutral-500">No writings yet.</p>
        )}
      </div>
    </div>
  );
}
