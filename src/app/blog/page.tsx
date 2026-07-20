import Navbar from "@/components/Navbar";
import { Tag } from "lucide-react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import blogJsonData from "@/data/blog.json";
import BlogCardFeatured from "@/components/blog/BlogCardFeatured";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogCardData } from "@/components/blog/BlogCardFeatured";

export const metadata: Metadata = {
  title: "AI PromptNest Blog - Insights, Guides & Prompt Engineering Tips",
  description:
    "Explore the AIPromptNest blog for expert insights on prompt engineering, AI trends, ChatGPT guides, Gemini tips, and how to get the most out of AI tools.",
  keywords: [
    "AI blog",
    "prompt engineering",
    "ChatGPT tips",
    "Gemini guides",
    "AI trends",
    "prompt engineering tutorials",
    "AI insights",
    "artificial intelligence",
    "AI Prompt Nest Blog",
  ],
  openGraph: {
    title: "AI PromptNest Blog - Insights, Guides & Prompt Engineering Tips",
    description:
      "Explore the AIPromptNest blog for expert insights on prompt engineering, AI trends, ChatGPT guides, and more.",
    url: "https://www.aipromptnest.com/blog",
    siteName: "AI Prompt Nest",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://res.cloudinary.com/dxwdgozsp/image/upload/v1784359048/how-to-write-better-ai-image-prompts_ou8phb.webp",
        width: 1200,
        height: 630,
        alt: "AI PromptNest Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI PromptNest Blog - Insights, Guides & Prompt Engineering Tips",
    description:
      "Master prompt engineering with guides and insights from the AIPromptNest blog.",
    images: ["https://res.cloudinary.com/dxwdgozsp/image/upload/v1784359048/how-to-write-better-ai-image-prompts_ou8phb.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.aipromptnest.com/blog",
  },
};

// ---------------------------------------------------------------------------
// Map raw blog.json entry → BlogCardData shape
// ---------------------------------------------------------------------------
function mapBlogJson(raw: (typeof blogJsonData)[number]): BlogCardData {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    coverImage: raw.coverImage,
    coverImageAlt: raw.coverImageAlt,
    publishedAt: raw.publishedAt,
    readingTime: raw.readingTime,
    category: raw.category,
    tags: raw.tags,
    featured: raw.featured,
    author: raw.author ? { name: raw.author.name, avatar: raw.author.avatar } : undefined,
  };
}

export default async function BlogListing() {
  // Rich blog.json data for the card components
  const richBlogs: BlogCardData[] = (blogJsonData as (typeof blogJsonData)[number][]).map(mapBlogJson);
  const featuredBlog = richBlogs.find((b) => b.featured) ?? richBlogs[0];
  const gridBlogs = richBlogs.filter((b) => b.id !== featuredBlog.id);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AI PromptNest Blog",
    description: "Explore the AIPromptNest blog for expert insights on prompt engineering, AI trends, ChatGPT guides, Gemini tips, and how to get the most out of AI tools.",
    url: "https://www.aipromptnest.com/blog",
    publisher: {
      "@type": "Organization",
      name: "AI Prompt Nest",
      logo: {
        "@type": "ImageObject",
        url: "https://www.aipromptnest.com/logo.png",
      },
    },
    blogPost: richBlogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.coverImage.startsWith("http") ? blog.coverImage : `https://www.aipromptnest.com${blog.coverImage}`,
      datePublished: blog.publishedAt,
      author: {
        "@type": "Person",
        name: blog.author?.name || "AI Prompt Nest Team",
      },
      publisher: {
        "@type": "Organization",
        name: "AI Prompt Nest",
        logo: {
          "@type": "ImageObject",
          url: "https://www.aipromptnest.com/logo.png",
        },
      },
      url: `https://www.aipromptnest.com/blog/${blog.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.aipromptnest.com/blog/${blog.slug}`,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.aipromptnest.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.aipromptnest.com/blog",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogSchema, breadcrumbSchema]),
        }}
      />
      <main className="min-h-screen mesh-gradient text-foreground">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3 h-3" />
              Insights &amp; Guides
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              The <span className="text-gradient">AiPromptNest</span> Blog
            </h1>

            <section className="my-8 space-y-4 max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Latest AI Insights and Prompt Engineering Guides
              </h2>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                AI Prompt Nest Blog provides expert tutorials on ChatGPT,
                Gemini, Claude, AI productivity, prompt
                engineering techniques, and artificial intelligence trends.
              </p>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Whether you&apos;re a developer, content creator, marketer, or
                AI enthusiast, our guides help you create better prompts
                and achieve more accurate AI-generated results.
              </p>
            </section>

            <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Master the art of prompt engineering, explore AI trends, and level up your digital creativity with our expert-led guides.
            </p>
          </div>
        </section>

        {/* ── Rich blog.json cards: Featured hero + grid ──────────────── */}
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Section label */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                Deep Dive Guides
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                In-Depth <span className="text-gradient">Articles</span>
              </h2>
            </div>

            {/* Featured card from blog.json */}
            <BlogCardFeatured blog={featuredBlog} />

            {/* Grid cards from blog.json */}
            {gridBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
