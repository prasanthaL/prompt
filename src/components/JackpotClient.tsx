"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import JackpotWheel from "@/components/JackpotWheel";
import JackpotStreak from "@/components/JackpotStreak";
import JackpotRewardModal from "@/components/JackpotRewardModal";
import { SpinResult, getJackpotState, JackpotState } from "@/lib/jackpot-engine";
import { Sparkles, Trophy, HelpCircle, Gift, ShieldCheck, ArrowLeft } from "lucide-react";

export default function JackpotClient() {
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [jackpotState, setJackpotState] = useState<JackpotState | null>(null);

  const refreshState = () => {
    setJackpotState(getJackpotState());
  };

  useEffect(() => {
    refreshState();
  }, []);

  const handleSpinComplete = (result: SpinResult) => {
    setSpinResult(result);
    refreshState();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Back to Home Button */}
          <div className="flex justify-center mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-full transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>
          </div>

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

        {/* 7-Day Lucky Streak Tracker */}
        {jackpotState && <JackpotStreak streakCount={jackpotState.streakCount || 1} />}

        {/* Interactive Jackpot Wheel Widget */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
          <JackpotWheel onSpinComplete={handleSpinComplete} />
        </div>

        {/* Features & Odds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Rarity Tiers & Probabilities</h3>
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

        {/* FAQ Section */}
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

      {/* Suspense Reward Popup Modal */}
      <JackpotRewardModal
        result={spinResult}
        onClose={() => setSpinResult(null)}
        onSpinAgain={() => setSpinResult(null)}
      />
    </div>
  );
}
