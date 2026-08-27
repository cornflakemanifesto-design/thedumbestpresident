import Link from "next/link";
import { getAllWritings, readingTimeFor } from "@/lib/writings";
import { getSiteCopy } from "@/lib/site-copy";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["writings.heading"] };
}

export default async function WritingsPage() {
  const [writings, copy] = await Promise.all([getAllWritings(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader heading={copy["writings.heading"]} description={copy["writings.description"]} />

      <div className="flex flex-col gap-8">
        {writings.map((writing) => (
          <article key={writing.slug} className="border-b border-mustard/20 pb-8">
            <h2 className="font-display text-xl tracking-wide text-foreground">
              <Link href={`/writings/${writing.slug}`} className="hover:text-mustard">
                {writing.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-xs font-semibold tracking-wide text-marquee-red uppercase">
              {writing.date} &middot; {readingTimeFor(writing.body)}
            </p>
            <p className="mt-3 text-foreground/70">{writing.excerpt}</p>
          </article>
        ))}
        {writings.length === 0 && (
          <p className="text-foreground/50">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
