import { Prompt } from "./json-db";

// All available category JSON file names
const CATEGORY_FILES = [
  "anime",
  "architecture",
  "cinematic",
  "fantasy",
  "portrait",
  "product",
  "sci-fi",
];

/**
 * Fetches all prompts from the public JSON files (client-side safe).
 * JSON files live in /public/data/prompts/*.json and are served as static assets.
 */
export async function fetchAllPrompts(): Promise<Prompt[]> {
  const results = await Promise.allSettled(
    CATEGORY_FILES.map((cat) =>
      fetch(`/data/prompts/${cat}.json`).then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch ${cat}.json`);
        return r.json() as Promise<Prompt[]>;
      })
    )
  );

  const all: Prompt[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      all.push(...result.value);
    }
  }
  return all;
}

/**
 * Finds a prompt by slug or id from the public JSON files.
 */
export async function fetchPromptBySlugOrId(
  identifier: string
): Promise<Prompt | null> {
  const all = await fetchAllPrompts();
  return all.find((p) => p.id === identifier || p.slug === identifier) ?? null;
}

/**
 * Fetches similar prompts (same category, excluding the given id).
 */
export async function fetchSimilarPrompts(
  id: string,
  category: string,
  limit = 3
): Promise<Prompt[]> {
  const all = await fetchAllPrompts();
  let similar = all.filter((p) => p.category === category && p.id !== id);
  if (similar.length === 0) {
    similar = all.filter((p) => p.id !== id);
  }
  return similar.slice(0, limit);
}
