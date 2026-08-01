import React from "react";
import type { Metadata } from "next";
import { Sparkles, Trophy, HelpCircle, Gift, ShieldCheck } from "lucide-react";
import JackpotClient from "./JackpotClient";

const siteUrl = "https://www.aipromptnest.com";
const pageUrl = `${siteUrl}/jackpot`;
const ogImage = "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp";

// ISR: regenerate at most once per 24 hours (aligns with daily spin reset)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "🎰 Jackpot Prompt Wheel — Spin & Win Daily AI Prompts Free",
  description:
    "Spin the AIPromptNest Jackpot Wheel every 24 hours and unlock Legendary, Epic, Rare & Common AI prompts for Midjourney, ChatGPT, Gemini and Flux. 3 free spins daily — no account needed!",
  keywords: [
    "jackpot AI prompt wheel",
    "daily free AI prompts",
    "spin to win AI prompts",
    "free Midjourney prompts daily",
    "free ChatGPT prompts",
    "free Gemini prompts",
    "AI prompt generator wheel",
    "legendary AI prompts",
    "epic AI prompts",
    "daily prompt spinner",
    "AIPromptNest jackpot",
    "free AI art prompts",
    "random AI prompt generator",
    "Midjourney prompt wheel",
    "prompt lucky wheel",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "🎰 Jackpot Prompt Wheel — Win Daily AI Prompts | AIPromptNest",
    description:
      "Spin the wheel and unlock premium Legendary, Epic, Rare & Common AI prompts every day for free. 3 spins every 24 hours — no signup required!",
    type: "website",
    url: pageUrl,
    siteName: "AIPromptNest",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "AIPromptNest Jackpot Prompt Wheel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🎰 Jackpot Prompt Wheel — Free Daily AI Prompts",
    description:
      "Spin to unlock Legendary, Epic & Rare AI prompts every day. 3 free spins daily, no account needed!",
    images: [ogImage],
    creator: "@aipromptnest",
    site: "@aipromptnest",
  },
};

/* JSON-LD Structured Data */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When do Jackpot Prompt Wheel spins reset?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spins reset every 24 hours at midnight local time. You receive 3 free spins every single day with no account required.",
      },
    },
    {
      "@type": "Question",
      name: "How does the 7-Day Lucky Streak work on AIPromptNest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spin the Jackpot Wheel at least once per day for 7 consecutive days to trigger the Day 7 Guaranteed Legendary Prompt reward.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to use the Jackpot Prompt Wheel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account or registration is required. Your daily spins and streak are saved automatically using browser cookies and localStorage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save or copy Jackpot prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All claimed prompts can be instantly copied to your clipboard or saved for later use directly from the reward popup.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Jackpot Prompt Wheel — Daily Free AI Prompts",
  description:
    "Spin the AIPromptNest Jackpot Wheel daily to win Legendary, Epic, Rare and Common AI prompts for Midjourney, ChatGPT, Gemini and Flux image generation.",
  url: pageUrl,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: siteUrl,
  },
};

export default function JackpotPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, webPageSchema]) }}
      />
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Page Hero Header — Static, server-rendered */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-black text-amber-300 uppercase tracking-widest shadow-lg shadow-amber-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Signature Daily Feature</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            🎰 Jackpot Prompt Wheel
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-medium">
            Spin the wheel and unlock premium-quality AI prompts every day. Get 3 free spins every 24 hours!
          </p>
        </div>

        {/* Interactive section — Client component boundary */}
        <JackpotClient />

        {/* Features & Odds Grid — Static, server-rendered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Rarity Tiers &amp; Probabilities</h3>
            <ul className="text-xs text-slate-400 space-y-1.5 font-medium">
              <li className="flex justify-between"><span className="text-amber-400 font-bold">Legendary</span><span>2% Chance</span></li>
              <li className="flex justify-between"><span className="text-purple-400 font-bold">Epic</span><span>8% Chance</span></li>
              <li className="flex justify-between"><span className="text-blue-400 font-bold">Rare</span><span>20% Chance</span></li>
              <li className="flex justify-between"><span className="text-emerald-400 font-bold">Common</span><span>40% Chance</span></li>
              <li className="flex justify-between"><span className="text-indigo-400 font-bold">Better Luck (Bonus)</span><span>30% Chance</span></li>
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">No-Duplicate Guarantee</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every spin filters out prompts you&apos;ve already claimed, ensuring you discover fresh creative inspiration every single day.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">No Empty Hands</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              &quot;Better Luck&quot; outcomes award bonus prompt tweaks, starter perks, and progress toward your Day 7 Guaranteed Legendary Jackpot.
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
              <h4 className="font-bold text-slate-200">When do spins reset?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spins reset automatically every 24 hours at midnight local time. You get 3 free spins every single day!
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">How does the 7-Day Lucky Streak work?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spin the wheel at least once a day for 7 consecutive days to trigger the Day 7 Guaranteed Legendary Prompt Jackpot!
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Do I need an account to play?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No registration required! Your daily spins and streak are saved seamlessly using secure browser cookies and localStorage.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200">Can I save claimed prompts?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! You can instantly copy claimed prompts to your clipboard or save them for quick access anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
