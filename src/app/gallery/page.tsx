import { getGalleryItems } from "@/lib/gallery";
import { getSiteCopy } from "@/lib/site-copy";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["gallery.heading"] };
}

export default async function GalleryPage() {
  const [items, copy] = await Promise.all([getGalleryItems(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">
        {copy["gallery.heading"]}
      </h1>
      <p className="mt-2 text-neutral-400">{copy["gallery.description"]}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.caption}
              className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-3">
              <p className="text-sm text-neutral-300">{item.caption}</p>
              {item.credit && (
                <p className="mt-1 text-xs text-neutral-500">{item.credit}</p>
              )}
            </div>
          </a>
        ))}
        {items.length === 0 && (
          <p className="text-neutral-500">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
