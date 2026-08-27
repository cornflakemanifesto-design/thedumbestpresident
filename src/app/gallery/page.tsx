import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">Gallery</h1>
      <p className="mt-2 text-neutral-400">
        Photos of Donald Trump looking, saying, or doing something dumb.
      </p>

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
      </div>
    </div>
  );
}
