import Link from "next/link";
import type { Metadata } from "next";
import { getAllWritings } from "@/lib/writings";

export const metadata: Metadata = {
  title: "Writings",
};

export default async function WritingsPage() {
  const writings = await getAllWritings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-black tracking-tight text-white">Writings</h1>
      <p className="mt-2 text-neutral-400">
        Essays and running commentary on the current state of things.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {writings.map((writing) => (
          <article key={writing.slug} className="border-b border-white/10 pb-8">
            <h2 className="text-xl font-bold text-white">
              <Link href={`/writings/${writing.slug}`} className="hover:underline">
                {writing.title}
              </Link>
            </h2>
            <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
              {writing.date} &middot; {writing.readingTime}
            </p>
            <p className="mt-3 text-neutral-300">{writing.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
