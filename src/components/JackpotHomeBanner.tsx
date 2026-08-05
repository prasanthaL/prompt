"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Zap, Gift, Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const DELAY_MS = 1200;

export default function JackpotHomeBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Show on every page visit after a short delay
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-4 z-50
        w-[calc(100%-2rem)] max-w-sm
        transition-all duration-500 ease-out
        ${leaving
          ? "opacity-0 translate-y-8 scale-95"
          : "opacity-100 translate-y-0 scale-100"
        }
      `}
      role="complementary"
      aria-label="Jackpot Prompt Wheel promotion"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-orange-500/30 blur-xl -z-10 animate-pulse" />

      <div className="relative rounded-2xl border border-amber-400/30 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-amber-500/20 overflow-hidden">

        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Dismiss button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss jackpot banner"
          className="absolute top-3 right-3 p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4 p-4 pr-10">
          {/* Animated icon */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/40">
              <span className="text-2xl select-none">🎰</span>
            </div>
            {/* Sparkle badge */}
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-400">
                Daily Bonus
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider border border-emerald-500/30">
                FREE
              </span>
            </div>
            <p className="text-sm font-black text-white leading-tight">
              Your 3 Daily Spins Are Ready! 🎁
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              Spin the Jackpot Wheel to unlock Legendary, Epic &amp; Rare AI prompts.
            </p>

            {/* Rarity pills */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] font-black text-amber-400 flex items-center gap-1">
                <Star className="w-2.5 h-2.5" /> Legendary
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[9px] font-black text-purple-400 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Epic
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[9px] font-black text-blue-400 flex items-center gap-1">
                <Gift className="w-2.5 h-2.5" /> Rare
              </span>
            </div>
          </div>

          {/* CTA button */}
          <Link
            href="/jackpot"
            onClick={() => {
              dismiss();
              trackEvent("jackpot_route_click", { source: "home_banner" });
            }}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Spin Now →
          </Link>
        </div>

        {/* Bottom progress bar — decorative "daily reset" feel */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[9px] text-slate-600 mb-1">
            <span>Daily spins available</span>
            <span className="text-amber-500 font-bold">3 / 3</span>
          </div>
          <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
