import { FlaskConical } from "lucide-react";

interface FormulaBlockProps {
  text: string;
}

/**
 * Renders a prompt formula as a visually distinct pill-chain.
 * Parts are split by " + " and each segment gets its own styled chip.
 */
export default function FormulaBlock({ text }: FormulaBlockProps) {
  const parts = text.split("+").map((p) => p.trim());

  return (
    <div className="my-6 rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary font-bold text-sm">
        <FlaskConical className="w-4 h-4" />
        Prompt Formula
      </div>

      {/* Parts */}
      <div className="flex flex-wrap items-center gap-2">
        {parts.map((part, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/25 text-primary text-sm font-semibold whitespace-nowrap">
              {part}
            </span>
            {i < parts.length - 1 && (
              <span className="text-primary/50 font-bold text-lg select-none">+</span>
            )}
          </div>
        ))}
      </div>

      {/* Full formula as monospace reference */}
      <p className="text-xs text-foreground/40 font-mono pt-1 border-t border-primary/15">
        {text}
      </p>
    </div>
  );
}
