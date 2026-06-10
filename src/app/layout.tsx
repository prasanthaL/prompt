import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const siteUrl = "https://www.promptvault.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PromptVault — Free Gemini AI Image Prompts Library",
    template: "%s | PromptVault",
  },
  description:
    "Browse 1,000+ free, tested AI image prompts for Google Gemini, Midjourney, DALL·E & Stable Diffusion. Cinematic, anime, fantasy, fashion, realistic styles and more.",

  keywords: [
    "AI image prompts",
    "Gemini AI prompts",
    "free AI prompts",
    "Midjourney prompts",
    "DALL-E prompts",
    "Stable Diffusion prompts",
    "AI art prompts",
    "anime AI prompts",
    "cinematic prompts",
    "fantasy AI prompts",
    "prompt library",
    "AI prompt marketplace",
  ],

  authors: [{ name: "PromptVault", url: siteUrl }],
  creator: "PromptVault",
  publisher: "PromptVault",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "PromptVault",
    title: "PromptVault — Free Gemini AI Image Prompts Library",
    description:
      "Browse 1,000+ free, tested AI image prompts for Google Gemini, Midjourney, DALL·E & Stable Diffusion.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptVault — AI Image Prompts Library",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PromptVault — Free Gemini AI Image Prompts Library",
    description:
      "Browse 1,000+ free, tested AI image prompts for Google Gemini, Midjourney, DALL·E & Stable Diffusion.",
    images: ["/og-image.png"],
    creator: "@promptvault",
    site: "@promptvault",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

/* WebSite JSON-LD — enables Google Sitelinks Search Box */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PromptVault",
  url: siteUrl,
  description:
    "The world's leading marketplace for high-quality AI image prompts.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/browse?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
