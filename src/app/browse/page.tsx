import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { getAllPrompts } from "@/lib/json-db";
import BrowseClient from "./BrowseClient";

export default async function BrowsePage() {
  const prompts = await getAllPrompts();

  return (
    <main className="min-h-screen mesh-gradient">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-white/40">Loading...</div>}>
        <BrowseClient initialPrompts={prompts} />
      </Suspense>
    </main>
  );
}
