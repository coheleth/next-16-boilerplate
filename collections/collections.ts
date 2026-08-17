import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export type Frontmatter = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// Get all items in a collection
export async function getItems(collectionPath: string) {
  const files = fs.readdirSync(collectionPath);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`${collectionPath}/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return posts;
}
// Get items filtered by search query, tag and page
export async function getFilteredItems({
  params: {
    collectionPath,
    pageNumber,
    searchQuery,
    tagFilter,
    itemsPerPage = 3,
  },
}: {
  params: {
    collectionPath: string;
    pageNumber: string;
    searchQuery: string;
    tagFilter: string;
    itemsPerPage?: number;
  };
}) {
  const itemsPath = path.join(process.cwd(), collectionPath);

  const page = parseInt(pageNumber);
  const files = fs.readdirSync(itemsPath);

  // Get all posts
  const allItems = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`${itemsPath}/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  // Filter posts
  let items = allItems;

  //Filter by search query
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

  // Filter by tag category
  if (tagFilter != "") {
    items = items.filter((post) => {
      return (post.frontmatter.tags || []).includes(tagFilter);
    });
  }

  // Paginate
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

// Get a single item in a collection, by slug
export async function getItem({
  params: { collectionPath, slug },
}: {
  params: { collectionPath: string; slug: string };
}) {
  const itemsPath = path.join(process.cwd(), collectionPath);
  const filePath = `${itemsPath}/${slug}.md`;

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileName = fs.readFileSync(filePath, "utf-8");

  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter: frontmatter,
    content: content,
  };
}
