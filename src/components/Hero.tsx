"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Grid, Rocket, Users, Download, Layers } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-32 px-4 md:px-8 overflow-hidden bg-background">
      {/* Background Decorative Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse opacity-40 shadow-[0_0_10px_white]"></div>
        <div className="absolute top-[40%] left-[45%] w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-30 shadow-[0_0_15px_#8b5cf6]"></div>
        <div className="absolute bottom-[30%] right-[10%] w-1 h-1 bg-white rounded-full animate-pulse opacity-40 shadow-[0_0_10px_white]"></div>
        <div className="absolute top-[10%] right-[30%] w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-20 shadow-[0_0_12px_#8b5cf6]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Content */}
        <div className="flex-1 space-y-10 z-10">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Discover. Copy. Create.<br />
              <span className="text-primary">AI Prompts</span> That Inspire
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-foreground/60 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Explore thousands of high-quality AI prompts for Midjourney, ChatGPT, 
              DALL-E and more. Copy, customize and bring your ideas to life.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-5"
          >
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95">
              <Rocket className="w-5 h-5" />
              Explore Prompts
            </button>
            <button className="bg-foreground/5 border border-border hover:bg-foreground/10 text-foreground px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:border-foreground/20">
              <Grid className="w-5 h-5" />
              Browse Categories
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap items-center gap-10 pt-4"
          >
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">50K+</span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Prompts</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Grid className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">120+</span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Categories</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">10K+</span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Members</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">2M+</span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Copies</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Stack */}
        <div className="flex-1 relative flex items-center justify-center lg:justify-end py-20 lg:py-0 w-full">
          <div className="relative w-full max-w-[500px]">
            {/* Background images fan (Hidden on Mobile/Tablet) */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 15 }}
              animate={{ opacity: 0.4, x: -60, rotate: -12 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-[240px] md:w-[300px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-0 hidden lg:block"
            >
              <img src="/images/hero/cyberpunk.png" className="w-full h-full object-cover" alt="Cyberpunk" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 15 }}
              animate={{ opacity: 0.4, x: 60, rotate: 12 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[240px] md:w-[300px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-0 hidden lg:block"
            >
              <img src="/images/hero/elven.png" className="w-full h-full object-cover" alt="Elven" />
            </motion.div>

            {/* Main Center Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
            >
              <img 
                src="/images/hero/fantasy.png" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Main Fantasy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Featured Badge */}
              <div className="absolute top-8 left-8 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Featured</span>
              </div>

              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-background/80 backdrop-blur-xl border border-border p-5 rounded-[2rem] shadow-2xl flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-foreground/5 border border-border flex items-center justify-center p-2">
                   <img src="/images/hero/fantasy.png" className="w-full h-full object-cover rounded-lg" alt="Mini" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg leading-none mb-1">Fantasy Landscape</h3>
                  <p className="text-foreground/40 text-xs font-medium">Midjourney</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-primary/20 transition-all cursor-pointer">
                  <Rocket className="w-5 h-5" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
