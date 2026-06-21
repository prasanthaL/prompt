import Navbar from "@/components/Navbar";
import { getActiveBlogs, getBlogBySlug } from "@/lib/json-db";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  MessageSquare,
  Clock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
  const blogs = await getActiveBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || !blog.active) {
    return {
      title: "Article Not Found",
      description: "The requested blog article was not found.",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [
      blog.category,
      "AI Prompts",
      "Prompt Engineering",
      "AiPromptNest",
      "AI Art",
      "Generative AI",
      blog.author
    ],
    alternates: {
      canonical: `https://www.promptvault.ai/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `https://www.promptvault.ai/blog/${blog.slug}`,
      publishedTime: blog.date,
      authors: [blog.author],
      images: [
        {
          url: blog.image.startsWith("http") ? blog.image : `https://www.promptvault.ai${blog.image}`,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image.startsWith("http") ? blog.image : `https://www.promptvault.ai${blog.image}`],
    },
  };
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || !blog.active) {
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

  // Related posts (excluding current, must be active)
  const activeBlogs = await getActiveBlogs();
  const relatedPosts = activeBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image.startsWith("http") ? blog.image : `https://www.promptvault.ai${blog.image}`,
    datePublished: blog.date,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "AiPromptNest",
      logo: {
        "@type": "ImageObject",
        url: "https://www.promptvault.ai/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.promptvault.ai/blog/${blog.slug}`,
    },
  };

  return (
    <main className="min-h-screen mesh-gradient text-foreground">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      {/* Header / Breadcrumb */}
      <div className="pt-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-foreground/40 font-medium mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground/80 truncate">{blog.title}</span>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/80 font-bold">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                5 min read
              </div>
              <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {blog.title}
            </h1>

            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed italic border-l-4 border-primary pl-6">
              "{blog.excerpt}"
            </p>
          </div>

          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden border border-border aspect-[21/9]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              quality={95}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>

          {/* Body Text */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-foreground/80 leading-relaxed space-y-8 text-lg">
              <p>{blog.content}</p>
            </div>
          </div>

          {/* Footer of Article */}
          <div className="pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-border transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-border transition-all cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                Comments
              </button>
            </div>
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 md:px-8 pb-32 border-t border-border mt-20 pt-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <article key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block cursor-pointer space-y-4"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden border border-border relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
