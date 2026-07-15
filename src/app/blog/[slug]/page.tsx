import Navbar from "@/components/Navbar";
import {
  Calendar,
  ArrowLeft,
  Clock,
  ChevronRight,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import blogJsonData from "@/data/blog.json";
import BlogRenderer from "@/components/blog/BlogRenderer";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogCardData } from "@/components/blog/BlogCardFeatured";
import type { Block } from "@/components/blog/BlogBlock";

export const revalidate = 60;

// ---------------------------------------------------------------------------
// Types for the rich blog.json shape
// ---------------------------------------------------------------------------
type RichBlog = (typeof blogJsonData)[number];

function findRichBlog(slug: string): RichBlog | undefined {
  return (blogJsonData as RichBlog[]).find((b) => b.slug === slug);
}

function richToCardData(raw: RichBlog): BlogCardData {
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

// ---------------------------------------------------------------------------
// Static params — include blog.json slugs
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const richSlugs = (blogJsonData as RichBlog[]).map((b) => ({ slug: b.slug }));
  return richSlugs;
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Prefer rich blog.json
  const rich = findRichBlog(slug);
  if (rich) {
    return {
      title: rich.seo?.title ?? rich.title,
      description: rich.seo?.description ?? rich.excerpt,
      keywords: rich.seo?.keywords ?? rich.tags,
      alternates: { canonical: `https://www.aipromptnest.com/blog/${rich.slug}` },
      openGraph: {
        title: rich.title,
        description: rich.excerpt,
        type: "article",
        url: `https://www.aipromptnest.com/blog/${rich.slug}`,
        publishedTime: rich.publishedAt,
        authors: rich.author ? [rich.author.name] : [],
        images: [{ url: rich.coverImage, alt: rich.coverImageAlt ?? rich.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: rich.title,
        description: rich.excerpt,
        images: [rich.coverImage],
      },
    };
  }

  return {
    title: "Article Not Found",
    description: "The requested blog article was not found.",
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;

  // ── Try rich blog.json first ─────────────────────────────────────────────
  const rich = findRichBlog(slug);

  if (rich) {
    // Related posts from blog.json (excluding current)
    const allRich = (blogJsonData as RichBlog[]).filter((b) => b.slug !== slug);
    const relatedRich: BlogCardData[] = allRich.slice(0, 3).map(richToCardData);

    const pubDate = new Date(rich.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: rich.title,
      description: rich.excerpt,
      image: rich.coverImage,
      datePublished: rich.publishedAt,
      dateModified: rich.updatedAt ?? rich.publishedAt,
      author: { "@type": "Person", name: rich.author?.name ?? "AI Prompt Nest" },
      publisher: {
        "@type": "Organization",
        name: "AiPromptNest",
        logo: { "@type": "ImageObject", url: "https://www.aipromptnest.com/logo.png" },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.aipromptnest.com/blog/${rich.slug}`,
      },
      keywords: rich.tags?.join(", "),
    };

    return (
      <main className="min-h-screen mesh-gradient text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Navbar />

        {/* Breadcrumb */}
        <div className="pt-32 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-foreground/40 font-medium mb-10">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground/70 truncate">{rich.title}</span>
          </div>
        </div>

        {/* Article */}
        <article className="px-4 md:px-8 pb-20">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* ── Meta row ────────────────────────────────────────────── */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Category badge */}
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                  {rich.category}
                </span>
                {rich.featured && (
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow shadow-primary/30">
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                {rich.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-foreground/60 leading-relaxed italic border-l-4 border-primary pl-6">
                &ldquo;{rich.excerpt}&rdquo;
              </p>

              {/* Author / Date / Read time */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-foreground/50 pb-2">
                {rich.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {rich.author.name.charAt(0)}
                    </div>
                    <span className="text-foreground/80 font-semibold">{rich.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {pubDate}
                </div>
                {rich.readingTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {rich.readingTime} min read
                  </div>
                )}
              </div>

              {/* Tags */}
              {rich.tags && rich.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {rich.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-foreground/5 border border-border text-foreground/50 text-xs"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── Cover Image ─────────────────────────────────────────── */}
            <div className="relative rounded-3xl overflow-hidden border border-border aspect-[21/9]">
              <Image
                src={rich.coverImage}
                alt={rich.coverImageAlt ?? rich.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>

            {/* ── Block Content ────────────────────────────────────────── */}
            <div className="py-4">
              <BlogRenderer blocks={rich.blocks as Block[]} />
            </div>

            {/* ── Article Footer ───────────────────────────────────────── */}
            <div className="pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
              <ShareButton title={rich.title} />
              <Link
                href="/blog"
                className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to all posts
              </Link>
            </div>
          </div>
        </article>

        {/* ── Related Posts ──────────────────────────────────────────────── */}
        {relatedRich.length > 0 && (
          <section className="px-4 md:px-8 pb-32 border-t border-border mt-12 pt-20">
            <div className="max-w-7xl mx-auto space-y-10">
              <h2 className="text-3xl font-bold">
                Related <span className="text-gradient">Articles</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedRich.map((post) => (
                  <BlogCard key={post.id} blog={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-foreground/60">Article not found</p>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Client share button (lightweight inline component)
// ---------------------------------------------------------------------------
import ShareButtonClient from "@/components/blog/ShareButton";

function ShareButton({ title }: { title: string }) {
  return <ShareButtonClient title={title} />;
}
