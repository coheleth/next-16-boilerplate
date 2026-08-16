import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import { Pagination } from "@/components/pagination";

import type { Frontmatter } from "@/collections/collections";
import Navbar from "@/components/navbar";
import { SearchBox } from "@/components/searchbox";

const itemsPath = path.join(process.cwd(), "collections/blog");

export async function getItems({
  params: { pageNumber, searchQuery, tagFilter, itemsPerPage = 3 },
}: {
  params: {
    pageNumber: string;
    searchQuery: string;
    tagFilter: string;
    itemsPerPage?: number;
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
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pageItems.push(items.slice(i, i + itemsPerPage));
  }

  return {
    items: pageItems[page - 1],
    pages: pageItems.length,
    currentPage: page,
  };
}

export async function generateMetadata(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      tag?: string;
      page?: string;
    }>;
  }>,
) {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || "";
  const tagFilter = searchParams?.tag || "";

  let pageName = "Blog";
  let tagName = "";

  if (tagFilter != "") {
    pageName = "Blog posts";
    tagName = `with the tag "${tagFilter}"`;
  }

  if (searchQuery != "") {
    pageName = `Search results for "${searchQuery}"`;
  }

  const title = [pageName, tagName, `\u2014 page ${pageNumber}`].join(" ");
  return { title: title };
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
  const itemsPerPage = 4;

  const { items, pages, currentPage } = await getItems({
    params: { pageNumber, searchQuery, tagFilter, itemsPerPage },
  });

  return (
    <>
      <Navbar pageName="blog" />

      <SearchBox placeholder="Search blog..." pathname="/blog" />
      {items?.map(
        ({ slug, frontmatter }: { slug: string; frontmatter: Frontmatter }) => (
          <Link key={slug} href={`blog/${slug}`}>
            {frontmatter.title}
          </Link>
        ),
      )}

      <Pagination
        pages={pages}
        currentPage={currentPage}
        rootHref={"blog"}
        query={searchQuery}
      />
    </>
  );
}
