"use client";

import React, { useState } from "react";
import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import Footer from "@/components/Footer";
import {
  TrendingUp,
  Eye,
  Heart,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Zap,
  Award,
  BookOpen,
  Share2,
  Camera,
  Code2,
  Play,
} from "lucide-react";

interface Prompt {
  id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  views: number;
  likes: number;
  isPremium?: boolean;
  slug?: string | null;
  tags?: string[];
  models?: string[];
}

interface TrendingClientProps {
  prompts: Prompt[];
  totalPrompts: number;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Cinematic: "🎬",
  Anime: "🌸",
  Fantasy: "🔮",
  "Sci-Fi": "🛸",
  Architecture: "🏢",
  Portrait: "📸",
  Product: "🛍️",
  Men: "👨",
  Women: "👩",
  Family: "👨‍👩‍👧‍👦",
  Couple: "💑",
  Sport: "🏆",
  "Nature & Landscape": "🏔️",
  "Animals & Wildlife": "🐼",
  Vehicles: "🏎️",
  "Digital Art": "🎨",
  Graffiti: "🖌️",
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  cinematic: "Cinematic",
  anime: "Anime",
  fantasy: "Fantasy",
  "sci-fi": "Sci-Fi",
  architecture: "Architecture",
  portrait: "Portrait",
  product: "Product",
  men: "Men",
  women: "Women",
  family: "Family",
  couple: "Couple",
  sport: "Sport",
  "nature & landscape": "Nature & Landscape",
  "animals & wildlife": "Animals & Wildlife",
  vehicles: "Vehicles",
  "digital art": "Digital Art",
  graffiti: "Graffiti",
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
    a: "Most prompts on PromptVault are completely free. Premium prompts are marked with a gold badge and require a Premium subscription to access.",
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

const FOOTER_LINKS = {
  Browse: [
    { label: "All Prompts", href: "/browse" },
    { label: "New", href: "/browse?sort=new" },
    { label: "Trending", href: "/trending" },
    { label: "Top Rated", href: "/browse?sort=top" },
    { label: "Collections", href: "/categories" },
  ],
  Categories: [
    { label: "ChatGPT Prompts", href: "/browse?cat=chatgpt" },
    { label: "Gemini Prompts", href: "/browse?cat=gemini" },
    { label: "Image Generation", href: "/browse?cat=image" },
    { label: "Marketing", href: "/browse?cat=marketing" },
    { label: "Writing", href: "/browse?cat=writing" },
    { label: "Coding", href: "/browse?cat=coding" },
    { label: "Business", href: "/browse?cat=business" },
    { label: "Production", href: "/browse?cat=production" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/premium" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export default function TrendingClient({
  prompts,
  totalPrompts,
}: TrendingClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [timeFilter, setTimeFilter] = useState("This Week");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  // Get all unique categories that have trending prompts
  const trendingCategories = Array.from(
    new Set(prompts.map((p) => p.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const categories = [
    { label: "All", id: "all", emoji: "🔥" },
    ...trendingCategories.map((cat) => {
      const displayName = CATEGORY_DISPLAY_NAMES[cat.toLowerCase()] || cat;
      return {
        label: displayName,
        id: cat.toLowerCase(),
        emoji: CATEGORY_EMOJIS[displayName] || "✨",
      };
    }),
  ];

  const filteredPrompts =
    activeCategory === "all"
      ? prompts
      : prompts.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
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
                <span className="text-foreground">Trending </span>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)) 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Now
                </span>
              </h1>

              <p className="text-foreground/50 max-w-lg text-base leading-relaxed">
                Discover the most viewed and liked prompts in the community. See
                what&apos;s inspiring creators right now.
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
                  {totalPrompts.toLocaleString()}
                </div>
                <div
                  className="text-xs font-semibold mt-1"
                  style={{ color: "hsl(var(--primary))" }}
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
                      background: `linear-gradient(180deg, ${
                        i === 4
                          ? "hsl(var(--primary))"
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

      {/* ═══════════════════════════════════════════ CATEGORY FILTERS ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span
              className="w-1.5 h-6 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
            />
            Trending by Category
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, hsl(var(--primary)) 0%, #7c3aed 100%)",
                          borderColor: "hsl(var(--primary))",
                          color: "white",
                          boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                        }
                  }
                >
                  <span className="text-sm">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ PROMPT GRID ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span
                className="w-1.5 h-6 rounded-full"
                style={{ background: "hsl(var(--primary))" }}
              />
              Trending Prompts
            </h2>

            <div className="flex items-center gap-2">
              {/* Time Filter */}
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none text-xs font-semibold px-3 py-2 pr-7 rounded-lg border cursor-pointer focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground/40 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none text-xs font-semibold px-3 py-2 pr-7 rounded-lg border cursor-pointer focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                  <option>Most Liked</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPrompts.map((p) => (
                <PromptCard
                  key={p.id}
                  {...p}
                  views={p.views?.toString() || "0"}
                  likes={p.likes?.toString() || "0"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-foreground/40">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-semibold">No prompts found in this category</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-3 text-sm text-primary hover:underline"
              >
                View all categories
              </button>
            </div>
          )}
        </div>
      </section>

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
              <div
                key={i}
                className="border rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background:
                    openFaq === i
                      ? "rgba(139,92,246,0.07)"
                      : "rgba(255,255,255,0.03)",
                  borderColor:
                    openFaq === i
                      ? "rgba(139,92,246,0.3)"
                      : "rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <Minus className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-foreground/40 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-foreground/50 leading-relaxed border-t border-foreground/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
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
            {EXPLORE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`group rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br ${card.color} ${card.border}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center`}
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
