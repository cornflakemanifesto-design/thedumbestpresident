import type { SiteCopy } from "@/lib/site-copy";

export function Footer({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-8 text-sm text-neutral-500">
      <div className="mx-auto max-w-5xl px-6">
        <p>{copy["site.footerDisclaimer"]}</p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} {copy["site.title"]}.
        </p>
      </div>
    </footer>
  );
}
