import React from "react";
import type { Metadata } from "next";
import { Sparkles, Compass, HelpCircle, FileText, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import JackpotClient from "@/app/jackpot/JackpotClient";
import { SITE_URL } from "@/lib/site";

const pageUrl = `${SITE_URL}/discover`;
const ogImage = "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp";

// ISR: regenerate at most once per 24 hours (aligns with daily discovery reset)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Daily Prompt Discovery — Explore AI Image Prompts | AIPromptNest",
  description:
    "Explore creative AI image prompts daily with AIPromptNest Daily Prompt Discovery. Get 3 free prompt selections every 24 hours for Midjourney, ChatGPT, Gemini, and Flux.",
  keywords: [
    "daily AI prompt discovery",
    "random AI prompt picker",
    "free daily AI prompts",
    "prompt discovery tool",
    "free Midjourney prompts",
    "free ChatGPT prompts",
    "free Gemini prompts",
    "AI image prompts",
    "daily prompt picker",
    "AIPromptNest discovery",
    "creative AI prompts",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Daily Prompt Discovery — Explore AI Image Prompts | AIPromptNest",
    description:
      "Discover new creative AI prompts every day. 3 free discoveries every 24 hours across multiple visual genres — no signup required!",
    type: "website",
    url: pageUrl,
    siteName: "AIPromptNest",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "AIPromptNest Daily Prompt Discovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Prompt Discovery — Free Daily AI Prompts",
    description:
      "Discover new AI prompts every day with the AIPromptNest discovery tool. 3 free picks daily, no account needed!",
    images: [ogImage],
    creator: "@aipromptnest",
    site: "@aipromptnest",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When do Daily Prompt Discovery picks reset?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Picks reset every 24 hours at midnight local time. You receive 3 free discoveries every single day with no account required.",
      },
    },
    {
      "@type": "Question",
      name: "What categories are featured in Daily Prompt Discovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The discovery tool features 8 diverse creative domains: Cinematic, Portrait, Photography, Digital Art, Fantasy, Sci-Fi, Vehicles, and UI/UX Design.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to use Daily Prompt Discovery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account or registration is required. Your daily picks are saved automatically in your browser localStorage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save or copy discovered prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All discovered prompts can be instantly copied to your clipboard or saved for later reference directly from the result modal.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Daily Prompt Discovery — Explore AI Image Prompts",
  description:
    "Explore new creative AI image prompts daily across cinematic, portrait, landscape, sci-fi, and digital art categories on AIPromptNest.",
  url: pageUrl,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: SITE_URL,
  },
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        id="discover-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, webPageSchema]) }}
      />
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">

        {/* Back to Home */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Back to Home
          </Link>
        </div>

        {/* Page Hero Header — Static, server-rendered */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 border border-violet-400/40 px-4 py-1.5 rounded-full text-xs font-black text-violet-300 uppercase tracking-widest shadow-lg shadow-violet-500/10">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Creative Discovery Feature</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Daily Prompt Discovery
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-medium">
            Discover new creative AI prompts every day. Explore 3 free prompt selections every 24 hours across multiple visual genres.
          </p>
        </div>

        {/* Interactive section — Client component boundary */}
        <JackpotClient />

        {/* Features Grid — Static, server-rendered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Diverse Categories</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore 8 distinct visual styles including Cinematic, Photography, Portrait, Digital Art, Fantasy, Sci-Fi, Vehicles, and UI Design.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Fresh Variety</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Each selection filters out previously claimed prompts, giving you fresh inspiration and new ideas every session.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Ready-To-Use Prompts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every discovered prompt includes full text, camera direction, and lighting details ready to copy directly into your AI generator.
            </p>
          </div>
        </div>

        {/* FAQ Section — Static, server-rendered */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">When do discoveries reset?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discoveries reset automatically every 24 hours at midnight local time. You get 3 free discoveries every single day.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">What categories are included?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The discovery catalog spans Cinematic, Portrait, Photography, Digital Art, Fantasy, Sci-Fi, Vehicles, and UI/UX Design.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Do I need an account to use it?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No registration required. Your daily picks are saved smoothly using your browser localStorage.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Can I copy and save prompts?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes. You can instantly copy discovered prompts to your clipboard or save them for easy reference anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
