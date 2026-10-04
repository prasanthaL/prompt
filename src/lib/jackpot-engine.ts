/**
 * jackpot-engine.ts
 *
 * Core engine for AIPromptNest Prompt Discovery Wheel.
 * Provides random prompt discovery across creative categories,
 * daily reset synchronization (3 discoveries / 24 hrs),
 * non-duplicate prompt matching, and local persistence.
 */

import jackpotData from "@/data/jackpot-prompts.json";

export type RarityTier = "featured" | "creative" | "standard" | "popular";

export interface JackpotItem {
  id: number;
  title: string;
  category: string;
  prompt: string;
  tip?: string;
  rarity?: string;
  weight?: number;
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
  category: string;
  color: string;
  accentColor: string;
  rarity?: string;
  probability?: number;
}

export interface SpinResult {
  success: boolean;
  message?: string;
  segmentIndex: number;
  rarity: string;
  rewardType: "prompt";
  prompt?: JackpotItem;
  spinsRemaining: number;
  streakCount: number;
  nextResetTimestamp: number;
  isStreakBonus?: boolean;
}

export const DAILY_MAX_SPINS = 3;

// 8 Creative Categories on the Wheel visual ring
export const WHEEL_SEGMENTS: WheelSegment[] = [
  {
    id: 0,
    label: "Cinematic",
    subLabel: "Dramatic Scenes",
    category: "Cinematic",
    color: "#F59E0B",
    accentColor: "#FBBF24",
    rarity: "creative",
  },
  {
    id: 1,
    label: "Portrait",
    subLabel: "Lighting & Form",
    category: "Portrait",
    color: "#6366F1",
    accentColor: "#818CF8",
    rarity: "creative",
  },
  {
    id: 2,
    label: "Photography",
    subLabel: "Editorial & Realism",
    category: "Photography",
    color: "#A855F7",
    accentColor: "#C084FC",
    rarity: "creative",
  },
  {
    id: 3,
    label: "Digital Art",
    subLabel: "Creative Concepts",
    category: "Digital Art",
    color: "#3B82F6",
    accentColor: "#60A5FA",
    rarity: "creative",
  },
  {
    id: 4,
    label: "Fantasy",
    subLabel: "Mythical Lore",
    category: "Fantasy",
    color: "#EC4899",
    accentColor: "#F472B6",
    rarity: "creative",
  },
  {
    id: 5,
    label: "Sci-Fi",
    subLabel: "Futuristic Worlds",
    category: "Sci-Fi",
    color: "#14B8A6",
    accentColor: "#2DD4BF",
    rarity: "creative",
  },
  {
    id: 6,
    label: "Vehicles",
    subLabel: "Automotive Form",
    category: "Vehicles",
    color: "#F97316",
    accentColor: "#FB923C",
    rarity: "creative",
  },
  {
    id: 7,
    label: "UI/UX & Design",
    subLabel: "Modern Aesthetics",
    category: "UI/UX",
    color: "#10B981",
    accentColor: "#34D399",
    rarity: "creative",
  },
];

const LOCAL_STORAGE_KEY = "apn_discovery_state_v1";

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getNextResetTimestamp(): number {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return tomorrow.getTime();
}

export function getJackpotState(): JackpotState {
  if (typeof window === "undefined") {
    return {
      date: getTodayDateString(),
      spinsUsed: 0,
      claimedIds: [],
      streakCount: 1,
      lastStreakDate: getTodayDateString(),
      lastSpinTimestamp: 0,
    };
  }

  const todayStr = getTodayDateString();

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initialState: JackpotState = {
        date: todayStr,
        spinsUsed: 0,
        claimedIds: [],
        streakCount: 1,
        lastStreakDate: todayStr,
        lastSpinTimestamp: 0,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }

    const parsed: JackpotState = JSON.parse(raw);

    // If day rolled over, reset daily picks
    if (parsed.date !== todayStr) {
      const updatedState: JackpotState = {
        ...parsed,
        date: todayStr,
        spinsUsed: 0,
        streakCount: 1,
        lastStreakDate: todayStr,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
      return updatedState;
    }

    return parsed;
  } catch (e) {
    console.warn("[DiscoveryWheel] LocalStorage read error:", e);
    return {
      date: todayStr,
      spinsUsed: 0,
      claimedIds: [],
      streakCount: 1,
      lastStreakDate: todayStr,
      lastSpinTimestamp: 0,
    };
  }
}

export function saveJackpotState(state: JackpotState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("[DiscoveryWheel] LocalStorage write error:", e);
  }
}

/**
 * Execute a Discovery Pick
 */
export function executeSpin(): SpinResult {
  const currentState = getJackpotState();

  if (currentState.spinsUsed >= DAILY_MAX_SPINS) {
    return {
      success: false,
      message: "Daily discovery limit reached (3/3). Come back tomorrow for 3 fresh prompt discoveries!",
      segmentIndex: 0,
      rarity: "creative",
      rewardType: "prompt",
      spinsRemaining: 0,
      streakCount: currentState.streakCount,
      nextResetTimestamp: getNextResetTimestamp(),
    };
  }

  const allPrompts = jackpotData as JackpotItem[];
  const claimedSet = new Set(currentState.claimedIds);

  // Pick a random segment evenly
  const segmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
  const chosenSegment = WHEEL_SEGMENTS[segmentIndex];

  // Try to find an unclaimed prompt matching chosen category
  let categoryPool = allPrompts.filter(
    (p) => p.category?.toLowerCase() === chosenSegment.category.toLowerCase() && !claimedSet.has(p.id)
  );

  // If none left in this category, pick from any unclaimed prompts
  if (categoryPool.length === 0) {
    categoryPool = allPrompts.filter((p) => !claimedSet.has(p.id));
  }

  // If all prompts claimed, fallback to entire collection
  if (categoryPool.length === 0) {
    categoryPool = allPrompts;
  }

  const winPrompt = categoryPool[Math.floor(Math.random() * categoryPool.length)];
  if (winPrompt) {
    currentState.claimedIds.push(winPrompt.id);
  }

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
    rarity: "creative",
    rewardType: "prompt",
    prompt: winPrompt,
    spinsRemaining: DAILY_MAX_SPINS - updatedSpinsUsed,
    streakCount: currentState.streakCount,
    nextResetTimestamp: getNextResetTimestamp(),
  };
}
