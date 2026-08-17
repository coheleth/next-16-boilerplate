//----------------------------------------------------------------------------
// Blog post listing page, filtering posts by search query and tag.
// Features a post list and search bar.
//----------------------------------------------------------------------------

import Link from "next/link";

import Pagination from "@/components/pagination";
import Navbar from "@/components/navbar";
import { SearchBox } from "@/components/searchbox";
import { getFilteredItems } from "@/collections/collections";

import type { Frontmatter } from "@/collections/collections";

const collectionPath = "collections/blog";

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
  const searchQuery = searchParams?.query || "";
  const tagFilter = searchParams?.tag || "";

  const pageNumber = (Number(searchParams?.page) || 1).toString();
  const itemsPerPage = 4;

  const { items, pages, currentPage } = await getFilteredItems({
    params: {
      collectionPath,
      pageNumber,
      searchQuery,
      tagFilter,
      itemsPerPage,
    },
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
