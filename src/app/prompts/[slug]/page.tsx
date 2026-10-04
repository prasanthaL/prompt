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
import { Search, BookOpen } from "lucide-react";

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

import { shouldIndexPrompt } from "@/lib/seo-utils";
import { getPromptEditorialContent } from "@/lib/prompt-content";

/* ─────────────────────────────────────────────────────────────
   ISR: revalidate static pages every hour.
   Cache can be purged instantly via revalidateTag('prompts').
   ───────────────────────────────────────────────────────────── */
export const revalidate = 86400;

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
      title: "Prompt Not Found | AIPromptNest",
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
  const description = `${prompt.title} — a ${prompt.category} AI image prompt with practical guidance for ${prompt.models?.[0] || "AI image generation"}. ${excerpt}`;
  const metaDescription =
    description.length > 160 ? description.slice(0, 157) + "…" : description;

  const canonicalSlug = prompt.slug ?? prompt.id;

  return {
    title: `${prompt.title} | AIPromptNest`,
    description: metaDescription,
    keywords: [
      prompt.title,
      prompt.category,
      "AI prompt",
      "AIPromptNest",
      ...(prompt.tags ?? []),
      ...(prompt.models ?? []),
    ],
    authors: [{ name: "AIPromptNest Editorial Team" }],
    robots: { index: shouldIndexPrompt(prompt), follow: true },
    openGraph: {
      title: `${prompt.title} | AIPromptNest`,
      description: metaDescription,
      type: "article",
      url: `/prompts/${canonicalSlug}`,
      siteName: "AIPromptNest",
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
      title: `${prompt.title} | AIPromptNest`,
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
  const editorial = getPromptEditorialContent(prompt);
  const promptForClient = {
    ...prompt,
    about: editorial.overview,
    howToUse: editorial.howToUse,
    editorNotes: prompt.editorNotes,
  };

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
        name: `${prompt.title} | AIPromptNest`,
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
        author: { "@type": "Organization", name: "AIPromptNest" },
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
        id="prompt-detail-json-ld"
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
        <PromptDetailClient prompt={promptForClient} />

        {/* Editorial guidance — server rendered so search engines and users can read the useful context without client-side interaction. */}
        {prompt.editorNotes ? (
          <section className="mt-10 mb-16 grid gap-5 lg:grid-cols-2" aria-labelledby="prompt-editorial-heading">
            {/* Overview & Craftsmanship */}
            <div className="prompt-detail-card lg:col-span-2">
              <div className="prompt-detail-card-header">
                <div className="flex items-center gap-2">
                  <div className="prompt-detail-card-icon-wrap bg-primary/10">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 id="prompt-editorial-heading" className="prompt-detail-card-title">Usage &amp; Variation Guide</h2>
                    <p className="prompt-detail-card-subtitle">Technical breakdown of composition, lighting, and variation notes for this specific prompt.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-sm leading-7 text-foreground/75">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-1">What Makes This Prompt Work</h3>
                  <p>{prompt.editorNotes.whyItWorks}</p>
                </div>
              </div>
            </div>

            {/* What to Change for Variations */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h3 className="prompt-detail-card-title">What to Change for Variations</h3>
                <p className="text-xs text-foreground/50">Adaptation guide for subject, setting, and mood</p>
              </div>
              <div className="text-xs leading-relaxed text-foreground/75 space-y-2">
                <p>{prompt.editorNotes.variationGuide}</p>
              </div>
            </div>

            {/* Common Failure Modes & Fixes */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h3 className="prompt-detail-card-title">Common Failure Modes &amp; Fixes</h3>
                <p className="text-xs text-foreground/50">Model quirks and how to counteract them</p>
              </div>
              <div className="text-xs leading-relaxed text-foreground/75 space-y-2">
                <p>{prompt.editorNotes.failureModes}</p>
              </div>
            </div>

            {/* Concrete Example Tweak */}
            <div className="prompt-detail-card lg:col-span-2">
              <div className="prompt-detail-card-header">
                <h3 className="prompt-detail-card-title">Suggested Modification / Concrete Example Tweak</h3>
                <p className="text-xs text-foreground/50">Copy and insert this phrase into the prompt for an instant style variant</p>
              </div>
              <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/[0.04] text-xs font-mono text-primary/90 leading-relaxed">
                {prompt.editorNotes.exampleTweak}
              </div>
            </div>

            {/* Responsible AI Guidance */}
            <div className="prompt-detail-card lg:col-span-2">
              <div className="prompt-detail-card-header">
                <h3 className="prompt-detail-card-title">Responsible Generation Note</h3>
              </div>
              <p className="text-xs leading-relaxed text-foreground/60">
                AI image generations vary between model releases and seed values. When adapting this prompt with face matching or reference photos, ensure you hold appropriate rights for any commercial or public distribution. Always adhere to the content policies of the AI generator service you employ.
              </p>
            </div>
          </section>
        ) : shouldIndexPrompt(prompt) ? (
          <section className="mt-10 mb-16 grid gap-5 lg:grid-cols-2" aria-labelledby="prompt-guide-heading">
            {/* Overview & Craftsmanship */}
            <div className="prompt-detail-card lg:col-span-2">
              <div className="prompt-detail-card-header">
                <div className="flex items-center gap-2">
                  <div className="prompt-detail-card-icon-wrap bg-primary/10"><BookOpen className="w-4 h-4 text-primary" /></div>
                  <div>
                    <h2 id="prompt-guide-heading" className="prompt-detail-card-title">Prompt Guide &amp; Technical Analysis</h2>
                    <p className="prompt-detail-card-subtitle">Detailed breakdown of the composition, lighting, and visual direction used in this prompt.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 text-sm leading-7 text-foreground/75">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-1">What This Prompt Creates</h3>
                  <p>{editorial.whatItCreates}</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-1">Why This Prompt Works</h3>
                  <p>{editorial.whyItWorks}</p>
                </div>
              </div>
            </div>

            {/* Customizable Variables */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h2 className="prompt-detail-card-title">Customizable Variables</h2>
                <p className="text-xs text-foreground/50">Adapt this prompt to your specific project needs</p>
              </div>
              <div className="space-y-3">
                {editorial.customizableVariables.map((v) => (
                  <div key={v.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm">
                    <div className="font-bold text-foreground/90 text-xs uppercase tracking-wide text-primary mb-0.5">{v.name}</div>
                    <p className="text-foreground/70 text-xs leading-relaxed">{v.description}</p>
                    <p className="mt-1 text-[11px] text-foreground/45 italic font-mono bg-white/[0.02] px-2 py-1 rounded">e.g. {v.example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Breakdown */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h2 className="prompt-detail-card-title">Prompt Breakdown</h2>
                <p className="text-xs text-foreground/50">Direct technical instructions extracted from the prompt text</p>
              </div>
              <div className="space-y-4">
                {editorial.breakdown.map((item) => (
                  <div key={`${item.label}-${item.text}`} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <h3 className="mb-1 text-xs font-bold text-primary uppercase tracking-wide">{item.label}</h3>
                    <p className="text-xs leading-relaxed text-foreground/70">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Settings */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h2 className="prompt-detail-card-title">Recommended Generation Settings</h2>
                <p className="text-xs text-foreground/50">Optimal configuration for photographic and stylistic fidelity</p>
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-foreground/70">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-semibold text-foreground/90">Aspect Ratio</span>
                  <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{editorial.recommendedSettings.aspectRatio}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-semibold text-foreground/90">Guidance Scale</span>
                  <span className="font-mono text-foreground/70">{editorial.recommendedSettings.guidanceScale}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="font-semibold text-foreground/90">Style Strength</span>
                  <span className="font-mono text-foreground/70">{editorial.recommendedSettings.styleStrength}</span>
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-foreground/90 block mb-1.5">Suggested Negative Avoidances:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {editorial.recommendedSettings.negativePromptAvoid.map((term) => (
                      <span key={term} className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] text-foreground/60">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Model Compatibility & Tips */}
            <div className="prompt-detail-card">
              <div className="prompt-detail-card-header">
                <h2 className="prompt-detail-card-title">Model Compatibility &amp; Best Practices</h2>
                <p className="text-xs text-foreground/50">How this prompt behaves across popular AI image platforms</p>
              </div>
              <div className="space-y-3 text-xs leading-relaxed mb-4">
                {editorial.modelCompatibility.map((m) => (
                  <div key={m.model} className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <span className="font-bold text-foreground/90 block mb-0.5">{m.model}</span>
                    <span className="text-foreground/60">{m.recommendation}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/5">
                <h3 className="font-bold text-foreground/90 text-xs mb-2">Practical Prompt Tips:</h3>
                <ol className="space-y-2 text-xs text-foreground/65">
                  {editorial.tips.map((item, index) => (
                    <li key={item} className="flex gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Responsible AI Guidance */}
            <div className="prompt-detail-card lg:col-span-2">
              <div className="prompt-detail-card-header">
                <h2 className="prompt-detail-card-title">Responsible Generation Note</h2>
              </div>
              <p className="text-xs leading-relaxed text-foreground/60">
                AI image generations vary between model releases and seed values. When adapting this prompt with face matching or reference photos, ensure you hold appropriate rights for any commercial or public distribution. Always adhere to the content policies of the AI generator service you employ.
              </p>
            </div>
          </section>
        ) : null}

        {/* Similar Prompts — fully server-rendered */}
        {similarPrompts.length > 0 && (
          <div className="my-32 space-y-10">
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
