"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilters from "@/components/CategoryFilters";
import PromptCard from "@/components/PromptCard";
import StatsSection from "@/components/StatsSection";
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  ChevronDown,
  HelpCircle,
  Copy,
  Share2,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import blogsData from "@/data/blogs.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Prompt } from "@/lib/json-db";

/* ──────────────────────────────────────────────
   FAQ data — used for both UI and JSON-LD schema
   ────────────────────────────────────────────── */
const faqItems = [
  {
    question: "What is PromptVault and how does it work?",
    answer:
      "PromptVault is the world's leading marketplace for high-quality AI image prompts. Simply browse our curated library of thousands of prompts, preview the type of output each prompt generates, then copy it with a single click and paste it directly into your preferred AI image generator — whether that's Google Gemini, Midjourney, DALL·E, or Stable Diffusion. Every prompt in our library has been tested, refined, and optimized by our community of experienced prompt engineers and AI artists to ensure you get stunning results from day one.",
  },
  {
    question: "Are the AI prompts on PromptVault free to use?",
    answer:
      "Yes! The vast majority of our library is completely free to access with no account required. We offer thousands of free prompts spanning all popular categories — including cinematic photography, anime illustration, dark fantasy, architectural visualization, fashion photography, and photorealistic portraits. For creators who want to go deeper, we also offer a premium tier featuring advanced multi-parameter prompts, exclusive styles, and prompt packs crafted by top AI artists. Whether you're a casual explorer or a professional creator, there's something for everyone on PromptVault.",
  },
  {
    question: "Which AI models are compatible with these prompts?",
    answer:
      "Our prompts are primarily engineered and optimized for Google Gemini AI, taking full advantage of Gemini's advanced image synthesis capabilities. However, the majority of our prompts are written using universal prompt language that transfers well to other leading AI image models including Midjourney v6, DALL·E 3, Stable Diffusion XL, Adobe Firefly, and Leonardo AI. Each prompt listing clearly indicates which AI models it has been tested with, so you can always pick the right prompt for your preferred tool and get the best possible result.",
  },
  {
    question: "Can I customize or modify the prompts?",
    answer:
      "Absolutely — and we actively encourage it. Every prompt in PromptVault is designed to serve as a powerful creative starting point, not a rigid template. You can freely adjust any parameter: swap the subject, change the lighting style, modify the color palette, alter the composition, add or remove style references, or blend multiple prompts together. The more you experiment and iterate, the more personalized and unique your AI-generated images become. Our blog also features in-depth guides on how to effectively modify prompts to achieve specific artistic effects.",
  },
  {
    question: "How often are new prompts added to the library?",
    answer:
      "New prompts are added to PromptVault every single day by our growing global community of prompt engineers, AI artists, and creative professionals. Our editorial team also curates and publishes themed collections — such as seasonal picks, trending styles, and genre spotlights — on a weekly basis. We track emerging trends in AI image generation closely and ensure the library stays fresh, relevant, and ahead of the curve. Subscribe to our newsletter to get weekly picks delivered directly to your inbox.",
  },
  {
    question: "Do I need technical knowledge to use AI prompts?",
    answer:
      "Not at all — PromptVault is designed for everyone, from complete beginners to seasoned AI artists. Every prompt is copy-and-paste ready, meaning there is zero technical setup required on your part. Just choose a prompt you like, copy it to your clipboard, open your preferred AI image generator such as Google Gemini or Midjourney, paste the prompt, and hit generate. Our blog and help center also feature a wealth of beginner-friendly tutorials, style guides, and prompt engineering tips to help you level up your AI art skills at your own pace.",
  },
  {
    question: "Can I submit my own prompts to PromptVault?",
    answer:
      "Yes — PromptVault is a community-powered platform and we warmly welcome contributions from prompt creators all over the world. If you've crafted a prompt that consistently produces stunning AI-generated images, we'd love to feature it in our library. Simply submit your prompt through our creator portal, include example outputs and compatible model information, and our editorial team will review it. Approved prompts are published to the marketplace where they can be discovered, copied, and appreciated by thousands of fellow AI art enthusiasts every day.",
  },
];

/* JSON-LD structured data for FAQPage (SEO rich results) */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* ──────────────────────────────────────────────
   Accordion item component
   ────────────────────────────────────────────── */
function FAQAccordionItem({
  item,
  index,
  isOpen,
  toggle,
}: {
  item: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "group rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-primary/40 bg-primary/[0.04] shadow-[0_0_24px_-6px_rgba(139,92,246,0.15)]"
          : "border-border bg-card/20 hover:border-foreground/20"
      )}
    >
      <button
        id={`faq-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        onClick={toggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-300",
            isOpen
              ? "bg-primary text-white"
              : "bg-foreground/5 text-foreground/40 group-hover:bg-foreground/10"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-base font-semibold text-foreground sm:text-lg">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-foreground/40 transition-transform duration-300",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-6 pl-[4.25rem]">
          <p className="text-sm leading-relaxed text-foreground/50 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface HomeClientProps {
  initialPrompts: Prompt[];
}

export default function HomeClient({ initialPrompts }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbPrompts, setDbPrompts] = useState<Prompt[]>(initialPrompts);
  const [localSearch, setLocalSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(`/browse?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const filteredPrompts = activeCategory === "all"
    ? dbPrompts
    : dbPrompts.filter(p => p.category === activeCategory);

  // Compute real counts per category
  const categoryCounts: Record<string, number> = {};
  for (const p of dbPrompts) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    }
  }
  const totalCount = dbPrompts.length;

  // Pagination Logic
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

  // Trending: top 4 by views (numeric sort)
  const trendingPrompts = [...dbPrompts]
    .sort((a, b) => Number(b.views ?? 0) - Number(a.views ?? 0))
    .slice(0, 4);

  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />

      <div className="pt-2">
        <Hero />
      </div>

      {/* 1. Popular / Trending Prompts (Hook) */}
      {trendingPrompts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Trending Now</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="w-2 h-10 bg-rose-500 rounded-full"></span>
                Most Popular Prompts
              </h2>
              <p className="text-foreground/40 text-sm">The prompts everyone is copying right now</p>
            </div>
            <Link
              href="/trending"
              className="hidden sm:flex items-center gap-2 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 px-6 py-3 rounded-xl border border-border transition-all text-foreground"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 md:pb-0 md:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scrollbar-hide snap-x snap-mandatory">
            {trendingPrompts.map((prompt, i) => (
              <div
                key={prompt.id || i}
                className="min-w-[260px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink"
              >
                <PromptCard
                  {...prompt}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link
              href="/trending"
              className="flex items-center gap-2 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 px-6 py-3 rounded-xl border border-border transition-all text-foreground"
            >
              View All Trending
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* 2. Value Proposition / Feature Stats */}
      <StatsSection />

      {/* 3. Onboarding / How It Works */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Get Started in Minutes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-foreground/40 text-sm mt-3 max-w-xl mx-auto">
            From discovery to stunning AI-generated art in three simple steps — no technical knowledge required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {[
            {
              step: "01",
              title: "Browse the Library",
              description:
                "Explore thousands of carefully crafted AI image prompts across categories like cinematic, anime, fantasy, fashion, architecture, and more. Use filters and search to find exactly the style you need.",
            },
            {
              step: "02",
              title: "Copy Your Prompt",
              description:
                "Found the perfect prompt? Click the copy button and it's instantly saved to your clipboard — ready to use. No account needed, no paywalls, no friction. Just great prompts, one click away.",
            },
            {
              step: "03",
              title: "Generate Stunning Art",
              description:
                "Paste your prompt into Google Gemini, Midjourney, DALL·E, or any AI image generator and watch it come to life. Tweak and iterate to make it uniquely yours — the creative possibilities are limitless.",
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="relative flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-border bg-card/20 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xl font-black text-primary">{step}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">{title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Browse by Visual Style Quick Chips */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Prompt Styles
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Browse by Visual Style
          </h2>
          <p className="text-foreground/40 text-sm mt-3 max-w-xl mx-auto">
            Discover cinematic, hyper realistic, dark fantasy, minimalist, and sci-fi Gemini AI image prompts.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Hyper Realistic",
            "Dark Fantasy",
            "Minimalist",
            "Retro Futurism",
            "3D Render",
            "Oil Painting",
            "Cyberpunk",
            "Watercolor",
            "Neon Noir",
            "Anime",
            "Surrealism",
            "Studio Portrait",
          ].map((style) => (
            <button
              key={style}
              onClick={() => router.push(`/browse?q=${encodeURIComponent(style)}`)}
              className="px-5 py-2.5 rounded-xl border border-border bg-card/20 text-sm font-medium text-foreground/70 hover:border-primary/60 hover:text-foreground hover:bg-primary/10 transition-all duration-200 cursor-pointer"
            >
              {style}
            </button>
          ))}
        </div>
      </section>

      {/* 5. Main Catalog: Category Filters & Paginated Featured Prompts */}
      <section id="prompts-section" className="max-w-7xl mx-auto px-4 md:px-8 pb-32 pt-10 border-t border-border/20">
        {/* Mobile Search and Category Filters at the top of Catalog */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative group lg:hidden mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search prompts, categories, styles..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
            />
          </form>

          <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            categoryCounts={categoryCounts}
            totalCount={totalCount}
          />
        </div>

        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Featured Prompts
            </h2>
            <p className="text-foreground/40 text-sm">Handpicked premium prompts from our community</p>
          </div>
          <button
            onClick={() => router.push("/browse")}
            className="hidden sm:flex items-center gap-2 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 px-6 py-3 rounded-xl border border-border transition-all text-foreground"
          >
            Browse All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedPrompts.length > 0 ? (
            displayedPrompts.map((prompt, i) => (
              <div key={prompt.id || i}>
                <PromptCard
                  {...prompt}
                  priority={i < 8}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-foreground/20" />
              </div>
              <h3 className="text-xl font-bold text-foreground">No prompts found</h3>
              <p className="text-foreground/40">Try selecting a different category or search term.</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          scrollTargetId="prompts-section"
        />
      </section>

      {/* 6. Deep SEO Description / About Page */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left column */}
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
              Gemini AI Prompts for Every Imagination
            </h2>
            <div className="space-y-4 text-sm text-foreground/50 leading-relaxed">
              <p>
                PromptVault is your go-to library for Gemini AI image prompts. Whether you're
                creating anime characters, cinematic scenes, fantasy worlds, or realistic portraits,
                our carefully crafted prompts help you generate stunning AI art with ease.
              </p>
              <p>
                All prompts are tested and optimized for Gemini AI to deliver the best results.
                Copy, paste, and bring your imagination to life.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: Copy,       label: "Easy to Copy",    sub: "One-click copy" },
                { icon: Share2,     label: "SEO Friendly",    sub: "Well structured" },
                { icon: RefreshCw,  label: "Regular Updates", sub: "Fresh prompts weekly" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg border border-border bg-foreground/5 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-foreground/60" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-foreground/40">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="p-8 md:p-10 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Why Use Our Prompts?
            </h3>
            <ul className="space-y-4">
              {[
                "Save time and get better results",
                "Professionally crafted and tested",
                "Optimized for Gemini AI",
                "Perfect for artists, designers & creators",
                "Free to explore and use",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-foreground/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Blog Suggestions (Education/Guides) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Latest from our Blog
            </h2>
            <p className="text-foreground/40 text-sm">Stay updated with the latest AI prompt engineering trends</p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            Explore Blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsData.slice(0, 3).map((blog, i) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="h-52 overflow-hidden relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wider">
                  {blog.category}
                </div>
                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-foreground/40">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    5 min read
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section id="faq-section" className="relative max-w-4xl mx-auto px-4 md:px-8 pb-32">
        {/* Decorative gradient orb */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

        <div className="relative space-y-1 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/40 text-sm max-w-lg mx-auto mt-2">
            Everything you need to know about PromptVault and our AI prompt library
          </p>
        </div>

        <div className="relative space-y-3">
          {faqItems.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openFaq === index}
              toggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </section>

      <footer className="py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-foreground">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Search className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">PromptVault</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed">
              The world's leading marketplace for high-quality AI prompts.
              Helping creators build amazing things with AI since 2026.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li onClick={() => router.push("/browse")} className="hover:text-foreground cursor-pointer transition-colors">Browse Prompts</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Categories</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/20">
          <p>© 2026 PromptVault. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
