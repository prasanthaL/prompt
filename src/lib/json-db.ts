import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/prompts");

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
  createdAt: string;
  updatedAt: string;
}

export const getAllPrompts = (): Prompt[] => {
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
  
  return allPrompts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPromptsByCategory = (category: string): Prompt[] => {
  const filename = `${category.toLowerCase().replace(/\s+/g, '-')}.json`;
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) return [];
  
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (e) {
    console.error(`Error parsing JSON file: ${filename}`, e);
    return [];
  }
};

export const getPromptById = (id: string): Prompt | null => {
  const all = getAllPrompts();
  return all.find(p => p.id === id) || null;
};

export const savePrompt = (prompt: Prompt) => {
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

export const deletePrompt = (id: string) => {
  const files = fs.readdirSync(DATA_DIR);
  
  files.forEach(file => {
    if (file.endsWith(".json")) {
      const filePath = path.join(DATA_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      try {
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

export const updatePrompt = (id: string, data: Partial<Prompt>) => {
  const allPrompts = getAllPrompts();
  const promptIndex = allPrompts.findIndex(p => p.id === id);
  
  if (promptIndex === -1) return null;
  
  const oldPrompt = allPrompts[promptIndex];
  const updatedPrompt = { 
    ...oldPrompt, 
    ...data, 
    updatedAt: new Date().toISOString() 
  };

  // If category changed, delete from old file and save to new file
  if (data.category && data.category !== oldPrompt.category) {
    deletePrompt(id);
    savePrompt(updatedPrompt);
  } else {
    savePrompt(updatedPrompt);
  }
  
  return updatedPrompt;
};

export const getTrendingPrompts = (limit: number = 20): Prompt[] => {
  const all = getAllPrompts();
  return all
    .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
    .slice(0, limit);
};

export const getPremiumPrompts = (): Prompt[] => {
  const all = getAllPrompts();
  return all.filter(p => p.isPremium).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getSimilarPrompts = (id: string, category: string, limit: number = 3): Prompt[] => {
  const all = getAllPrompts();
  let similar = all.filter(p => p.category === category && p.id !== id);
  
  if (similar.length === 0) {
    similar = all.filter(p => p.id !== id);
  }
  
  return similar.slice(0, limit);
};

export const getPromptBySlugOrId = (identifier: string): Prompt | null => {
  const all = getAllPrompts();
  return all.find(p => p.id === identifier || p.slug === identifier) || null;
};
