import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { getRoastVideo } from "@/lib/videos";
import { updateVideo } from "../actions";
import { AdminField, inputClass, textareaClass, buttonClass } from "@/components/admin/AdminField";

export default async function EditVideoPage(props: PageProps<"/admin/videos/[id]">) {
  await requireAdmin();
  const { id } = await props.params;
  const video = await getRoastVideo(id);

  if (!video) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit video</h1>
      <form
        action={updateVideo.bind(null, video.id)}
        className="mt-6 flex max-w-2xl flex-col gap-4"
      >
        <AdminField label="Title">
          <input name="title" defaultValue={video.title} required className={inputClass} />
        </AdminField>
        <AdminField label="YouTube URL or video ID">
          <input name="youtubeId" defaultValue={video.youtubeId} required className={inputClass} />
        </AdminField>
        <AdminField label="Commentary (one line per remark)">
          <textarea
            name="commentary"
            defaultValue={video.commentary.join("\n")}
            className={textareaClass}
          />
        </AdminField>
        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
