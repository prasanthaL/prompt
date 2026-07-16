import { Lightbulb } from "lucide-react";

interface TipBlockProps {
  title?: string;
  text: string;
}

export default function TipBlock({ title = "Pro Tip", text }: TipBlockProps) {
  return (
    <div className="my-6 flex gap-4 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-5">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-400/15 flex items-center justify-center mt-0.5">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
      </div>
      <div>
        <p className="font-bold text-yellow-300 text-sm mb-1">{title}</p>
        <p className="text-foreground/75 leading-relaxed text-sm">{text}</p>
      </div>
    </div>
  );
}
