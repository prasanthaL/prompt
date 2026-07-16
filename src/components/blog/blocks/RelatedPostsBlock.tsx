import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import blogJsonData from "@/data/blog.json";

type RichBlog = (typeof blogJsonData)[number];

interface RelatedPostsBlockProps {
  ids: string[];
}

/**
 * Renders linked cards to other blog posts, looked up by slug from blog.json.
 * Falls back to a simple slug-derived label if the post isn't found.
 */
export default function RelatedPostsBlock({ ids }: RelatedPostsBlockProps) {
  const posts = ids.map((slug) => {
    const found = (blogJsonData as RichBlog[]).find((b) => b.slug === slug);
    return {
      slug,
      title: found?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      excerpt: found?.excerpt,
      category: found?.category,
    };
  });

  return (
    <div className="my-8 space-y-4">
      <div className="flex items-center gap-2 text-foreground/60 font-bold text-sm uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        Related Articles
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card/40 hover:border-primary/40 hover:bg-primary/5 p-4 transition-all duration-300"
          >
            {post.category && (
              <span className="self-start px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                {post.category}
              </span>
            )}
            <p className="font-bold text-sm text-foreground/85 group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {post.title}
            </p>
            {post.excerpt && (
              <p className="text-xs text-foreground/45 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="mt-auto flex items-center gap-1 text-primary text-xs font-semibold pt-1">
              Read more
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
