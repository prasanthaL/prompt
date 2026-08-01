"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  Gift,
  X,
  Trophy,
  Zap,
} from "lucide-react";
import { SpinResult, RarityTier } from "@/lib/jackpot-engine";

interface JackpotRewardModalProps {
  result: SpinResult | null;
  onClose: () => void;
  onSpinAgain: () => void;
}

export const JackpotRewardModal: React.FC<JackpotRewardModalProps> = ({
  result,
  onClose,
  onSpinAgain,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (result) {
      setIsFlipped(false);
      // Trigger card flip suspense animation after modal opens
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [result]);

  if (!result) return null;

  const { prompt, betterLuck, rewardType, rarity, spinsRemaining, isStreakBonus } =
    result;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  // Tier Colors
  const getRarityConfig = (tier: RarityTier | "better_luck" | "secret") => {
    switch (tier) {
      case "legendary":
      case "secret":
        return {
          title: "⭐ LEGENDARY JACKPOT ⭐",
          bgGradient: "from-amber-500/20 via-yellow-500/10 to-amber-600/20",
          borderColor: "border-amber-400/60",
          badgeColor: "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black",
          textColor: "text-amber-400",
          shadowColor: "shadow-amber-500/40",
        };
      case "epic":
        return {
          title: "✨ EPIC PROMPT UNLOCKED ✨",
          bgGradient: "from-purple-500/20 via-fuchsia-500/10 to-purple-600/20",
          borderColor: "border-purple-400/60",
          badgeColor: "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold",
          textColor: "text-purple-400",
          shadowColor: "shadow-purple-500/40",
        };
      case "rare":
        return {
          title: "🔹 RARE PROMPT UNLOCKED 🔹",
          bgGradient: "from-blue-500/20 via-indigo-500/10 to-blue-600/20",
          borderColor: "border-blue-400/60",
          badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold",
          textColor: "text-blue-400",
          shadowColor: "shadow-blue-500/40",
        };
      case "better_luck":
        return {
          title: "🎁 BONUS REWARD UNLOCKED 🎁",
          bgGradient: "from-indigo-500/20 via-slate-800/10 to-indigo-600/20",
          borderColor: "border-indigo-400/60",
          badgeColor: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold",
          textColor: "text-indigo-400",
          shadowColor: "shadow-indigo-500/40",
        };
      default:
        return {
          title: "🍀 COMMON PROMPT UNLOCKED 🍀",
          bgGradient: "from-emerald-500/20 via-teal-500/10 to-emerald-600/20",
          borderColor: "border-emerald-400/60",
          badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold",
          textColor: "text-emerald-400",
          shadowColor: "shadow-emerald-500/40",
        };
    }
  };

  const config = getRarityConfig(rarity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Confetti Animation Background for Legendary / Epic */}
      {(rarity === "legendary" || rarity === "epic" || rarity === "secret") && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-bounce" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-pink-400 rounded-full animate-ping" />
        </div>
      )}

      {/* Main Modal Card */}
      <div
        className={`relative z-10 w-full max-w-xl bg-slate-900 border ${config.borderColor} rounded-3xl p-6 sm:p-8 shadow-2xl ${config.shadowColor} transition-all duration-700 ${
          isFlipped ? "scale-100 opacity-100 rotate-0" : "scale-90 opacity-0 -rotate-3"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 7-Day Streak Bonus Banner */}
        {isStreakBonus && (
          <div className="mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg animate-bounce">
            <Trophy className="w-4 h-4" />
            7-Day Streak Reward: Guaranteed Legendary!
          </div>
        )}

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <span
            className={`px-4 py-1 rounded-full text-xs tracking-wider uppercase shadow-md ${config.badgeColor}`}
          >
            {config.title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            {rewardType === "better_luck"
              ? betterLuck?.title
              : prompt?.title || "Special Reward"}
          </h3>
          {prompt?.category && (
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Category: {prompt.category}
            </span>
          )}
        </div>

        {/* Reward Content Body */}
        {rewardType === "better_luck" ? (
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 mb-6 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Gift className="w-5 h-5" />
              <span>{betterLuck?.badge || "BONUS PERK"}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {betterLuck?.description}
            </p>

            {betterLuck?.bonusPrompt && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                  🎁 Bonus Starter Prompt:
                </span>
                <p className="text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-200">
                  {betterLuck.bonusPrompt.prompt}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {/* Prompt Code Block */}
            <div className="relative group bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  AI Prompt
                </span>
                <button
                  onClick={() => prompt && handleCopy(prompt.prompt)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm font-mono text-slate-100 leading-relaxed select-all">
                {prompt?.prompt}
              </p>
            </div>

            {/* Pro Tip */}
            {prompt?.tip && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-300">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{prompt.tip}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {rewardType === "prompt" && prompt && (
              <button
                onClick={handleSave}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  saved
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                {saved ? "Saved" : "Save Prompt"}
              </button>
            )}

            {rewardType === "prompt" && prompt && (
              <a
                href={`/browse?q=${encodeURIComponent(prompt.category)}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Use Now
              </a>
            )}
          </div>

          {/* Spin Again or Close */}
          {spinsRemaining > 0 ? (
            <button
              onClick={() => {
                onClose();
                onSpinAgain();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Spin Again ({spinsRemaining} Left)
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-colors"
            >
              Done (0 Spins Left)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JackpotRewardModal;
