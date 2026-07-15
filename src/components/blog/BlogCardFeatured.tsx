import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export interface BlogCardData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  publishedAt: string;
  readingTime?: number;
  category: string;
  tags?: string[];
  featured?: boolean;
  author?: { name: string; avatar?: string };
}

interface BlogCardFeaturedProps {
  blog: BlogCardData;
}

/**
 * Large hero-style blog card for the first / featured post.
 */
export default function BlogCardFeatured({ blog }: BlogCardFeaturedProps) {
  const pubDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      <Link
        href={`/blog/${blog.slug}`}
        className="flex flex-col lg:flex-row gap-0 w-full h-full"
      >
        {/* Cover image */}
        <div className="lg:w-[55%] h-[300px] lg:h-[480px] overflow-hidden relative flex-shrink-0">
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt ?? blog.title}
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay on the image edge */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-card/80 hidden lg:block" />

          {blog.featured && (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
              <Tag className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center space-y-5">
          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <div className="flex items-center gap-1.5 text-foreground/40">
              <Calendar className="w-3.5 h-3.5" />
              {pubDate}
            </div>
            {blog.readingTime && (
              <div className="flex items-center gap-1.5 text-foreground/40">
                <Clock className="w-3.5 h-3.5" />
                {blog.readingTime} min read
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <p className="text-foreground/60 text-base lg:text-lg leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-foreground/5 border border-border text-foreground/50 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-bold text-sm mt-2">
            Read Full Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </article>
  );
}
