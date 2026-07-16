"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // don't navigate via the parent <Link>
        handle();
      }}
      className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-border bg-foreground/5 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer uppercase tracking-widest"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-green-400" />
          <span className="text-green-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}
