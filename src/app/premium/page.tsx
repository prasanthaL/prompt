import React from "react";
import { getPremiumPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import PromptCard from "@/components/PromptCard";
import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

export default async function PremiumPage() {
  // Fetch premium prompts via JSON DB
  const prompts = await getPremiumPrompts();

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">Premium</span>
        </div>

        {/* Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest">
            <Crown className="w-3 h-3" />
            Exclusive
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Premium <span className="text-amber-500">Vault</span>
          </h1>
          <p className="text-foreground/40 max-w-2xl text-lg">
            High-end, professional grade prompts curated for elite results. 
            Unlock the full potential of AI with our premium collection.
          </p>
        </div>

        {/* Grid */}
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {prompts.map((p) => (
              <PromptCard 
                key={p.id}
                {...p}
                views={p.views?.toString() || "0"}
                likes={p.likes?.toString() || "0"}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 glass-dark rounded-[3rem] border border-foreground/10">
            <div className="w-20 h-20 bg-amber-500/5 rounded-full flex items-center justify-center">
              <Crown className="w-10 h-10 text-amber-500/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">The Vault is currently empty</h3>
              <p className="text-foreground/40">Check back soon for exclusive premium prompts.</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
