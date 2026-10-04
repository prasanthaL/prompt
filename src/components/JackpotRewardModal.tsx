"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  X
} from "lucide-react";
import { SpinResult } from "@/lib/jackpot-engine";

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

  const { prompt, spinsRemaining } = result;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  // Discovery Modal Styling
  const config = {
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    gradientBorder: "from-violet-500 via-purple-500 to-indigo-500",
    title: "PROMPT DISCOVERED",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="discovery-result-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-violet-950/50 transform transition-all duration-700 ${
          isFlipped ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Glow Accent Top Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${config.gradientBorder}`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close discovery modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <span
            className={`px-4 py-1 rounded-full text-xs tracking-wider uppercase shadow-md ${config.badgeColor}`}
          >
            {config.title}
          </span>
          <h3
            id="discovery-result-title"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2"
          >
            {prompt?.title || "Creative Prompt"}
          </h3>
          {prompt?.category && (
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Category: {prompt.category}
            </span>
          )}
        </div>

        {/* Reward Content Body */}
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

          {/* Prompt Tip */}
          {prompt?.tip && (
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-violet-300">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{prompt.tip}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {prompt && (
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

            {prompt && (
              <a
                href={`/browse?q=${encodeURIComponent(prompt.category)}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Use Now
              </a>
            )}
          </div>

          {/* Discover Again or Close */}
          {spinsRemaining > 0 ? (
            <button
              onClick={() => {
                onClose();
                onSpinAgain();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Discover Another ({spinsRemaining} Left)
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-colors"
            >
              Done (0 Left)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JackpotRewardModal;
