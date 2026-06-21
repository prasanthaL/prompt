import fs from "fs";
import path from "path";
import { unstable_cache, revalidateTag } from "next/cache";

const DATA_DIR = path.join(process.cwd(), "src/data/prompts");
const BLOGS_FILE = path.join(process.cwd(), "src/data/blogs.json");

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
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
  isTrending?: boolean;
  isLatest?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  models?: string[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
  active: boolean;
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

const _getAllPrompts = async (): Promise<Prompt[]> => {
  return getLocalPrompts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAllPrompts = (): Promise<Prompt[]> =>
  unstable_cache(
    () => _getAllPrompts(),
    ["all-prompts"],
    {
      tags: ["prompts"],
      revalidate: 60,
    }
  )();

// Internal implementation (not cached)
const _getPromptsByCategory = async (category: string): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  return all.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

/**
 * Returns all prompts for a given category.
 * Results are cached per-category for 60 seconds to avoid repeated
 * filesystem reads on every request.
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
  revalidateTag("prompts", "max");
};

export const deletePrompt = async (id: string) => {
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
  revalidateTag("prompts", "max");
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
  revalidateTag("prompts", "max");
  return updatedPrompt;
};

export const getTrendingPrompts = async (limit: number = 20): Promise<Prompt[]> => {
  const all = await getAllPrompts();
  const trending = all.filter(p => p.isTrending === true);
  return trending
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

// --- BLOG HELPERS ---

const getLocalBlogs = (): Blog[] => {
  try {
    if (!fs.existsSync(BLOGS_FILE)) return [];
    const content = fs.readFileSync(BLOGS_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading local blogs:", err);
    return [];
  }
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  return getLocalBlogs();
};

export const getActiveBlogs = async (): Promise<Blog[]> => {
  const all = await getAllBlogs();
  return all.filter(b => b.active);
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const all = await getAllBlogs();
  return all.find(b => b.slug === slug) || null;
};

export const saveBlogs = async (blogs: Blog[]) => {
  // Local Saving
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
};

export const updateBlog = async (id: string, data: Partial<Blog>) => {
  const allBlogs = await getAllBlogs();
  const blogIndex = allBlogs.findIndex(b => b.id === id);
  
  if (blogIndex === -1) return null;
  
  const oldBlog = allBlogs[blogIndex];
  const updatedBlog = { 
    ...oldBlog, 
    ...data
  };

  allBlogs[blogIndex] = updatedBlog;
  await saveBlogs(allBlogs);
  return updatedBlog;
};
