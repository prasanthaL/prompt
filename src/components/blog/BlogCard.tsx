import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogCardData } from "./BlogCardFeatured";

interface BlogCardProps {
  blog: BlogCardData;
}

/**
 * Compact grid card for listing secondary blog posts.
 */
export default function BlogCard({ blog }: BlogCardProps) {
  const pubDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full">
      <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full w-full">
        {/* Cover image */}
        <div className="h-52 overflow-hidden relative flex-shrink-0">
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt ?? blog.title}
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category pill on image */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-primary text-xs font-bold uppercase tracking-wider">
            {blog.category}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3 flex-1 flex flex-col">
          {/* Date + reading time */}
          <div className="flex items-center gap-3 text-xs text-foreground/40 font-medium">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {pubDate}
            </div>
            {blog.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.readingTime} min
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-foreground/50 text-sm leading-relaxed line-clamp-3 flex-1">
            {blog.excerpt}
          </p>

          {/* Tags (up to 2) */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-foreground/5 border border-border text-foreground/40 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
            {blog.author ? (
              <div className="flex items-center gap-2 text-xs text-foreground/55">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {blog.author.name.charAt(0)}
                </div>
                {blog.author.name}
              </div>
            ) : (
              <span />
            )}
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}
