//----------------------------------------------------------------------------
// Blog post page, with basic markdown formatting and code block
// syntax highlighting.
//----------------------------------------------------------------------------

import fs from "fs";
import Link from "next/link";

import siteInfo from "@/siteinfo";

import Markdown from "@/components/markdown";
import { getItem } from "@/collections/collections";

const collectionPath = "collections/blog";

export async function generateStaticParams() {
  const files = fs.readdirSync(collectionPath);
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
      file: fileName,
    },
  }));
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getItem({ params: { collectionPath, slug } });
  return {
    title: `${frontmatter.title} - ${siteInfo.title}`,
  };
}

export default async function Item({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getItem({
    params: { collectionPath, slug },
  });

  return (
    <article className="m-auto xl:mr-[20vw] max-w-2xl min-w-l">
      <div className="mb-4">
        <h1 className="text-2xl">{frontmatter.title}</h1>
        <em>{frontmatter.summary}</em>
        <div className="space-x-2">
          {frontmatter.tags?.map((tag: string) => (
            <Link href={`/blog?tag=${tag}`} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <Markdown>{content}</Markdown>
    </article>
  );
}
