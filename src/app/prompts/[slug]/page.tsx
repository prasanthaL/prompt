import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PromptCard from "@/components/PromptCard";
import PromptDetailClient from "@/components/PromptDetailClient";
import { Search } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;

  const prompts = await prisma.$queryRaw`
    SELECT * FROM "Prompt" WHERE "id" = ${slug} OR "slug" = ${slug} LIMIT 1
  ` as any[];
  
  const prompt = prompts?.[0];

  if (!prompt) {
    notFound();
  }

  // Fetch similar prompts via Raw SQL
  let similarPrompts = await prisma.$queryRaw`
    SELECT * FROM "Prompt" WHERE "category" = ${prompt.category} AND "id" != ${prompt.id} LIMIT 3
  ` as any[];
  
  // Fallback if no similar prompts found
  if (!similarPrompts || similarPrompts.length === 0) {
    similarPrompts = await prisma.$queryRaw`
      SELECT * FROM "Prompt" WHERE "id" != ${prompt.id} LIMIT 3
    ` as any[];
  }

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-28 md:pt-36">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <Link href={`/browse?category=${prompt.category}`} className="hover:text-primary transition-colors">{prompt.category}</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground/40">{prompt.title}</span>
          </div>
          
          <Link 
            href="/browse"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-foreground/60 hover:text-primary transition-all bg-white/[0.03] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/5 w-fit"
          >
            <Search className="w-3.5 h-3.5" />
            Back to Browse
          </Link>
        </div>

        <PromptDetailClient prompt={prompt} />

        {/* Similar Prompts Section */}
        <div className="mt-32 space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="w-2 h-10 bg-primary rounded-full"></span>
                Similar Prompts
              </h2>
              <p className="text-foreground/40 text-sm">Explore more prompts in the {prompt.category} category</p>
            </div>
            <Link 
              href="/browse"
              className="text-sm font-bold text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarPrompts.map((p) => (
              <PromptCard 
                key={p.id}
                {...p}
                views={p.views.toString()}
                likes={p.likes.toString()}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-32 py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-foreground">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Search className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">PromptVault</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed">
              The world's leading marketplace for high-quality AI prompts. 
              Helping creators build amazing things with AI since 2024.
            </p>
          </div>
          <p className="text-xs text-foreground/20 self-end">© 2024 PromptVault. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
