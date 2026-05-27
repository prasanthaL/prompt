import React, { Suspense } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { getPromptById } from "@/lib/json-db";
import DashboardClient from "./DashboardClient";

interface PageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const editId = params.edit;
  let editPrompt = null;

  if (editId) {
    editPrompt = await getPromptById(editId);
  }

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Admin Dashboard</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </nav>

      <Suspense fallback={<div className="pt-40 text-center text-white/40">Loading dashboard...</div>}>
        <DashboardClient editPrompt={editPrompt} />
      </Suspense>
    </main>
  );
}
