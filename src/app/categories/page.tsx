import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import {
  Clapperboard,
  Zap,
  Ghost,
  Cpu,
  Home,
  ShoppingBag,
  LayoutGrid,
  User,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  ArrowRight,
  Sparkles,
  PaintBucket,
  Layers,
  TrendingUp,
  Heart,
  HelpCircle,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { getAllPrompts } from "@/lib/json-db";
import categoriesData from "@/data/categories.json";
import Footer from "@/components/Footer";

const siteUrl = "https://www.aipromptnest.com";

export const metadata: Metadata = {

  metadataBase: new URL(siteUrl),
  title:
    "Gemini AI Prompt Categories | Free Image Generation Prompts - AIPromptNest",

  description:
    "Browse Gemini AI prompt categories including anime, cinematic, fantasy, sci-fi, portraits, architecture, product photography, landscapes, characters, and more. Discover thousands of free Gemini AI image prompts.",

  keywords: [
    "Gemini AI prompts",
    "Gemini image prompts",
    "Gemini AI prompt categories",
    "free Gemini prompts",
    "Gemini image generation prompts",
    "anime Gemini prompts",
    "cinematic Gemini prompts",
    "fantasy Gemini prompts",
    "portrait Gemini prompts",
    "architecture Gemini prompts",
    "AI image prompt library",
    "AI prompt directory",
    "Gemini prompt collection",
  ],

  alternates: {
    canonical: "https://www.aipromptnest.com/categories",
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

  openGraph: {
    title:
      "Gemini AI Prompt Categories | Free Image Generation Prompts",
    description:
      "Explore Gemini AI prompt categories including anime, cinematic, fantasy, sci-fi, portraits, architecture, product photography, and more.",
    url: "https://www.aipromptnest.com/categories",
    siteName: "AIPromptNest",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
        width: 1200,
        height: 630,
        alt: "AIPromptNest - Free Gemini AI Image Prompts Library",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Gemini AI Prompt Categories | AIPromptNest",

    description:
      "Browse thousands of free Gemini AI image prompts organized by category.",

    images: ["https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp"],
  },
};

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Ghost,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: Home,
  Product: ShoppingBag,
  Men: User,
  Women: User,
  Family: Users,
  Couple: Users,
  Sport: Flame,
  "Nature & Landscape": Trees,
  "Animals & Wildlife": Dog,
  Vehicles: Car,
  "Digital Art": Palette,
  Graffiti: PaintBucket,
};

const categoryConfig = [
  ...categoriesData.map((cat) => ({
    name: cat.name,
    id: cat.name,
    description: cat.description,
    image: cat.image,
    color: cat.color,
    accent: cat.accent,
    icon: ICON_MAP[cat.name] || Sparkles,
  })),
  {
    name: "All Prompts",
    icon: LayoutGrid,
    id: "all",
    description: "Browse every prompt across all categories in one place.",
    color: "from-violet-500/30 to-fuchsia-500/30",
    accent: "bg-violet-500",
    image: "https://res.cloudinary.com/dxwdgozsp/image/upload/v1782304497/photo-1541701494587-cb58502866ab_e6iwqd.jpg",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Gemini AI Prompt Categories",
  "description": "Browse Gemini AI prompt categories.",
  "url": "https://www.aipromptnest.com/categories"
}

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Gemini AI Prompt Categories",
  "description": "Browse thousands of Gemini AI prompts organized by category.",
  "url": "https://www.aipromptnest.com/categories"
}

const breadcrumbSchema = {
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
      name: "Categories",
      item: "https://www.aipromptnest.com/categories",
    },
  ],
};

export default async function CategoriesPage() {
  // Load all prompts directly from JSON files — no API route needed
  const allPrompts = await getAllPrompts();

  // Compute real counts per category from JSON data
  const categoryCounts: Record<string, number> = { all: allPrompts.length };
  for (const prompt of allPrompts) {
    if (prompt.category) {
      categoryCounts[prompt.category] = (categoryCounts[prompt.category] ?? 0) + 1;
    }
  }

  // Build enriched categories with real counts
  const categories = categoryConfig.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? allPrompts.length.toLocaleString() + "+"
        : (categoryCounts[cat.id] ?? 0).toLocaleString(),
  }));

  // Generate JSON-LD ItemList schema for categories
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI Prompt Categories",
    "description": "Explore our curated collections of high-quality AI prompts.",
    "numberOfItems": categories.length,
    "itemListElement": categories.map((cat, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": cat.name,
      "description": cat.description,
      "url": `https://www.aipromptnest.com${cat.id === "all" ? "/browse" : `/categories/${cat.id.toLowerCase()}`}`,
    })),
  };

  const totalPromptsCount = allPrompts.length;
  const activeCategoriesCount = categoriesData.length;

  const statsConfig = [
    {
      label: "Total Prompts",
      value: totalPromptsCount.toLocaleString() + "+",
      description: "Tested AI prompt templates",
      icon: Layers,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      label: "Creative Styles",
      value: activeCategoriesCount.toString(),
      description: "Curated prompt categories",
      icon: Sparkles,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    },
    {
      label: "Daily Updates",
      value: "Daily",
      description: "Fresh prompts added",
      icon: RefreshCw,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Free Access",
      value: "100% Free",
      description: "Free to copy & use",
      icon: Sparkles,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const faqItems = [
    {
      question: "How are the categories structured on AIPromptNest?",
      answer: "Our library is organized by creative style and subject matter—including Cinematic, Anime, Portrait, Fantasy, Sci-Fi, Architecture, Product Photography, and more. This makes it easy to find prompts tailored to your specific creative needs.",
    },
    {
      question: "Can I use these prompts across different AI models?",
      answer: "Yes! While our prompts are optimized and extensively tested for Google Gemini, they are written using descriptive prompt structure that works beautifully across Stable Diffusion, Flux, and other major AI image generators.",
    },
    {
      question: "How often are new categories or prompts added?",
      answer: "We add hundreds of fresh prompts to the library every single week. Our prompt engineers constantly monitor the latest trends and updates in AI modeling to ensure categories stay updated with cutting-edge styles.",
    },
    {
      question: "Are the prompts free to copy and use?",
      answer: "Absolutely. AIPromptNest is a free, community-first resource. You can copy any prompt in our library with a single click and use it for personal or commercial projects without any attribution required.",
    },
    {
      question: "How can I filter prompts within a specific category?",
      answer: "Simply click on any category card to view its dedicated page. From there, you can view sub-genres, see optimization tips, copy direct visual descriptors, or use search filters to narrow down the prompt collection.",
    },
  ];

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

  const schemas = [
    webPageSchema,
    collectionPageJsonLd,
    breadcrumbSchema,
    schemaList,
    faqJsonLd,
  ];

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <section className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1 rounded-full text-sm font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            Browse by Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Gemini AI Prompt Categories</h1>
          <p className="text-foreground/40 max-w-xl mx-auto">
            Browse thousands of free Gemini AI image prompts organized by category,
            including Anime, Cinematic, Fantasy, Portrait, Architecture,
            Product Photography, Nature, Vehicles, and Digital Art.
          </p>
        </section>

        {/* Category Statistics Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {statsConfig.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={i}
                className="glass-dark border border-white/[0.05] hover:border-white/[0.15] rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-lg shadow-black/20"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-widest">{stat.label}</span>
                  <div className={`p-2 rounded-xl border ${stat.color}`}>
                    <StatIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-white">{stat.value}</div>
                  <p className="text-[10px] text-foreground/40 font-medium">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/browse" : `/categories/${cat.id.toLowerCase()}`}
              className="group relative block"
            >
              {/* Glow effect behind card */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${cat.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Card */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] h-[380px] group-hover:border-white/[0.15] transition-all duration-500">

                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized={cat.image.startsWith("http")}
                  />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />

                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-7">

                  {/* Top: Icon badge */}
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl ${cat.accent}/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg`}>
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Text */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
                        {cat.name}
                      </h3>

                      {/* Description — visible on hover, slides up */}
                      <p className="mt-1.5 text-sm text-white/60 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${cat.accent} shadow-lg shadow-current`} />
                        <span className="text-sm text-white/50 font-semibold uppercase tracking-wider">
                          {cat.count} Prompts
                        </span>
                      </div>
                    </div>

                    {/* Explore bar that slides up on hover */}
                    <div className="overflow-hidden">
                      <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2.5 border border-white/10 w-fit">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span className="text-sm font-semibold text-white/90">Explore Collection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-24 max-w-5xl mx-auto relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-purple-500/10 to-violet-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative glass-dark border border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Inner background decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-violet-300">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Category Insights
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
                  Browse Free Gemini AI Prompt Categories
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-foreground/70 font-normal">
                <div className="space-y-6">
                  <p>
                    Discover thousands of free Gemini AI prompts organized into specialized
                    categories to help you create stunning AI-generated images faster. Whether
                    you're designing cinematic scenes, anime artwork, fantasy worlds,
                    realistic portraits, product photography, architecture concepts, vehicles,
                    nature landscapes, or digital illustrations, our curated prompt library
                    makes it easy to find inspiration for every creative project.
                  </p>

                  <p>
                    AIPromptNest provides carefully organized AI image prompts designed for
                    Gemini, Google AI Studio, Imagen, ChatGPT Image Generation,
                    Flux, Stable Diffusion, and other popular AI art tools. Each category
                    contains high-quality prompts created to generate detailed, visually
                    appealing, and professional results while reducing the time spent
                    experimenting with prompt wording.
                  </p>
                </div>

                <div className="space-y-6">
                  <p>
                    Explore popular categories such as Anime Prompts, Cinematic Photography
                    Prompts, Fantasy Art Prompts, Character Design Prompts, Product
                    Photography Prompts, Architecture Prompts, Fashion Prompts, Wildlife
                    Prompts, Vehicle Prompts, and Concept Art Prompts. Every category is
                    regularly updated with new prompt ideas to help artists, designers,
                    marketers, content creators, and AI enthusiasts produce unique images for
                    personal and commercial projects.
                  </p>

                  <p>
                    Whether you're looking for realistic photography styles, futuristic sci-fi
                    environments, magical fantasy landscapes, professional advertising
                    visuals, or social media content ideas, our organized prompt categories
                    help you quickly discover the perfect prompt for your next AI-generated
                    image. Browse by category, find trending prompts, and unlock new creative
                    possibilities with one of the largest collections of free Gemini AI image
                    prompts available online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-5xl mx-auto relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-purple-500/10 to-violet-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative glass-dark border border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Inner background decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-violet-300">
                  <Flame className="w-3.5 h-3.5 text-primary" />
                  Popular Styles
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
                  Popular AI Prompt Categories
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-foreground/70 font-normal">
                <p>
                  Some of the most popular categories on AIPromptNest include Anime Prompts,
                  Cinematic Photography Prompts, Fantasy Art Prompts, Character Design Prompts,
                  Product Photography Prompts, Fashion Prompts, Architecture Prompts, and Nature
                  Photography Prompts. These categories help creators quickly find prompts
                  tailored to specific visual styles and creative goals.
                </p>
                <p>
                  Whether you want to generate realistic portraits, cinematic movie scenes,
                  fantasy landscapes, futuristic concepts, or professional product images,
                  exploring category-specific prompts can help improve image quality and
                  consistency while saving time during the creative process.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-5xl mx-auto relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-purple-500/10 to-violet-500/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative glass-dark border border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Inner background decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-violet-300">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  Workflow Efficiency
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-violet-300">
                  Why Use Organized Gemini AI Prompt Categories?
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed text-foreground/70 font-normal">
                <p>
                  Organized prompt categories make it easier to discover relevant AI prompts
                  without searching through thousands of unrelated ideas. By grouping prompts
                  based on themes, styles, and use cases, creators can quickly find inspiration
                  for personal projects, marketing campaigns, social media content, digital art,
                  and commercial design work.
                </p>
                <p>
                  Category-based browsing also helps users learn effective prompting techniques,
                  understand different visual styles, and achieve better results with Gemini,
                  Imagen, ChatGPT Image Generation, Flux, and other AI image
                  generation platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-32 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1 rounded-full text-sm font-bold text-primary">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Categories FAQ</h2>
            <p className="text-foreground/40 text-sm max-w-xl mx-auto">
              Have questions about our prompt categories? Find answers to commonly asked questions below.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                className="group glass-dark border border-white/[0.05] hover:border-white/[0.12] rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                  <span className="text-base font-semibold text-white group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-foreground/45 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                </summary>

                <div className="px-6 pb-6 border-t border-white/[0.02] transition-all">
                  <p className="text-sm leading-relaxed text-foreground/50 pt-4">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
