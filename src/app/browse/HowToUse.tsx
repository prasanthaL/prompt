import { BookOpen } from "lucide-react";

const HOW_TO_USE_STEPS = [
  {
    step: "01",
    title: "Select an Aesthetic",
    description: "Browse through our themed categories or search for specific keywords to find the exact visual style and mood you want for your image."
  },
  {
    step: "02",
    title: "Copy the Prompt",
    description: "Click the copy button on any prompt card. The optimized prompt syntax will be copied to your clipboard instantly, completely free."
  },
  {
    step: "03",
    title: "Paste & Generate",
    description: "Paste the prompt into your preferred AI generator. Customize subjects or details to make the creation unique, then hit generate!"
  }
];

export default function HowToUse() {
  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          Quick Guide
        </div>
        <h2 className="text-3xl font-black text-white">How To Use AI Prompts</h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Get beautiful, consistent results in seconds. Follow these three simple steps to bring your creative visions to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOW_TO_USE_STEPS.map((item) => (
          <div
            key={item.step}
            className="relative p-6 rounded-2xl border border-white/[0.05] bg-[#0c0a15]/20 hover:border-violet-500/30 hover:bg-[#121021]/30 transition-all duration-300 group space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <span className="text-sm font-black text-violet-400">{item.step}</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
