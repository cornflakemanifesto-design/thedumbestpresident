export function PageHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="mb-10 border-b-2 border-dashed border-mustard/40 pb-6">
      <h1 className="font-display text-3xl tracking-wide text-mustard sm:text-4xl">
        {heading}
      </h1>
      <p className="mt-2 text-foreground/70">{description}</p>
    </div>
  );
}
