import React from "react";
import { getPromptsByCategory, getAllPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import PromptCard from "@/components/PromptCard";
import Link from "next/link";
import Image from "next/image";
import CategoryPromptsClient from "./CategoryPromptsClient";
import Footer from "@/components/Footer";
import categoriesData from "@/data/categories.json";

import { 
  Clapperboard, 
  Zap, 
  Ghost, 
  Cpu, 
  Home, 
  ShoppingBag, 
  User, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  Heart,
  Eye,
  Layers,
  ArrowUpRight,
  TrendingUp,
  HelpCircle,
  Copy,
  FolderOpen,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  PaintBucket
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: {
    category: string;
  };
}

const categoryDescriptions: Record<string, { title: string; description: string; keywords: string[] }> = {
  anime: {
    title: "Anime AI Art Prompts – Generate Stunning Anime Characters & Scenes | PromptVault",
    description:
      "Browse PromptVault's curated anime AI prompts to generate stunning characters, landscapes, and action scenes. Tested across Midjourney, Stable Diffusion, and DALL·E for gallery-worthy results.",
    keywords: [
      "anime AI prompts",
      "anime art generator",
      "AI anime characters",
      "anime Midjourney prompts",
      "anime Stable Diffusion prompts",
      "anime DALL-E prompts",
      "anime character design",
      "anime wallpaper AI",
      "anime illustration prompts",
      "manga art AI",
      "chibi art prompts",
      "anime background prompts",
      "anime concept art",
      "AI art anime style",
      "PromptVault anime",
    ],
  },

  cinematic: {
    title: "Cinematic AI Art Prompts – Create Movie-Quality Visuals & Film Stills | PromptVault",
    description:
      "Generate Hollywood-grade film stills, dramatic compositions, and cinematic scenes with PromptVault's curated prompts. Engineered for Midjourney, Stable Diffusion XL, and DALL·E 3 with anamorphic lighting and color grading built in.",
    keywords: [
      "cinematic AI prompts",
      "movie still AI art",
      "film noir prompts",
      "cinematic Midjourney prompts",
      "Hollywood AI art",
      "cinematic lighting prompts",
      "AI cinematography",
      "cinematic Stable Diffusion",
      "film aesthetic AI",
      "dramatic scene prompts",
      "cinematic wallpaper AI",
      "movie poster AI",
      "anamorphic AI art",
      "cinematic concept art",
      "PromptVault cinematic",
    ],
  },

  portrait: {
    title: "Portrait AI Art Prompts – Generate Stunning AI Portraits & Headshots | PromptVault",
    description:
      "Create photorealistic headshots, editorial beauty shots, and expressive character portraits with PromptVault's optimized prompts. Validated across Midjourney, Stable Diffusion XL, Flux, and DALL·E 3.",
    keywords: [
      "portrait AI prompts",
      "AI headshot generator",
      "photorealistic portrait prompts",
      "AI portrait Midjourney",
      "portrait Stable Diffusion prompts",
      "character portrait AI",
      "beauty portrait prompts",
      "studio headshot AI",
      "editorial portrait AI",
      "AI face generator prompts",
      "portrait photography AI",
      "realistic face prompts",
      "portrait concept art",
      "AI avatar prompts",
      "PromptVault portrait",
    ],
  },

  fantasy: {
    title: "Fantasy AI Art Prompts – Create Epic Magical Worlds & Mythical Creatures | PromptVault",
    description:
      "Summon dragons, mythical heroes, and enchanted worlds with PromptVault's epic fantasy AI prompts. Perfect for D&D campaigns, book covers, and concept art — tested on Midjourney, DALL·E 3, and Leonardo AI.",
    keywords: [
      "fantasy AI prompts",
      "fantasy art generator",
      "AI fantasy characters",
      "fantasy Midjourney prompts",
      "dragon art AI prompts",
      "magical world AI art",
      "D&D character art AI",
      "fantasy landscape prompts",
      "mythical creature prompts",
      "epic fantasy AI art",
      "dark fantasy prompts",
      "fantasy concept art AI",
      "elven art prompts",
      "fantasy illustration AI",
      "PromptVault fantasy",
    ],
  },

  "sci-fi": {
    title: "Sci-Fi AI Art Prompts – Generate Futuristic Worlds & Space Art | PromptVault",
    description:
      "Explore cyberpunk cities, alien worlds, and deep-space vistas with PromptVault's sci-fi AI prompts. Optimized for Midjourney, Stable Diffusion XL, Flux, and Gemini for maximum visual impact.",
    keywords: [
      "sci-fi AI prompts",
      "futuristic art generator",
      "cyberpunk AI prompts",
      "space art AI prompts",
      "sci-fi Midjourney prompts",
      "spaceship concept art AI",
      "futuristic city prompts",
      "AI space art generator",
      "cyberpunk Stable Diffusion",
      "alien world prompts",
      "sci-fi concept art AI",
      "neon city AI art",
      "post-apocalyptic prompts",
      "sci-fi illustration AI",
      "PromptVault sci-fi",
    ],
  },

  architecture: {
    title: "Architecture AI Art Prompts – Design Stunning Buildings & Interiors | PromptVault",
    description:
      "Render photorealistic buildings, interiors, and urban landscapes with PromptVault's architecture AI prompts. From Brutalist to parametric design — tested on Midjourney, Stable Diffusion XL, and Leonardo AI.",
    keywords: [
      "architecture AI prompts",
      "building design AI art",
      "interior design prompts",
      "architectural render AI",
      "architecture Midjourney prompts",
      "modern building AI art",
      "interior design AI generator",
      "AI architecture visualization",
      "futuristic building prompts",
      "luxury interior prompts",
      "minimalist architecture AI",
      "parametric design prompts",
      "architectural concept art",
      "real estate render AI",
      "PromptVault architecture",
    ],
  },

  product: {
    title: "Product Photography AI Prompts – Create Professional Product Shots | PromptVault",
    description:
      "Produce studio-quality product shots, lifestyle imagery, and e-commerce hero images with PromptVault's product AI prompts. Optimized for Midjourney, Stable Diffusion XL, and Gemini — no studio required.",
    keywords: [
      "product photography AI prompts",
      "e-commerce product shots AI",
      "product render prompts",
      "AI product photography",
      "product Midjourney prompts",
      "commercial photography AI",
      "product lifestyle shots AI",
      "Amazon product image AI",
      "cosmetics photography prompts",
      "tech product render AI",
      "food photography AI prompts",
      "product mockup AI",
      "advertising product shots",
      "product concept art AI",
      "PromptVault product",
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const key = decoded.toLowerCase();

  // Format Display Name elegantly (e.g. "sci-fi" -> "Sci-Fi")
  let displayName = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  if (key === "sci-fi") {
    displayName = "Sci-Fi";
  }

  const categoryMeta = categoryDescriptions[key];

  if (categoryMeta) {
    return {
      title: categoryMeta.title,
      description: categoryMeta.description,
      keywords: categoryMeta.keywords,
      openGraph: {
        title: categoryMeta.title,
        description: categoryMeta.description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: categoryMeta.title,
        description: categoryMeta.description,
      },
    };
  }

  const catConfig = categoriesData.find(c => c.name.toLowerCase() === key);
  const fallbackTitle = `${displayName} AI Prompts – Browse Top ${displayName} Prompts | PromptVault`;
  const fallbackDescription = catConfig?.description || `Explore our curated collection of high-quality ${displayName} AI prompts on PromptVault. Find the perfect prompts for your next creative project and generate stunning artwork with ease.`;

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
    },
  };
}

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
  Graffiti: PaintBucket,
};

const categoryMetaLookup: Record<string, {
  icon: React.ComponentType<any>;
  accent: string;
  color: string;
  image: string;
  statCount: string;
  copies: string;
}> = {
  anime: {
    icon: Ghost,
    accent: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    color: "from-pink-500/30 to-rose-500/30",
    image: "/images/categories/anime.png",
    statCount: "1,870",
    copies: "52K+",
  },
  cinematic: {
    icon: Clapperboard,
    accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    color: "from-blue-500/30 to-indigo-500/30",
    image: "/images/categories/cinematic.png",
    statCount: "2,450",
    copies: "64K+",
  },
  portrait: {
    icon: User,
    accent: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    color: "from-orange-500/30 to-amber-500/30",
    image: "/images/categories/portrait.png",
    statCount: "1,520",
    copies: "41K+",
  },
  fantasy: {
    icon: Zap,
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    color: "from-purple-500/30 to-violet-500/30",
    image: "/images/categories/fantasy.png",
    statCount: "2,450",
    copies: "78K+",
  },
  "sci-fi": {
    icon: Cpu,
    accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    color: "from-cyan-500/30 to-blue-500/30",
    image: "/images/categories/scifi.png",
    statCount: "1,280",
    copies: "35K+",
  },
  architecture: {
    icon: Home,
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    color: "from-emerald-500/30 to-teal-500/30",
    image: "/images/categories/architecture.png",
    statCount: "980",
    copies: "22K+",
  },
  product: {
    icon: ShoppingBag,
    accent: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    color: "from-yellow-500/30 to-orange-500/30",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    statCount: "840",
    copies: "18K+",
  },
};

const categoryFaqData: Record<string, { question: string; answer: string }[]> = {
  anime: [
    {
      question: "What are anime AI prompts?",
      answer: "Anime AI prompts are descriptive text instructions used to guide AI art models like Midjourney, Stable Diffusion, or Gemini in generating stunning anime-inspired characters, immersive fantasy backgrounds, and dynamic action scenes.",
    },
    {
      question: "Which AI models are best for generating anime art?",
      answer: "Midjourney (especially with the --niji model) and Stable Diffusion (using anime-focused checkpoints like Anything, Counterfeit, or AbyssOrange) deliver outstanding anime outputs. Google Gemini also yields crisp, creative anime illustrations.",
    },
    {
      question: "How can I customize these anime prompts?",
      answer: "You can easily modify descriptive parameters such as character hairstyles, clothing details, emotional expressions, backdrop settings, lighting (e.g., 'bioluminescent glow', 'golden hour'), and camera angles to craft a unique visual.",
    },
  ],
  cinematic: [
    {
      question: "What makes an AI prompt 'cinematic'?",
      answer: "Cinematic prompts utilize professional photography and filmmaking terms—such as 'anamorphic lens flare', 'shallow depth of field', 'chiaroscuro lighting', and aspect ratios like 21:9—to evoke the look and feel of high-budget film stills.",
    },
    {
      question: "Which AI models produce the best movie-quality visuals?",
      answer: "Midjourney v6 and Stable Diffusion XL (SDXL) are widely regarded as the best tools for cinematic realism. They capture complex film grains, atmospheric fog, and precise color grading exceptionally well.",
    },
    {
      question: "Can I use cinematic AI art for storyboards and pre-visualization?",
      answer: "Absolutely. Many directors, game design leads, and writers use our cinematic prompts to generate quick, expressive storyboards, concept pitches, and character mockups before production begins.",
    },
  ],
  portrait: [
    {
      question: "What are portrait AI prompts?",
      answer: "Portrait AI prompts are carefully formatted instructions designed to generate highly realistic, expressive human faces, corporate headshots, fashion editorials, and character studies with pristine anatomical features.",
    },
    {
      question: "How do I get photorealistic skin texture and eye detail?",
      answer: "Our prompts contain specific camera styles (e.g., '85mm lens', 'f/1.8 aperture') and lighting formats (e.g., 'Rembrandt lighting') that naturally direct the AI model to generate high-resolution skin, hair, and eye reflections.",
    },
    {
      question: "How do I avoid anatomical distortions in portraits?",
      answer: "By using optimized keywords in your prompts and configuring precise negative prompts (like 'double head', 'mutated hands', 'blurry details') when working with Stable Diffusion models.",
    },
  ],
  fantasy: [
    {
      question: "What makes a fantasy AI prompt successful?",
      answer: "A great fantasy prompt blends magical, legendary elements (castles, mythical beasts, elven architecture) with rich descriptions of atmosphere, color palettes (e.g., 'mystical violet', 'deep emerald'), and high-detail textures.",
    },
    {
      question: "Can I generate characters for tabletop RPG games?",
      answer: "Yes, these prompts are excellent for creating detailed avatars, custom NPC tokens, magical items, and scenic backdrops for campaigns like Dungeons & Dragons, Pathfinder, or custom fantasy worlds.",
    },
    {
      question: "Which generators work best for magical particle effects?",
      answer: "Midjourney and Leonardo AI excel at generating vibrant, complex particle animations, bioluminescent landscapes, and magical glows with realistic reflection and lighting.",
    },
  ],
  "sci-fi": [
    {
      question: "How do I write effective sci-fi and cyberpunk prompts?",
      answer: "Effective sci-fi prompts specify high-tech materials (e.g., 'carbon fiber', 'brushed steel'), atmospheric environments (e.g., 'neon-drenched Tokyo streets', 'holographic projections'), and futuristic aesthetics (e.g., retro-futurism, solarpunk).",
    },
    {
      question: "Which models are recommended for spaceships and vehicles?",
      answer: "Midjourney excels at high-concept spacecraft designs, while DALL-E 3 and Gemini are highly accurate when rendering complex structural hulls, geometric shapes, and clean panel structures.",
    },
    {
      question: "Can I generate solarpunk or utopian future designs?",
      answer: "Yes, by incorporating green-energy aesthetics, biophilic integration, clean white materials, flowing waterfalls, and bright natural sunlight into the prompt description.",
    },
  ],
  architecture: [
    {
      question: "What are architecture AI prompts?",
      answer: "Architecture AI prompts are text instructions that define building forms, structural materials (concrete, raw timber, double-glazed glass), interior designs, and architectural movements (Bauhaus, brutalism, parametric).",
    },
    {
      question: "How can architects and interior designers use these prompts?",
      answer: "They are highly effective for rapid concept iteration, exploring different spatial distributions, testing material finishes under various light conditions, and building inspiring presentation boards.",
    },
    {
      question: "Which AI tools are best for interior lighting rendering?",
      answer: "Midjourney and Stable Diffusion produce stunning interior daylight rendering, capturing ray-traced reflections, shadows, and subtle textural behaviors across wood, concrete, and metal surfaces.",
    },
  ],
  product: [
    {
      question: "How do I create professional product shots using AI?",
      answer: "Use photographic techniques like 'macro lens', 'three-point studio lighting', 'soft box shadows', and placement specifications (e.g., 'placed on a polished stone plinth surrounded by botanicals').",
    },
    {
      question: "Are these prompts suitable for real e-commerce stores?",
      answer: "Yes, many brands use AI-generated lifestyle backdrops and staging for their product catalog, generating highly clean, studio-quality product photos that significantly reduce cost.",
    },
    {
      question: "Which generators capture glass and metal reflections best?",
      answer: "Midjourney v6 and Stable Diffusion XL excel at rendering physical properties like frosted glass, metallic chrome, and fluid textures, making them perfect for cosmetics and tech product listings.",
    },
  ],
};

const categoryTipsLookup: Record<string, string[]> = {
  anime: [
    "Be specific with character details",
    "Add lighting, mood, and environment",
    "Use art style keywords (e.g., anime, ghibli)",
    "Include camera angle and composition",
    "Experiment and refine your prompts",
  ],
  cinematic: [
    "Specify film stock (e.g., 35mm, Kodak Portra)",
    "Incorporate cinematic lighting (e.g., chiaroscuro)",
    "Use direct aspect ratios (e.g., --ar 21:9)",
    "Add camera details (e.g., anamorphic, shallow depth of field)",
    "Describe the emotional grading and color tone",
  ],
  portrait: [
    "Detail face symmetry, gaze direction, and expression",
    "Reference lighting setups (e.g., studio lighting, Rembrandt)",
    "Define specific camera setups (e.g., 85mm lens, f/1.8)",
    "Control skin, hair, and eye texture keywords",
    "Add descriptive clothing and accessories",
  ],
  fantasy: [
    "Describe mythical creatures and high-fantasy gear",
    "Specify bioluminescent or magical lighting colors",
    "Incorporate art styles (e.g., digital concept art, matte painting)",
    "Detail background vistas (e.g., floating castle, magical woods)",
    "Experiment with atmospheric fog and spell particles",
  ],
  "sci-fi": [
    "Describe high-tech materials (e.g., carbon fiber, neon grids)",
    "Specify futuristic tech (e.g., holograms, modular hulls)",
    "Reference distinct sub-genres (e.g., cyberpunk, solarpunk)",
    "Define celestial backdrops (e.g., gas giants, nebula clusters)",
    "Incorporate camera scale (e.g., wide dynamic shot)",
  ],
  architecture: [
    "Define architectural movements (e.g., Brutalist, Bauhaus)",
    "Detail raw structural materials (e.g., raw concrete, oak wood)",
    "Incorporate interior light angles and glass reflection",
    "Use realistic render terms (e.g., architectural photography)",
    "Specify exact spatial setups (e.g., open-concept layout)",
  ],
  product: [
    "Reference studio lighting (e.g., three-point lighting, softbox)",
    "Control background placement (e.g., white background, minimalist plinth)",
    "Describe exact material textures (e.g., frosted glass, metal chrome)",
    "Use photography settings (e.g., macro lens, close-up)",
    "Add styling props (e.g., natural water droplets, organic leaves)",
  ],
};

const trendingSearchesLookup: Record<string, string[]> = {
  anime: [
    "cyberpunk anime girl",
    "fantasy anime landscape",
    "anime wallpaper",
    "dark anime character",
    "anime girl portrait",
    "anime city background",
    "studio ghibli prompts",
    "anime fight scene",
    "anime couple",
    "sakura anime",
  ],
  cinematic: [
    "cyberpunk film still",
    "epic battlefield panorama",
    "moody detective street",
    "golden hour highway drive",
    "sci-fi spacesuit close up",
    "vintage 1970s film style",
    "dramatic high contrast silhouette",
    "medieval village dawn",
    "neon alley rain scene",
    "underwater dive cinematic",
  ],
  portrait: [
    "realistic model headshot",
    "cyberpunk neon face",
    "vintage black and white portrait",
    "editorial beauty close-up",
    "fantasy elf queen portrait",
    "rustic explorer face",
    "studio lighting corporate headshot",
    "chibi character design avatar",
    "dramatic side lighting portrait",
    "futuristic cybernetic eye portrait",
  ],
  fantasy: [
    "epic dragon ridge",
    "bioluminescent magic forest",
    "floating crystal citadel",
    "dark sorcerer spellcast",
    "elven kingdom waterfall",
    "mystical phoenix birth",
    "ancient dungeon vault",
    "steampunk cloud city",
    "celestial palace gates",
    "underwater mermaid castle",
  ],
  "sci-fi": [
    "cyberpunk neon metropolis",
    "orbital ring habitat",
    "mars colony sunset dome",
    "futuristic mech hangar",
    "warp speed wormhole transit",
    "solarpunk organic city",
    "deep space exploratory vessel",
    "holographic command center",
    "alien flora bioluminescence",
    "cybernetic assembly line",
  ],
  architecture: [
    "brutalist concrete museum",
    "parametric glass villa",
    "minimalist japanese tearoom",
    "mid century modern forest house",
    "biophilic skyscraper design",
    "art deco theater lobby",
    "scandinavian luxury penthouse",
    "industrial loft workspace",
    "futuristic smart city terminal",
    "rustic stone mountain retreat",
  ],
  product: [
    "minimalist perfume bottle",
    "luxury smartwatch studio",
    "wireless headphones layout",
    "organic skincare flat lay",
    "cyberpunk sneaker showcase",
    "gourmet beverage splash",
    "modern smartphone draft",
    "frosted glass cosmetics tube",
    "premium camera lens product",
    "handcrafted leather bag mock",
  ],
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Format the category name for display (e.g., "anime" -> "Anime")
  const decodedCategory = decodeURIComponent(category);
  const key = decodedCategory.toLowerCase();
  
  // Format Display Name elegantly (e.g. "sci-fi" -> "Sci-Fi")
  let displayName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  if (key === "sci-fi") {
    displayName = "Sci-Fi";
  }

  // Fetch prompts for this category via JSON DB
  const prompts = await getPromptsByCategory(decodedCategory);

  // Look up metadata assets
  const staticMeta = categoryMetaLookup[key];
  const catConfig = categoriesData.find(c => c.name.toLowerCase() === key);
  
  let meta;
  if (staticMeta) {
    meta = staticMeta;
  } else if (catConfig) {
    const colorName = catConfig.accent.replace("bg-", "").replace("-500", "");
    const accentClass = `text-${colorName}-500 bg-${colorName}-500/10 border-${colorName}-500/20`;
    const MetaIcon = ICON_MAP[catConfig.name] || Sparkles;
    meta = {
      icon: MetaIcon,
      accent: accentClass,
      color: catConfig.color,
      image: catConfig.image,
      statCount: prompts.length.toString(),
      copies: "10K+",
    };
  } else {
    meta = {
      icon: Sparkles,
      accent: "text-primary bg-primary/10 border-primary/20",
      color: "from-primary/30 to-accent/30",
      image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
      statCount: prompts.length.toString(),
      copies: "10K+",
    };
  }

  const MetaIcon = meta.icon;
  const categoryMeta = categoryDescriptions[key];

  // Fetch all prompts to compute counts dynamically
  const allPrompts = await getAllPrompts();
  const categoryCounts: Record<string, number> = {};
  for (const prompt of allPrompts) {
    if (prompt.category) {
      const catKey = prompt.category.toLowerCase();
      categoryCounts[catKey] = (categoryCounts[catKey] ?? 0) + 1;
    }
  }

  // Dynamic categories list lookup to fetch counts and icons for related categories
  const relatedCategories = categoriesData
    .filter(c => c.name.toLowerCase() !== key)
    .slice(0, 4)
    .map(c => {
      const relatedKey = c.name.toLowerCase();
      const countVal = categoryCounts[relatedKey] ?? 0;
      return {
        key: relatedKey,
        name: c.name,
        icon: ICON_MAP[c.name] || Sparkles,
        count: countVal.toLocaleString(),
      };
    });

  // Category specific creation tips
  const tips = categoryTipsLookup[key] || [
    "Be specific with your visual directives",
    "Specify lighting styles and dynamic angles",
    "Describe environment detail and background colors",
    "Define camera parameters like lens size and aperture",
    "Experiment, copy and remix prompts freely"
  ];

  // Category specific trending searches
  const searches = trendingSearchesLookup[key] || [
    "epic art style", "beautiful landscape", "high resolution", "golden hour focus", "neon lighting vibe"
  ];

  // Category specific intro paragraph for the Tips Section
  const categoryIntroText = `${displayName} AI prompts are text instructions used with Gemini AI to generate professional-grade ${decodedCategory}-style visual content. These prompts help you create stunning ${decodedCategory} characters, scenes, and compositions by specifying fine details like subject focus, action poses, mood transitions, lighting, and environmental factors. Use our detailed copy-and-paste prompts to get the best results and bring your creative imagination to life.`;

  // How many prompts to pre-render on the server (first visible batch)
  const INITIAL_COUNT = 8;
  const initialPrompts = prompts.slice(0, INITIAL_COUNT);

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">{displayName}</span>
        </div>

        {/* Dynamic Split Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20">
          {/* Left: SEO Description & Headers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${meta.accent}`}>
                <MetaIcon className="w-3.5 h-3.5" />
                Explore Category
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              {displayName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gemini AI Prompts</span>
            </h1>

            <div className="text-foreground/50 text-sm md:text-base leading-relaxed space-y-4 max-w-3xl">
              {categoryMeta && categoryMeta.description ? (
                categoryMeta.description.split("  ").map((p, idx) => (
                  <p key={idx} className="text-justify font-normal leading-relaxed">{p}</p>
                ))
              ) : (
                <p>Explore our premium collection of highly optimized, copy-and-paste {displayName} AI prompts. Perfect for your next high-impact creative project.</p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#prompts-section"
                className="px-7 py-3.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer flex items-center gap-2 text-sm"
              >
                Browse Prompts
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/categories"
                className="px-7 py-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold border border-border transition-all flex items-center gap-2 text-sm"
              >
                View All Categories
              </Link>
            </div>
          </div>

          {/* Right: Glassmorphic Visual Cover Card */}
          <div className="lg:col-span-5 relative group w-full aspect-[4/3] lg:aspect-[5/6] rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl hover:border-white/[0.15] transition-all duration-500">
            {/* Color accent glow behind cover */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

            <div className="absolute inset-0 z-0">
              <Image
                src={meta.image}
                alt={`${displayName} Cover Image`}
                fill
                priority
                quality={95}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Premium overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent z-10" />

            {/* Inner Floating Details */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg">
                  <MetaIcon className="w-5 h-5" />
                </div>
                <div className="bg-black/50 backdrop-blur-md text-[9px] text-white/80 font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10">
                  PROMPTVault curation
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                  Premium {displayName} Art
                </h3>
                <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">
                  Hand-crafted & Optimized for Gemini 1.5 Pro & Ultra
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Interactive Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {[
            {
              label: `${displayName} Prompts`,
              value: meta.statCount,
              description: "Curated templates",
              icon: Layers,
              color: "text-pink-500 bg-pink-500/10",
            },
            {
              label: "Copies / Uses",
              value: meta.copies,
              description: "Worldwide uses",
              icon: TrendingUp,
              color: "text-violet-500 bg-violet-500/10",
            },
            {
              label: "Update Cycle",
              value: "Weekly",
              description: "Fresh content added",
              icon: Clock,
              color: "text-emerald-500 bg-emerald-500/10",
            },
            {
              label: "Optimization",
              value: "100%",
              description: "Tested and certified",
              icon: Sparkles,
              color: "text-amber-500 bg-amber-500/10",
            },
          ].map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={i}
                className="glass-dark border border-foreground/5 hover:border-foreground/15 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</span>
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <StatIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{stat.value}</div>
                  <p className="text-[10px] text-foreground/30 font-medium">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prompts Section */}
        <section id="prompts-section" className="scroll-mt-32 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3 text-foreground">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Trending {displayName} Prompts
              </h2>
              <p className="text-foreground/40 text-xs md:text-sm">Explore our top performing, copy-and-paste ready prompts</p>
            </div>
          </div>

          <CategoryPromptsClient
            initialPrompts={initialPrompts}
            totalCount={prompts.length}
            categoryKey={key}
            displayName={displayName}
          />
        </section>

        {/* Layout Row 1: Intro + Tips Block */}
        <div className="glass-dark border border-foreground/5 p-8 md:p-12 rounded-[2.5rem] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Left side: Intro description */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-foreground">
                What Are {displayName} AI Prompts?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/50 text-justify">
                {categoryIntroText}
              </p>
            </div>

            {/* Right side: Tips for better results */}
            <div className="lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l border-foreground/5 pt-8 lg:pt-0 lg:pl-10">
              <h3 className="text-lg font-bold text-foreground">
                Tips for Better Results
              </h3>
              <ul className="space-y-3.5">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-foreground/60 leading-tight">
                    <span className="text-primary font-black mr-2 select-none">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Layout Row 2: Three-Column Navigation Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
          {/* Column 1: Trending Searches */}
          <div className="lg:col-span-5 glass-dark border border-foreground/5 p-8 rounded-[2rem] space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Searches
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
              {searches.map((keyword, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/50 hover:text-primary transition-colors cursor-pointer group">
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary transition-colors shrink-0" />
                  <span className="truncate">{keyword}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Related Categories */}
          <div className="lg:col-span-4 glass-dark border border-foreground/5 p-8 rounded-[2rem] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                Related Categories
              </h3>
              <Link href="/categories" className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {relatedCategories.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={`/categories/${item.key}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                        <RelatedIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.name} Prompts
                        </div>
                        <div className="text-[10px] text-foreground/40 font-medium">
                          {item.count} Prompts
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: How to Use Callout Card */}
          <div className="lg:col-span-3 glass-dark border border-foreground/5 p-8 rounded-[2rem] flex flex-col justify-between h-full bg-primary/[0.01]">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground">How to Use {displayName} Prompts</h3>
              <p className="text-xs leading-relaxed text-foreground/45">
                Copy any prompt you like and paste it into Gemini AI. You can modify the prompt to match your imagination and create unique {key} art.
              </p>
            </div>
            <Link
              href="/blog"
              className="w-full inline-flex items-center justify-center gap-2 border border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-primary px-5 py-3 rounded-xl font-bold transition-all text-xs mt-6"
            >
              Learn More Guide
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Layout Row 3: Split FAQ & Latest Prompts Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* Left: Frequently Asked Questions */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-extrabold text-foreground">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: `Can I use these prompts with Gemini AI?`,
                  answer: `Yes! All prompts on PromptVault are optimized for Google Gemini AI. They work beautifully with Gemini 1.5 Pro and Gemini 1.5 Flash models to generate stunning visuals, and can also be used in other models like Midjourney or Stable Diffusion.`,
                },
                {
                  question: `Are these ${displayName} prompts free?`,
                  answer: `Yes, we offer a wide variety of free, copy-and-paste prompts across all categories. Premium prompts with advanced staging and visual instructions are also available for advanced creators.`,
                },
                {
                  question: `How can I get better results with these prompts?`,
                  answer: `You can customize prompts by tweaking parameters like subject details, lighting setups, artistic camera angles, and rendering engines. Check our "Tips for Better Results" section above for a complete list.`,
                },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group glass-dark border border-foreground/5 hover:border-foreground/15 rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-4.5 cursor-pointer list-none select-none">
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300 group-open:rotate-180 group-open:text-primary" />
                  </summary>
                  
                  <div className="px-6 pb-5 border-t border-foreground/[0.02]">
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/45 pt-4">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Right: Latest Prompts list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-extrabold text-foreground">
                Latest {displayName} Prompts
              </h3>
              <Link href={`/browse?category=${key}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {initialPrompts.slice(0, 3).map((p) => {
                const cardHref = p.slug ? `/prompts/${p.slug}` : `/prompts/${p.id}`;
                return (
                  <Link
                    key={p.id}
                    href={cardHref}
                    className="flex items-center justify-between p-4 rounded-[1.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-primary/25 hover:bg-primary/[0.01] transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 relative rounded-xl overflow-hidden shrink-0 border border-foreground/5">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          quality={90}
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {p.category}
                          </span>
                          <span className="text-[9px] font-bold bg-foreground/5 text-foreground/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {p.isPremium ? "Premium" : "Free"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/30 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                      <Copy className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Striking CTA Banner Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-card/25 border border-foreground/5 px-8 py-16 md:p-20 text-center mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Limitless styles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to Explore More Creative Styles?
            </h2>
            <p className="text-foreground/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Unleash your imagination by browsing thousands of copy-and-paste templates across all creative domains.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                href="/categories"
                className="group inline-flex items-center gap-2 bg-foreground text-background dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm shadow-xl"
              >
                Browse All Categories
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
