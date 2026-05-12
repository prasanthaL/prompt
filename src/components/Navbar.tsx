"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Moon, Sun, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  // Debug theme
  useEffect(() => {
    if (mounted) {
      console.log("Current Theme:", theme, "Resolved:", resolvedTheme);
    }
  }, [theme, resolvedTheme, mounted]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/browse" },
    { name: "Categories", href: "/categories" },
    { name: "Trending", href: "/trending" },
    { name: "Blog", href: "/blog" },
    { name: "Premium", href: "/premium" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled ? "glass-dark border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
            PromptVault
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-foreground/5 border border-foreground/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {mounted && (resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            {!mounted && <div className="w-5 h-5" />}
          </button>
          
          <button
            className="lg:hidden p-2 text-foreground/70 hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-dark border-b border-black/5 dark:border-white/5 p-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative group mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground/70 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
