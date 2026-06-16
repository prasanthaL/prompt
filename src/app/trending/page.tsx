import React from "react";
import { getTrendingPrompts, getAllPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import TrendingClient from "./TrendingClient";

export const metadata = {
  title: "Trending AI Prompts — Most Popular This Week",
  description:
    "Discover the most viewed and liked AI prompts trending in the community right now. Browse ChatGPT, Gemini, Midjourney, and more.",
};

const INITIAL_COUNT = 12;

export default async function TrendingPage() {
  // Fetch all trending prompts server-side for total count & SSR of first batch.
  // getAllPrompts reads directly from src/data/prompts/*.json — no API route.
  const [allTrending, allPrompts] = await Promise.all([
    getTrendingPrompts(1000),
    getAllPrompts(),
  ]);

  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      <TrendingClient
        initialPrompts={allTrending.slice(0, INITIAL_COUNT)}
        allTrendingPrompts={allTrending}
        totalPrompts={allPrompts.length}
      />
    </main>
  );
}
