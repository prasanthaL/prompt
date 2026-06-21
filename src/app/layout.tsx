import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const siteUrl = "https://www.aipromptnest.com";

export const viewport: Viewport = {
  themeColor: "#8B5CF6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "AIPromptNest - Free Gemini AI Image Prompts & Prompt Library",
    template: "%s | AIPromptNest",
  },
  description:
    "Explore 1,000+ free Gemini AI image prompts in one library. Find cinematic, anime, fantasy, realistic, photography, fashion, and creative prompts to generate high-quality AI images.",

  keywords: [
    "AI image prompts",
    "Gemini AI prompts",
    "Gemini image prompts",
    "Google Gemini prompts",
    "Google Gemini image prompts",
    "Gemini AI art prompts",
    "free AI prompts",
    "AI prompt library",
    "AI prompt database",
    "AI art prompts",
    "image generation prompts",
    "cinematic AI prompts",
    "anime AI prompts",
    "realistic AI prompts",
    "fantasy AI prompts",
    "fashion AI prompts",
    "photography AI prompts",
    "creative AI prompts",
    "best Gemini prompts",
    "Gemini prompt collection",
    "AI image prompt library",
    "free Gemini image prompts",
  ],

  authors: [{ name: "AIPromptNest", url: siteUrl }],
  creator: "AIPromptNest",
  publisher: "AIPromptNest",

  applicationName: "AIPromptNest",
  category: "AI Prompts",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "your-verification-code",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AIPromptNest",
    title: "AIPromptNest - Free Gemini AI Image Prompts Library",
    description:
      "Explore 1,000+ free Gemini AI image prompts. Discover cinematic, anime, fantasy, realistic, photography, fashion and creative prompt collections.",
    images: [
      {
        url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
        width: 1200,
        height: 630,
        alt: "AIPromptNest - Free Gemini AI Image Prompts Library",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AIPromptNest - Free Gemini AI Image Prompts Library",
    description:
      "Explore 1,000+ free Gemini AI image prompts. Discover cinematic, anime, fantasy, realistic, photography, fashion and creative prompt collections.",
    images: [
      "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
    ],
    creator: "@aipromptnest",
    site: "@aipromptnest",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};


/* WebSite JSON-LD — enables Google Sitelinks Search Box */
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIPromptNest",
  url: siteUrl,
  description:
    "A free AI image prompt library featuring Gemini AI prompts for cinematic, anime, fantasy, realistic, photography, and creative image generation.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/browse?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AIPromptNest",
  headline: "Free Gemini AI Prompt Library",
  description:
    "Browse thousands of free Gemini AI prompts for image generation. Find trending, popular, and category-based prompts for anime, fantasy, cinematic photography, portraits, architecture, and more.",
  url: "https://www.aipromptnest.com",
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "AIPromptNest",
    url: "https://www.aipromptnest.com",
  },
  about: {
    "@type": "Thing",
    name: "Gemini AI Prompts",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIPromptNest",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AIPromptNest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AIPromptNest is a free directory of Gemini AI prompts that helps users discover, browse, and use high-quality prompts for AI image generation.",
      },
    },
    {
      "@type": "Question",
      name: "What are Gemini AI prompts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemini AI prompts are text instructions that guide Google's Gemini AI to generate images in specific styles, themes, and compositions.",
      },
    },
    {
      "@type": "Question",
      name: "Are the prompts on AIPromptNest free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All prompts available on AIPromptNest can be browsed and used for free with Gemini AI.",
      },
    },
    {
      "@type": "Question",
      name: "What types of Gemini AI prompts can I find?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can find prompts for anime art, cinematic photography, fantasy illustrations, sci-fi concepts, realistic portraits, architecture, product photography, landscapes, characters, and more.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use a Gemini AI prompt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply copy a prompt from AIPromptNest and paste it into Gemini AI. You can also customize the prompt to match your creative goals and preferred image style.",
      },
    },
    {
      "@type": "Question",
      name: "How often are new prompts added?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New Gemini AI prompts are added regularly to help users discover fresh ideas, trending styles, and creative inspiration.",
      },
    },
  ],
};

const schemas = [
  organizationSchema,
  webSiteSchema,
  webPageSchema,
  faqSchema,
]


import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
