import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

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
          const label = id
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          return (
            <Link
              key={id}
              href={`/categories/${id}`}
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
