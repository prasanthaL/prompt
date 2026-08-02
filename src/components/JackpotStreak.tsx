"use client";

import React from "react";
import { Flame, Trophy, Check, Sparkles } from "lucide-react";

interface JackpotStreakProps {
  streakCount: number;
}

export const JackpotStreak: React.FC<JackpotStreakProps> = ({ streakCount }) => {
  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full max-w-xl mx-auto bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-foreground tracking-tight">
              Daily Lucky Streak
            </h4>
            <p className="text-xs text-foreground/60">
              Spin daily to unlock the Day 7 Guaranteed Legendary Reward!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-black">
          <span>{streakCount} Day Streak</span>
        </div>
      </div>

      {/* 7-Day Progress Bar Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((day) => {
          const isCompleted = streakCount >= day;
          const isCurrent = streakCount === day;
          const isDay7 = day === 7;

          return (
            <div
              key={day}
              className={`relative flex flex-col items-center justify-center py-3 rounded-2xl border transition-all ${
                isDay7
                  ? isCompleted
                    ? "bg-gradient-to-b from-amber-500/30 to-yellow-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20"
                    : "bg-amber-500/10 border-amber-500/40 text-amber-400 animate-pulse"
                  : isCompleted
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                  : isCurrent
                  ? "bg-amber-500/20 border-amber-500/60 text-amber-300 ring-2 ring-amber-500/50"
                  : "bg-foreground/5 border-foreground/10 text-foreground/30"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider mb-1">
                Day {day}
              </span>

              {isDay7 ? (
                <div className="flex flex-col items-center">
                  <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span className="text-[9px] font-black text-amber-300 uppercase mt-0.5">
                    Jackpot
                  </span>
                </div>
              ) : isCompleted ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                </div>
              ) : (
                <Sparkles className="w-4 h-4 opacity-40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JackpotStreak;
