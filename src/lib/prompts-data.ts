/**
 * prompts-data.ts
 *
 * Pure build-time data layer.
 * Imports JSON files directly — bundled by webpack/Turbopack at build time.
 * Safe in Server Components, generateStaticParams, and generateMetadata.
 * No `fs`, no API routes, no runtime I/O.
 */

import type { Prompt } from "@/lib/json-db";

// Direct JSON imports — bundled at build/compile time
import animeData from "@/data/prompts/anime.json";
import architectureData from "@/data/prompts/architecture.json";
import cinematicData from "@/data/prompts/cinematic.json";
import fantasyData from "@/data/prompts/fantasy.json";
import portraitData from "@/data/prompts/portrait.json";
import productData from "@/data/prompts/product.json";
import scifiData from "@/data/prompts/sci-fi.json";

const ALL_PROMPTS: Prompt[] = [
  ...(animeData as Prompt[]),
  ...(architectureData as Prompt[]),
  ...(cinematicData as Prompt[]),
  ...(fantasyData as Prompt[]),
  ...(portraitData as Prompt[]),
  ...(productData as Prompt[]),
  ...(scifiData as Prompt[]),
];

/** Returns every prompt, sorted newest-first. */
export function getAllPromptsSync(): Prompt[] {
  return [...ALL_PROMPTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Finds a prompt by slug or ID. Returns null if not found. */
export function getPromptBySlugOrIdSync(identifier: string): Prompt | null {
  return (
    ALL_PROMPTS.find(
      (p) => p.id === identifier || p.slug === identifier
    ) ?? null
  );
}

/** Returns up to `limit` similar prompts from the same category. */
export function getSimilarPromptsSync(
  id: string,
  category: string,
  limit = 3
): Prompt[] {
  let similar = ALL_PROMPTS.filter(
    (p) => p.category === category && p.id !== id
  );
  if (similar.length === 0) {
    similar = ALL_PROMPTS.filter((p) => p.id !== id);
  }
  return similar.slice(0, limit);
}

/** Returns all unique slug/id values — used by generateStaticParams. */
export function getAllPromptSlugs(): string[] {
  const slugs: string[] = [];
  for (const p of ALL_PROMPTS) {
    if (p.slug) slugs.push(p.slug);
    else slugs.push(p.id);
  }
  return slugs;
}
