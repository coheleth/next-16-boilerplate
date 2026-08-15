import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Markdown } from "@/components/markdown";

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

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getItem({ params: { slug } });

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <Markdown>{content}</Markdown>
    </article>
  );
}
