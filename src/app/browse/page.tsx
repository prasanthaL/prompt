import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowseClient from "./BrowseClient";
import HowToUse from "./HowToUse";
import PopularCategories from "./PopularCategories";
import FaqSection, { BROWSE_FAQS } from "./FaqSection";
import type { Metadata } from "next";
import { getAllPrompts } from "@/lib/json-db";
import { CATEGORY_DESCRIPTIONS } from "@/data/category-descriptions";

export const dynamic = "force-dynamic";

const siteUrl = "https://www.aipromptnest.com";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
}
function getCategoryDescription(catName: string) {
  const normalized = catName.toLowerCase();
  const key = Object.keys(CATEGORY_DESCRIPTIONS).find(
    (k) => k.toLowerCase() === normalized
  );
  return CATEGORY_DESCRIPTIONS[key || "all"];
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "all";

  const activeCategoryDesc = getCategoryDescription(category);
  const isAll = category.toLowerCase() === "all";
  const q = (resolvedParams.q || "").trim();
  const isSearchPage = q.length > 0;

  const title = isAll
    ? "Browse Free Gemini AI Image Prompts"
    : `${activeCategoryDesc.name} - Free Gemini AI Image Prompts`;

  const description = activeCategoryDesc.description;
  const canonicalPath = isAll
    ? "/browse"
    : `/browse?category=${encodeURIComponent(category)}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
      siteName: "AIPromptNest",
      images: [
        {
          url: "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://res.cloudinary.com/dfbacu2lw/image/upload/v1781332533/og_yh8di5.webp",
      ],
      creator: "@aipromptnest",
      site: "@aipromptnest",
    },
    robots: {
      index: !isSearchPage,
      follow: true,
      googleBot: {
        index: !isSearchPage,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "all";
  const q = (resolvedParams.q || "").trim();
  const page = parseInt(resolvedParams.page || "1", 10) || 1;

  // 1. Fetch all prompts from database (cached server-side)
  const allPrompts = await getAllPrompts();

  // 2. Compute category counts on the server
  const categoryCounts: Record<string, number> = {};
  for (const prompt of allPrompts) {
    if (prompt.category) {
      categoryCounts[prompt.category] = (categoryCounts[prompt.category] ?? 0) + 1;
    }
  }

  // 3. Filter prompts based on category and search query
  let sourcePrompts = allPrompts;
  if (category !== "all") {
    sourcePrompts = allPrompts.filter(
      (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const query = q.toLowerCase();
  const filteredPrompts = query
    ? sourcePrompts.filter(
      (p) =>
        (p.title ?? "").toLowerCase().includes(query) ||
        (p.category ?? "").toLowerCase().includes(query)
    )
    : sourcePrompts;

  // 4. Calculate totalAllCount matching search query
  const totalAllCount = query
    ? allPrompts.filter(
      (p) =>
        (p.title ?? "").toLowerCase().includes(query) ||
        (p.category ?? "").toLowerCase().includes(query)
    ).length
    : allPrompts.length;

  // 5. Paginate results
  const PAGE_SIZE = 12;
  const totalCount = filteredPrompts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedPrompts = filteredPrompts.slice(start, start + PAGE_SIZE);

  const initialPageResult = {
    prompts: paginatedPrompts,
    totalCount,
    totalPages,
    currentPage: safePage,
  };

  const activeCategoryDesc = getCategoryDescription(category);

  // Dynamic SEO schemas
  const dynamicWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: activeCategoryDesc.name,
    headline: activeCategoryDesc.name,
    description: activeCategoryDesc.description,
    url: `https://www.aipromptnest.com/browse${category !== "all" ? `?category=${encodeURIComponent(category)}` : ""}`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "AIPromptNest",
      url: "https://www.aipromptnest.com",
    },
  };

  const dynamicCollectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: activeCategoryDesc.name,
    description: activeCategoryDesc.description,
    url: `https://www.aipromptnest.com/browse${category !== "all" ? `?category=${encodeURIComponent(category)}` : ""}`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "AIPromptNest",
      url: "https://www.aipromptnest.com",
    },
  };

  const breadcrumbElements = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.aipromptnest.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Browse Prompts",
      item: "https://www.aipromptnest.com/browse",
    },
  ];

  if (category !== "all") {
    breadcrumbElements.push({
      "@type": "ListItem",
      position: 3,
      name: activeCategoryDesc.name,
      item: `https://www.aipromptnest.com/browse?category=${encodeURIComponent(category)}`,
    });
  }

  const dynamicBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbElements,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${activeCategoryDesc.name} - Page ${safePage}`,
    description: `List of AI image prompts in category: ${activeCategoryDesc.name}`,
    url: `https://www.aipromptnest.com/browse${category !== "all" ? `?category=${encodeURIComponent(category)}` : ""}${safePage > 1 ? `&page=${safePage}` : ""}`,
    numberOfItems: paginatedPrompts.length,
    itemListElement: paginatedPrompts.map((prompt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.aipromptnest.com/prompts/${prompt.slug || prompt.id}`,
      name: prompt.title,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BROWSE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const dynamicSchemas = [
    dynamicWebPageSchema,
    dynamicCollectionPageSchema,
    dynamicBreadcrumbSchema,
    itemListSchema,
    faqSchema,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicSchemas),
        }}
      />
      <main className="min-h-screen mesh-gradient flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
            {/* Page Title & Description Section */}
            <div className="space-y-3 max-w-2xl mb-8 lg:mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                {activeCategoryDesc.name}
              </h1>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                {activeCategoryDesc.description}
              </p>
            </div>

            <Suspense fallback={<div className="text-center text-white/40">Loading...</div>}>
              <BrowseClient
                initialPageResult={initialPageResult}
                initialTotalAllCount={totalAllCount}
                initialCategoryCounts={categoryCounts}
                initialCategory={category}
                initialSearchQuery={q}
                initialPage={safePage}
              />
            </Suspense>

            {/* Info Sections */}
            <div className="mt-20 pt-16 border-t border-white/[0.05] space-y-20">
              <HowToUse />
              <PopularCategories />
              <FaqSection />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
