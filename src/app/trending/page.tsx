import { getTrendingPrompts, getAllPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrendingClient, { CATEGORY_DISPLAY_NAMES } from "./TrendingClient";
import Link from "next/link";
import {
  TrendingUp,
  Eye,
  Heart,
  Users,
  Star,
  ChevronRight,
  Plus,
  Minus,
  Zap,
  Award,
  BookOpen,
} from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending AI Prompts (Updated Daily) | AI Prompt Nest",
  description:
    "Discover the most popular AI prompts trending right now. Explore top-rated ChatGPT, Gemini, Midjourney, Claude, and image generation prompts used by creators, marketers, developers, and designers.",

  keywords: [
    "trending AI prompts",
    "popular AI prompts",
    "best AI prompts",
    "ChatGPT prompts",
    "Gemini prompts",
    "Midjourney prompts",
    "Claude prompts",
    "AI image prompts",
    "AI prompt library",
    "AI prompt collection",
    "viral AI prompts",
    "prompt engineering",
    "free AI prompts",
    "top AI prompts",
    "AI Prompt Nest",
  ],

  alternates: {
    canonical: "https://www.aipromptnest.com/trending",
  },

  openGraph: {
    title: "Trending AI Prompts (Updated Daily) | AI Prompt Nest",
    description:
      "Browse the most viewed and liked AI prompts trending this week. Find top ChatGPT, Gemini, Claude, and Midjourney prompts in one place.",
    url: "https://www.aipromptnest.com/trending",
    siteName: "AI Prompt Nest",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
        width: 1200,
        height: 630,
        alt: "Trending AI Prompts - AI Prompt Nest",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trending AI Prompts (Updated Daily) | AI Prompt Nest",
    description:
      "Discover today's most popular AI prompts for ChatGPT, Gemini, Claude, Midjourney, and more.",
    images: ["https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Technology",
};

const FAQS = [
  {
    q: "What are trending AI prompts?",
    a: "Trending AI prompts are the most viewed and liked prompts in our community right now. They're selected based on real-time engagement including views, likes, saves, and community interaction.",
  },
  {
    q: "How are prompts ranked?",
    a: "Prompts are ranked using a combination of views, likes, saves, and recency. Our algorithm ensures fresh and relevant content always surfaces to the top.",
  },
  {
    q: "Are these prompts free to use?",
    a: "Yes, all prompts on AIPromptNest are completely free to use. You can copy, customize, and use them for your projects without any cost.",
  },
  {
    q: "How often is the list updated?",
    a: "The trending list updates in real-time. We recalculate rankings every few minutes to ensure you always see the freshest and most popular content.",
  },
  {
    q: "Which AI models are supported?",
    a: "We support all major AI models including ChatGPT, Gemini, Claude, Midjourney, DALL·E, Stable Diffusion, and many more.",
  },
  {
    q: "Can I submit my own prompts?",
    a: "Absolutely! Create an account and submit your own prompts. If they gain traction, they might just show up on this trending page.",
  },
];

const EXPLORE_CARDS = [
  {
    icon: Zap,
    title: "Latest Prompts",
    description: "Browse the most recently added prompts",
    href: "/browse",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: Award,
    title: "Top Rated Prompts",
    description: "Browse the highest rated prompts by our team",
    href: "/browse?sort=top",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    icon: Star,
    title: "Featured Prompts",
    description: "Hand-picked prompts by our team",
    href: "/browse?filter=featured",
    color: "from-purple-500/20 to-violet-500/20",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    icon: BookOpen,
    title: "Collections",
    description: "Curated collections for every workflow",
    href: "/categories",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
];

export default async function TrendingPage() {
  // Fetch all trending prompts server-side for total count & SSR of first batch.
  // getAllPrompts reads directly from src/data/prompts/*.json — no API route.
  const [allTrending, allPrompts] = await Promise.all([
    getTrendingPrompts(1000),
    getAllPrompts(),
  ]);

  const trendingCategories = Array.from(
    new Set(allTrending.map((p) => p.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trending AI Prompts",
    description:
      "Explore today's most popular ChatGPT, Gemini AI prompts. These prompts are ranked based on views, likes, and community engagement.",
    url: "https://www.aipromptnest.com/trending",
    numberOfItems: allTrending.length,
    itemListElement: allTrending.map((prompt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.aipromptnest.com/prompts/${prompt.slug || prompt.id}`,
      name: prompt.title,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const dynamicSchemas = [itemListSchema, faqSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicSchemas),
        }}
      />
      <main className="min-h-screen mesh-gradient" style={{ background: "var(--background)" }}>
      <Navbar />

      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-16 px-4 md:px-8">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-foreground/30 uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/50">Trending</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left: Heading */}
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5" />
                Top Performance
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                <span className="text-foreground">Trending AI </span>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary) 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Prompts
                </span>
              </h1>

              <p className="text-foreground/50 max-w-lg text-base leading-relaxed">
                Explore today&apos;s most popular ChatGPT, Gemini, Claude, and Midjourney prompts.
                These prompts are ranked based on views, likes, and community engagement.
              </p>
            </div>

            {/* Right: Stats card + graphic */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Stats pill */}
              <div
                className="rounded-2xl p-5 border text-center min-w-[160px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.1) 100%)",
                  borderColor: "rgba(139,92,246,0.3)",
                }}
              >
                <div className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold mb-1">
                  This Week
                </div>
                <div className="text-3xl font-black text-foreground">
                  {allPrompts.length.toLocaleString()}
                </div>
                <div
                  className="text-xs font-semibold mt-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  Trending Prompts
                </div>
              </div>

              {/* 3D Bar Chart Graphic */}
              <div className="hidden md:flex items-end gap-1 h-24 relative">
                {[40, 65, 85, 55, 100, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="w-6 rounded-t-md opacity-80 transition-all duration-500"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, ${i === 4
                          ? "var(--color-primary)"
                          : i === 6
                            ? "#a78bfa"
                            : "rgba(139,92,246,0.5)"
                        } 0%, rgba(139,92,246,0.2) 100%)`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
                {/* Arrow up */}
                <div className="absolute -top-3 -right-3 text-2xl">📈</div>
              </div>

              {/* Flame emoji */}
              <div className="hidden md:block text-5xl animate-pulse">🔥</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ ABOUT SECTION ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold text-foreground">
                  About Trending AI Prompts
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-2xl">
                  Explore the most popular AI prompts trending across categories
                  including ChatGPT, Gemini, Midjourney, Claude, image
                  generation, content creation, marketing, coding, business and
                  productivity.
                </p>
                <p className="text-sm text-foreground/40 leading-relaxed max-w-2xl">
                  These prompts are chosen based on real-time engagement
                  including views, likes, saves, and community interaction. Our
                  list is updated regularly so you always have access to the best
                  and most relevant prompts.
                </p>
              </div>

              {/* Stat Pills */}
              <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:items-center">
                {[
                  {
                    icon: Eye,
                    label: "1M+",
                    sub: "Total Views",
                    color: "text-purple-400",
                    bg: "rgba(139,92,246,0.1)",
                  },
                  {
                    icon: Heart,
                    label: "250K+",
                    sub: "Likes",
                    color: "text-rose-400",
                    bg: "rgba(244,63,94,0.1)",
                  },
                  {
                    icon: Users,
                    label: "150K+",
                    sub: "Contributors",
                    color: "text-blue-400",
                    bg: "rgba(59,130,246,0.1)",
                  },
                  {
                    icon: Star,
                    label: "10K+",
                    sub: "Contributions",
                    color: "text-emerald-400",
                    bg: "rgba(16,185,129,0.1)",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border"
                    style={{
                      background: stat.bg,
                      borderColor: "rgba(255,255,255,0.08)",
                      minWidth: 120,
                    }}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} shrink-0`} />
                    <div>
                      <div className="text-base font-black text-foreground">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-foreground/40 font-semibold uppercase tracking-wide">
                        {stat.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ TRENDING CLIENT ═══════════════════════════════════════════ */}
      <TrendingClient allTrendingPrompts={allTrending} />

      {/* ═══════════════════════════════════════════ POPULAR CATEGORIES ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base font-bold text-foreground mb-4">
            Popular Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingCategories.map((catName) => {
              const displayName = CATEGORY_DISPLAY_NAMES[catName.toLowerCase()] || catName;
              return (
                <Link
                  key={catName}
                  href={`/categories/${catName.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 hover:border-primary/60 hover:text-primary"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {displayName} Prompts
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ FAQ ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group border rounded-xl overflow-hidden transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none gap-4">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                  <Plus className="w-4 h-4 text-foreground/40 shrink-0 group-open:hidden" />
                  <Minus className="w-4 h-4 text-primary shrink-0 hidden group-open:block" />
                </summary>
                <div className="px-5 pb-5 text-sm text-foreground/50 leading-relaxed border-t border-foreground/5 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ EXPLORE MORE ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Explore More
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPLORE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br ${card.color} ${card.border}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center`}
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    {card.title}
                  </h3>
                  <p className="text-xs text-foreground/50 mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <span className="text-xs font-bold text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                    Explore <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </>
  );
}

