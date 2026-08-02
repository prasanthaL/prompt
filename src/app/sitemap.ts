import { MetadataRoute } from "next";
import { getAllPrompts } from "@/lib/json-db";
import { categoryToSlug } from "@/lib/category-slugs";
import blogJsonData from "@/data/blog.json";
import categories from "@/data/categories.json";

const siteUrl = "https://www.aipromptnest.com";

export const revalidate = 86400; // regenerate sitemap at most once per day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a stable fallback date — don't use new Date() which changes on every
  // request and tells crawlers the whole site changed every time.
  const stableFallback = "2025-01-01T00:00:00.000Z";

  /* Static routes */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: stableFallback,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/browse`,
      lastModified: stableFallback,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: stableFallback,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/trending`,
      lastModified: stableFallback,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/premium`,
      lastModified: stableFallback,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: stableFallback,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /* Category routes — read directly from the known categories list */
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categories/${categoryToSlug(cat.name)}`,
    lastModified: stableFallback,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  /* Blog post routes — dynamic active blogs */
  const blogRoutes: MetadataRoute.Sitemap = blogJsonData.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : stableFallback,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* Prompt routes — read directly from JSON files */
  const allPrompts = await getAllPrompts();
  const promptRoutes: MetadataRoute.Sitemap = allPrompts
    .filter((p) => p.slug || p.id)
    .map((p) => ({
      url: `${siteUrl}/prompts/${p.slug || p.id}`,
      lastModified: p.updatedAt || p.createdAt || stableFallback,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes, ...promptRoutes];
}
