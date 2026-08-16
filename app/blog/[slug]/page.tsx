import fs from "fs";
import path from "path";
import matter from "gray-matter";

import siteInfo from "@/siteinfo";

import Navbar from "@/components/navbar";
import Markdown from "@/components/markdown";
import Link from "next/link";

const relativePath = "collections/blog";
const itemsPath = path.join(process.cwd(), relativePath);

type PostParams = {
  params: {
    slug: string;
  };
};

async function getItem({ params: { slug } }: PostParams) {
  const fileName = fs.readFileSync(`${itemsPath}/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter: frontmatter,
    content: content,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(relativePath);
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
  const { frontmatter } = await getItem({ params: { slug } });
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
  const { frontmatter, content } = await getItem({ params: { slug } });

  return (
    <>
      <Navbar pageName="blog" />
      <article>
        <h1>{frontmatter.title}</h1>
        <em>{frontmatter.summary}</em>
        {frontmatter.tags?.map((tag: string) => (
          <Link href={`/blog?tag=${tag}`} key={tag}>
            {tag}
          </Link>
        ))}
        <Markdown>{content}</Markdown>
      </article>
    </>
  );
}
