/**
 * jackpot-engine.ts
 *
 * Core engine for AIPromptNest 🎰 Jackpot Prompt Wheel.
 * Handles weighted random probabilities, cookie & localStorage synchronization,
 * daily resets (3 spins / 24 hrs), non-duplicate prompt matching, streak tracking,
 * and bonus perks for "Better Luck" outcomes.
 */

import jackpotData from "@/data/jackpot-prompts.json";

export type RarityTier = "legendary" | "epic" | "rare" | "common";

export interface JackpotItem {
  id: number;
  title: string;
  category: string;
  rarity: RarityTier;
  weight: number;
  prompt: string;
  tip?: string;
}

export interface BetterLuckBonus {
  id: string;
  title: string;
  badge: string;
  description: string;
  bonusPrompt?: JackpotItem;
}

export interface JackpotState {
  date: string;
  spinsUsed: number;
  claimedIds: number[];
  streakCount: number;
  lastStreakDate: string;
  lastSpinTimestamp: number;
}

export interface WheelSegment {
  id: number;
  label: string;
  subLabel: string;
  rarity: RarityTier | "better_luck" | "secret";
  color: string;
  accentColor: string;
  probability: number;
}

export interface SpinResult {
  success: boolean;
  message?: string;
  segmentIndex: number;
  rarity: RarityTier | "better_luck" | "secret";
  rewardType: "prompt" | "better_luck" | "secret_box";
  prompt?: JackpotItem;
  betterLuck?: BetterLuckBonus;
  isStreakBonus?: boolean;
  spinsRemaining: number;
  streakCount: number;
  nextResetTimestamp: number;
}

// 8 Slices on the Wheel visual ring
export const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    id: 0,
    label: "Jackpot Prompt",
    subLabel: "⭐ LEGENDARY ⭐",
    rarity: "legendary",
    color: "#F59E0B",
    accentColor: "#FBBF24",
    probability: 2,
  },
  {
    id: 1,
    label: "Better Luck",
    subLabel: "🎁 +10% Prompt Perk",
    rarity: "better_luck",
    color: "#6366F1",
    accentColor: "#818CF8",
    probability: 10,
  },
  {
    id: 2,
    label: "Exclusive Prompt",
    subLabel: "✨ EPIC ✨",
    rarity: "epic",
    color: "#A855F7",
    accentColor: "#C084FC",
    probability: 8,
  },
  {
    id: 3,
    label: "Lucky Prompt",
    subLabel: "🔹 RARE 🔹",
    rarity: "rare",
    color: "#3B82F6",
    accentColor: "#60A5FA",
    probability: 20,
  },
  {
    id: 4,
    label: "Better Luck",
    subLabel: "🚀 Bonus Spin Boost",
    rarity: "better_luck",
    color: "#4F46E5",
    accentColor: "#6366F1",
    probability: 10,
  },
  {
    id: 5,
    label: "Secret Box",
    subLabel: "❓ MYSTERY ❓",
    rarity: "secret",
    color: "#EC4899",
    accentColor: "#F472B6",
    probability: 5,
  },
  {
    id: 6,
    label: "Better Luck",
    subLabel: "💡 Common Prompt Gift",
    rarity: "better_luck",
    color: "#4338CA",
    accentColor: "#4F46E5",
    probability: 10,
  },
  {
    id: 7,
    label: "Everyday Prompt",
    subLabel: "🍀 COMMON 🍀",
    rarity: "common",
    color: "#10B981",
    accentColor: "#34D399",
    probability: 35,
  },
];

const LOCAL_STORAGE_KEY = "apn_jackpot_state_v1";
const COOKIE_NAME = "apn_uid";
export const DAILY_MAX_SPINS = 3;

/**
 * Generate or fetch anonymous cookie ID
 */
export function getOrCreateAnonymousId(): string {
  if (typeof window === "undefined") return "";

  const nameEQ = COOKIE_NAME + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  // Generate new anonymous ID
  const newId =
    "apn_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
  document.cookie = `${COOKIE_NAME}=${newId}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  return newId;
}

/**
 * Helper to get today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Get timestamp of next midnight local time
 */
export function getNextResetTimestamp(): number {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  return nextMidnight.getTime();
}

/**
 * Get initial or existing Jackpot user state from LocalStorage with daily reset check
 */
export function getJackpotState(): JackpotState {
  if (typeof window === "undefined") {
    return {
      date: getTodayDateString(),
      spinsUsed: 0,
      claimedIds: [],
      streakCount: 1,
      lastStreakDate: getTodayDateString(),
      lastSpinTimestamp: Date.now(),
    };
  }

  // Ensure cookie exists
  getOrCreateAnonymousId();

  const today = getTodayDateString();
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!raw) {
    const initialState: JackpotState = {
      date: today,
      spinsUsed: 0,
      claimedIds: [],
      streakCount: 1,
      lastStreakDate: today,
      lastSpinTimestamp: 0,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }

  try {
    const parsed: JackpotState = JSON.parse(raw);

    // Check if date changed -> Reset spins
    if (parsed.date !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      let newStreak = parsed.streakCount || 1;
      if (parsed.lastStreakDate === yesterdayStr) {
        // Consecutive day visit!
        newStreak += 1;
      } else if (parsed.lastStreakDate !== today) {
        // Streak broken
        newStreak = 1;
      }

      const updatedState: JackpotState = {
        ...parsed,
        date: today,
        spinsUsed: 0,
        streakCount: newStreak > 7 ? 1 : newStreak,
        lastStreakDate: today,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
      return updatedState;
    }

    return parsed;
  } catch {
    const fallback: JackpotState = {
      date: today,
      spinsUsed: 0,
      claimedIds: [],
      streakCount: 1,
      lastStreakDate: today,
      lastSpinTimestamp: 0,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
}

/**
 * Save updated Jackpot state to LocalStorage
 */
export function saveJackpotState(state: JackpotState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

/**
 * "Better Luck" Perk Pool - Ensures the user is never disappointed!
 */
const BETTER_LUCK_BONUSES: BetterLuckBonus[] = [
  {
    id: "bl_1",
    title: "10% Enhanced Prompt Perk!",
    badge: "🎁 BONUS PERK",
    description:
      "Better Luck on the wheel! Here is a bonus 10% Prompt Quality Modifier formula you can add to any Midjourney or ChatGPT prompt: '--style raw --v 6.0 --stylize 250'.",
  },
  {
    id: "bl_2",
    title: "Bonus Common Prompt Unlocked!",
    badge: "💡 CONSOLATION PRIZE",
    description:
      "Don't leave empty-handed! Unlocked a starter creative prompt for your journey.",
  },
  {
    id: "bl_3",
    title: "Streak Multiplier Active!",
    badge: "⚡ STREAK BOOST",
    description:
      "Spin registered! Keep your daily streak going to unlock the Day 7 Guaranteed Legendary Jackpot!",
  },
];

/**
 * Core Spin Execution Engine
 */
export function executeSpin(): SpinResult {
  const currentState = getJackpotState();

  // 1. Check spin limit
  if (currentState.spinsUsed >= DAILY_MAX_SPINS) {
    return {
      success: false,
      message: "Daily spin limit reached (3/3). Come back tomorrow for 3 fresh spins!",
      segmentIndex: 0,
      rarity: "better_luck",
      rewardType: "better_luck",
      spinsRemaining: 0,
      streakCount: currentState.streakCount,
      nextResetTimestamp: getNextResetTimestamp(),
    };
  }

  const allPrompts = jackpotData as JackpotItem[];
  const claimedSet = new Set(currentState.claimedIds);

  // Check 7-day streak bonus
  const isStreakBonus = currentState.streakCount === 7 && currentState.spinsUsed === 0;

  let chosenSegment: WheelSegment;
  let targetRarity: RarityTier | "better_luck" | "secret";

  if (isStreakBonus) {
    // Force segment 0 (Jackpot Legendary)
    chosenSegment = WHEEL_SEGMENTS[0];
    targetRarity = "legendary";
  } else {
    // Weighted selection of wheel segment based on probability
    const totalProb = WHEEL_SEGMENTS.reduce((sum, seg) => sum + seg.probability, 0);
    let rand = Math.random() * totalProb;
    let selectedSeg = WHEEL_SEGMENTS[0];

    for (const seg of WHEEL_SEGMENTS) {
      if (rand < seg.probability) {
        selectedSeg = seg;
        break;
      }
      rand -= seg.probability;
    }
    chosenSegment = selectedSeg;
    targetRarity = chosenSegment.rarity;
  }

  let rewardType: "prompt" | "better_luck" | "secret_box" = "prompt";
  let winPrompt: JackpotItem | undefined;
  let winBetterLuck: BetterLuckBonus | undefined;

  if (targetRarity === "better_luck") {
    rewardType = "better_luck";
    const bonusIdx = Math.floor(Math.random() * BETTER_LUCK_BONUSES.length);
    winBetterLuck = { ...BETTER_LUCK_BONUSES[bonusIdx] };

    // If consolation prize type, attach an unclaimed common prompt as a bonus!
    if (winBetterLuck.id === "bl_2") {
      const commonPool = allPrompts.filter(
        (p) => p.rarity === "common" && !claimedSet.has(p.id)
      );
      if (commonPool.length > 0) {
        winBetterLuck.bonusPrompt =
          commonPool[Math.floor(Math.random() * commonPool.length)];
        currentState.claimedIds.push(winBetterLuck.bonusPrompt.id);
      }
    }
  } else if (targetRarity === "secret") {
    rewardType = "secret_box";
    // Secret box unlocks an Epic or Legendary prompt!
    const secretPool = allPrompts.filter(
      (p) => (p.rarity === "epic" || p.rarity === "legendary") && !claimedSet.has(p.id)
    );
    const pool = secretPool.length > 0 ? secretPool : allPrompts;
    winPrompt = pool[Math.floor(Math.random() * pool.length)];
    currentState.claimedIds.push(winPrompt.id);
  } else {
    rewardType = "prompt";
    // Filter pool by chosen rarity tier and unclaimed IDs
    let pool = allPrompts.filter(
      (p) => p.rarity === targetRarity && !claimedSet.has(p.id)
    );

    // Fallback if all of target rarity claimed
    if (pool.length === 0) {
      pool = allPrompts.filter((p) => !claimedSet.has(p.id));
    }
    // Final fallback to entire collection if all claimed
    if (pool.length === 0) {
      pool = allPrompts;
    }

    winPrompt = pool[Math.floor(Math.random() * pool.length)];
    currentState.claimedIds.push(winPrompt.id);
  }

  // Update State
  const updatedSpinsUsed = currentState.spinsUsed + 1;
  const updatedState: JackpotState = {
    ...currentState,
    spinsUsed: updatedSpinsUsed,
    lastSpinTimestamp: Date.now(),
  };

  saveJackpotState(updatedState);

  return {
    success: true,
    segmentIndex: chosenSegment.id,
    rarity: targetRarity,
    rewardType,
    prompt: winPrompt,
    betterLuck: winBetterLuck,
    isStreakBonus,
    spinsRemaining: DAILY_MAX_SPINS - updatedSpinsUsed,
    streakCount: currentState.streakCount,
    nextResetTimestamp: getNextResetTimestamp(),
  };
}
