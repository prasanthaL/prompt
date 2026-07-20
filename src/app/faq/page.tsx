import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ChevronRight, MessageSquare, ArrowRight } from "lucide-react";
import FAQClient from "./FAQClient";
import { FAQ_DATA } from "@/data/faq-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aipromptnest.com"),
  title: "Frequently Asked Questions (FAQ) | AIPromptNest",
  description:
    "Find answers to common questions about free Gemini AI image prompts, prompt engineering tips, commercial licensing, and usage rights on AIPromptNest.",
  keywords: [
    "Gemini AI prompts FAQ",
    "AIPromptNest FAQ",
    "free AI prompts help",
    "Gemini image prompts tutorial",
    "AI prompt licensing",
    "commercial AI art usage",
    "Gemini prompt engineering guide",
    "how to use Gemini prompts",
  ],
  alternates: {
    canonical: "https://www.aipromptnest.com/faq",
  },
};

/* JSON-LD structured data for FAQPage (Google Rich Snippets) */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* JSON-LD BreadcrumbList schema */
const breadcrumbJsonLd = {
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
      name: "FAQ",
      item: "https://www.aipromptnest.com/faq",
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      {/* Inject Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]),
        }}
      />

      <main className="min-h-screen mesh-gradient text-foreground">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 md:pt-40 mb-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-foreground/20" />
            <span className="text-foreground/60">FAQ</span>
          </nav>

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
              Got questions? We&apos;ve got answers. Browse our documentation or search for answers regarding Gemini AI prompts, commercial licensing, and usage tips.
            </p>
          </div>

          {/* Client Interactive Search, Filters & Accordions */}
          <FAQClient initialFaqs={FAQ_DATA} />

          {/* Contact Support CTA Box */}
          <div className="mt-16 p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Still have questions?</h3>
                <p className="text-xs text-foreground/50">Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-lg shadow-primary/20 shrink-0 cursor-pointer"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
