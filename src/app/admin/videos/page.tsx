import Link from "next/link";
import { getRoastVideos } from "@/lib/videos";
import { requireAdmin } from "@/lib/require-admin";
import { removeVideo } from "./actions";
import { buttonClass, dangerButtonClass, secondaryLinkClass } from "@/components/admin/AdminField";

export default async function AdminVideosPage() {
  await requireAdmin();
  const videos = await getRoastVideos();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Videos</h1>
        <Link href="/admin/videos/new" className={buttonClass}>
          Add video
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900 p-4"
          >
            <div>
              <p className="font-semibold text-white">{v.title}</p>
              <p className="text-xs text-neutral-500">
                {v.youtubeId || "no video id"} &middot; {v.commentary.length} lines
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/videos/${v.id}`} className={secondaryLinkClass}>
                Edit
              </Link>
              <form action={removeVideo.bind(null, v.id)}>
                <button type="submit" className={dangerButtonClass}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {videos.length === 0 && <p className="text-neutral-500">No videos yet.</p>}
      </div>
    </div>
  );
}
