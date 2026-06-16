"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import PromptCard from "@/components/PromptCard";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Plus, 
  Minus, 
  HelpCircle, 
  TrendingUp, 
  BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchPromptsPage, fetchCategoryCounts, PaginatedResult } from "@/lib/client-prompts";

const BROWSE_FAQS = [
  {
    question: "How do I use these AI image prompts?",
    answer: "Using our prompts is extremely simple. First, browse the library and find an image style or category you like. Click the copy icon to copy the optimized prompt text to your clipboard. Then, paste it directly into your preferred AI image generator (like Google Gemini, Midjourney, or DALL-E) and click generate. You will get a similar styled image instantly!"
  },
  {
    question: "Are these prompts fully optimized for Gemini AI?",
    answer: "Yes, every prompt in our library is thoroughly tested and optimized for Google Gemini. They leverage Gemini's specific language semantics and descriptive capabilities to ensure high-quality and consistent outputs, but they also work exceptionally well with Midjourney, Stable Diffusion, and DALL-E 3."
  },
  {
    question: "Can I customize the prompt parameters?",
    answer: "Absolutely! The bracketed words or key terms in the prompts represent customizable variables. For example, if a prompt describes a 'cinematic portrait of a [cyberpunk warrior]', you can easily change '[cyberpunk warrior]' to '[steampunk detective]' or '[vintage pilot]' to generate completely new characters in the same visual style."
  },
  {
    question: "Is there a limit on how many prompts I can copy?",
    answer: "No, there are no limits! All prompts in our public browse library are 100% free and open for everyone to copy and use. You can browse, copy, and experiment with as many prompts as you need for both personal and commercial projects."
  },
  {
    question: "How often do you add new categories and prompts?",
    answer: "We update our library with new prompts and trending categories every single week. Our team of prompt engineers keeps up with the latest AI model updates to deliver fresh, high-performance styling prompts daily."
  }
];

const POPULAR_SEARCHES = [
  "Cinematic Prompts",
  "Hyper Realistic",
  "Dark Fantasy",
  "Cyberpunk Art",
  "Anime Style",
  "Studio Portraits",
  "Sci-Fi Worlds",
  "Modern Architecture",
  "Product Shots"
];

const HOW_TO_USE_STEPS = [
  {
    step: "01",
    title: "Select an Aesthetic",
    description: "Browse through our themed categories or search for specific keywords to find the exact visual style and mood you want for your image."
  },
  {
    step: "02",
    title: "Copy the Prompt",
    description: "Click the copy button on any prompt card. The optimized prompt syntax will be copied to your clipboard instantly, completely free."
  },
  {
    step: "03",
    title: "Paste & Generate",
    description: "Paste the prompt into Gemini, Midjourney, or DALL-E. Customize subjects or details to make the creation unique, then hit generate!"
  }
];

const CATEGORY_DESCRIPTIONS: Record<string, {
  name: string;
  description: string;
}> = {
  all: {
    name: "Browse Prompts",
    description: "Explore our curated library of high-quality, community-tested AI image prompts optimized for Google Gemini, Midjourney, DALL·E, and Stable Diffusion. Browse by styles, search specific keywords, and copy optimized prompt templates with a single click to kickstart your creative projects instantly."
  },
  Cinematic: {
    name: "Cinematic Prompts",
    description: "Movie-like lighting, dramatic compositions, depth of field, and blockbuster visual styles optimized for Gemini and other high-performance image generators."
  },
  Anime: {
    name: "Anime Prompts",
    description: "Japanese animation style illustrations, vibrant characters, stylized backgrounds, fan-favorite aesthetics, and clean digital linework."
  },
  Portrait: {
    name: "Portrait Prompts",
    description: "Professional human portraits, detailed facial features, realistic lighting, and studio-grade photographic styles with realistic focus."
  },
  Fantasy: {
    name: "Fantasy Prompts",
    description: "Dark, mythical, legendary worlds, magic, mythical creatures, and ethereal fantasy concept art styles with rich textures."
  },
  "Sci-Fi": {
    name: "Sci-Fi Prompts",
    description: "Futuristic technology, space travel, neon-drenched cityscapes, cyberpunk aesthetics, and visionary speculative fiction style directions."
  },
  Architecture: {
    name: "Architecture Prompts",
    description: "Visionary architectural designs, modern interior spaces, historical landmarks, and classical or futuristic building structures."
  },
  Product: {
    name: "Product Prompts",
    description: "Commercial product photography setups, mockups, studio lighting, clean background aesthetics, and professional catalog styling."
  }
};

interface BrowseClientProps {}

export default function BrowseClient({}: BrowseClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState(queryParam || "");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResult, setPageResult] = useState<PaginatedResult>({
    prompts: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [totalAllCount, setTotalAllCount] = useState(0);

  // Category counts for the sidebar/filter badges
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Fetch category counts once on mount (data is cached after first load)
  useEffect(() => {
    fetchCategoryCounts().then(setCategoryCounts);
  }, []);

  /**
   * Fetches exactly one page of prompts.
   * client-prompts caches the full category array after the first import,
   * so switching pages is instant after the initial load.
   */
  const loadPage = useCallback(
    async (category: string, page: number, query: string) => {
      setIsLoading(true);
      const [result, allResult] = await Promise.all([
        fetchPromptsPage(category, page, query),
        category === "all" ? Promise.resolve(null) : fetchPromptsPage("all", 1, query)
      ]);
      setPageResult(result);
      setTotalAllCount(allResult ? allResult.totalCount : result.totalCount);
      setIsLoading(false);
    },
    []
  );

  // Re-fetch whenever category, page, or search query changes
  useEffect(() => {
    loadPage(activeCategory, currentPage, searchQuery);
  }, [activeCategory, currentPage, searchQuery, loadPage]);

  // Sync URL search-params into state
  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
      setCurrentPage(1);
    }
    if (queryParam) {
      setSearchQuery(queryParam);
      setCurrentPage(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, queryParam]);

  const { prompts: displayedPrompts, totalCount, totalPages } = pageResult;



  return (
    <div className="min-h-screen flex flex-col justify-between animate-fade-in">
      <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
      {/* Page Title & Search (Search is lg:hidden to avoid duplication) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            {CATEGORY_DESCRIPTIONS[activeCategory]?.name || CATEGORY_DESCRIPTIONS.all.name}
          </h1>
          <p className="text-white/50 text-sm md:text-base leading-relaxed min-h-[48px] transition-all duration-300">
            {CATEGORY_DESCRIPTIONS[activeCategory]?.description || CATEGORY_DESCRIPTIONS.all.description}
          </p>
        </div>

        {/* Mobile/Tablet Only Search Header */}
        <div className="flex items-center gap-3 lg:hidden w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-400 transition-colors" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full md:w-64 text-white"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            <Filter className="w-5 h-5 text-white/70" />
          </button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
            <SlidersHorizontal className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Category Filters (lg:hidden) */}
      <div className="lg:hidden mb-8">
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
            setSearchQuery("");
          }}
          categoryCounts={categoryCounts}
          totalCount={totalAllCount}
          mode="horizontal"
        />
      </div>

      {/* Main Browse Section - Sidebar Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sticky Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 self-start bg-[#0a0814]/50 border border-white/[0.05] rounded-2xl p-5 backdrop-blur-md space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/90">Filters</span>
              {(activeCategory !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="text-[10px] font-black uppercase text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Sidebar Search Input */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-white/40">Search Prompts</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full text-white"
                />
              </div>
            </div>

            {/* Sidebar Categories */}
            <div className="space-y-2 pt-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-white/40">Categories</label>
              <CategoryFilters
                activeCategory={activeCategory}
                onCategoryChange={(cat) => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                  setSearchQuery("");
                }}
                categoryCounts={categoryCounts}
                totalCount={totalAllCount}
                mode="vertical"
              />
            </div>
          </div>
        </div>

        {/* Content Column: Prompt Grid & Pagination */}
        <div className="col-span-full lg:col-span-3 space-y-8">
          {/* Active Filter Pill display (Desktop only since filters are visible in sidebar) */}
          {(activeCategory !== "all" || searchQuery) && (
            <div className="hidden lg:flex items-center gap-2 flex-wrap text-xs text-white/50">
              <span>Active filters:</span>
              {activeCategory !== "all" && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
                  Category: {activeCategory}
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-white hover:text-violet-400 transition-colors font-bold underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Prompt Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.05] aspect-[4/3] animate-pulse"
                />
              ))
            ) : displayedPrompts.length > 0 ? (
              displayedPrompts.map((prompt, i) => (
                <PromptCard
                  key={prompt.id || i}
                  {...prompt}
                  priority={i < 6}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-bold text-white">No prompts found</h3>
                <p className="text-white/40">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────
         Info Sections: How to Use, Popular Searches, FAQ
         ────────────────────────────────────────────── */}
      <div className="mt-20 pt-16 border-t border-white/[0.05] space-y-20">
        
        {/* 1. How to Use Prompts */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              Quick Guide
            </div>
            <h2 className="text-3xl font-black text-white">How To Use AI Prompts</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Get beautiful, consistent results in seconds. Follow these three simple steps to bring your creative visions to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_USE_STEPS.map((item) => (
              <div 
                key={item.step}
                className="relative p-6 rounded-2xl border border-white/[0.05] bg-[#0c0a15]/20 hover:border-violet-500/30 hover:bg-[#121021]/30 transition-all duration-300 group space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <span className="text-sm font-black text-violet-400">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Popular Searches Section */}
        <section className="p-6 rounded-2xl border border-white/[0.05] bg-[#0c0a15]/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">Popular Searches</h3>
              <p className="text-[10px] text-white/40 mt-0.5">Quickly filter by trending styles</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {POPULAR_SEARCHES.map((search) => (
              <button
                key={search}
                onClick={() => {
                  const cleanQuery = search.replace(" Prompts", "");
                  setSearchQuery(cleanQuery);
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/10 text-[10px] font-bold text-white/60 hover:text-white transition-all cursor-pointer"
              >
                {search}
              </button>
            ))}
          </div>
        </section>

        {/* 3. FAQ Section */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Find answers to the most common questions about finding, copying, and customizing AI prompts.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {BROWSE_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "rgba(139,92,246,0.05)" : "rgba(255,255,255,0.02)",
                    borderColor: isOpen ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4.5 text-left gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white hover:text-violet-400 transition-colors">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-violet-400 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/40 shrink-0" />
                    )}
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out border-white/[0.03]",
                      isOpen ? "max-h-40 border-t p-4.5" : "max-h-0"
                    )}
                  >
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>

      <Footer />
    </div>
  );
}
