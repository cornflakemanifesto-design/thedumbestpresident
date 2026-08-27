import Link from "next/link";
import { getAllWritings } from "@/lib/writings";

const SECTIONS = [
  {
    href: "/writings",
    title: "Writings",
    description: "Essays and running commentary on the current state of things.",
  },
  {
    href: "/gallery",
    title: "Gallery",
    description: "Photos of Donald Trump looking, saying, or doing something dumb.",
  },
  {
    href: "/roast",
    title: "The Roast",
    description: "Video clips with running commentary, MST3K-style.",
  },
  {
    href: "/polls",
    title: "Polls",
    description: "Vote on the dumbest moments, and settle who's dumber than who.",
  },
];

export default async function Home() {
  const writings = await getAllWritings();
  const latest = writings[0];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          The Dumbest President
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          A running, always-evolving exhibition of the Trump presidencies —
          the dumbest chapter in American political history, documented in
          real time.
        </p>
      </section>

      {latest && (
        <section className="mt-12 rounded-2xl border border-white/10 bg-neutral-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            Latest writing
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            <Link href={`/writings/${latest.slug}`} className="hover:underline">
              {latest.title}
            </Link>
          </h2>
          <p className="mt-2 text-neutral-400">{latest.excerpt}</p>
        </section>
      )}

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-colors hover:border-orange-500/50"
          >
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400">
              {section.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400">{section.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
