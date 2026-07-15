import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Copy, Eye, Heart, ArrowUpRight, Tag } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Prompt {
  id: string;
  title: string;
  slug?: string | null;
  category: string;
  fullPrompt: string;
  image: string;
  isPremium?: boolean;
  author?: string;
  views?: number;
  likes?: number;
  models?: string[];
  tags?: string[];
}

interface PromptGridBlockProps {
  categories: string[];
  perCategory?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a category display name → its JSON file name on disk */
function categoryToFileName(category: string): string {
  return (
    category
      .toLowerCase()
      .replace(/\s+&\s+/g, "-&-") // "Nature & Landscape" → "nature-&-landscape"
      .replace(/\s+/g, "-")        // spaces → hyphens
  );
}

function readPromptsForCategory(category: string): Prompt[] {
  try {
    const fileName = `${categoryToFileName(category)}.json`;
    const filePath = path.join(process.cwd(), "src", "data", "prompts", fileName);
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Prompt[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Individual prompt card — mirrors PromptCard visual language
// ---------------------------------------------------------------------------
async function PromptGridCard({ prompt }: { prompt: Prompt }) {
  const href =
    prompt.slug
      ? `/prompts/${prompt.slug}`
      : `/prompts/${prompt.id}`;

  return (
    <article className="group relative bg-foreground/5 border border-border rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
      <Link href={href} className="block h-full flex flex-col">

        {/* Image — 4:5 ratio like PromptCard */}
        <div className="aspect-[4/5] relative overflow-hidden shrink-0">
          <Image
            src={prompt.image}
            alt={prompt.title}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Floating badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {prompt.isPremium && (
              <div className="bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                Premium
              </div>
            )}
            <div className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
              {prompt.category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm">
                {prompt.title}
              </h3>
              {prompt.author && (
                <p className="text-xs text-foreground/40 font-medium">by {prompt.author}</p>
              )}
            </div>
            <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Prompt preview */}
          <p className="text-xs text-foreground/50 line-clamp-2 font-mono leading-relaxed">
            {prompt.fullPrompt}
          </p>

          {/* Models / tags */}
          {((prompt.models?.length ?? 0) > 0 || (prompt.tags?.length ?? 0) > 0) && (
            <div className="flex flex-wrap gap-1 items-center">
              {prompt.models?.map((m) => (
                <span
                  key={m}
                  className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-md border border-primary/20"
                >
                  {m}
                </span>
              ))}
              {prompt.tags?.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="bg-foreground/5 text-foreground/50 text-[9px] font-medium px-2 py-0.5 rounded-md"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {prompt.views ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {prompt.likes ?? 0}
              </span>
            </div>
            <CopyButton text={prompt.fullPrompt} />
          </div>
        </div>
      </Link>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Client copy button (isolated so the parent stays a server component)
// ---------------------------------------------------------------------------
import CopyButton from "@/components/blog/CopyButton";

// ---------------------------------------------------------------------------
// Main server component
// ---------------------------------------------------------------------------
export default function PromptGridBlock({
  categories,
  perCategory = 2,
}: PromptGridBlockProps) {
  // Collect prompts: pick `perCategory` from each category
  const sections = categories.map((cat) => {
    const all = readPromptsForCategory(cat);
    return { category: cat, prompts: all.slice(0, perCategory) };
  });

  const hasAny = sections.some((s) => s.prompts.length > 0);
  if (!hasAny) return null;

  return (
    <div className="my-6 space-y-10">
      {sections.map(({ category, prompts }) => {
        if (prompts.length === 0) return null;
        return (
          <div key={category} className="space-y-4">
            {/* Category label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground/70">
                <Tag className="w-4 h-4 text-primary" />
                {category}
              </div>
              <Link
                href={`/categories/${categoryToFileName(category)}`}
                className="text-xs text-primary font-semibold hover:underline"
              >
                View all →
              </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {prompts.map((p) => (
                <PromptGridCard key={p.id} prompt={p} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
