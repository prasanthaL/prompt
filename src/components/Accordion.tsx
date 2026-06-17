"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "rgba(139,92,246,0.05)" : "rgba(255,255,255,0.02)",
        borderColor: isOpen ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4.5 text-left gap-4 cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-xs sm:text-sm font-bold transition-colors",
          isOpen ? "text-violet-400" : "text-white hover:text-violet-400"
        )}>
          {title}
        </span>
        <div className="shrink-0 transition-transform duration-300">
          {isOpen ? (
            <Minus className="w-4 h-4 text-violet-400 shrink-0" />
          ) : (
            <Plus className="w-4 h-4 text-white/40 shrink-0" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out border-white/[0.03]",
          isOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
