"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VerifiedDataStrip } from "@/components/VerifiedDataStrip";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BusinessModel } from "@/components/BusinessModel";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A110E] text-[#F4F7F5] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Verified Indian Data Strip */}
        <VerifiedDataStrip />

        {/* 6-Step Industrial Waste Architecture Flow */}
        <ArchitectureFlow />

        {/* Interactive Savings & CO2 Impact Simulator */}
        <SavingsCalculator />

        {/* Outcome-Aligned Business Model Concept */}
        <BusinessModel />
      </main>

      <Footer />
    </div>
  );
}
