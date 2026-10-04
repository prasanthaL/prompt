import { HelpCircle } from "lucide-react";
import { AccordionItem } from "@/components/Accordion";

export const BROWSE_FAQS = [
  {
    question: "How do I use these AI image prompts?",
    answer: "Using our prompts is straightforward. First, browse the library and find an image style or category you like. Click the copy icon to copy the prompt text to your clipboard. Then, paste it directly into your preferred AI image generator (such as Google Gemini, Midjourney, or Flux) and generate your image."
  },
  {
    question: "How are these prompts designed for Gemini and other AI models?",
    answer: "Prompts in our library are written with clear descriptive instructions covering subject, lighting, camera framing, and aesthetic style. They are formatted to take advantage of Google Gemini's natural language comprehension while translating effectively to Midjourney, Flux, and Stable Diffusion."
  },
  {
    question: "Can I customize the prompt parameters?",
    answer: "Yes. Key visual descriptors in each prompt represent customizable variables. For example, if a prompt describes a 'cinematic portrait of a cyberpunk character', you can adapt the subject, setting, lighting, or color palette to match your creative needs."
  },
  {
    question: "Is there a limit on how many prompts I can copy?",
    answer: "No, there are no limits. All prompts in our public browse library are free and open for everyone to copy and use. You can browse, copy, and experiment with as many prompts as you need for your creative projects."
  },
  {
    question: "How often do you add new categories and prompts?",
    answer: "We regularly update our library with new prompts and creative categories. We track developments in AI image generation to provide relevant prompt examples and structured guidance across diverse artistic styles."
  }
];

export default function FaqSection() {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Find answers to the most common questions about finding, copying, and customizing AI prompts.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
        {BROWSE_FAQS.map((faq, i) => (
          <AccordionItem key={i} title={faq.question}>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
              {faq.answer}
            </p>
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}

