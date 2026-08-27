type IconProps = { className?: string };

export function TicketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M3 8a2 2 0 100 4v3a1 1 0 001 1h16a1 1 0 001-1v-3a2 2 0 100-4V5a1 1 0 00-1-1H4a1 1 0 00-1 1z" />
    </svg>
  );
}

export function DispatchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 19.5V5a2 2 0 012-2h9l5 5v11.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19.5z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function BallotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}
