//----------------------------------------------------------------------------
// Sitemap.xml file generator. Be sure to modify the collections as needed.
//----------------------------------------------------------------------------

import type { MetadataRoute } from "next";

import { getItems } from "@/collections/collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getItems("collections/blog");

  const postList = posts.map((post) => ({
    url: `${process.env.PUBLIC_DOMAIN}/blog/${[post.slug]}`,
    lastModified: post.frontmatter.date,
    priority: 0.6,
  }));

  const pageList = [
    {
      url: `${process.env.PUBLIC_DOMAIN}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.PUBLIC_DOMAIN}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  return pageList.concat(postList);
}
