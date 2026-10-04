import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/prompt-admin/",
          "/prompt-admin/dashboard/",
          "/prompt-admin/prompts/",
          "/prompt-admin/blogs/",
          "/prompt-admin/jackpot/",
          "/discover",
          "/jackpot",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
