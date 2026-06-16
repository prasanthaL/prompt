import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { getAllPrompts } from "@/lib/json-db";
import BrowseClient from "./BrowseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Free Gemini AI Image Prompts",
  description:
    "Browse 1,000+ free Gemini AI image prompts. Explore cinematic, anime, fantasy, realistic, photography, fashion, and creative prompt collections.",

  alternates: {
    canonical: "/browse",
  },

  openGraph: {
    title: "Browse Free Gemini AI Image Prompts",
    description:
      "Explore thousands of free Gemini AI image prompts organized by style and category.",
    url: "https://www.aipromptnest.com/browse",
    type: "website",
    siteName: "AIPromptNest",
    images: [
      {
        url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
        width: 1200,
        height: 630,
        alt: "Browse Free Gemini AI Image Prompts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Browse Free Gemini AI Image Prompts",
    description:
      "Explore thousands of free Gemini AI image prompts organized by style and category.",
    images: [
      "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Browse Free Gemini AI Image Prompts",
  description:
    "Browse thousands of free Gemini AI image prompts organized by category and style.",
  url: "https://www.aipromptnest.com/browse",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: "https://www.aipromptnest.com",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.aipromptnest.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Browse Prompts",
      item: "https://www.aipromptnest.com/browse",
    },
  ],
};



export default async function BrowsePage() {
  const prompts = await getAllPrompts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <main className="min-h-screen mesh-gradient">
        <Navbar />
        <Suspense fallback={<div className="pt-32 text-center text-white/40">Loading...</div>}>
          <BrowseClient initialPrompts={prompts} />
        </Suspense>
      </main>
    </>

  );
}
