"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Users, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  LayoutGrid, 
  Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom SVG components for social links matching the mockup
const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

const PinterestIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.164 0 7.397 2.967 7.397 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.02 12.017.02z" />
  </svg>
);

const FileStarIcon = () => (
  <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5l.588 1.19 1.314.19-1.002.977.236 1.308L12 13.548l-1.136.597.236-1.308-1.002-.977 1.314-.19L12 10.5z" fill="currentColor" />
  </svg>
);

const VALUE_STATS = [
  { icon: Sparkles, title: "100% Free", desc: "Always free to use" },
  { icon: ShieldCheck, title: "High Quality", desc: "Expert curated prompts" },
  { icon: Zap, title: "Updated Daily", desc: "Fresh prompts every day" },
  { icon: Users, title: "Trusted by Millions", desc: "Used by AI enthusiasts" },
];

const SECTIONS = [
  {
    title: "Popular Categories",
    links: [
      { name: "Cinematic Prompts", href: "/categories/cinematic" },
      { name: "Anime Prompts", href: "/categories/anime" },
      { name: "Fantasy Prompts", href: "/categories/fantasy" },
      { name: "Sci-Fi Prompts", href: "/categories/sci-fi" },
      { name: "Portrait Prompts", href: "/categories/portrait" },
    ]
  },
  {
    title: "Browse",
    links: [
      { name: "Latest Prompts", href: "/browse" },
      { name: "Trending Prompts", href: "/trending" },
      { name: "Premium Prompts", href: "/premium" },
      { name: "All Categories", href: "/categories" },
    ]
  },
  {
    title: "AI Tools",
    links: [
      { name: "Gemini AI Prompts", href: "/browse" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Prompt Engineering", href: "/blog/how-to-create-hyper-realistic-ai-photos-using-simple-prompts" },
      { name: "AI Prompt Tips", href: "/blog/the-science-of-color-theory-in-ai-art-generation" },
      { name: "Game Development Guide", href: "/blog/the-role-of-ai-art-in-modern-game-development" },
      { name: "Blog & Insights", href: "/blog" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
    ]
  }
];

const POPULAR_CATEGORIES = [
  "Cinematic",
  "Anime",
  "Fantasy",
  "Sci-Fi",
  "Architecture",
  "Portrait",
  "Product",
  "Men",
  "Women",
  "Family",
  "Couple",
  "Sport",
  "Nature & Landscape",
  "Animals & Wildlife",
  "Vehicles",
  "Digital Art"
];

const SOCIAL_LINKS = [
  { href: "https://twitter.com", icon: <XIcon /> },
  { href: "https://facebook.com", icon: <FacebookIcon /> },
  { href: "https://instagram.com", icon: <InstagramIcon /> },
  { href: "https://youtube.com", icon: <YoutubeIcon /> },
  { href: "https://discord.com", icon: <DiscordIcon /> },
  { href: "https://pinterest.com", icon: <PinterestIcon /> },
];

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <footer className="w-full bg-[#03020a] border-t border-white/[0.05] pt-20 pb-10 px-4 md:px-8 relative overflow-hidden select-none">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-violet-600/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding, Search, Value Stats & 5 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left branding area (approx 4/12 wide) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform shrink-0">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                AIPromptNest
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Discover thousands of free AI prompts for Gemini. Find the perfect prompt for writing, coding, marketing, business, education and productivity.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-sm group">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-violet-500/50 focus:outline-none rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder-white/30 transition-all"
                />
              </div>
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-violet-600 hover:bg-violet-500 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-md shadow-violet-600/10"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* 4 Value proposition stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.04] max-w-sm">
              {VALUE_STATS.map((stat, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <stat.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/95">{stat.title}</p>
                    <p className="text-[11px] text-white/40 leading-normal mt-0.5">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Columns (approx 8/12 wide) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-8">
            {SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-extrabold text-white/80 uppercase tracking-widest leading-none">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href} 
                        className="flex items-center gap-1 text-[13px] text-white/45 hover:text-white transition-colors py-0.5 group"
                      >
                        <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-violet-400 transition-colors shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: Popular Categories & Summary card */}
        <div className="border border-white/[0.04] bg-white/[0.01] rounded-2xl p-6 md:p-8 mt-16 space-y-8 backdrop-blur-sm relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Popular Categories</h3>
              </div>
              <button 
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
              >
                View All
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isCategoriesExpanded && "rotate-180")} />
              </button>
            </div>

            {/* Categories tag container */}
            <div className={cn(
              "flex flex-wrap gap-2 transition-all duration-300 ease-in-out overflow-hidden",
              isCategoriesExpanded ? "max-h-[500px] opacity-100" : "max-h-[82px] sm:max-h-[38px] opacity-90"
            )}>
              {POPULAR_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase()}`}
                  className="px-3.5 py-1.5 border border-white/[0.04] hover:border-violet-500/20 bg-white/[0.01] hover:bg-violet-500/10 text-xs font-semibold text-white/50 hover:text-white rounded-lg transition-all"
                >
                  {category} Prompts
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/[0.04] w-full" />

          {/* About nest text & platform stats */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8">
            {/* Star-in-folder icon and paragraph */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                <FileStarIcon />
              </div>
              <div className="space-y-3 max-w-3xl">
                <p className="text-xs leading-relaxed text-white/45">
                  <strong className="text-white font-semibold">AIPromptNest</strong> is a free AI prompt library helping users discover high-quality prompts for Gemini, ChatGPT, Claude, Midjourney, and other generative AI tools. Explore thousands of categorized prompts for writing, coding, marketing, business, education, productivity, image generation, and more.
                </p>
                <p className="text-xs leading-relaxed text-white/45">
                  Our growing prompt database is updated regularly with trending prompts, expert-curated collections, and community favorites to help you get better AI-generated results.
                </p>
              </div>
            </div>

            {/* Platform stats aligned horizontally */}
            <div className="flex flex-row items-center justify-between sm:justify-start lg:justify-end gap-6 sm:gap-10 border-t border-white/[0.04] lg:border-t-0 lg:border-l lg:border-white/[0.04] pt-6 lg:pt-0 lg:pl-10 shrink-0">
              {[
                { icon: FileText, value: "500+", label: "Prompts" },
                { icon: LayoutGrid, value: "16", label: "Categories" },
                { icon: Zap, value: "Daily", label: "Updates" },
                { icon: ShieldCheck, value: "100%", label: "Free" },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center space-y-1.5">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <stat.icon className="w-4.5 h-4.5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-white tracking-tight leading-none">{stat.value}</p>
                      <p className="text-[10.5px] font-bold text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  </div>
                  {i < 3 && <div className="hidden sm:block h-10 w-px bg-white/[0.06]" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/35">
            © 2026 AIPromptNest. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/40">
            {["Free AI Prompts", "Gemini AI Prompts", "Gemini Image Prompts", "Prompt Library"].map((item, i) => (
              <React.Fragment key={item}>
                <Link 
                  href={`/browse?q=${encodeURIComponent(
                    item.replace("Free ", "").replace("AI ", "").replace("Prompts", "").replace("Library", "").trim()
                  )}`} 
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
                {i < 3 && <span className="text-white/20 select-none">•</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/35">Follow us on</span>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-violet-500/20 bg-white/[0.02] hover:bg-violet-500/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
