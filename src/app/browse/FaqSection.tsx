import { HelpCircle } from "lucide-react";
import { AccordionItem } from "@/components/Accordion";

export const BROWSE_FAQS = [
  {
    question: "How do I use these AI image prompts?",
    answer: "Using our prompts is extremely simple. First, browse the library and find an image style or category you like. Click the copy icon to copy the optimized prompt text to your clipboard. Then, paste it directly into your preferred AI image generator (like Google Gemini, Midjourney, or DALL-E) and click generate. You will get a similar styled image instantly!"
  },
  {
    question: "Are these prompts fully optimized for Gemini AI?",
    answer: "Yes, every prompt in our library is thoroughly tested and optimized for Google Gemini. They leverage Gemini's specific language semantics and descriptive capabilities to ensure high-quality and consistent outputs, but they also work exceptionally well with Midjourney, Stable Diffusion, and DALL-E 3."
  },
  {
    question: "Can I customize the prompt parameters?",
    answer: "Absolutely! The bracketed words or key terms in the prompts represent customizable variables. For example, if a prompt describes a 'cinematic portrait of a [cyberpunk warrior]', you can easily change '[cyberpunk warrior]' to '[steampunk detective]' or '[vintage pilot]' to generate completely new characters in the same visual style."
  },
  {
    question: "Is there a limit on how many prompts I can copy?",
    answer: "No, there are no limits! All prompts in our public browse library are 100% free and open for everyone to copy and use. You can browse, copy, and experiment with as many prompts as you need for both personal and commercial projects."
  },
  {
    question: "How often do you add new categories and prompts?",
    answer: "We update our library with new prompts and trending categories every single week. Our team of prompt engineers keeps up with the latest AI model updates to deliver fresh, high-performance styling prompts daily."
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

