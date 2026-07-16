"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or browser doesn't support — fall through to clipboard
      }
    }

    // Fallback: copy URL to clipboard
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-border transition-all cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">Link copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Share Article
        </>
      )}
    </button>
  );
}
