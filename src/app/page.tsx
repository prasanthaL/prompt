"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilters from "@/components/CategoryFilters";
import PromptCard from "@/components/PromptCard";
import StatsSection from "@/components/StatsSection";
import { 
  ArrowRight, 
  Search, 
} from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";

const initialPrompts = [
  {
    id: "p1",
    slug: "cyberpunk-city-p1",
    title: "Cyberpunk City",
    category: "Sci-Fi",
    author: "ai_artist",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
    views: 12500,
    likes: 2100,
    isPremium: false,
    fullPrompt: "A high-detail cyberpunk city street at night, neon lights reflecting in puddles, cinematic lighting, ultra-realistic, 8k resolution, futuristic cars, dense atmosphere --ar 16:9 --v 6.0",
  },
  {
    id: "p2",
    slug: "elven-princess-p2",
    title: "Elven Princess",
    category: "Fantasy",
    author: "dreamweaver",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    views: 8700,
    likes: 1800,
    isPremium: true,
    fullPrompt: "Portrait of a beautiful elven princess, wearing silver crown and emerald robes, mystical forest background, ethereal glow, masterpiece, soft lighting --v 6.0",
  },
  {
    id: "p3",
    slug: "astronaut-on-mars-p3",
    title: "Astronaut on Mars",
    category: "Realism",
    author: "space_creator",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000&auto=format&fit=crop",
    views: 6300,
    likes: 1200,
    isPremium: false,
    fullPrompt: "Cinematic shot of an astronaut standing on the surface of Mars, red dusty landscape, earth visible in the distant sky, highly detailed space suit, realistic lighting --ar 3:2 --v 6.0",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbPrompts, setDbPrompts] = useState<any[]>([]);
  const [localSearch, setLocalSearch] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDbPrompts = async () => {
      try {
        const res = await fetch("/api/admin/prompts");
        if (res.ok) {
          const data = await res.json();
          setDbPrompts(data);
        }
      } catch (err) {
        console.error("Failed to fetch prompts");
      }
    };
    fetchDbPrompts();
  }, []);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(`/browse?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const allVisiblePrompts = [...dbPrompts, ...initialPrompts];

  const filteredPrompts = activeCategory === "all" 
    ? allVisiblePrompts 
    : allVisiblePrompts.filter(p => p.category === activeCategory);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);


  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      
      <div className="pt-2">
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <form onSubmit={handleSearch} className="relative group lg:hidden mb-8">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
           <input
             type="text"
             placeholder="Search prompts, categories, styles..."
             value={localSearch}
             onChange={(e) => setLocalSearch(e.target.value)}
             className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
           />
        </form>

        <CategoryFilters 
          activeCategory={activeCategory} 
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }} 
        />
      </div>

      <section id="prompts-section" className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-2 h-10 bg-primary rounded-full"></span>
              Featured Prompts
            </h2>
            <p className="text-foreground/40 text-sm">Handpicked premium prompts from our community</p>
          </div>
          <button 
            onClick={() => router.push("/browse")}
            className="hidden sm:flex items-center gap-2 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 px-6 py-3 rounded-xl border border-border transition-all text-foreground"
          >
            Browse All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedPrompts.length > 0 ? (
            displayedPrompts.map((prompt, i) => (
              <div key={prompt.id || i}>
                 <PromptCard 
                   {...prompt} 
                 />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
               <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-foreground/20" />
               </div>
               <h3 className="text-xl font-bold text-foreground">No prompts found</h3>
               <p className="text-foreground/40">Try selecting a different category or search term.</p>
            </div>
          )}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          scrollTargetId="prompts-section"
        />
      </section>

      <StatsSection />

      <footer className="py-20 px-4 md:px-8 border-t border-border">
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li onClick={() => router.push("/browse")} className="hover:text-foreground cursor-pointer transition-colors">Browse Prompts</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Categories</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-2 text-sm text-foreground/40">
                <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/20">
          <p>© 2024 PromptVault. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
