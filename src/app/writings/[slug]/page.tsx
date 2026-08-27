import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getWritingSlugs,
  getWritingSource,
  type WritingFrontmatter,
} from "@/lib/writings";

export async function generateStaticParams() {
  const slugs = await getWritingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;

  try {
    const source = await getWritingSource(slug);
    const { frontmatter } = await compileMDX<WritingFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });
    return { title: frontmatter.title, description: frontmatter.excerpt };
  } catch {
    return {};
  }
}

export default async function WritingPage(props: PageProps<"/writings/[slug]">) {
  const { slug } = await props.params;

  let source: string;
  try {
    source = await getWritingSource(slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<WritingFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
        {frontmatter.date}
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
        {frontmatter.title}
      </h1>
      <div className="prose-writing mt-8">{content}</div>
    </article>
  );
}
