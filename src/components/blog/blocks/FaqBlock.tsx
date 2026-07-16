"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  items: FaqItem[];
}

function FaqItem({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-5 pt-1 text-foreground/65 leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqBlock({ items }: FaqBlockProps) {
  return (
    <div className="my-6 space-y-3">
      {items.map((item, i) => (
        <FaqItem key={i} {...item} />
      ))}
    </div>
  );
}
