import type { ReactNode } from "react";

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-300">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-orange-500/50";
export const textareaClass = `${inputClass} min-h-32 font-mono`;
export const proseTextareaClass = `${inputClass} min-h-20`;
export const buttonClass =
  "self-start rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-500";
export const secondaryLinkClass =
  "rounded-full px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white";
export const dangerButtonClass =
  "rounded-full px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/10";
