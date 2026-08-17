//----------------------------------------------------------------------------
// Simple home page, listing the three latest posts
//----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/navbar";
import { getFilteredItems } from "@/collections/collections";

import { Frontmatter } from "@/collections/collections";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <ul className="p-2">
        {items?.map(
          ({
            slug,
            frontmatter,
          }: {
            slug: string;
            frontmatter: Frontmatter;
          }) => (
            <li key={slug}>
              <article>
                <Link href={`blog/${slug}`}>{frontmatter.title}</Link>
              </article>
            </li>
          ),
        )}
      </ul>
    </>
  );
}
