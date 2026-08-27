import Link from "next/link";
import { getAllWritings, readingTimeFor } from "@/lib/writings";
import { getSiteCopy } from "@/lib/site-copy";

export async function generateMetadata() {
  const copy = await getSiteCopy();
  return { title: copy["writings.heading"] };
}

export default async function WritingsPage() {
  const [writings, copy] = await Promise.all([getAllWritings(), getSiteCopy()]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">
        {copy["writings.heading"]}
      </h1>
      <p className="mt-2 text-neutral-400">{copy["writings.description"]}</p>

      <div className="mt-10 flex flex-col gap-8">
        {writings.map((writing) => (
          <article key={writing.slug} className="border-b border-white/10 pb-8">
            <h2 className="text-xl font-bold text-white">
              <Link href={`/writings/${writing.slug}`} className="hover:underline">
                {writing.title}
              </Link>
            </h2>
            <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
              {writing.date} &middot; {readingTimeFor(writing.body)}
            </p>
            <p className="mt-3 text-neutral-300">{writing.excerpt}</p>
          </article>
        ))}
        {writings.length === 0 && (
          <p className="text-neutral-500">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
