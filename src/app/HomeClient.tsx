"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromptCard from "@/components/PromptCard";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { fetchHomeTabPrompts, HomeTab, HomeTabResult, fetchCategoryCounts } from "@/lib/client-prompts";
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
  Clapperboard, Zap,
  Cpu, Sparkles,
  User, LayoutGrid,
  Palette,
  Home as HomeIcon,
  ShoppingBag,
  ImageIcon,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  PaintBucket
} from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Blog } from "@/lib/json-db";
import categoriesDataJson from "@/data/categories.json";

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

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Sparkles,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: HomeIcon,
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

const STYLE_MAP: Record<
  string,
  {
    badgeBg: string;
    badgeText: string;
    image: string;
    hoverBorder: string;
    hoverShadow: string;
    hoverText: string;
    hoverBgGrad: string;
    iconHover: string;
  }
> = {
  Cinematic: {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "/images/categories/cinematic.png",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  },
  Anime: {
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    image: "/images/categories/anime.png",
    hoverBorder: "hover:border-pink-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(236,72,153,0.35)]",
    hoverText: "group-hover:text-pink-400",
    hoverBgGrad: "hover:bg-pink-950/10",
    iconHover: "group-hover:bg-pink-500/20 group-hover:text-pink-300 group-hover:border-pink-500/30",
  },
  Portrait: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "/images/categories/portrait.png",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
  Fantasy: {
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400 border-purple-500/20",
    image: "/images/categories/fantasy.png",
    hoverBorder: "hover:border-purple-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(168,85,247,0.35)]",
    hoverText: "group-hover:text-purple-400",
    hoverBgGrad: "hover:bg-purple-950/10",
    iconHover: "group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/30",
  },
  "Sci-Fi": {
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400 border-cyan-500/20",
    image: "/images/categories/scifi.png",
    hoverBorder: "hover:border-cyan-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(6,182,212,0.35)]",
    hoverText: "group-hover:text-cyan-400",
    hoverBgGrad: "hover:bg-cyan-950/10",
    iconHover: "group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-500/30",
  },
  Architecture: {
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400 border-emerald-500/20",
    image: "/images/categories/architecture.png",
    hoverBorder: "hover:border-emerald-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.35)]",
    hoverText: "group-hover:text-emerald-400",
    hoverBgGrad: "hover:bg-emerald-950/10",
    iconHover: "group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:border-emerald-500/30",
  },
  Product: {
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-400 border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    hoverBorder: "hover:border-yellow-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,179,8,0.35)]",
    hoverText: "group-hover:text-yellow-400",
    hoverBgGrad: "hover:bg-yellow-950/10",
    iconHover: "group-hover:bg-yellow-500/20 group-hover:text-yellow-300 group-hover:border-yellow-500/30",
  },
  Men: {
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400 border-blue-500/20",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
    hoverBorder: "hover:border-blue-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.35)]",
    hoverText: "group-hover:text-blue-400",
    hoverBgGrad: "hover:bg-blue-950/10",
    iconHover: "group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/30",
  },
  Women: {
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400 border-rose-500/20",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    hoverBorder: "hover:border-rose-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(244,63,94,0.35)]",
    hoverText: "group-hover:text-rose-400",
    hoverBgGrad: "hover:bg-rose-950/10",
    iconHover: "group-hover:bg-rose-500/20 group-hover:text-rose-300 group-hover:border-rose-500/30",
  },
  Family: {
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400 border-teal-500/20",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
    hoverBorder: "hover:border-teal-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(20,184,166,0.35)]",
    hoverText: "group-hover:text-teal-400",
    hoverBgGrad: "hover:bg-teal-950/10",
    iconHover: "group-hover:bg-teal-500/20 group-hover:text-teal-300 group-hover:border-teal-500/30",
  },
  Couple: {
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400 border-red-500/20",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    hoverBorder: "hover:border-red-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(239,68,68,0.35)]",
    hoverText: "group-hover:text-red-400",
    hoverBgGrad: "hover:bg-red-950/10",
    iconHover: "group-hover:bg-red-500/20 group-hover:text-red-300 group-hover:border-red-500/30",
  },
  Sport: {
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400 border-amber-500/20",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    hoverBorder: "hover:border-amber-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.35)]",
    hoverText: "group-hover:text-amber-400",
    hoverBgGrad: "hover:bg-amber-950/10",
    iconHover: "group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:border-amber-500/30",
  },
  "Nature & Landscape": {
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-400 border-green-500/20",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    hoverBorder: "hover:border-green-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(34,197,94,0.35)]",
    hoverText: "group-hover:text-green-400",
    hoverBgGrad: "hover:bg-green-950/10",
    iconHover: "group-hover:bg-green-500/20 group-hover:text-green-300 group-hover:border-green-500/30",
  },
  "Animals & Wildlife": {
    badgeBg: "bg-lime-500/10",
    badgeText: "text-lime-400 border-lime-500/20",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
    hoverBorder: "hover:border-lime-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(132,204,22,0.35)]",
    hoverText: "group-hover:text-lime-400",
    hoverBgGrad: "hover:bg-lime-950/10",
    iconHover: "group-hover:bg-lime-500/20 group-hover:text-lime-300 group-hover:border-lime-500/30",
  },
  Vehicles: {
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-400 border-slate-500/20",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    hoverBorder: "hover:border-slate-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(100,116,139,0.35)]",
    hoverText: "group-hover:text-slate-400",
    hoverBgGrad: "hover:bg-slate-950/10",
    iconHover: "group-hover:bg-slate-500/20 group-hover:text-slate-300 group-hover:border-slate-500/30",
  },
  "Digital Art": {
    badgeBg: "bg-fuchsia-500/10",
    badgeText: "text-fuchsia-400 border-fuchsia-500/20",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    hoverBorder: "hover:border-fuchsia-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(217,70,239,0.35)]",
    hoverText: "group-hover:text-fuchsia-400",
    hoverBgGrad: "hover:bg-fuchsia-950/10",
    iconHover: "group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/30",
  },
  Graffiti: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,88,12,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
};

const categoriesData = categoriesDataJson.map((cat) => {
  const style = STYLE_MAP[cat.name] || {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  };
  return {
    name: cat.name,
    id: cat.name,
    icon: ICON_MAP[cat.name] || Sparkles,
    description: cat.description,
    ...style,
  };
});

interface HomeClientProps {
  initialBlogs: Blog[];
}

export default function HomeClient({ initialBlogs }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<HomeTab>("trending");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── On-demand data state (mirrors BrowseClient pattern) ─────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [tabResult, setTabResult] = useState<HomeTabResult>({
    prompts: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    categoryCounts: {},
    tabTotalCount: 0,
  });

  // Category counts for the Browse by Category section
  const [allCategoryCounts, setAllCategoryCounts] = useState<Record<string, number>>({});

  const router = useRouter();

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  // ── Load one page of prompts directly from JSON files ────────────────────
  const loadTabData = useCallback(
    async (tab: HomeTab, category: string, page: number) => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await fetchHomeTabPrompts(tab, category, page);
        setTabResult(data);
      } catch (err) {
        setFetchError("Failed to load prompts. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Re-fetch whenever tab, category, or page changes (identical to BrowseClient)
  useEffect(() => {
    loadTabData(activeTab, selectedCategory ?? "", currentPage);
  }, [activeTab, selectedCategory, currentPage, loadTabData]);

  // Fetch all-category counts once on mount (for Browse by Category section)
  useEffect(() => {
    fetchCategoryCounts().then(setAllCategoryCounts);
  }, []);

  // ── Derived display data ─────────────────────────────────────────────────
  const { prompts: displayedPrompts, totalPages, currentPage: safePage, categoryCounts: tabCategoryCounts } = tabResult;

  const tabCategories = React.useMemo(() => {
    if (activeTab === "all") return categoriesData;
    return categoriesData.filter((cat) => (tabCategoryCounts[cat.id] ?? 0) > 0);
  }, [tabCategoryCounts, activeTab]);


  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />

      <div className="pt-2">
        <Hero />
      </div>

      {/* 1. Featured Prompts (directly below Hero) */}
      <section id="prompts-section" className="max-w-7xl mx-auto px-4 md:px-8 pb-32 pt-12">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Featured Gemini AI Image Prompts
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

        {/* Tab bar */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
            {([
              { id: "trending" as HomeTab, label: "Trending",  icon: Flame,       iconColor: "text-amber-500", activeClass: "bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-500/20 shadow-[0_2px_12px_rgba(245,158,11,0.3)]" },
              { id: "popular"  as HomeTab, label: "Popular",   icon: TrendingUp,  iconColor: "text-violet-400", activeClass: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500/20 shadow-[0_2px_12px_rgba(124,58,237,0.3)]" },
              { id: "latest"   as HomeTab, label: "Latest",    icon: Sparkles,    iconColor: "text-cyan-400",   activeClass: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500/20 shadow-[0_2px_12px_rgba(6,182,212,0.3)]" },
              { id: "all"      as HomeTab, label: "All",       icon: LayoutGrid,  iconColor: "text-white/40",   activeClass: "bg-white/10 text-white border-white/10 shadow-lg" },
            ] as const).map(({ id, label, icon: Icon, iconColor, activeClass }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  disabled={isLoading}
                  onClick={() => {
                    if (activeTab === id) return;
                    setActiveTab(id);
                    setSelectedCategory(null);
                    setCurrentPage(1);
                    loadTabData(id, "", 1);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none border",
                    id === "trending" && !isLoading && "animate-pulse",
                    isActive
                      ? activeClass
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.05] border-transparent",
                    isLoading && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : iconColor)} />
                  {label}
                </button>
              );
            })}
          </div>
          {/* Subtitle per tab */}
          <p className="mt-3 text-sm text-foreground/40">
            {activeTab === "all"      && "Browse all prompts from our library"}
            {activeTab === "trending" && "Prompts marked as trending by our curators"}
            {activeTab === "popular"  && "Most viewed & liked prompts from our library"}
            {activeTab === "latest"   && "Freshly added prompts, newest first"}
          </p>
        </div>

        {/* Category Pills (Respective to Active Tab) */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
            {/* "All" Pill */}
            <button
              onClick={() => {
                if (selectedCategory === null) return;
                setSelectedCategory(null);
                setCurrentPage(1);
                loadTabData(activeTab, "", 1);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer select-none",
                !selectedCategory
                  ? "bg-primary/10 text-primary border-primary/20 shadow-[0_4px_12px_rgba(139,92,246,0.1)]"
                  : "bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.1]"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All Prompts ({tabResult.tabTotalCount})
            </button>

            {/* Dynamic Category Pills */}
            {tabCategories.map((cat) => {
              const count = tabCategoryCounts[cat.id] ?? 0;
              const isSelected = selectedCategory?.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    const next = isSelected ? null : cat.id;
                    setSelectedCategory(next);
                    setCurrentPage(1);
                    loadTabData(activeTab, next ?? "", 1);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer select-none",
                    isSelected
                      ? cn(cat.badgeBg, cat.badgeText, "shadow-[0_4px_12px_rgba(139,92,246,0.1)]")
                      : "bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.1]"
                  )}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Error banner */}
        {fetchError && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-400">
            <Search className="w-4 h-4 shrink-0" />
            {fetchError}
            <button
              onClick={() => loadTabData(activeTab, selectedCategory ?? "", currentPage)}
              className="ml-auto text-xs font-bold underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] animate-pulse overflow-hidden"
              >
                <div className="aspect-[4/3] bg-white/[0.04]" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-white/[0.06]" />
                  <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
                </div>
              </div>
            ))
          ) : displayedPrompts.length > 0 ? (
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
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            loadTabData(activeTab, selectedCategory ?? "", page);
          }}
          scrollTargetId="prompts-section"
        />
      </section>



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

      {/* 4. Browse by Category Section */}
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
              <div
                key={cat.id}
                onClick={() => router.push(`/categories/${cat.id.toLowerCase()}`)}
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
              </div>
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
            {[
              "Cinematic Prompts",
              "Hyper Realistic Prompts",
              "Dark Fantasy Prompts",
              "Cyberpunk Prompts",
              "Anime Prompts",
              "Portrait Prompts",
            ].map((search) => (
              <button
                key={search}
                onClick={() => {
                  const cleanQuery = search.replace(" Prompts", "");
                  router.push(`/browse?q=${encodeURIComponent(cleanQuery)}`);
                }}
                className="px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/10 text-[10px] font-bold text-foreground/60 hover:text-white transition-all cursor-pointer"
              >
                {search}
              </button>
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

      {/* 5. Deep SEO Description / About Page */}
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
          {initialBlogs.slice(0, 3).map((blog, i) => (
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

      <Footer />
    </main>
  );
}
