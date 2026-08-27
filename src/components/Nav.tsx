import Link from "next/link";
import type { SiteCopy } from "@/lib/site-copy";
import { TicketIcon } from "./icons";

export function Nav({ copy }: { copy: SiteCopy }) {
  const links = [
    { href: "/writings", label: copy["nav.writings"] },
    { href: "/gallery", label: copy["nav.gallery"] },
    { href: "/roast", label: copy["nav.roast"] },
    { href: "/polls", label: copy["nav.polls"] },
  ];

  return (
    <header className="border-b-2 border-dashed border-mustard/50 bg-surface-deep">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <TicketIcon className="h-5 w-5 text-mustard" />
          <span className="font-display text-lg tracking-wide text-mustard">
            {copy["site.title"]}
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm font-semibold tracking-wide uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-foreground/80 transition-colors hover:bg-mustard/10 hover:text-mustard"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
