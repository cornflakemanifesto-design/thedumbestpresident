import Link from "next/link";
import type { SiteCopy } from "@/lib/site-copy";

export function Nav({ copy }: { copy: SiteCopy }) {
  const links = [
    { href: "/writings", label: copy["nav.writings"] },
    { href: "/gallery", label: copy["nav.gallery"] },
    { href: "/roast", label: copy["nav.roast"] },
    { href: "/polls", label: copy["nav.polls"] },
  ];

  return (
    <header className="border-b border-white/10 bg-neutral-950">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight text-orange-500">
            {copy["site.title"]}
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
