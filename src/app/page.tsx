import Link from "next/link";
import { getAllWritings } from "@/lib/writings";
import { getSiteCopy } from "@/lib/site-copy";

export default async function Home() {
  const [writings, copy] = await Promise.all([getAllWritings(), getSiteCopy()]);
  const latest = writings[0];

  const sections = [
    {
      href: "/writings",
      title: copy["home.section.writings.title"],
      description: copy["home.section.writings.description"],
    },
    {
      href: "/gallery",
      title: copy["home.section.gallery.title"],
      description: copy["home.section.gallery.description"],
    },
    {
      href: "/roast",
      title: copy["home.section.roast.title"],
      description: copy["home.section.roast.description"],
    },
    {
      href: "/polls",
      title: copy["home.section.polls.title"],
      description: copy["home.section.polls.description"],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          {copy["site.title"]}
        </h1>
        <p className="mt-4 text-lg text-neutral-300">{copy["site.tagline"]}</p>
      </section>

      {latest && (
        <section className="mt-12 rounded-2xl border border-white/10 bg-neutral-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
            {copy["home.latestWritingLabel"]}
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
        {sections.map((section) => (
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
