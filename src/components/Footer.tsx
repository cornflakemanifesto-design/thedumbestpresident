import type { SiteCopy } from "@/lib/site-copy";

export function Footer({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="border-t-2 border-dashed border-mustard/50 bg-surface-deep py-8 text-sm text-foreground/60">
      <div className="mx-auto max-w-5xl px-6">
        <p>{copy["site.footerDisclaimer"]}</p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} {copy["site.title"]}.
        </p>
      </div>
    </footer>
  );
}
