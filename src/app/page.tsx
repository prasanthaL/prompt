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
} from "lucide-react";
import blogsData from "@/data/blogs.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";

/* ──────────────────────────────────────────────
   FAQ data — used for both UI and JSON-LD schema
   ────────────────────────────────────────────── */
const faqItems = [
  {
    question: "What is PromptVault and how does it work?",
    answer:
      "PromptVault is the world's leading marketplace for high-quality AI prompts. Browse our curated library, preview prompt outputs, and use them instantly with AI models like Gemini, Midjourney, DALL·E, and Stable Diffusion. Every prompt is tested and optimized by our community of creators.",
  },
  {
    question: "Are the AI prompts on PromptVault free to use?",
    answer:
      "Yes! We offer a large collection of free prompts across all categories including cinematic, anime, fantasy, fashion, and realistic styles. Premium prompts with advanced techniques are also available for creators who want to take their AI-generated images to the next level.",
  },
  {
    question: "Which AI models are compatible with these prompts?",
    answer:
      "Our prompts are primarily optimized for Google Gemini AI, but many work beautifully with other leading models such as Midjourney, DALL·E 3, Stable Diffusion XL, and Adobe Firefly. Each prompt listing indicates compatible models so you can choose the right one.",
  },
  {
    question: "Can I customize or modify the prompts?",
    answer:
      "Absolutely. Every prompt is designed to be a starting point. You can tweak parameters like style, lighting, composition, color palette, and subject matter to match your creative vision. We encourage experimentation — that's how the best results are born.",
  },
  {
    question: "How often are new prompts added to the library?",
    answer:
      "New prompts are added daily by our growing community of prompt engineers and AI artists. We also publish curated collections and trending picks every week so you never run out of fresh inspiration.",
  },
  {
    question: "Do I need technical knowledge to use AI prompts?",
    answer:
      "Not at all. Our prompts are copy-and-paste ready. Simply choose a prompt, paste it into your preferred AI image generator, and let the model do the work. We also publish beginner-friendly guides on our blog to help you get started.",
  },
  {
    question: "Can I submit my own prompts to PromptVault?",
    answer:
      "Yes — we welcome contributions from prompt creators worldwide. Submit your best prompts through our creator portal, and once reviewed and approved by our team, they'll be published to the marketplace for the community to discover and use.",
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


export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbPrompts, setDbPrompts] = useState<any[]>([]);
  const [localSearch, setLocalSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    const fetchDbPrompts = async () => {
      try {
        const res = await fetch("/api/admin/prompts");
        if (res.ok) {
          const data = await res.json();
          setDbPrompts(data);
        }
      } catch (err) {
        console.error("Failed to fetch prompts");
      }
    };
    fetchDbPrompts();
  }, []);


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


  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />

      <div className="pt-2">
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
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

      <section id="prompts-section" className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
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
      {/* Blog Suggestions Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Latest from our Blog
            </h2>
            <p className="text-foreground/40 text-sm">Stay updated with the latest AI prompt engineering trends</p>
          </div>
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            Explore Blog
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsData.slice(0, 3).map((blog, i) => (
            <div
              key={blog.id}
              onClick={() => router.push(`/blog/${blog.slug}`)}
              className="group cursor-pointer flex flex-col rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300"
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
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
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

      <StatsSection />



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
