import { getGalleryItems } from "@/lib/gallery";
import { getSiteCopy } from "@/lib/site-copy";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["gallery.heading"] };
}

const sprocketStyle = {
  backgroundImage:
    "repeating-linear-gradient(90deg, var(--foreground) 0 5px, transparent 5px 13px)",
};

export default async function GalleryPage() {
  const [items, copy] = await Promise.all([getGalleryItems(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader heading={copy["gallery.heading"]} description={copy["gallery.description"]} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg border-2 border-mustard bg-surface"
          >
            <div className="h-1.5 opacity-40" style={sprocketStyle} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.caption}
              className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="h-1.5 opacity-40" style={sprocketStyle} aria-hidden="true" />
            <div className="p-3">
              <p className="text-sm text-foreground/85">{item.caption}</p>
              {item.credit && (
                <p className="mt-1 text-xs text-foreground/50">{item.credit}</p>
              )}
            </div>
          </a>
        ))}
        {items.length === 0 && (
          <p className="text-foreground/50">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
