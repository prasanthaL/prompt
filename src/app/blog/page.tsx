"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import blogsData from "@/data/blogs.json";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function BlogListing() {
  const router = useRouter();

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
          {blogsData.length > 0 && (
            <div 
              onClick={() => router.push(`/blog/${blogsData[0].slug}`)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl flex flex-col lg:flex-row gap-8 hover:border-primary/50 transition-all duration-500"
            >
              <div className="lg:w-1/2 h-[300px] lg:h-[450px] overflow-hidden">
                <img 
                  src={blogsData[0].image} 
                  alt={blogsData[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-4 text-sm text-foreground/40 font-medium">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    {blogsData[0].category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogsData[0].date}
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {blogsData[0].title}
                </h2>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  {blogsData[0].excerpt}
                </p>
                <div className="flex items-center gap-3 text-primary font-bold">
                  Read Full Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.slice(1).map((blog) => (
              <div 
                key={blog.id}
                onClick={() => router.push(`/blog/${blog.slug}`)}
                className="group cursor-pointer flex flex-col rounded-3xl border border-border bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 md:px-8 pb-32">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-card to-background border border-primary/20 p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full mesh-gradient opacity-20 pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Never miss an <span className="text-gradient">update</span></h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Join 10,000+ creators and get the latest prompt engineering tips and AI news delivered to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mt-8">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-background/50 border border-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
              <button className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-20 px-4 md:px-8 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-foreground">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Tag className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">PromptVault</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed">
              The world's leading marketplace for high-quality AI prompts. 
              Helping creators build amazing things with AI since 2026.
            </p>
          </div>
          <div className="flex gap-12 text-sm text-foreground/40">
            <ul className="space-y-2">
              <li className="text-foreground font-bold mb-4 uppercase text-xs tracking-widest">Platform</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Browse</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Categories</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
            </ul>
            <ul className="space-y-2">
              <li className="text-foreground font-bold mb-4 uppercase text-xs tracking-widest">Company</li>
              <li className="hover:text-primary cursor-pointer transition-colors">About</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors font-bold text-primary">Blog</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
