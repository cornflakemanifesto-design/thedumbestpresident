import Link from "next/link";
import { getAllWritings } from "@/lib/writings";
import { getSiteCopy } from "@/lib/site-copy";
import { SilhouetteStrip } from "@/components/SilhouetteStrip";
import { FilmStripCard } from "@/components/FilmStripCard";
import { DispatchIcon, CameraIcon, BallotIcon } from "@/components/icons";
import { PlayBadge } from "@/components/PlayBadge";

export default async function Home() {
  const [writings, copy] = await Promise.all([getAllWritings(), getSiteCopy()]);
  const latest = writings[0];

  const sections = [
    {
      href: "/writings",
      title: copy["home.section.writings.title"],
      description: copy["home.section.writings.description"],
      icon: DispatchIcon,
      tone: "mustard" as const,
    },
    {
      href: "/gallery",
      title: copy["home.section.gallery.title"],
      description: copy["home.section.gallery.description"],
      icon: CameraIcon,
      tone: "red" as const,
    },
    {
      href: "/roast",
      title: copy["home.section.roast.title"],
      description: copy["home.section.roast.description"],
      icon: null,
      tone: "mustard" as const,
    },
    {
      href: "/polls",
      title: copy["home.section.polls.title"],
      description: copy["home.section.polls.description"],
      icon: BallotIcon,
      tone: "red" as const,
    },
  ];

  return (
    <div>
      {/* hero with spotlight */}
      <section className="relative overflow-hidden px-6 pt-20 pb-12 text-center">
        <div
          className="pointer-events-none absolute top-[-160px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(52% 0.19 25 / 0.35), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <p className="relative text-xs font-bold tracking-[0.25em] text-mustard uppercase">
          Now Showing &mdash; Satire &amp; Opinion
        </p>
        <h1 className="relative mt-4 font-display text-4xl leading-tight tracking-wide text-mustard drop-shadow-[4px_4px_0_oklch(52%_0.19_25_/_0.8)] sm:text-6xl">
          {copy["site.title"]}
        </h1>
        <p className="relative mx-auto mt-5 max-w-xl text-base text-foreground/85 sm:text-lg">
          {copy["site.tagline"]}
        </p>
      </section>

      <SilhouetteStrip />

      <div className="mx-auto max-w-5xl px-6 py-12">
        {latest && (
          <FilmStripCard>
            <p className="text-xs font-bold tracking-[0.2em] text-marquee-red uppercase">
              {copy["home.latestWritingLabel"]}
            </p>
            <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
              <Link href={`/writings/${latest.slug}`} className="hover:underline">
                {latest.title}
              </Link>
            </h2>
            <p className="mt-3 text-foreground/75">{latest.excerpt}</p>
          </FilmStripCard>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isMustard = section.tone === "mustard";
            return (
              <Link
                key={section.href}
                href={section.href}
                className="rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
                style={{
                  background: isMustard ? "var(--mustard)" : "var(--marquee-red)",
                  color: isMustard ? "var(--surface-deep)" : "var(--foreground)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  {Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <PlayBadge size={22} />
                  )}
                  <h3 className="font-display text-base tracking-wide">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-sm leading-snug">{section.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
