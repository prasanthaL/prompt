/**
 * prompts-data.ts
 *
 * Data layer for prompt detail pages.
 * Uses json-db.ts under the hood to read ALL JSON files from src/data/prompts/
 * dynamically, so newly added categories (men.json, sport.json, etc.) are
 * automatically picked up without needing manual imports.
 *
 * Safe in Server Components, generateStaticParams, and generateMetadata.
 */

import type { Prompt } from "@/lib/json-db";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/prompts");

/**
 * Reads ALL .json files from the prompts directory dynamically.
 * This ensures newly created category files (e.g. men.json, sport.json)
 * are always included without needing to update import statements.
 */
function loadAllPrompts(): Prompt[] {
  try {
    if (!fs.existsSync(DATA_DIR)) return [];
    const files = fs.readdirSync(DATA_DIR);
    let allPrompts: Prompt[] = [];

    files.forEach((file) => {
      if (file.endsWith(".json")) {
        try {
          const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
          const data = JSON.parse(content);
          if (Array.isArray(data)) {
            allPrompts = [...allPrompts, ...data];
          }
        } catch (e) {
          console.error(`Error parsing JSON file: ${file}`, e);
        }
      }
    });
    return allPrompts;
  } catch (err) {
    console.error("Error reading local prompts:", err);
    return [];
  }
}

/** Returns every prompt, sorted newest-first. */
export function getAllPromptsSync(): Prompt[] {
  return loadAllPrompts().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Finds a prompt by slug or ID. Returns null if not found. */
export function getPromptBySlugOrIdSync(identifier: string): Prompt | null {
  const all = loadAllPrompts();
  return (
    all.find(
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
  const all = loadAllPrompts();
  let similar = all.filter(
    (p) => p.category === category && p.id !== id
  );
  if (similar.length === 0) {
    similar = all.filter((p) => p.id !== id);
  }
  return similar.slice(0, limit);
}

/** Returns all unique slug/id values — used by generateStaticParams. */
export function getAllPromptSlugs(): string[] {
  const all = loadAllPrompts();
  const slugs: string[] = [];
  for (const p of all) {
    if (p.slug) slugs.push(p.slug);
    else slugs.push(p.id);
  }
  return slugs;
}
