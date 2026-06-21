import { HelpCircle } from "lucide-react";
import { AccordionItem } from "@/components/Accordion";
import { faqItems } from "@/data/home-faqs";

export default function HomeFaqSection() {
  return (
    <section id="faq-section" className="relative max-w-4xl mx-auto px-4 md:px-8 pb-32">
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative space-y-1 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-foreground/40 text-sm max-w-lg mx-auto mt-2">
          Everything you need to know about PromptNest and our AI prompt library
        </p>
      </div>

      <div className="relative space-y-3">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} title={item.question}>
            <p className="text-sm leading-relaxed text-foreground/50 sm:text-base">
              {item.answer}
            </p>
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}

