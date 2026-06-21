import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { getActiveBlogs } from "@/lib/json-db";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: "AI PromptNest Blog - Insights, Guides & Prompt Engineering Tips",
  description:
    "Explore the AIPromptNest blog for expert insights on prompt engineering, AI trends, ChatGPT guides, Midjourney tips, and how to get the most out of AI tools.",
  keywords: [
    "AI blog",
    "prompt engineering",
    "ChatGPT tips",
    "Midjourney guides",
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
        url: "https://www.aipromptnest.com/og-blog.jpg",
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
    images: ["https://www.aipromptnest.com/og-blog.jpg"],
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


export default async function BlogListing() {
  const activeBlogs = await getActiveBlogs();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AI PromptNest Blog",
    description: "Explore the AIPromptNest blog for expert insights on prompt engineering, AI trends, ChatGPT guides, Midjourney tips, and how to get the most out of AI tools.",
    url: "https://www.aipromptnest.com/blog",
    publisher: {
      "@type": "Organization",
      name: "AI Prompt Nest",
      logo: {
        "@type": "ImageObject",
        url: "https://www.aipromptnest.com/logo.png",
      },
    },
    blogPost: activeBlogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.image.startsWith("http") ? blog.image : `https://www.aipromptnest.com${blog.image}`,
      datePublished: blog.date,
      author: {
        "@type": "Person",
        name: blog.author || "AI Prompt Nest Team",
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
            Insights & Guides
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
              Gemini, Claude, Midjourney, AI productivity, prompt
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

      {/* Featured Blog (Latest) */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeBlogs.length > 0 ? (
            <article className="group cursor-pointer relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-500">
              <Link
                href={`/blog/${activeBlogs[0].slug}`}
                className="flex flex-col lg:flex-row gap-8 w-full h-full"
              >
                <div className="lg:w-1/2 h-[300px] lg:h-[450px] overflow-hidden relative">
                  <Image
                    src={activeBlogs[0].image}
                    alt={activeBlogs[0].title}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4 text-sm text-foreground/40 font-medium">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      {activeBlogs[0].category}
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {activeBlogs[0].date}
                    </div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {activeBlogs[0].title}
                  </h2>
                  <p className="text-foreground/60 text-lg leading-relaxed">
                    {activeBlogs[0].excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-primary font-bold">
                    Read Full Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </article>
          ) : (
            <div className="text-center py-20 text-foreground/45 border border-border rounded-3xl bg-card/20">
              No blog posts available at the moment. Check back later!
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      {activeBlogs.length > 1 && (
        <section className="px-4 md:px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeBlogs.slice(1).map((blog) => (
                <article
                  key={blog.id}
                  className="group cursor-pointer rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex flex-col h-full w-full"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between text-xs text-foreground/40 font-bold uppercase tracking-wider">
                        <span className="text-primary">{blog.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {blog.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-foreground/40 text-sm line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-foreground/60">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                          </div>
                          {blog.author}
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
    </>
  );
}
