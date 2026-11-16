"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PilotForm } from "@/components/PilotForm";
import { Footer } from "@/components/Footer";
import { ShieldCheck, CheckCircle2, Clock, Zap } from "lucide-react";

export default function PilotPage() {
  return (
    <div className="min-h-screen bg-[#0B1410] text-[#F8FAFC]">
      <Navbar />

      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3529] bg-[#122019] px-3.5 py-1 text-xs font-semibold text-[#4ADE80]">
            <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
            <span>National Startup Awards (NSA) 6.0 Feasibility Pilot</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-5xl">
            Deploy an Electrad On-Site Pilot
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-[#94A3B8]">
            30-day non-invasive trial on up to 3 major plant feeders. Zero plant shutdown. Discover your exact idle baseline and compressed air leak losses.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>10-Minute Split-Core Clamping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>Zero Wire Splicing or Disruption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>Outcome-Aligned (% of Verified Savings)</span>
            </div>
          </div>
        </div>

        <PilotForm />
      </main>

      <Footer />
    </div>
  );
}
