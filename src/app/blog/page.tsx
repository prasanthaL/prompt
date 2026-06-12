import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { getActiveBlogs } from "@/lib/json-db";
import Footer from "@/components/Footer";

export const revalidate = 60; // Revalidate every minute

export default async function BlogListing() {
  const activeBlogs = await getActiveBlogs();

  return (
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
            The <span className="text-gradient">PromptVault</span> Blog
          </h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Master the art of prompt engineering, explore AI trends, and level up your digital creativity with our expert-led guides.
          </p>
        </div>
      </section>

      {/* Featured Blog (Latest) */}
      <section className="px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {activeBlogs.length > 0 ? (
            <Link
              href={`/blog/${activeBlogs[0].slug}`}
              className="group cursor-pointer relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl flex flex-col lg:flex-row gap-8 hover:border-primary/50 transition-all duration-500"
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
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group cursor-pointer flex flex-col rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300"
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
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
