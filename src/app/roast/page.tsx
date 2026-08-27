import { getRoastVideos } from "@/lib/videos";
import { getSiteCopy } from "@/lib/site-copy";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["roast.heading"] };
}

export default async function RoastPage() {
  const [videos, copy] = await Promise.all([getRoastVideos(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">
        {copy["roast.heading"]}
      </h1>
      <p className="mt-2 text-neutral-400">{copy["roast.description"]}</p>

      <div className="mt-10 flex flex-col gap-12">
        {videos.map((video) => (
          <div key={video.id}>
            <h2 className="text-lg font-bold text-white">{video.title}</h2>

            {video.youtubeId ? (
              <div className="mt-3 aspect-video overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="mt-3 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/20 bg-neutral-900 text-sm text-neutral-500">
                No video linked yet
              </div>
            )}

            <ul className="mt-4 space-y-2 border-l-2 border-orange-600/50 pl-4">
              {video.commentary.map((line, i) => (
                <li key={i} className="text-sm italic text-neutral-300">
                  &ldquo;{line}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        ))}
        {videos.length === 0 && (
          <p className="text-neutral-500">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
