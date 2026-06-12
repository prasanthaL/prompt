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
} from "lucide-react";
import Link from "next/link";
import { getAllPrompts } from "@/lib/json-db";
import categoriesData from "@/data/categories.json";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Explore AI Image Prompt Categories | PromptVault",
  description:
    "Browse our curated collections of high-quality AI prompts. Find optimized prompts for anime, cinematic, portrait, fantasy, sci-fi, architecture, and product designs.",
  keywords: [
    "AI prompt categories",
    "Midjourney category prompts",
    "Gemini art styles",
    "DALL-E prompt directory",
    "Stable Diffusion themes",
    "anime AI prompts",
    "cinematic AI prompts",
    "fantasy art generator prompts",
    "sci-fi concept art prompts",
  ],
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Explore AI Image Prompt Categories | PromptVault",
    description:
      "Browse our curated collections of high-quality AI prompts. Find optimized prompts for anime, cinematic, portrait, fantasy, sci-fi, architecture, and product designs.",
    url: "https://www.promptvault.ai/categories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore AI Image Prompt Categories | PromptVault",
    description:
      "Browse our curated collections of high-quality AI prompts. Find optimized prompts for anime, cinematic, portrait, fantasy, sci-fi, architecture, and product designs.",
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
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
  },
];

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
      "url": `https://www.promptvault.ai${cat.id === "all" ? "/browse" : `/categories/${cat.id.toLowerCase()}`}`,
    })),
  };

  const totalPromptsCount = allPrompts.length;
  const activeCategoriesCount = categoriesData.length;
  
  let totalViews = 0;
  let totalLikes = 0;
  for (const p of allPrompts) {
    totalViews += Number(p.views ?? 0);
    totalLikes += Number(p.likes ?? 0);
  }
  
  const displayViews = totalViews > 0 ? `${(totalViews / 1000).toFixed(0)}K+` : "120K+";
  const displayLikes = totalLikes > 0 ? `${(totalLikes / 1000).toFixed(0)}K+` : "45K+";

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
      label: "Community Views",
      value: displayViews,
      description: "Prompt views globally",
      icon: TrendingUp,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Saved Favorites",
      value: displayLikes,
      description: "User-saved prompts",
      icon: Heart,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const faqItems = [
    {
      question: "How are the categories structured on PromptVault?",
      answer: "Our library is organized by creative style and subject matter—including Cinematic, Anime, Portrait, Fantasy, Sci-Fi, Architecture, Product Photography, and more. This makes it easy to find prompts tailored to your specific creative needs.",
    },
    {
      question: "Can I use these prompts across different AI models?",
      answer: "Yes! While our prompts are optimized and extensively tested for Google Gemini, they are written using descriptive prompt structure that works beautifully across Midjourney, Stable Diffusion, DALL-E, Flux, and other major AI image generators.",
    },
    {
      question: "How often are new categories or prompts added?",
      answer: "We add hundreds of fresh prompts to the library every single week. Our prompt engineers constantly monitor the latest trends and updates in AI modeling to ensure categories stay updated with cutting-edge styles.",
    },
    {
      question: "Are the prompts free to copy and use?",
      answer: "Absolutely. PromptVault is a free, community-first resource. You can copy any prompt in our library with a single click and use it for personal or commercial projects without any attribution required.",
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

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1 rounded-full text-sm font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            Browse by Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Explore Categories</h1>
          <p className="text-foreground/40 max-w-xl mx-auto">
            Discover AI prompts organized by style and creative category.
            Browse cinematic, anime, fantasy, sci-fi, portrait,
            architecture, product photography, digital art,
            nature photography and more.

            Whether you're using Gemini, ChatGPT, Midjourney,
            Flux, Imagen or other AI tools, our categorized prompt
            library helps you find high-quality prompts faster.
          </p>
        </div>

        {/* Category Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto space-y-8">
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
        </div>
      </div>
      <Footer />
    </main>
  );
}
