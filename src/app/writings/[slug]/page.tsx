import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getWriting } from "@/lib/writings";

export async function generateMetadata(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = await getWriting(slug);
  if (!writing) return {};
  return { title: writing.title, description: writing.excerpt };
}

export default async function WritingPage(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;
  const writing = await getWriting(slug);

  if (!writing) {
    notFound();
  }

  const { content } = await compileMDX({ source: writing.body });

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-bold tracking-[0.2em] text-marquee-red uppercase">
        {writing.date}
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-wide text-mustard">
        {writing.title}
      </h1>
      <div className="prose-writing mt-8">{content}</div>
    </article>
  );
}
