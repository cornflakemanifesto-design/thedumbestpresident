import { getRoastVideos } from "@/lib/videos";
import { getSiteCopy } from "@/lib/site-copy";
import { PageHeader } from "@/components/PageHeader";
import { FilmStripCard } from "@/components/FilmStripCard";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["roast.heading"] };
}

export default async function RoastPage() {
  const [videos, copy] = await Promise.all([getRoastVideos(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader heading={copy["roast.heading"]} description={copy["roast.description"]} />

      <div className="flex flex-col gap-14">
        {videos.map((video, i) => (
          <FilmStripCard key={video.id}>
            <p className="text-xs font-bold tracking-[0.2em] text-marquee-red uppercase">
              Feature No. {i + 1}
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-wide text-mustard">
              {video.title}
            </h2>

            {video.youtubeId ? (
              <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-mustard/40">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="mt-4 flex aspect-video items-center justify-center rounded-lg border border-dashed border-mustard/40 text-sm text-foreground/50">
                No video linked yet
              </div>
            )}

            <ul className="mt-5 space-y-2 border-l-2 border-marquee-red pl-4">
              {video.commentary.map((line, j) => (
                <li key={j} className="text-sm text-foreground/80 italic">
                  &ldquo;{line}&rdquo;
                </li>
              ))}
            </ul>
          </FilmStripCard>
        ))}
        {videos.length === 0 && (
          <p className="text-foreground/50">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
