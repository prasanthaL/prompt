/**
 * /prompts/[slug]/page.tsx
 *
 * Server Component — pre-rendered at build time (SSG) via generateStaticParams.
 * Data is sourced directly from raw JSON files through prompts-data.ts;
 * no API routes and no runtime filesystem reads beyond the cache.
 *
 * ISR: pages automatically revalidate every hour so newly added prompts
 * appear without a full redeploy. Cache can also be purged on-demand via
 * the `prompts` tag using revalidateTag('prompts').
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

import Navbar from "@/components/Navbar";
import RelatedPrompts from "@/components/RelatedPrompts";
import Footer from "@/components/Footer";

// Collocated client shell (handles copy, share, framer-motion, etc.)
import PromptDetailClient from "./PromptDetailClient";

// Pure build-time JSON data — no fs, no API routes
import {
  getAllPromptSlugs,
  getPromptBySlugOrIdSync,
  getCachedPromptBySlugOrId,
  getCachedSimilarPrompts,
} from "@/lib/prompts-data";

/* ─────────────────────────────────────────────────────────────
   ISR: revalidate static pages every hour.
   Cache can be purged instantly via revalidateTag('prompts').
   ───────────────────────────────────────────────────────────── */
export const revalidate = 3600;

/* ─────────────────────────────────────────────────────────────
   SSG: emit one static page for every prompt slug at build time
   ───────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return getAllPromptSlugs().map((slug) => ({ slug }));
}

// Allow runtime fallback for slugs not pre-rendered (e.g. newly added prompts)
export const dynamicParams = true;

/* ─────────────────────────────────────────────────────────────
   Per-page SEO metadata (title, description, Open Graph, Twitter)
   ───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlugOrIdSync(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found | PromptNest",
      description: "The requested AI prompt could not be found.",
      robots: { index: false },
    };
  }

  // Build a concise, keyword-rich description: lead with title + category,
  // then append a short excerpt of the actual prompt text.
  const excerpt =
    prompt.fullPrompt.length > 110
      ? prompt.fullPrompt.slice(0, 107) + "…"
      : prompt.fullPrompt;
  const description = `${prompt.title} — a ${prompt.category} AI prompt by ${prompt.author}. ${excerpt}`;
  const metaDescription =
    description.length > 160 ? description.slice(0, 157) + "…" : description;

  const canonicalSlug = prompt.slug ?? prompt.id;

  return {
    title: `${prompt.title} | PromptNest`,
    description: metaDescription,
    keywords: [
      prompt.title,
      prompt.category,
      "AI prompt",
      "PromptNest",
      ...(prompt.tags ?? []),
      ...(prompt.models ?? []),
    ],
    authors: [{ name: prompt.author }],
    robots: { index: true, follow: true },
    openGraph: {
      title: `${prompt.title} | PromptNest`,
      description: metaDescription,
      type: "article",
      url: `/prompts/${canonicalSlug}`,
      siteName: "PromptNest",
      publishedTime: prompt.createdAt,
      modifiedTime: prompt.updatedAt,
      section: prompt.category,
      tags: prompt.tags,
      images: [
        {
          url: prompt.image,
          width: 1200,
          height: 630,
          alt: `${prompt.title} — ${prompt.category} AI Prompt`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${prompt.title} | PromptNest`,
      description: metaDescription,
      images: [prompt.image],
    },
    alternates: {
      canonical: `/prompts/${canonicalSlug}`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   Page — Server Component, async, no "use client"
   ───────────────────────────────────────────────────────────── */
export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Read from JSON data directly — with caching (module-level + Next.js ISR)
  const prompt = await getCachedPromptBySlugOrId(slug);

  if (!prompt) {
    notFound();
  }

  const similarPrompts = await getCachedSimilarPrompts(prompt.id, prompt.category, 3);

  const canonicalSlug = prompt.slug ?? prompt.id;
  const canonicalUrl = `/prompts/${canonicalSlug}`;

  // Truncate prompt text for structured-data description (≤ 300 chars)
  const sdDescription =
    prompt.fullPrompt.length > 300
      ? prompt.fullPrompt.slice(0, 297) + "…"
      : prompt.fullPrompt;

  /* ── JSON-LD: graph with WebPage + CreativeWork + BreadcrumbList ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${prompt.title} | PromptNest`,
        description: sdDescription,
        inLanguage: "en-US",
        isPartOf: { "@id": "/" },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        datePublished: prompt.createdAt,
        dateModified: prompt.updatedAt,
      },
      {
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#prompt`,
        name: prompt.title,
        description: sdDescription,
        image: prompt.image,
        url: canonicalUrl,
        author: { "@type": "Person", name: prompt.author },
        genre: prompt.category,
        keywords: [
          ...(prompt.tags ?? []),
          prompt.category,
          "AI prompt",
        ].join(", "),
        dateCreated: prompt.createdAt,
        dateModified: prompt.updatedAt,
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: prompt.views,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: prompt.likes,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: prompt.category,
            item: `/browse?category=${encodeURIComponent(prompt.category)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: prompt.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen mesh-gradient">
      {/* Inject JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36">
        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link
              href={`/browse?category=${prompt.category}`}
              className="hover:text-primary transition-colors"
            >
              {prompt.category}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground/40 truncate max-w-[140px]">
              {prompt.title}
            </span>
          </nav>

          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-foreground/60 hover:text-primary transition-all bg-white/[0.03] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/5 w-fit"
          >
            <Search className="w-3.5 h-3.5" />
            Back to Browse
          </Link>
        </div>

        {/* Main detail — client shell (copy/share buttons, animations) */}
        <PromptDetailClient prompt={prompt} />

        {/* Similar Prompts — fully server-rendered */}
        {similarPrompts.length > 0 && (
          <div className="mt-32 space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="w-2 h-10 bg-primary rounded-full" />
                  Similar Prompts
                </h2>
                <p className="text-foreground/40 text-sm">
                  Explore more prompts in the {prompt.category} category
                </p>
              </div>
              <Link
                href="/browse"
                className="text-sm font-bold text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <RelatedPrompts
              sourcePromptId={prompt.id}
              similarPrompts={similarPrompts}
            />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
