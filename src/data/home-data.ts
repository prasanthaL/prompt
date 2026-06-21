import React from "react";
import {
  Clapperboard,
  Sparkles,
  User,
  Zap,
  Cpu,
  Home as HomeIcon,
  ShoppingBag,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  PaintBucket,
  Copy,
  Share2,
  RefreshCw
} from "lucide-react";
import categoriesDataJson from "@/data/categories.json";

export const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Sparkles,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: HomeIcon,
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
  Graffiti: PaintBucket,
};

export const STYLE_MAP: Record<
  string,
  {
    badgeBg: string;
    badgeText: string;
    image: string;
    hoverBorder: string;
    hoverShadow: string;
    hoverText: string;
    hoverBgGrad: string;
    iconHover: string;
  }
> = {
  Cinematic: {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "/images/categories/cinematic.png",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  },
  Anime: {
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    image: "/images/categories/anime.png",
    hoverBorder: "hover:border-pink-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(236,72,153,0.35)]",
    hoverText: "group-hover:text-pink-400",
    hoverBgGrad: "hover:bg-pink-950/10",
    iconHover: "group-hover:bg-pink-500/20 group-hover:text-pink-300 group-hover:border-pink-500/30",
  },
  Portrait: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "/images/categories/portrait.png",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
  Fantasy: {
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400 border-purple-500/20",
    image: "/images/categories/fantasy.png",
    hoverBorder: "hover:border-purple-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(168,85,247,0.35)]",
    hoverText: "group-hover:text-purple-400",
    hoverBgGrad: "hover:bg-purple-950/10",
    iconHover: "group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/30",
  },
  "Sci-Fi": {
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400 border-cyan-500/20",
    image: "/images/categories/scifi.png",
    hoverBorder: "hover:border-cyan-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(6,182,212,0.35)]",
    hoverText: "group-hover:text-cyan-400",
    hoverBgGrad: "hover:bg-cyan-950/10",
    iconHover: "group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-500/30",
  },
  Architecture: {
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400 border-emerald-500/20",
    image: "/images/categories/architecture.png",
    hoverBorder: "hover:border-emerald-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.35)]",
    hoverText: "group-hover:text-emerald-400",
    hoverBgGrad: "hover:bg-emerald-950/10",
    iconHover: "group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:border-emerald-500/30",
  },
  Product: {
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-400 border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    hoverBorder: "hover:border-yellow-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,179,8,0.35)]",
    hoverText: "group-hover:text-yellow-400",
    hoverBgGrad: "hover:bg-yellow-950/10",
    iconHover: "group-hover:bg-yellow-500/20 group-hover:text-yellow-300 group-hover:border-yellow-500/30",
  },
  Men: {
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400 border-blue-500/20",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
    hoverBorder: "hover:border-blue-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.35)]",
    hoverText: "group-hover:text-blue-400",
    hoverBgGrad: "hover:bg-blue-950/10",
    iconHover: "group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/30",
  },
  Women: {
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400 border-rose-500/20",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    hoverBorder: "hover:border-rose-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(244,63,94,0.35)]",
    hoverText: "group-hover:text-rose-400",
    hoverBgGrad: "hover:bg-rose-950/10",
    iconHover: "group-hover:bg-rose-500/20 group-hover:text-rose-300 group-hover:border-rose-500/30",
  },
  Family: {
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400 border-teal-500/20",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
    hoverBorder: "hover:border-teal-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(20,184,166,0.35)]",
    hoverText: "group-hover:text-teal-400",
    hoverBgGrad: "hover:bg-teal-950/10",
    iconHover: "group-hover:bg-teal-500/20 group-hover:text-teal-300 group-hover:border-teal-500/30",
  },
  Couple: {
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400 border-red-500/20",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    hoverBorder: "hover:border-red-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(239,68,68,0.35)]",
    hoverText: "group-hover:text-red-400",
    hoverBgGrad: "hover:bg-red-950/10",
    iconHover: "group-hover:bg-red-500/20 group-hover:text-red-300 group-hover:border-red-500/30",
  },
  Sport: {
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400 border-amber-500/20",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    hoverBorder: "hover:border-amber-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.35)]",
    hoverText: "group-hover:text-amber-400",
    hoverBgGrad: "hover:bg-amber-950/10",
    iconHover: "group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:border-amber-500/30",
  },
  "Nature & Landscape": {
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-400 border-green-500/20",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    hoverBorder: "hover:border-green-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(34,197,94,0.35)]",
    hoverText: "group-hover:text-green-400",
    hoverBgGrad: "hover:bg-green-950/10",
    iconHover: "group-hover:bg-green-500/20 group-hover:text-green-300 group-hover:border-green-500/30",
  },
  "Animals & Wildlife": {
    badgeBg: "bg-lime-500/10",
    badgeText: "text-lime-400 border-lime-500/20",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
    hoverBorder: "hover:border-lime-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(132,204,22,0.35)]",
    hoverText: "group-hover:text-lime-400",
    hoverBgGrad: "hover:bg-lime-950/10",
    iconHover: "group-hover:bg-lime-500/20 group-hover:text-lime-300 group-hover:border-lime-500/30",
  },
  Vehicles: {
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-400 border-slate-500/20",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    hoverBorder: "hover:border-slate-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(100,116,139,0.35)]",
    hoverText: "group-hover:text-slate-400",
    hoverBgGrad: "hover:bg-slate-950/10",
    iconHover: "group-hover:bg-slate-500/20 group-hover:text-slate-300 group-hover:border-slate-500/30",
  },
  "Digital Art": {
    badgeBg: "bg-fuchsia-500/10",
    badgeText: "text-fuchsia-400 border-fuchsia-500/20",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    hoverBorder: "hover:border-fuchsia-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(217,70,239,0.35)]",
    hoverText: "group-hover:text-fuchsia-400",
    hoverBgGrad: "hover:bg-fuchsia-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  },
  Graffiti: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,88,12,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
};

export const categoriesData = categoriesDataJson.map((cat) => {
  const style = STYLE_MAP[cat.name] || {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  };
  return {
    name: cat.name,
    id: cat.name,
    icon: ICON_MAP[cat.name] || Sparkles,
    description: cat.description,
    ...style,
  };
});

export const howItWorksSteps = [
  {
    step: "01",
    title: "Browse the Library",
    description:
      "Explore thousands of carefully crafted AI image prompts across categories like cinematic, anime, fantasy, fashion, architecture, and more. Use filters and search to find exactly the style you need.",
  },
  {
    step: "02",
    title: "Copy Your Prompt",
    description:
      "Found the perfect prompt? Click the copy button and it's instantly saved to your clipboard — ready to use. No account needed, no paywalls, no friction. Just great prompts, one click away.",
  },
  {
    step: "03",
    title: "Generate Stunning Art",
    description:
      "Paste your prompt into Google Gemini or any AI image generator and watch it come to life. Tweak and iterate to make it uniquely yours — the creative possibilities are limitless.",
  },
];

export const popularSearches = [
  "Cinematic Prompts",
  "Hyper Realistic Prompts",
  "Dark Fantasy Prompts",
  "Cyberpunk Prompts",
  "Anime Prompts",
  "Portrait Prompts",
];

export const seoPropositionFeatures = [
  { icon: Copy, label: "Easy to Copy", sub: "One-click copy" },
  { icon: Share2, label: "SEO Friendly", sub: "Well structured" },
  { icon: RefreshCw, label: "Regular Updates", sub: "Fresh prompts weekly" },
];

export const whyChooseUs = [
  "Save time and get better results",
  "Professionally crafted and tested",
  "Optimized for Gemini AI",
  "Perfect for artists, designers & creators",
  "Free to explore and use",
];
