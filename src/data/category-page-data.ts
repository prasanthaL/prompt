import {
  Clapperboard,
  Zap,
  Ghost,
  Cpu,
  Home,
  ShoppingBag,
  User,
  Sparkles,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  PaintBucket,
} from "lucide-react";
import type { ComponentType } from "react";

// ---------------------------------------------------------------------------
// Icon map – maps a category display name to its Lucide icon component
// ---------------------------------------------------------------------------
export const ICON_MAP: Record<string, ComponentType<any>> = {
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

// ---------------------------------------------------------------------------
// SEO metadata per category
// ---------------------------------------------------------------------------
export const categoryDescriptions: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  anime: {
    title:
      "Anime AI Art Prompts – Generate Stunning Anime Characters & Scenes | PromptVault",
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
    title:
      "Cinematic AI Art Prompts – Create Movie-Quality Visuals & Film Stills | PromptVault",
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
    title:
      "Portrait AI Art Prompts – Generate Stunning AI Portraits & Headshots | PromptVault",
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
    title:
      "Fantasy AI Art Prompts – Create Epic Magical Worlds & Mythical Creatures | PromptVault",
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
    title:
      "Sci-Fi AI Art Prompts – Generate Futuristic Worlds & Space Art | PromptVault",
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
    title:
      "Architecture AI Art Prompts – Design Stunning Buildings & Interiors | PromptVault",
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
    title:
      "Product Photography AI Prompts – Create Professional Product Shots | PromptVault",
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

// ---------------------------------------------------------------------------
// Visual / UI metadata per category (hero card, accent colours, stats)
// ---------------------------------------------------------------------------
export const categoryMetaLookup: Record<
  string,
  {
    icon: ComponentType<any>;
    accent: string;
    color: string;
    image: string;
    statCount: string;
    copies: string;
  }
> = {
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

// ---------------------------------------------------------------------------
// FAQ entries per category
// ---------------------------------------------------------------------------
export const categoryFaqData: Record<
  string,
  { question: string; answer: string }[]
> = {
  anime: [
    {
      question: "What are anime AI prompts?",
      answer:
        "Anime AI prompts are descriptive text instructions used to guide AI art models like Midjourney, Stable Diffusion, or Gemini in generating stunning anime-inspired characters, immersive fantasy backgrounds, and dynamic action scenes.",
    },
    {
      question: "Which AI models are best for generating anime art?",
      answer:
        "Midjourney (especially with the --niji model) and Stable Diffusion (using anime-focused checkpoints like Anything, Counterfeit, or AbyssOrange) deliver outstanding anime outputs. Google Gemini also yields crisp, creative anime illustrations.",
    },
    {
      question: "How can I customize these anime prompts?",
      answer:
        "You can easily modify descriptive parameters such as character hairstyles, clothing details, emotional expressions, backdrop settings, lighting (e.g., 'bioluminescent glow', 'golden hour'), and camera angles to craft a unique visual.",
    },
  ],
  cinematic: [
    {
      question: "What makes an AI prompt 'cinematic'?",
      answer:
        "Cinematic prompts utilize professional photography and filmmaking terms—such as 'anamorphic lens flare', 'shallow depth of field', 'chiaroscuro lighting', and aspect ratios like 21:9—to evoke the look and feel of high-budget film stills.",
    },
    {
      question: "Which AI models produce the best movie-quality visuals?",
      answer:
        "Midjourney v6 and Stable Diffusion XL (SDXL) are widely regarded as the best tools for cinematic realism. They capture complex film grains, atmospheric fog, and precise color grading exceptionally well.",
    },
    {
      question:
        "Can I use cinematic AI art for storyboards and pre-visualization?",
      answer:
        "Absolutely. Many directors, game design leads, and writers use our cinematic prompts to generate quick, expressive storyboards, concept pitches, and character mockups before production begins.",
    },
  ],
  portrait: [
    {
      question: "What are portrait AI prompts?",
      answer:
        "Portrait AI prompts are carefully formatted instructions designed to generate highly realistic, expressive human faces, corporate headshots, fashion editorials, and character studies with pristine anatomical features.",
    },
    {
      question: "How do I get photorealistic skin texture and eye detail?",
      answer:
        "Our prompts contain specific camera styles (e.g., '85mm lens', 'f/1.8 aperture') and lighting formats (e.g., 'Rembrandt lighting') that naturally direct the AI model to generate high-resolution skin, hair, and eye reflections.",
    },
    {
      question: "How do I avoid anatomical distortions in portraits?",
      answer:
        "By using optimized keywords in your prompts and configuring precise negative prompts (like 'double head', 'mutated hands', 'blurry details') when working with Stable Diffusion models.",
    },
  ],
  fantasy: [
    {
      question: "What makes a fantasy AI prompt successful?",
      answer:
        "A great fantasy prompt blends magical, legendary elements (castles, mythical beasts, elven architecture) with rich descriptions of atmosphere, color palettes (e.g., 'mystical violet', 'deep emerald'), and high-detail textures.",
    },
    {
      question: "Can I generate characters for tabletop RPG games?",
      answer:
        "Yes, these prompts are excellent for creating detailed avatars, custom NPC tokens, magical items, and scenic backdrops for campaigns like Dungeons & Dragons, Pathfinder, or custom fantasy worlds.",
    },
    {
      question: "Which generators work best for magical particle effects?",
      answer:
        "Midjourney and Leonardo AI excel at generating vibrant, complex particle animations, bioluminescent landscapes, and magical glows with realistic reflection and lighting.",
    },
  ],
  "sci-fi": [
    {
      question: "How do I write effective sci-fi and cyberpunk prompts?",
      answer:
        "Effective sci-fi prompts specify high-tech materials (e.g., 'carbon fiber', 'brushed steel'), atmospheric environments (e.g., 'neon-drenched Tokyo streets', 'holographic projections'), and futuristic aesthetics (e.g., retro-futurism, solarpunk).",
    },
    {
      question: "Which models are recommended for spaceships and vehicles?",
      answer:
        "Midjourney excels at high-concept spacecraft designs, while DALL-E 3 and Gemini are highly accurate when rendering complex structural hulls, geometric shapes, and clean panel structures.",
    },
    {
      question: "Can I generate solarpunk or utopian future designs?",
      answer:
        "Yes, by incorporating green-energy aesthetics, biophilic integration, clean white materials, flowing waterfalls, and bright natural sunlight into the prompt description.",
    },
  ],
  architecture: [
    {
      question: "What are architecture AI prompts?",
      answer:
        "Architecture AI prompts are text instructions that define building forms, structural materials (concrete, raw timber, double-glazed glass), interior designs, and architectural movements (Bauhaus, brutalism, parametric).",
    },
    {
      question: "How can architects and interior designers use these prompts?",
      answer:
        "They are highly effective for rapid concept iteration, exploring different spatial distributions, testing material finishes under various light conditions, and building inspiring presentation boards.",
    },
    {
      question: "Which AI tools are best for interior lighting rendering?",
      answer:
        "Midjourney and Stable Diffusion produce stunning interior daylight rendering, capturing ray-traced reflections, shadows, and subtle textural behaviors across wood, concrete, and metal surfaces.",
    },
  ],
  product: [
    {
      question: "How do I create professional product shots using AI?",
      answer:
        "Use photographic techniques like 'macro lens', 'three-point studio lighting', 'soft box shadows', and placement specifications (e.g., 'placed on a polished stone plinth surrounded by botanicals').",
    },
    {
      question: "Are these prompts suitable for real e-commerce stores?",
      answer:
        "Yes, many brands use AI-generated lifestyle backdrops and staging for their product catalog, generating highly clean, studio-quality product photos that significantly reduce cost.",
    },
    {
      question: "Which generators capture glass and metal reflections best?",
      answer:
        "Midjourney v6 and Stable Diffusion XL excel at rendering physical properties like frosted glass, metallic chrome, and fluid textures, making them perfect for cosmetics and tech product listings.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Prompt-writing tips per category
// ---------------------------------------------------------------------------
export const categoryTipsLookup: Record<string, string[]> = {
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

// ---------------------------------------------------------------------------
// Trending search terms per category
// ---------------------------------------------------------------------------
export const trendingSearchesLookup: Record<string, string[]> = {
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
