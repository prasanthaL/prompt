/**
 * prompts-data.ts
 *
 * Data layer for prompt detail pages.
 * Reads ALL JSON files from src/data/prompts/ directly — no API routes.
 *
 * Caching strategy:
 *  - Module-level Map (fileCache / allPromptsCache) — survives for the
 *    lifetime of the Node.js process. Zero filesystem reads after warmup.
 *  - getCachedAllPrompts uses unstable_cache (one shared Vercel ISR entry).
 *  - getCachedPromptBySlugOrId / getCachedSimilarPrompts are plain async
 *    wrappers — they rely solely on the module-level cache so they do NOT
 *    create per-slug ISR cache entries on Vercel.
 *
 * Safe in Server Components, generateStaticParams, and generateMetadata.
 */

import type { Prompt } from "@/lib/json-db";
import { unstable_cache } from "next/cache"; // used only for getCachedAllPrompts
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/prompts");

// ─── Level 1: process-level module cache ────────────────────────────────────
// Populated once per server process. Each category file is its own entry so
// `getPromptsByCategory` doesn't need to load every file.
const fileCache = new Map<string, Prompt[]>();
let allPromptsCache: Prompt[] | null = null;

function loadFile(file: string): Prompt[] {
  if (fileCache.has(file)) return fileCache.get(file)!;

  try {
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const data = JSON.parse(content);
    const prompts: Prompt[] = Array.isArray(data) ? (data as Prompt[]) : [];
    
    // Sort newest-first to match server-side behavior in json-db
    prompts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    fileCache.set(file, prompts);
    return prompts;
  } catch (e) {
    console.error(`[prompts-data] Error parsing ${file}:`, e);
    fileCache.set(file, []);
    return [];
  }
}

/**
 * Reads every .json file from src/data/prompts/.
 * Result is cached at the module level after the first call.
 */
function loadAllPrompts(): Prompt[] {
  if (allPromptsCache) return allPromptsCache;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      allPromptsCache = [];
      return [];
    }

    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
    const all: Prompt[] = [];
    for (const file of files) {
      all.push(...loadFile(file));
    }

    // Sort consolidated array newest-first to match server-side behavior in json-db
    all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    allPromptsCache = all;
    return all;
  } catch (err) {
    console.error("[prompts-data] Error reading prompts dir:", err);
    allPromptsCache = [];
    return [];
  }
}

// ─── Level 2: Next.js cache wrappers ─────────────────────────────────────────

const REVALIDATE_SECONDS = 86400; // 24 hours — matches page.tsx `revalidate`

/**
 * getCachedAllPrompts — ONE shared unstable_cache entry for the full list.
 * Used by pages that need to iterate all prompts (home, sitemap, etc.).
 */
export const getCachedAllPrompts = unstable_cache(
  async (): Promise<Prompt[]> =>
    loadAllPrompts().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  ["all-prompts"],
  { tags: ["prompts"], revalidate: REVALIDATE_SECONDS }
);

/**
 * getCachedPromptBySlugOrId — plain async wrapper over the module-level cache.
 * Does NOT use unstable_cache to avoid creating one Vercel ISR entry per slug.
 * The module-level allPromptsCache already ensures zero filesystem reads after
 * the first request in a given server process.
 */
export async function getCachedPromptBySlugOrId(
  identifier: string
): Promise<Prompt | null> {
  const all = loadAllPrompts();
  return all.find((p) => p.id === identifier || p.slug === identifier) ?? null;
}

/**
 * getCachedSimilarPrompts — plain async wrapper over the module-level cache.
 * Does NOT use unstable_cache for the same reason as getCachedPromptBySlugOrId.
 */
export async function getCachedSimilarPrompts(
  id: string,
  category: string,
  limit = 3
): Promise<Prompt[]> {
  const all = loadAllPrompts();
  let similar = all.filter((p) => p.category === category && p.id !== id);
  if (similar.length === 0) similar = all.filter((p) => p.id !== id);
  return similar.slice(0, limit);
}

// ─── Sync helpers (kept for generateStaticParams / generateMetadata) ─────────
// These run at build time and don't need Next.js cache wrappers.

/** Returns every prompt, sorted newest-first. */
export function getAllPromptsSync(): Prompt[] {
  return loadAllPrompts().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Finds a prompt by slug or ID. Returns null if not found. */
export function getPromptBySlugOrIdSync(identifier: string): Prompt | null {
  const all = loadAllPrompts();
  return all.find((p) => p.id === identifier || p.slug === identifier) ?? null;
}

/** Returns up to `limit` similar prompts from the same category. */
export function getSimilarPromptsSync(id: string, category: string, limit = 3): Prompt[] {
  const all = loadAllPrompts();
  let similar = all.filter((p) => p.category === category && p.id !== id);
  if (similar.length === 0) similar = all.filter((p) => p.id !== id);
  return similar.slice(0, limit);
}

/** Returns all unique slug/id values — used by generateStaticParams. */
export function getAllPromptSlugs(): string[] {
  const all = loadAllPrompts();
  const slugs: string[] = [];
  for (const p of all) {
    slugs.push(p.slug ?? p.id);
  }
  return slugs;
}
