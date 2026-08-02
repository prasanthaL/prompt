"use client";

import React, { useState, useEffect } from "react";
import JackpotWheel from "@/components/JackpotWheel";
import JackpotStreak from "@/components/JackpotStreak";
import JackpotRewardModal from "@/components/JackpotRewardModal";
import { SpinResult, getJackpotState, JackpotState } from "@/lib/jackpot-engine";

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
    <>
      {/* 7-Day Lucky Streak Tracker */}
      {jackpotState && <JackpotStreak streakCount={jackpotState.streakCount || 1} />}

      {/* Interactive Jackpot Wheel Widget */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
        <JackpotWheel onSpinComplete={handleSpinComplete} />
      </div>

      {/* Suspense Reward Popup Modal */}
      <JackpotRewardModal
        result={spinResult}
        onClose={() => setSpinResult(null)}
        onSpinAgain={() => setSpinResult(null)}
      />
    </>
  );
}
