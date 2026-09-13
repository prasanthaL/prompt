import type { Prompt } from "./json-db";

export interface PromptEditorialContent {
  overview: string;
  bestFor: string[];
  howToUse: string[];
  customization: string[];
  tips: string[];
  breakdown: Array<{ label: string; text: string }>;
}

const CATEGORY_GUIDANCE: Record<string, { bestFor: string[]; focus: string }> = {
  Portrait: {
    bestFor: ["profile portraits", "editorial photography", "social media portraits", "character studies"],
    focus: "subject identity, facial detail, lighting, pose, and camera-style direction",
  },
  Women: {
    bestFor: ["fashion portraits", "social media campaigns", "editorial looks", "lifestyle imagery"],
    focus: "subject styling, pose, wardrobe, lighting, and photographic detail",
  },
  Men: {
    bestFor: ["men's portraits", "fashion editorials", "lifestyle photography", "profile imagery"],
    focus: "subject styling, pose, wardrobe, lighting, and photographic detail",
  },
  Fashion: {
    bestFor: ["fashion campaigns", "lookbooks", "editorial concepts", "social media creatives"],
    focus: "wardrobe, styling, composition, materials, lighting, and editorial presentation",
  },
  Cinematic: {
    bestFor: ["movie-style scenes", "storytelling visuals", "posters", "dramatic social content"],
    focus: "cinematic composition, lighting, atmosphere, color grading, and visual storytelling",
  },
  Anime: {
    bestFor: ["anime characters", "manga-inspired artwork", "character concepts", "illustration projects"],
    focus: "character design, expression, pose, line/detail language, and scene styling",
  },
  Fantasy: {
    bestFor: ["fantasy characters", "world-building concepts", "book or game artwork", "fantasy posters"],
    focus: "world-building, character details, atmosphere, lighting, and imaginative visual elements",
  },
  "Sci-Fi": {
    bestFor: ["sci-fi concepts", "futuristic characters", "environment design", "cinematic posters"],
    focus: "futuristic environments, technology, materials, lighting, and cinematic scale",
  },
  Architecture: {
    bestFor: ["architectural visualization", "building concepts", "interior/exterior studies", "design presentations"],
    focus: "structure, materials, perspective, lighting, environment, and architectural composition",
  },
  "Interior Design": {
    bestFor: ["interior concepts", "room makeovers", "design presentations", "real-estate inspiration"],
    focus: "layout, materials, furniture, lighting, palette, and spatial balance",
  },
  Product: {
    bestFor: ["product mockups", "advertising concepts", "e-commerce visuals", "brand campaigns"],
    focus: "product form, materials, lighting, camera angle, background, and commercial presentation",
  },
  Travel: {
    bestFor: ["travel campaigns", "destination concepts", "tourism content", "social media visuals"],
    focus: "location, atmosphere, subject placement, lighting, and travel storytelling",
  },
  Nature: {
    bestFor: ["landscape concepts", "nature photography", "environmental artwork", "scenic backgrounds"],
    focus: "environment, weather, light, depth, textures, and natural composition",
  },
  "Nature & Landscape": {
    bestFor: ["landscape concepts", "nature photography", "environmental artwork", "scenic backgrounds"],
    focus: "environment, weather, light, depth, textures, and natural composition",
  },
  Food: {
    bestFor: ["food photography", "menu visuals", "restaurant marketing", "recipe content"],
    focus: "food styling, composition, lighting, texture, props, and presentation",
  },
  Vehicles: {
    bestFor: ["automotive concepts", "vehicle posters", "transport design", "action scenes"],
    focus: "vehicle form, camera perspective, environment, motion, materials, and lighting",
  },
  Mecha: {
    bestFor: ["mecha concepts", "robot artwork", "sci-fi scenes", "game or poster concepts"],
    focus: "mechanical structure, materials, scale, environment, lighting, and action composition",
  },
  Wedding: {
    bestFor: ["wedding portraits", "engagement concepts", "bridal editorials", "wedding social content"],
    focus: "people, wardrobe, emotion, lighting, composition, and elegant atmosphere",
  },
};

const DEFAULT_GUIDANCE = {
  bestFor: ["creative image generation", "social media content", "visual experimentation", "personal projects"],
  focus: "subject, composition, style, lighting, atmosphere, and visual detail",
};

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function words(text: string): string[] {
  return cleanText(text).split(/\s+/).filter(Boolean);
}

function sentenceExcerpt(text: string, max = 210): string {
  const cleaned = cleanText(text);
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).replace(/[,:;.-]+$/, "")}…`;
}

function hasAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function extractBreakdown(promptText: string, category: string) {
  const text = promptText.replace(/\r/g, "").trim();
  const rawParts = text
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(cleanText)
    .filter((part) => part.length >= 25);

  const parts = rawParts.slice(0, 18);
  const rules: Array<[string, string[]]> = [
    ["Subject", ["man", "woman", "person", "boy", "girl", "portrait", "character", "robot", "car", "building", "product"]],
    ["Composition", ["close-up", "close up", "full-body", "full body", "medium shot", "wide shot", "side profile", "low angle", "overhead", "centered", "vertical", "horizontal"]],
    ["Lighting", ["lighting", "light", "sunset", "sunrise", "rim light", "soft light", "hard light", "volumetric", "neon", "golden hour"]],
    ["Camera & Lens", ["lens", "mm", "f/", "camera", "depth of field", "bokeh", "aperture", "raw"]],
    ["Style & Finish", ["photorealistic", "cinematic", "anime", "illustration", "editorial", "realistic", "3d", "digital art", "film grain"]],
    ["Environment", ["background", "forest", "city", "street", "studio", "room", "sky", "mountain", "beach", "architecture"]],
    ["Color & Mood", ["color grading", "color palette", "warm", "cool", "moody", "dramatic", "nostalgic", "vibrant", "muted"]],
  ];

  const used = new Set<number>();
  const result: Array<{ label: string; text: string }> = [];
  for (const [label, terms] of rules) {
    const index = parts.findIndex((part, i) => !used.has(i) && hasAny(part, terms));
    if (index >= 0) {
      used.add(index);
      result.push({ label, text: sentenceExcerpt(parts[index], 260) });
    }
  }

  if (result.length < 4) {
    for (let i = 0; i < parts.length && result.length < 6; i += 1) {
      if (used.has(i)) continue;
      used.add(i);
      result.push({
        label: result.length === 0 ? "Creative Direction" : `Prompt Detail ${result.length + 1}`,
        text: sentenceExcerpt(parts[i], 260),
      });
    }
  }

  if (result.length === 0) {
    result.push({
      label: "Prompt Focus",
      text: `This ${category.toLowerCase()} prompt contains the main visual direction used to guide the image generator.`,
    });
  }

  return result;
}

export function getPromptEditorialContent(prompt: Prompt): PromptEditorialContent {
  const text = cleanText(prompt.fullPrompt || "");
  const categoryInfo = CATEGORY_GUIDANCE[prompt.category] ?? DEFAULT_GUIDANCE;
  const model = prompt.models?.[0] || "Gemini AI";
  const wordCount = words(text).length;

  const signals = [
    hasAny(text, ["lighting", "light", "sunset", "sunrise", "golden hour"]) ? "lighting" : null,
    hasAny(text, ["lens", "camera", "mm", "f/", "depth of field", "bokeh"]) ? "camera direction" : null,
    hasAny(text, ["color grading", "color palette", "warm", "cool", "teal", "orange"]) ? "color treatment" : null,
    hasAny(text, ["background", "environment", "studio", "forest", "city", "street"]) ? "environment" : null,
    hasAny(text, ["pose", "standing", "sitting", "walking", "profile", "close-up", "full-body"]) ? "composition or pose" : null,
  ].filter(Boolean) as string[];

  const signalText = signals.length > 0
    ? `It gives particular attention to ${signals.slice(0, 3).join(", ")}${signals.length > 3 ? ", and other visual details" : ""}.`
    : "Its wording provides a focused visual direction rather than relying on a single style keyword.";

  const overview = `${prompt.title} is a ${prompt.category.toLowerCase()} image-generation prompt prepared for ${model}. The prompt is approximately ${wordCount} words long and describes ${categoryInfo.focus}. ${signalText} Use it as a starting point, then adjust the subject, setting, or visual treatment to match your own project.`;

  const howToUse = [
    `Copy the full prompt and paste it into ${model}.`,
    `Keep the core subject and visual direction intact on the first generation so you can see the intended result before changing details.`,
    `Replace or edit specific elements such as the subject, outfit, location, mood, camera direction, or color treatment when the prompt includes those details.`,
    `Generate a first version, identify the part that needs improvement, and make one or two targeted changes instead of rewriting everything at once.`,
    `Save the version that works best and record the changes you made if you want to reuse the same visual approach later.`,
  ];

  const customization: string[] = [
    `Subject: change the main person, object, character, or scene while keeping the composition instructions that already work.`,
    `Setting: swap the location or background to create a different context without changing the overall visual language.`,
    `Style: adjust descriptors such as cinematic, editorial, realistic, illustrated, or stylized only when they support the result you want.`,
    `Lighting and color: change the time of day, light quality, contrast, or palette to create a different mood.`,
  ];

  const tips: string[] = [
    `Start with the complete prompt before simplifying it; removing too many details can change the intended composition.`,
    `When the result is close but not correct, change one visual instruction at a time so you can see which edit made the difference.`,
  ];
  if (signals.includes("camera direction")) {
    tips.push("Keep the camera or lens language consistent when you want to preserve the framing and depth of the example.");
  }
  if (signals.includes("lighting")) {
    tips.push("Treat the lighting description as a key part of the look; changing it can affect the entire mood of the image.");
  }
  if (signals.includes("color treatment")) {
    tips.push("If the colors become too strong, simplify the palette instead of adding more color keywords.");
  }

  return {
    overview,
    bestFor: categoryInfo.bestFor,
    howToUse: prompt.howToUse?.length ? prompt.howToUse : howToUse,
    customization,
    tips: tips.slice(0, 5),
    breakdown: extractBreakdown(prompt.fullPrompt, prompt.category),
  };
}
