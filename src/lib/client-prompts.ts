import { Prompt } from "./json-db";

const PAGE_SIZE = 12;

// ─── In-memory cache ────────────────────────────────────────────────────────
// Keyed by category slug. Stores the full sorted array for that category so
// subsequent page-turns are instant (no re-import needed).
const categoryCache = new Map<string, Prompt[]>();

/**
 * All JSON file slugs that exist in src/data/prompts/.
 * Add a new entry here whenever a new category file is created.
 */
const CATEGORY_SLUGS = [
  "animals-&-wildlife",
  "anime",
  "architecture",
  "cinematic",
  "couple",
  "digital-art",
  "family",
  "fantasy",
  "men",
  "nature-&-landscape",
  "portrait",
  "product",
  "sci-fi",
  "sport",
  "vehicles",
  "women",
] as const;

// ─── Internal helpers ────────────────────────────────────────────────────────

async function importCategoryFile(slug: string): Promise<Prompt[]> {
  try {
    const mod = await import(`../data/prompts/${slug}.json`);
    const data = mod.default ?? mod;
    return Array.isArray(data) ? (data as Prompt[]) : [];
  } catch {
    return [];
  }
}

/** Returns all prompts for a slug, using the cache. */
async function getCachedCategory(slug: string): Promise<Prompt[]> {
  if (categoryCache.has(slug)) {
    return categoryCache.get(slug)!;
  }
  const data = await importCategoryFile(slug);
  categoryCache.set(slug, data);
  return data;
}

/** Loads every category file in parallel and merges into one sorted array. */
async function loadAll(): Promise<Prompt[]> {
  const cacheKey = "__all__";
  if (categoryCache.has(cacheKey)) {
    return categoryCache.get(cacheKey)!;
  }

  const results = await Promise.allSettled(
    CATEGORY_SLUGS.map((slug) => getCachedCategory(slug))
  );

  const all: Prompt[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }

  // Sort newest-first (mirrors server-side behaviour)
  all.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  categoryCache.set(cacheKey, all);
  return all;
}

// ─── Slug → display-name map (mirrors categories.json order) ────────────────
const SLUG_TO_DISPLAY: Record<string, string> = {
  "animals-&-wildlife": "Animals & Wildlife",
  "anime": "Anime",
  "architecture": "Architecture",
  "cinematic": "Cinematic",
  "couple": "Couple",
  "digital-art": "Digital Art",
  "family": "Family",
  "fantasy": "Fantasy",
  "men": "Men",
  "nature-&-landscape": "Nature & Landscape",
  "portrait": "Portrait",
  "product": "Product",
  "sci-fi": "Sci-Fi",
  "sport": "Sport",
  "vehicles": "Vehicles",
  "women": "Women",
};

// ─── Public API ──────────────────────────────────────────────────────────────

export interface PaginatedResult {
  prompts: Prompt[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// ─── Home Tab Prompts ─────────────────────────────────────────────────────────

export type HomeTab = "trending" | "popular" | "latest" | "all";

export interface HomeTabResult {
  prompts: Prompt[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  /** Per-category counts within the tab (for category pills). */
  categoryCounts: Record<string, number>;
  /** Total count for the entire tab, ignoring category sub-filters. */
  tabTotalCount: number;
}

/**
 * In-memory cache for home tab results.
 * Key format: `${tab}:${category.toLowerCase()}:${page}`
 *
 * The underlying JSON files are already cached by getCachedCategory/loadAll,
 * so this layer caches the final filtered+paginated slice for instant
 * repeat tab/page switches.
 */
const homeTabCache = new Map<string, HomeTabResult>();

/**
 * Applies the tab-specific sort/filter to the full prompt list.
 * Returns a stable array (safe to cache and slice from).
 */
function applyTabFilter(all: Prompt[], tab: HomeTab): Prompt[] {
  switch (tab) {
    case "trending":
      return [...all]
        .filter((p) => p.isTrending)
        .sort(
          (a, b) =>
            (Number(b.views ?? 0) + Number(b.likes ?? 0)) -
            (Number(a.views ?? 0) + Number(a.likes ?? 0))
        );
    case "popular":
      return [...all]
        .filter((p) => p.isFeatured)
        .sort(
          (a, b) =>
            (Number(b.views ?? 0) + Number(b.likes ?? 0)) -
            (Number(a.views ?? 0) + Number(a.likes ?? 0))
        );
    case "latest":
      return [...all]
        .filter((p) => p.isLatest)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    case "all":
    default:
      // loadAll() already returns newest-first
      return all;
  }
}

/**
 * Fetches a paginated page of prompts for a specific home tab,
 * loading data directly from the JSON files in src/data/prompts/.
 *
 * - JSON files are lazy-imported once and cached by the internal
 *   categoryCache (same cache used by BrowseClient).
 * - The final filtered+paginated slice is also cached so rapid
 *   tab/page switches are instant.
 *
 * @param tab      – "trending" | "popular" | "latest" | "all"
 * @param category – optional category display-name to sub-filter (empty = all)
 * @param page     – 1-indexed page number
 */
export async function fetchHomeTabPrompts(
  tab: HomeTab,
  category: string = "",
  page: number = 1
): Promise<HomeTabResult> {
  const cacheKey = `${tab}:${category.toLowerCase()}:${page}`;
  if (homeTabCache.has(cacheKey)) {
    return homeTabCache.get(cacheKey)!;
  }

  // ── 1. Load all prompts from JSON files (cached after first call) ────────
  const all = await loadAll();

  // ── 2. Apply tab filter ──────────────────────────────────────────────────
  const tabFiltered = applyTabFilter(all, tab);

  // ── 3. Build per-category counts for the category pills ─────────────────
  const categoryCounts: Record<string, number> = {};
  for (const p of tabFiltered) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    }
  }

  // ── 4. Apply optional category sub-filter ───────────────────────────────
  const source = category
    ? tabFiltered.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      )
    : tabFiltered;

  // ── 5. Paginate ──────────────────────────────────────────────────────────
  const totalCount = source.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const prompts = source.slice(start, start + PAGE_SIZE);

  const result: HomeTabResult = {
    prompts,
    totalCount,
    totalPages,
    currentPage: safePage,
    categoryCounts,
    tabTotalCount: tabFiltered.length,
  };

  homeTabCache.set(cacheKey, result);
  return result;
}

/**
 * Invalidates all home tab cache entries.
 * Call this after admin mutations that change isTrending/isFeatured/isLatest flags.
 */
export function clearHomeTabCache(): void {
  homeTabCache.clear();
}


/**
 * Fetches a single page of prompts for the given category.
 *
 * - Results are cached in memory after the first load so subsequent
 *   page-turns are instant.
 * - Pass category = "all" to fetch across every category file.
 * - `page` is 1-indexed.
 */
export async function fetchPromptsPage(
  category: string,
  page: number,
  searchQuery = ""
): Promise<PaginatedResult> {
  // ── 1. Load (or retrieve from cache) the full list for this category ──
  let source: Prompt[];

  if (category === "all") {
    source = await loadAll();
  } else {
    const slug = category
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-&]/g, "");

    source = await getCachedCategory(slug);

    // If the file was empty, fall back to filtering the "all" pool
    if (source.length === 0) {
      const all = await loadAll();
      source = all.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  // ── 2. Apply optional search filter ─────────────────────────────────────
  const q = searchQuery.trim().toLowerCase();
  const filtered = q
    ? source.filter(
        (p) =>
          (p.title ?? "").toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q)
      )
    : source;

  // ── 3. Paginate ──────────────────────────────────────────────────────────
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const prompts = filtered.slice(start, start + PAGE_SIZE);

  return { prompts, totalCount, totalPages, currentPage: safePage };
}

/**
 * Convenience wrapper — fetches ALL prompts (no pagination).
 * Used by detail pages and similar-prompt lookups.
 */
export async function fetchAllPrompts(): Promise<Prompt[]> {
  return loadAll();
}

/**
 * Returns a record of { [displayName]: count } for every category.
 * Loads each category file in parallel (cached after first call).
 */
export async function fetchCategoryCounts(): Promise<Record<string, number>> {
  const entries = await Promise.all(
    CATEGORY_SLUGS.map(async (slug) => {
      const data = await getCachedCategory(slug);
      const displayName = SLUG_TO_DISPLAY[slug] ?? slug;
      return [displayName, data.length] as [string, number];
    })
  );
  return Object.fromEntries(entries);
}

/** Finds a prompt by slug or id across all category JSON files. */
export async function fetchPromptBySlugOrId(
  identifier: string
): Promise<Prompt | null> {
  const all = await loadAll();
  return all.find((p) => p.id === identifier || p.slug === identifier) ?? null;
}

/** Fetches similar prompts (same category, excluding the given id). */
export async function fetchSimilarPrompts(
  id: string,
  category: string,
  limit = 3
): Promise<Prompt[]> {
  const all = await loadAll();
  let similar = all.filter((p) => p.category === category && p.id !== id);
  if (similar.length === 0) similar = all.filter((p) => p.id !== id);
  return similar.slice(0, limit);
}

/**
 * @deprecated Use fetchPromptsPage() instead.
 * Kept for backward-compatibility with any callers that still use
 * fetchPromptsByCategory directly.
 */
export async function fetchPromptsByCategory(
  category: string
): Promise<Prompt[]> {
  if (category === "all") return loadAll();

  const slug = category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-&]/g, "");

  const data = await getCachedCategory(slug);
  if (data.length > 0) return data;

  const all = await loadAll();
  return all.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
