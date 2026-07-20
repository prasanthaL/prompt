"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, ChevronDown, Sparkles, HelpCircle, FileQuestion, BookOpen, Key, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  category: "general" | "prompting" | "licensing" | "submissions";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "g1",
    category: "general",
    question: "What is AIPromptNest?",
    answer: "AIPromptNest is a free, expert-curated repository of Gemini AI prompts. We help creators, prompt engineers, and AI developers find organized, high-quality, and tested prompt templates for generating high-definition images, code, and text using Google Gemini."
  },
  {
    id: "g2",
    category: "general",
    question: "Is AIPromptNest free to use?",
    answer: "Yes, 100% free! All prompts in our public catalog can be copied and used directly in your projects without any charges, subscription models, or hidden fees. We believe in democratizing access to high-quality prompt engineering templates."
  },
  {
    id: "p1",
    category: "prompting",
    question: "What are Google Gemini AI image prompts?",
    answer: "These are structured text descriptions specifically tailored to steer Google's Gemini models (like Imagen 3) toward producing high-quality artwork. They utilize specific modifiers, stylistic cues, compositions, lighting instructions, and format settings to yield predictable, visually stunning outputs."
  },
  {
    id: "p2",
    category: "prompting",
    question: "How do I use these prompts?",
    answer: "Find a prompt card you love, click 'Copy Prompt', and paste it directly into the Gemini prompt input box. Many prompts feature brackets like [subject] or [color]—you can swap these placeholders out with your own variables to render custom images in that exact style."
  },
  {
    id: "p3",
    category: "prompting",
    question: "Do these prompts work on other AI generators like ChatGPT?",
    answer: "While specifically optimized for Google Gemini's rendering nuances, styles, and prompt weights, the core compositional language, subjects, lighting instructions, and descriptors will work well on Stable Diffusion as well."
  },
  {
    id: "l1",
    category: "licensing",
    question: "Can I use the images generated with these prompts for commercial work?",
    answer: "Yes. The prompts themselves are open-source. The ownership, licensing, and commercial usage rights of the generated output files depend strictly on Google Gemini's Terms of Service. As of now, Google allows commercial application of Gemini-generated assets."
  },
  {
    id: "l2",
    category: "licensing",
    question: "Do I need to attribute or credit AIPromptNest?",
    answer: "No attribution is required. You are completely free to use the prompts for personal and commercial endeavors. However, sharing AIPromptNest with other creators or giving us a shout-out is always greatly appreciated!"
  }
];

const CATEGORIES = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "general", name: "General Info", icon: FileQuestion },
  { id: "prompting", name: "Prompting Tips", icon: BookOpen },
  { id: "licensing", name: "Licensing & Rights", icon: Key },
  { id: "submissions", name: "Submissions", icon: Users }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    g1: true // Open first item by default
  });

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesTab = activeTab === "all" || faq.category === activeTab;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <main className="min-h-screen mesh-gradient text-foreground pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">FAQ</span>
        </div>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-foreground/60 text-base max-w-lg mx-auto">
            Got questions? We've got answers. Browse our documentation or search for answers to specific inquiries.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. licensing, image, copy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Tabs Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer",
                  isActive
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                    : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12] text-foreground/50 hover:text-foreground"
                )}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4 min-h-[300px]">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer focus:outline-none select-none"
                  >
                    <span className="font-bold text-white text-base md:text-lg leading-tight">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-white/50 transition-transform duration-300",
                          isExpanded && "rotate-180 text-primary"
                        )}
                      />
                    </div>
                  </button>

                  <div
                    className={cn(
                      "transition-all duration-300 ease-in-out overflow-hidden border-t border-transparent",
                      isExpanded
                        ? "max-h-[500px] border-white/[0.04]"
                        : "max-h-0 pointer-events-none"
                    )}
                  >
                    <div className="p-6 text-sm md:text-base leading-relaxed text-foreground/60 bg-black/[0.05]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 border border-white/[0.04] rounded-2xl bg-white/[0.01] space-y-4">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-center mx-auto text-white/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No FAQ match found</h3>
                <p className="text-xs text-white/40">Try searching for other terms or check different categories.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
