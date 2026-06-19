
import { ShieldCheck, Zap, RefreshCw, Users } from "lucide-react";

const stats = [
  {
    title: "High Quality",
    desc: "Curated high-quality prompts tested and proven",
    icon: ShieldCheck,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    title: "Easy to Use",
    desc: "Copy with one click and use instantly",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    title: "Regular Updates",
    desc: "New prompts added daily by experts",
    icon: RefreshCw,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    title: "Community Driven",
    desc: "Join our community of creators and innovators",
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-foreground/[0.02] border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat) => (
          <div key={stat.title} className="flex gap-6 group">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-lg">{stat.title}</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
