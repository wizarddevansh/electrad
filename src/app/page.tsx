"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VerifiedDataStrip } from "@/components/VerifiedDataStrip";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BusinessModel } from "@/components/BusinessModel";
import { PilotForm } from "@/components/PilotForm";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [estimatedBill, setEstimatedBill] = useState<number | undefined>(undefined);
  const [estimatedSavings, setEstimatedSavings] = useState<number | undefined>(undefined);

  const handleSelectEstimate = (bill: number, savings: number) => {
    setEstimatedBill(bill);
    setEstimatedSavings(savings);
  };

  return (
    <div className="min-h-screen bg-[#0B1410] text-[#F8FAFC]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Verified Indian Data Strip */}
        <VerifiedDataStrip />

        {/* 6-Step Industrial Waste Architecture Flow */}
        <ArchitectureFlow />

        {/* Interactive Savings & CO2 Calculator */}
        <SavingsCalculator onSelectEstimate={handleSelectEstimate} />

        {/* 2-Part Transparent Industrial Business Model */}
        <BusinessModel />

        {/* Pilot Onboarding Form */}
        <PilotForm
          initialBill={estimatedBill}
          initialSavings={estimatedSavings}
        />
      </main>

      <Footer />
    </div>
  );
}
