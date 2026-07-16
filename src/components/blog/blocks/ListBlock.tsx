import { CheckCircle2, Circle } from "lucide-react";

interface ListBlockProps {
  items: string[];
  ordered?: boolean;
}

export default function ListBlock({ items, ordered = false }: ListBlockProps) {
  return (
    <ul className="my-4 space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-foreground/75 text-base leading-relaxed">
          {ordered ? (
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
          ) : (
            <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
