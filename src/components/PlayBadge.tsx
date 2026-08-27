export function PlayBadge({ size = 64 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-marquee-red"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 24 24"
        className="fill-foreground"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
