import type { ReactNode } from "react";

const sprocketStyle = {
  backgroundImage:
    "repeating-linear-gradient(90deg, var(--surface-deep) 0 6px, transparent 6px 16px)",
};

export function FilmStripCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[10px] border-[3px] border-mustard bg-surface px-9 py-7">
      <div
        className="absolute inset-x-6 top-0 h-2"
        style={sprocketStyle}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-6 bottom-0 h-2"
        style={sprocketStyle}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
