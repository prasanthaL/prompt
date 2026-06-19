import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeClient from "./HomeClient";
import StatsSection from "@/components/StatsSection";
import HomeFaqSection from "./HomeFaqSection";
import { faqItems } from "@/data/home-faqs";
import Footer from "@/components/Footer";
import { fetchCategoryCounts, type HomeTab } from "@/lib/client-prompts";
import { getActiveBlogs, getAllPrompts } from "@/lib/json-db";
import {
  ArrowRight,
  TrendingUp,
  ImageIcon,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categoriesData,
  howItWorksSteps,
  popularSearches,
  seoPropositionFeatures,
  whyChooseUs,
} from "@/data/home-data";
import type { Metadata } from "next";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;

  // Noindex when filters or tabs or paginated sub-pages are active on the home page
  const hasTab = !!resolvedParams.tab;
  const hasCategory = !!resolvedParams.category;
  const hasPage = !!resolvedParams.page;
  const shouldNoindex = hasTab || hasCategory || hasPage;

  return {
    metadataBase: new URL("https://www.aipromptnest.com"),
    title: "AIPromptNest - Free Gemini AI Image Prompts Library",
    description: "Discover free Gemini AI image prompts for cinematic photos, anime art, fantasy worlds, portraits, product photography, and creative AI images.",
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: "AIPromptNest - Free Gemini AI Image Prompts",
      description: "Explore a growing collection of Gemini AI prompts for stunning AI generated images.",
      url: "https://www.aipromptnest.com",
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "AIPromptNest - Free Gemini AI Image Prompts",
      description: "Discover free Gemini AI image prompts for cinematic photos, anime art, fantasy worlds, portraits, product photography, and creative AI images.",
      images: [
        "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
      ],
      creator: "@aipromptnest",
      site: "@aipromptnest",
    },
    robots: {
      index: !shouldNoindex,
      follow: true,
      googleBot: {
        index: !shouldNoindex,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIPromptNest",
  url: "https://www.aipromptnest.com",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.aipromptnest.com/browse?q={search_term_string}",
    "query-input":
      "required name=search_term_string"
  }
}

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    tab?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const tab = (resolvedParams.tab || "trending") as HomeTab;
  const category = resolvedParams.category || "";
  const page = parseInt(resolvedParams.page || "1", 10) || 1;

  const [blogs, allCategoryCounts, allPrompts] = await Promise.all([
    getActiveBlogs(),
    fetchCategoryCounts(),
    getAllPrompts(),
  ]);

  // 1. Apply the tab filter
  let tabFiltered = allPrompts;
  if (tab === "trending") {
    tabFiltered = allPrompts
      .filter((p) => p.isTrending)
      .sort((a, b) => (Number(b.views ?? 0) + Number(b.likes ?? 0)) - (Number(a.views ?? 0) + Number(a.likes ?? 0)));
  } else if (tab === "popular") {
    tabFiltered = allPrompts
      .filter((p) => p.isFeatured)
      .sort((a, b) => (Number(b.views ?? 0) + Number(b.likes ?? 0)) - (Number(a.views ?? 0) + Number(a.likes ?? 0)));
  } else if (tab === "latest") {
    tabFiltered = allPrompts
      .filter((p) => p.isLatest)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (tab === "all") {
    tabFiltered = allPrompts; // already sorted newest-first
  }

  // 2. Compute category counts within the tab (excluding category filter itself, but including tab filter)
  const tabCategoryCounts: Record<string, number> = {};
  for (const p of tabFiltered) {
    if (p.category) {
      tabCategoryCounts[p.category] = (tabCategoryCounts[p.category] ?? 0) + 1;
    }
  }

  // 3. Apply category sub-filter if set
  const source = category && category !== "all"
    ? tabFiltered.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : tabFiltered;

  // 4. Paginate
  const PAGE_SIZE = 12;
  const totalCount = source.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedPrompts = source.slice(start, start + PAGE_SIZE);

  const initialTabResult = {
    prompts: paginatedPrompts,
    totalCount,
    totalPages,
    currentPage: safePage,
    categoryCounts: tabCategoryCounts,
    tabTotalCount: tabFiltered.length,
  };

  const featuredPromptsForSchema = allPrompts
    .filter((p) => p.isFeatured)
    .sort((a, b) => (Number(b.views ?? 0) + Number(b.likes ?? 0)) - (Number(a.views ?? 0) + Number(a.likes ?? 0)))
    .slice(0, 50);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Gemini AI Image Prompts",
    description: "Discover free Gemini AI image prompts for cinematic photos, anime art, fantasy worlds, portraits, product photography, and creative AI images.",
    url: "https://www.aipromptnest.com",
    numberOfItems: featuredPromptsForSchema.length,
    itemListElement: featuredPromptsForSchema.map((prompt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.aipromptnest.com/prompts/${prompt.slug || prompt.id}`,
      name: prompt.title,
    })),
  };

  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />

      <div className="pt-2">
        <Hero promptsCount={allPrompts.length} categoriesCount={categoriesData.length} />
      </div>

      {/* Dynamic Prompt Cards Section (Client component) */}
      <Suspense fallback={
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32 pt-12">
          <div className="h-10 w-48 bg-white/5 animate-pulse rounded-lg mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] aspect-[4/3] animate-pulse" />
            ))}
          </div>
        </section>
      }>
        <HomeClient
          initialTabResult={initialTabResult}
          initialTab={tab}
          initialCategory={category}
          initialPage={page}
        />
      </Suspense>

      {/* Value Proposition / Feature Stats */}
      <StatsSection />

      {/* Onboarding / How It Works */}
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

          {howItWorksSteps.map(({ step, title, description }) => (
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

      {/* Browse by Category Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="text-center mb-10 flex flex-col items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-400 mb-2">
            EXPLORE GEMINI AI PROMPTS
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Find Prompts by <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto">
            Browse high-quality Gemini AI image prompts organized by category. Discover the perfect aesthetic for your next creation.
          </p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 mt-6">
          {categoriesData.map((cat) => {
            const count = allCategoryCounts[cat.id] ?? 0;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id.toLowerCase()}`}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5",
                  cat.hoverBorder,
                  cat.hoverShadow,
                  cat.hoverBgGrad
                )}
              >
                <div className="flex flex-col flex-1 gap-3.5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl border shrink-0 transition-all duration-300",
                      cat.badgeBg,
                      cat.badgeText,
                      cat.iconHover
                    )}>
                      <cat.icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className={cn("text-sm font-bold text-white transition-colors truncate", cat.hoverText)}>
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground/40 flex-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-auto pt-2.5 border-t border-white/[0.02]">
                    <ImageIcon className={cn("w-3.5 h-3.5 text-foreground/30 transition-colors shrink-0", cat.hoverText)} />
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider text-foreground/30 transition-colors", cat.hoverText)}>
                      {count.toLocaleString()} Prompts
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Popular searches bottom bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/[0.05] bg-[#0c0a15]/30 backdrop-blur-md">
          <div className="flex items-center gap-2 shrink-0">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold text-white">Popular Style Searches</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {popularSearches.map((search) => (
              <Link
                key={search}
                href={`/browse?q=${encodeURIComponent(search.replace(" Prompts", ""))}`}
                className="px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/10 text-[10px] font-bold text-foreground/60 hover:text-white transition-all cursor-pointer"
              >
                {search}
              </Link>
            ))}
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors shrink-0"
          >
            View All Styles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Deep SEO Description / About Page */}
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
              {seoPropositionFeatures.map(({ icon: Icon, label, sub }) => (
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
              {whyChooseUs.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-foreground/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Blog Suggestions (Education/Guides) */}
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
          {blogs.slice(0, 3).map((blog, i) => (
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

      {/* JSON-LD SEO schemas script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, websiteSchema, itemListSchema]),
        }}
      />

      {/* FAQ Section (Client component) */}
      <HomeFaqSection />

      <Footer />
    </main>
  );
}
