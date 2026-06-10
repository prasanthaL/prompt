import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { 
  Clapperboard, 
  Zap, 
  Ghost, 
  Cpu, 
  Home, 
  ShoppingBag,
  LayoutGrid,
  User,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { getAllPrompts } from "@/lib/json-db";
import categoriesData from "@/data/categories.json";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Ghost,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: Home,
  Product: ShoppingBag,
  Men: User,
  Women: User,
  Family: Users,
  Couple: Users,
  Sport: Flame,
  "Nature & Landscape": Trees,
  "Animals & Wildlife": Dog,
  Vehicles: Car,
  "Digital Art": Palette,
};

const COLOR_MAP: Record<string, { color: string; accent: string; image: string }> = {
  Cinematic: {
    color: "from-blue-500/30 to-indigo-500/30",
    accent: "bg-blue-500",
    image: "/images/categories/cinematic.png",
  },
  Anime: {
    color: "from-pink-500/30 to-rose-500/30",
    accent: "bg-pink-500",
    image: "/images/categories/anime.png",
  },
  Portrait: {
    color: "from-orange-500/30 to-amber-500/30",
    accent: "bg-orange-500",
    image: "/images/categories/portrait.png",
  },
  Fantasy: {
    color: "from-purple-500/30 to-violet-500/30",
    accent: "bg-purple-500",
    image: "/images/categories/fantasy.png",
  },
  "Sci-Fi": {
    color: "from-cyan-500/30 to-blue-500/30",
    accent: "bg-cyan-500",
    image: "/images/categories/scifi.png",
  },
  Architecture: {
    color: "from-emerald-500/30 to-teal-500/30",
    accent: "bg-emerald-500",
    image: "/images/categories/architecture.png",
  },
  Product: {
    color: "from-yellow-500/30 to-orange-500/30",
    accent: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  Men: {
    color: "from-blue-500/30 to-indigo-500/30",
    accent: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
  },
  Women: {
    color: "from-rose-500/30 to-pink-500/30",
    accent: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  Family: {
    color: "from-teal-500/30 to-emerald-500/30",
    accent: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
  },
  Couple: {
    color: "from-red-500/30 to-rose-500/30",
    accent: "bg-red-500",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
  },
  Sport: {
    color: "from-amber-500/30 to-yellow-500/30",
    accent: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
  },
  "Nature & Landscape": {
    color: "from-green-500/30 to-emerald-500/30",
    accent: "bg-green-500",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
  },
  "Animals & Wildlife": {
    color: "from-lime-500/30 to-green-500/30",
    accent: "bg-lime-500",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
  },
  Vehicles: {
    color: "from-slate-500/30 to-zinc-500/30",
    accent: "bg-slate-500",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  },
  "Digital Art": {
    color: "from-fuchsia-500/30 to-purple-500/30",
    accent: "bg-fuchsia-500",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
};

const categoryConfig = [
  ...categoriesData.map((cat) => {
    const meta = COLOR_MAP[cat.name] || {
      color: "from-violet-500/30 to-fuchsia-500/30",
      accent: "bg-violet-500",
      image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
    };
    return {
      name: cat.name,
      id: cat.name,
      icon: ICON_MAP[cat.name] || Sparkles,
      ...meta,
    };
  }),
  {
    name: "All Prompts",
    icon: LayoutGrid,
    id: "all",
    color: "from-violet-500/30 to-fuchsia-500/30",
    accent: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
  },
];

export default async function CategoriesPage() {
  // Load all prompts directly from JSON files — no API route needed
  const allPrompts = await getAllPrompts();

  // Compute real counts per category from JSON data
  const categoryCounts: Record<string, number> = { all: allPrompts.length };
  for (const prompt of allPrompts) {
    if (prompt.category) {
      categoryCounts[prompt.category] = (categoryCounts[prompt.category] ?? 0) + 1;
    }
  }

  // Build enriched categories with real counts
  const categories = categoryConfig.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? allPrompts.length.toLocaleString() + "+"
        : (categoryCounts[cat.id] ?? 0).toLocaleString(),
  }));

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1 rounded-full text-sm font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            Browse by Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Explore Categories</h1>
          <p className="text-foreground/40 max-w-xl mx-auto">
            Discover the perfect prompt for your next masterpiece. 
            Choose from our wide variety of curated categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.id === "all" ? "/browse" : `/categories/${cat.id.toLowerCase()}`}
              className="group relative block"
            >
              {/* Glow effect behind card */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${cat.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Card */}
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] h-[340px] group-hover:border-white/[0.15] transition-all duration-500">
                
                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized={cat.image.startsWith("http")}
                  />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />

                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-7">
                  
                  {/* Top: Icon badge */}
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl ${cat.accent}/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg`}>
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Text */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">
                        {cat.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${cat.accent} shadow-lg shadow-current`} />
                        <span className="text-sm text-white/50 font-semibold uppercase tracking-wider">
                          {cat.count} Prompts
                        </span>
                      </div>
                    </div>

                    {/* Explore bar that slides up on hover */}
                    <div className="overflow-hidden">
                      <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2.5 border border-white/10 w-fit">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                          <span className="text-sm font-semibold text-white/90">Explore Collection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
