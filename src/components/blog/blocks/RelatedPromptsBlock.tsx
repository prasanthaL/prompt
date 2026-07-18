import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

import categoriesData from "@/data/categories.json";

interface RelatedPromptsBlockProps {
  title?: string;
  ids: string[];
}

export default function RelatedPromptsBlock({
  title = "Explore Related Prompt Collections",
  ids,
}: RelatedPromptsBlockProps) {
  return (
    <div className="my-8 rounded-2xl border border-primary/25 bg-primary/5 p-6 space-y-4">
      <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
        <Layers className="w-4 h-4" />
        {title}
      </div>
      <div className="flex flex-wrap gap-3">
        {ids.map((id) => {
          const cleanId = id.replace("-prompts", "").toLowerCase();
          
          // Match category based on clean ID or sub-string matching
          const category = categoriesData.find((c) => {
            const nameLower = c.name.toLowerCase();
            return (
              nameLower === cleanId ||
              nameLower === id.toLowerCase() ||
              nameLower.replace(/[\s&]+/g, "-") === cleanId ||
              nameLower.includes(cleanId)
            );
          });

          // Use matched category details, or fallback to parsed slug values
          const href = category
            ? `/categories/${encodeURIComponent(category.name.toLowerCase())}`
            : `/categories/${id}`;

          const label = category
            ? `${category.name} Prompts`
            : id
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

          return (
            <Link
              key={id}
              href={href}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              {label}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
