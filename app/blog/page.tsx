import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import type { Frontmatter } from "@/collections/collections";

const itemsPath = path.join(process.cwd(), "collections/blog");

async function getItems({
  params: { pageNumber, searchQuery, tagFilter },
}: {
  params: {
    pageNumber: string;
    searchQuery: string;
    tagFilter: string;
  };
}) {
  const page = parseInt(pageNumber);

  const files = fs.readdirSync(itemsPath);

  const allItems = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`${itemsPath}/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  let items = allItems;

  if (searchQuery != "") {
    items = items.filter((post) => {
      return [
        post.frontmatter.title || "",
        post.frontmatter.summary || "",
        (post.frontmatter.tags || []).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }

  if (tagFilter != "") {
    items = items.filter((post) => {
      return (post.frontmatter.tags || []).includes(tagFilter);
    });
  }

  const pageItems = [];
  for (let i = 0; i < items.length; i += 3) {
    pageItems.push(items.slice(i, i + 3));
  }

  return {
    items: pageItems[page - 1],
    pages: pageItems.length,
    currentPage: page,
  };
}

export default async function Blog(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      tag?: string;
      page?: string;
    }>;
  }>,
) {
  const searchParams = await props.searchParams;
  const pageNumber = (Number(searchParams?.page) || 1).toString();
  const searchQuery = searchParams?.query || "";
  const tagFilter = searchParams?.tag || "";

  const { items, pages, currentPage } = await getItems({
    params: { pageNumber, searchQuery, tagFilter },
  });

  return (
    <>
      {items?.map(
        ({ slug, frontmatter }: { slug: string; frontmatter: Frontmatter }) => (
          <Link key={slug} href={`blog/${slug}`}>
            {frontmatter.title}
          </Link>
        ),
      )}
    </>
  );
}
