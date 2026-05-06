"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { Sparkles, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <main className="min-h-screen mesh-gradient flex flex-col items-center justify-center text-center px-4">
      <Navbar />
      <div className="space-y-8 max-w-2xl">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{title}</h1>
          <p className="text-xl text-white/40 leading-relaxed">
            We're working hard to bring you the best {title.toLowerCase()} experience. 
            Stay tuned for something amazing!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/browse" 
            className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20"
          >
            Explore Prompts
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
