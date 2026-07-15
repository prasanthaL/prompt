import { ThumbsDown, ThumbsUp } from "lucide-react";

interface ComparisonBlockProps {
  leftTitle?: string;
  left: string;
  rightTitle?: string;
  right: string;
}

export default function ComparisonBlock({
  leftTitle = "Basic",
  left,
  rightTitle = "Detailed",
  right,
}: ComparisonBlockProps) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Left – "bad" side */}
      <div className="rounded-2xl border border-red-500/25 bg-red-500/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-red-500/10 border-b border-red-500/20 text-red-400 font-semibold text-sm">
          <ThumbsDown className="w-4 h-4" />
          {leftTitle}
        </div>
        <p className="px-5 py-4 text-foreground/70 leading-relaxed font-mono text-sm">
          {left}
        </p>
      </div>

      {/* Right – "good" side */}
      <div className="rounded-2xl border border-green-500/25 bg-green-500/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-green-500/10 border-b border-green-500/20 text-green-400 font-semibold text-sm">
          <ThumbsUp className="w-4 h-4" />
          {rightTitle}
        </div>
        <p className="px-5 py-4 text-foreground/85 leading-relaxed font-mono text-sm">
          {right}
        </p>
      </div>
    </div>
  );
}
