import { MetadataRoute } from "next";
import blogsData from "@/data/blogs.json";

const siteUrl = "https://www.promptvault.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* Static routes */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/browse`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/premium`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  /* Blog post routes */
  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date).toISOString() : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
