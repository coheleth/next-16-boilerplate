//----------------------------------------------------------------------------
// Simple home page, listing the three latest posts
//----------------------------------------------------------------------------

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/navbar";
import { getFilteredItems } from "@/collections/collections";

import { Frontmatter } from "@/collections/collections";

export default async function Home() {
  const { items, pages, currentPage } = await getFilteredItems({
    params: {
      collectionPath: "collections/blog",
      pageNumber: "1",
      searchQuery: "",
      tagFilter: "",
      itemsPerPage: 3,
    },
  });

  return (
    <>
      <Navbar pageName="home" />
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
