export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-8 text-sm text-neutral-500">
      <div className="mx-auto max-w-5xl px-6">
        <p>
          Satire and opinion. Not affiliated with any political party, campaign,
          or candidate.
        </p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} The Dumbest President.
        </p>
      </div>
    </footer>
  );
}
