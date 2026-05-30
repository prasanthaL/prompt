import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";

const DATA_DIR = path.join(process.cwd(), "src/data/prompts");
// Simplified: If the KV credentials exist, use them!
const SHOULD_USE_KV = !!process.env.KV_REST_API_URL;

// Ensure the data directory exists (only locally)
if (!SHOULD_USE_KV && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  slug: string | null;
  fullPrompt: string;
  views: number;
  likes: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  models?: string[];
}

// Local helper to read all files
const getLocalPrompts = (): Prompt[] => {
  try {
    if (!fs.existsSync(DATA_DIR)) return [];
    const files = fs.readdirSync(DATA_DIR);
    let allPrompts: Prompt[] = [];
    
    files.forEach(file => {
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
};

export const getAllPrompts = async (): Promise<Prompt[]> => {
  if (SHOULD_USE_KV) {
    try {
      const { kv } = await import("@vercel/kv");
      let all = await kv.get<Prompt[]>("all_prompts");
      
      // Auto-seed KV from local JSON files if KV is empty
      if (!all || (Array.isArray(all) && all.length === 0)) {
        const localData = getLocalPrompts();
        if (localData.length > 0) {
          await kv.set("all_prompts", localData);
          all = localData;
        }
      }
      
      return (all || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.error("KV Error, falling back to local files:", err);
      return getLocalPrompts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  return getLocalPrompts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Internal implementation (not cached)
const _getPromptsByCategory = async (category: string): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  return all.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

/**
 * Returns all prompts for a given category.
 * Results are cached per-category for 60 seconds to avoid repeated
 * filesystem/KV reads on every request.
 */
export const getPromptsByCategory = (category: string): Promise<Prompt[]> =>
  unstable_cache(
    () => _getPromptsByCategory(category),
    [`category-prompts-${category.toLowerCase()}`],
    {
      tags: ["prompts", `category-${category.toLowerCase()}`],
      revalidate: 60,
    }
  )();

export const getPromptById = async (id: string): Promise<Prompt | null> => {
  const all = await getAllPrompts();
  return all.find(p => p.id === id) || null;
};

export const savePrompt = async (prompt: Prompt) => {
  if (!SHOULD_USE_KV && (process.env.VERCEL === "1" || process.env.NODE_ENV === "production")) {
    throw new Error("Vercel KV is not connected. In production, you must connect a KV database via the Vercel Storage tab because the filesystem is read-only.");
  }

  if (SHOULD_USE_KV) {
    const { kv } = await import("@vercel/kv");
    const all = await getAllPrompts();
    const index = all.findIndex(p => p.id === prompt.id);
    if (index !== -1) {
      all[index] = prompt;
    } else {
      all.push(prompt);
    }
    await kv.set("all_prompts", all);
    return;
  }

  // Local Saving
  const category = prompt.category.toLowerCase().replace(/\s+/g, '-');
  const filename = `${category}.json`;
  const filePath = path.join(DATA_DIR, filename);
  
  let prompts: Prompt[] = [];
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    try {
      prompts = JSON.parse(content);
    } catch (e) {
      prompts = [];
    }
  }
  
  const index = prompts.findIndex(p => p.id === prompt.id);
  if (index !== -1) {
    prompts[index] = prompt;
  } else {
    prompts.push(prompt);
  }
  
  fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2));
};

export const deletePrompt = async (id: string) => {
  if (SHOULD_USE_KV) {
    const { kv } = await import("@vercel/kv");
    const all = await getAllPrompts();
    const filtered = all.filter(p => p.id !== id);
    await kv.set("all_prompts", filtered);
    return;
  }

  // Local Deletion
  const files = fs.readdirSync(DATA_DIR);
  files.forEach(file => {
    if (file.endsWith(".json")) {
      const filePath = path.join(DATA_DIR, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        let prompts: Prompt[] = JSON.parse(content);
        const newPrompts = prompts.filter(p => p.id !== id);
        if (newPrompts.length !== prompts.length) {
          fs.writeFileSync(filePath, JSON.stringify(newPrompts, null, 2));
        }
      } catch (e) {
        console.error(`Error processing file ${file} for deletion`, e);
      }
    }
  });
};

export const updatePrompt = async (id: string, data: Partial<Prompt>) => {
  const allPrompts = await getAllPrompts();
  const promptIndex = allPrompts.findIndex(p => p.id === id);
  
  if (promptIndex === -1) return null;
  
  const oldPrompt = allPrompts[promptIndex];
  const updatedPrompt = { 
    ...oldPrompt, 
    ...data, 
    updatedAt: new Date().toISOString() 
  };

  await savePrompt(updatedPrompt);
  return updatedPrompt;
};

export const getTrendingPrompts = async (limit: number = 20): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  return all
    .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
    .slice(0, limit);
};

export const getPremiumPrompts = async (): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  return all.filter(p => p.isPremium).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getSimilarPrompts = async (id: string, category: string, limit: number = 3): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  let similar = all.filter(p => p.category === category && p.id !== id);
  if (similar.length === 0) {
    similar = all.filter(p => p.id !== id);
  }
  return similar.slice(0, limit);
};

export const getPromptBySlugOrId = async (identifier: string): Promise<Prompt | null> => {
  const all = await getAllPrompts();
  return all.find(p => p.id === identifier || p.slug === identifier) || null;
};
