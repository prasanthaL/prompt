import React from "react";
import { Sparkles, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllBlogs } from "@/lib/json-db";
import ManageBlogsClient from "./ManageBlogsClient";

export default async function ManageBlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen mesh-gradient pb-32 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PromptVault Admin</span>
            </Link>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/admin/dashboard" className="text-white/60 hover:text-white transition-colors">
                Upload Prompt
              </Link>
              <Link href="/admin/prompts" className="text-white/60 hover:text-white transition-colors">
                Manage Prompts
              </Link>
              <Link href="/admin/blogs" className="text-primary border-b-2 border-primary pb-1">
                Manage Blogs
              </Link>
            </div>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </nav>

      <ManageBlogsClient initialBlogs={blogs} />
    </main>
  );
}
