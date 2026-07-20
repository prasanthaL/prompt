"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_DATA, CATEGORIES, FAQItem } from "@/data/faq-data";

interface FAQClientProps {
  initialFaqs?: FAQItem[];
}

export default function FAQClient({ initialFaqs = FAQ_DATA }: FAQClientProps) {
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
    return initialFaqs.filter((faq) => {
      const matchesTab = activeTab === "all" || faq.category === activeTab;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [initialFaqs, activeTab, searchQuery]);

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-12 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search FAQs (e.g. licensing, image, copy)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search frequently asked questions"
          className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-primary/50 focus:outline-none rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder-white/20 transition-all focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="FAQ Categories">
        {CATEGORIES.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
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
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
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
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
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
    </>
  );
}
