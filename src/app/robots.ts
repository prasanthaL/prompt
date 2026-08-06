import { MetadataRoute } from "next";

const siteUrl = "https://www.aipromptnest.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/prasa/",
          "/api/"
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
