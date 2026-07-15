import { MetadataRoute } from "next";
import { getAllPrompts } from "@/lib/json-db";
import blogJsonData from "@/data/blog.json";
import categories from "@/data/categories.json";

const siteUrl = "https://www.aipromptnest.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
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
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /* Category routes — read directly from the known categories list */
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categories/${encodeURIComponent(cat.name.toLowerCase())}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  /* Blog post routes — dynamic active blogs */
  const blogRoutes: MetadataRoute.Sitemap = blogJsonData.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* Prompt routes — read directly from JSON files */
  const allPrompts = await getAllPrompts();
  const promptRoutes: MetadataRoute.Sitemap = allPrompts
    .filter((p) => p.slug || p.id)
    .map((p) => ({
      url: `${siteUrl}/prompts/${p.slug || p.id}`,
      lastModified: p.updatedAt || p.createdAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes, ...promptRoutes];
}
