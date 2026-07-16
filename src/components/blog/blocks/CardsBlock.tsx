import { Sparkles } from "lucide-react";

interface CardItem {
  title: string;
  description?: string;
}

interface CardsBlockProps {
  items: CardItem[];
}

/**
 * A responsive grid of simple info cards.
 * Used for showcasing tools, styles, or feature lists.
 */
export default function CardsBlock({ items }: CardsBlockProps) {
  return (
    <div className="my-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="group relative flex flex-col gap-2 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
        >
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="font-bold text-foreground text-sm leading-tight">{item.title}</p>
          {item.description && (
            <p className="text-xs text-foreground/50 leading-relaxed">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
