import { getPromptsByCategory, getAllPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import CategoryPromptsClient from "./CategoryPromptsClient";
import Footer from "@/components/Footer";
import categoriesData from "@/data/categories.json";
import {
  categoryDescriptions,
  categoryMetaLookup,
  categoryFaqData,
  categoryTipsLookup,
  trendingSearchesLookup,
  ICON_MAP,
} from "@/data/category-page-data";

import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Copy,
  FolderOpen,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: {
    category: string;
  };
}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const key = decoded.toLowerCase();

  // Format Display Name elegantly (e.g. "sci-fi" -> "Sci-Fi")
  let displayName = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  if (key === "sci-fi") {
    displayName = "Sci-Fi";
  }

  const siteUrl = "https://www.aipromptnest.com";
  const fallbackOgImage = "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp";

  // Resolve the best OG image for this category
  const staticMeta = categoryMetaLookup[key];
  const catConfig = categoriesData.find(c => c.name.toLowerCase() === key);
  const categoryImagePath = staticMeta?.image ?? catConfig?.image ?? null;
  const ogImageUrl = categoryImagePath
    ? categoryImagePath.startsWith("http")
      ? categoryImagePath
      : `${siteUrl}${categoryImagePath}`
    : fallbackOgImage;

  const ogImages = [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: `${displayName} AI Prompts – AIPromptNest`,
    },
  ];

  const categoryMeta = categoryDescriptions[key];

  if (categoryMeta) {
    return {
      title: categoryMeta.title,
      description: categoryMeta.description,
      keywords: categoryMeta.keywords,
      alternates: {
        canonical: `https://www.aipromptnest.com/categories/${key}`,
      },
      openGraph: {
        title: categoryMeta.title,
        description: categoryMeta.description,
        type: "website",
        images: ogImages,
      },
      twitter: {
        card: "summary_large_image",
        title: categoryMeta.title,
        description: categoryMeta.description,
        images: [ogImageUrl],
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
  }

  const fallbackTitle = `${displayName} AI Prompts – Browse Top ${displayName} Prompts | AiPromptNest`;
  const fallbackDescription = catConfig?.description || `Explore our curated collection of high-quality ${displayName} AI prompts on AiPromptNest. Find the perfect prompts for your next creative project and generate stunning artwork with ease.`;

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    alternates: {
      canonical: `https://www.aipromptnest.com/categories/${key}`,
    },
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
      images: [ogImageUrl],
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
}



export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Format the category name for display (e.g., "anime" -> "Anime")
  const decodedCategory = decodeURIComponent(category);
  const key = decodedCategory.toLowerCase();

  // Format Display Name elegantly (e.g. "sci-fi" -> "Sci-Fi")
  let displayName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  if (key === "sci-fi") {
    displayName = "Sci-Fi";
  }

  // Fetch prompts for this category via JSON DB
  const prompts = await getPromptsByCategory(decodedCategory);

  // Look up metadata assets
  const staticMeta = categoryMetaLookup[key];
  const catConfig = categoriesData.find(c => c.name.toLowerCase() === key);

  let meta;
  if (staticMeta) {
    meta = staticMeta;
  } else if (catConfig) {
    const colorName = catConfig.accent.replace("bg-", "").replace("-500", "");
    const accentClass = `text-${colorName}-500 bg-${colorName}-500/10 border-${colorName}-500/20`;
    const MetaIcon = ICON_MAP[catConfig.name] || Sparkles;
    meta = {
      icon: MetaIcon,
      accent: accentClass,
      color: catConfig.color,
      image: catConfig.image,
      statCount: prompts.length.toString(),
      copies: "10K+",
    };
  } else {
    meta = {
      icon: Sparkles,
      accent: "text-primary bg-primary/10 border-primary/20",
      color: "from-primary/30 to-accent/30",
      image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
      statCount: prompts.length.toString(),
      copies: "10K+",
    };
  }

  const MetaIcon = meta.icon;
  const categoryMeta = categoryDescriptions[key];

  // Fetch all prompts to compute counts dynamically
  const allPrompts = await getAllPrompts();
  const categoryCounts: Record<string, number> = {};
  for (const prompt of allPrompts) {
    if (prompt.category) {
      const catKey = prompt.category.toLowerCase();
      categoryCounts[catKey] = (categoryCounts[catKey] ?? 0) + 1;
    }
  }

  // Dynamic categories list lookup to fetch counts and icons for related categories
  const relatedCategories = categoriesData
    .filter(c => c.name.toLowerCase() !== key)
    .slice(0, 4)
    .map(c => {
      const relatedKey = c.name.toLowerCase();
      const countVal = categoryCounts[relatedKey] ?? 0;
      return {
        key: relatedKey,
        name: c.name,
        icon: ICON_MAP[c.name] || Sparkles,
        count: countVal.toLocaleString(),
      };
    });

  // Category specific creation tips
  const tips = categoryTipsLookup[key] || [
    "Be specific with your visual directives",
    "Specify lighting styles and dynamic angles",
    "Describe environment detail and background colors",
    "Define camera parameters like lens size and aperture",
    "Experiment, copy and remix prompts freely"
  ];

  // Category specific trending searches
  const searches = trendingSearchesLookup[key] || [
    "epic art style", "beautiful landscape", "high resolution", "golden hour focus", "neon lighting vibe"
  ];

  // Category specific intro paragraph for the Tips Section
  const categoryIntroText = `${displayName} AI prompts are text instructions used with Gemini AI to generate professional-grade ${decodedCategory}-style visual content. These prompts help you create stunning ${decodedCategory} characters, scenes, and compositions by specifying fine details like subject focus, action poses, mood transitions, lighting, and environmental factors. Use our detailed copy-and-paste prompts to get the best results and bring your creative imagination to life.`;

  // How many prompts to pre-render on the server (first visible batch)
  const INITIAL_COUNT = 8;
  const initialPrompts = prompts.slice(0, INITIAL_COUNT);

  // ── Structured Data ──────────────────────────────────────────────────────
  const siteUrl = "https://www.aipromptnest.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${siteUrl}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${displayName} AI Prompts`,
        item: `${siteUrl}/categories/${key}`,
      },
    ],
  };

  const genericFaqs = [
    {
      question: `Can I use these prompts with Gemini AI?`,
      answer: `Yes! All prompts on PromptVault are optimized for Google Gemini AI. They work beautifully with Gemini 1.5 Pro and Gemini 1.5 Flash models to generate stunning visuals, and can also be used in other models like Midjourney or Stable Diffusion.`,
    },
    {
      question: `Are these ${displayName} prompts free?`,
      answer: `Yes, we offer a wide variety of free, copy-and-paste prompts across all categories. Premium prompts with advanced staging and visual instructions are also available for advanced creators.`,
    },
    {
      question: `How can I get better results with these prompts?`,
      answer: `You can customize prompts by tweaking parameters like subject details, lighting setups, artistic camera angles, and rendering engines. Check our "Tips for Better Results" section for a complete list.`,
    },
  ];

  const allFaqs = [
    ...(categoryFaqData[key] ?? []),
    ...genericFaqs,
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${displayName} AI Prompts`,
    description: `A curated collection of ${displayName} AI prompts for Gemini, Midjourney, and Stable Diffusion.`,
    url: `${siteUrl}/categories/${key}`,
    numberOfItems: prompts.length,
    itemListElement: prompts.slice(0, 50).map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/prompts/${p.slug ?? p.id}`,
      name: p.title,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayName} Gemini AI Prompts`,
    description: `Browse free ${displayName} Gemini AI prompts.`,
    url: `${siteUrl}/categories/${key}`,
    mainEntity: {
      "@type": "ItemList",
      name: `${displayName} AI Prompts`,
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${displayName} Gemini AI Prompts`,
    url: `${siteUrl}/categories/${key}`,
  };

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      {/* Structured Data – BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Structured Data – CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      {/* Structured Data – WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Structured Data – FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Structured Data – ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">{displayName}</span>
        </div>

        {/* Dynamic Split Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20">
          {/* Left: SEO Description & Headers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${meta.accent}`}>
                <MetaIcon className="w-3.5 h-3.5" />
                Explore Category
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              {displayName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gemini AI Prompts</span>
            </h1>

            <div className="text-foreground/50 text-sm md:text-base leading-relaxed space-y-4 max-w-3xl">
              {categoryMeta && categoryMeta.description ? (
                categoryMeta.description.split("  ").map((p, idx) => (
                  <p key={idx} className="text-justify font-normal leading-relaxed">{p}</p>
                ))
              ) : (
                <p>Explore our premium collection of highly optimized, copy-and-paste {displayName} AI prompts. Perfect for your next high-impact creative project.</p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#prompts-section"
                className="px-7 py-3.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                Browse Prompts
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/categories"
                className="px-7 py-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold border border-border transition-all flex items-center gap-2 text-sm"
              >
                View All Categories
              </Link>
            </div>
          </div>

          {/* Right: Glassmorphic Visual Cover Card */}
          <div className="lg:col-span-5 relative group w-full aspect-[4/3] lg:aspect-[5/6] rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl hover:border-white/[0.15] transition-all duration-500">
            {/* Color accent glow behind cover */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

            <div className="absolute inset-0 z-0">
              <Image
                src={meta.image}
                alt={`${displayName} Cover Image`}
                fill
                priority
                quality={95}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Premium overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent z-10" />

            {/* Inner Floating Details */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg">
                  <MetaIcon className="w-5 h-5" />
                </div>
                <div className="bg-black/50 backdrop-blur-md text-[9px] text-white/80 font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10">
                  PROMPTVault curation
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                  Premium {displayName} Art
                </h3>
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                  Hand-crafted & Optimized for Gemini 1.5 Pro & Ultra
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Interactive Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {[
            {
              label: `${displayName} Prompts`,
              value: meta.statCount,
              description: "Curated templates",
              icon: Layers,
              color: "text-pink-500 bg-pink-500/10",
            },
            {
              label: "Copies / Uses",
              value: meta.copies,
              description: "Worldwide uses",
              icon: TrendingUp,
              color: "text-violet-500 bg-violet-500/10",
            },
            {
              label: "Update Cycle",
              value: "Weekly",
              description: "Fresh content added",
              icon: Clock,
              color: "text-emerald-500 bg-emerald-500/10",
            },
            {
              label: "Optimization",
              value: "100%",
              description: "Tested and certified",
              icon: Sparkles,
              color: "text-amber-500 bg-amber-500/10",
            },
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={i}
                className="glass-dark border border-foreground/5 hover:border-foreground/15 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</span>
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <StatIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{stat.value}</div>
                  <p className="text-[10px] text-foreground/30 font-medium">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prompts Section */}
        <section id="prompts-section" className="scroll-mt-32 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3 text-foreground">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Browse {displayName} AI Prompts
              </h2>
              <p className="text-foreground/40 text-xs md:text-sm">Explore our top performing, copy-and-paste ready prompts</p>
            </div>
          </div>

          <CategoryPromptsClient
            initialPrompts={initialPrompts}
            totalCount={prompts.length}
            categoryKey={key}
            displayName={displayName}
          />
        </section>

        {/* Layout Row 1: Intro + Tips Block */}
        <div className="glass-dark border border-foreground/5 p-8 md:p-12 rounded-[2.5rem] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Left side: Intro description */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-foreground">
                What Are {displayName} AI Prompts?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/50 text-justify">
                {categoryIntroText}
              </p>
            </div>

            {/* Right side: Tips for better results */}
            <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-foreground/5 pt-8 lg:pt-0 lg:pl-10">
              <h3 className="text-lg font-bold text-foreground">
                Tips for Better Results
              </h3>
              <ul className="space-y-3.5">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-foreground/60 leading-tight">
                    <span className="text-primary font-black mr-2 select-none">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Layout Row 2: Three-Column Navigation Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Column 1: Trending Searches */}
          <div className="lg:col-span-5 glass-dark border border-foreground/5 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Searches
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
              {searches.map((keyword, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/50 hover:text-primary transition-colors cursor-pointer group">
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary transition-colors shrink-0" />
                  <span className="truncate">{keyword}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Related Categories */}
          <div className="lg:col-span-4 glass-dark border border-foreground/5 p-8 rounded-[2rem] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                Related Categories
              </h3>
              <Link href="/categories" className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {relatedCategories.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={`/categories/${item.key}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                        <RelatedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.name} Prompts
                        </div>
                        <div className="text-[10px] text-foreground/40 font-medium">
                          {item.count} Prompts
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: How to Use Callout Card */}
          <div className="lg:col-span-3 glass-dark border border-foreground/5 p-8 rounded-[2rem] flex flex-col justify-between h-full bg-primary/[0.01]">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">How to Use {displayName} Prompts</h3>
              <p className="text-xs leading-relaxed text-foreground/45">
                Copy any prompt you like and paste it into Gemini AI. You can modify the prompt to match your imagination and create unique {key} art.
              </p>
            </div>
            <Link
              href="/blog"
              className="w-full inline-flex items-center justify-center gap-2 border border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary px-5 py-3 rounded-xl font-bold transition-all text-xs mt-6"
            >
              Learn More Guide
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Layout Row 3: Split FAQ & Latest Prompts Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Left: Frequently Asked Questions */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: `Can I use these prompts with Gemini AI?`,
                  answer: `Yes! All prompts on PromptVault are optimized for Google Gemini AI. They work beautifully with Gemini 1.5 Pro and Gemini 1.5 Flash models to generate stunning visuals, and can also be used in other models like Midjourney or Stable Diffusion.`,
                },
                {
                  question: `Are these ${displayName} prompts free?`,
                  answer: `Yes, we offer a wide variety of free, copy-and-paste prompts across all categories. Premium prompts with advanced staging and visual instructions are also available for advanced creators.`,
                },
                {
                  question: `How can I get better results with these prompts?`,
                  answer: `You can customize prompts by tweaking parameters like subject details, lighting setups, artistic camera angles, and rendering engines. Check our "Tips for Better Results" section above for a complete list.`,
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group glass-dark border border-foreground/5 hover:border-foreground/15 rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-4.5 cursor-pointer list-none select-none">
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                  </summary>

                  <div className="px-6 pb-5 border-t border-foreground/[0.02]">
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/45 pt-4">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Right: Latest Prompts list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-extrabold text-foreground">
                Latest {displayName} Prompts
              </h3>
              <Link href={`/browse?category=${key}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {initialPrompts.slice(0, 3).map((p) => {
                const cardHref = p.slug ? `/prompts/${p.slug}` : `/prompts/${p.id}`;
                return (
                  <Link
                    key={p.id}
                    href={cardHref}
                    className="flex items-center justify-between p-4 rounded-[1.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-primary/25 hover:bg-primary/[0.01] transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 relative rounded-xl overflow-hidden shrink-0 border border-foreground/5">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          quality={90}
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {p.category}
                          </span>
                          <span className="text-[9px] font-bold bg-foreground/5 text-foreground/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {p.isPremium ? "Premium" : "Free"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/30 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                      <Copy className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Striking CTA Banner Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-card/25 border border-foreground/5 px-8 py-16 md:p-20 text-center mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Limitless styles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to Explore More Creative Styles?
            </h2>
            <p className="text-foreground/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Unleash your imagination by browsing thousands of copy-and-paste templates across all creative domains.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                href="/categories"
                className="group inline-flex items-center gap-2 bg-foreground text-background dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm shadow-xl"
              >
                Browse All Categories
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
