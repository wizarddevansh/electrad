import React from "react";
import { Factory, Wind, Target, Leaf, ExternalLink } from "lucide-react";

export function VerifiedDataStrip() {
  const stats = [
    {
      icon: Factory,
      highlight: "42% Industrial Share",
      headline: "of India's 15,43,000 GWh Electricity",
      description:
        "Industrial manufacturing is the single largest consumer of grid electricity in India, making energy waste reduction the highest-leverage decarbonization lever.",
      source: "MoSPI Energy Statistics India 2025",
      badge: "National Demand",
    },
    {
      icon: Target,
      highlight: "60 Phase-1 Clusters",
      headline: "14 Sectors Under BEE ADEETIE Mandate",
      description:
        "The Bureau of Energy Efficiency's ADEETIE initiative enforces ≥10% verified energy savings across MSME manufacturing hubs to remain competitive and compliant.",
      source: "PIB & Bureau of Energy Efficiency (BEE)",
      badge: "Regulatory Mandate",
    },
    {
      icon: Wind,
      highlight: "5–35% Factory Power",
      headline: "Consumed by Compressed Air with ~30% Waste",
      description:
        "Pneumatic systems are the 4th industrial utility. Undetected line leaks and unoptimized loading cycles represent ~30% avoidable electrical loss in typical plants.",
      source: "IGES / JITMAP Energy Benchmarks",
      badge: "Critical Waste Vector",
    },
    {
      icon: Leaf,
      highlight: "0.710 kg CO₂ / kWh",
      headline: "India Grid Emission Factor Baseline",
      description:
        "Every 1,000 kWh of industrial electricity saved eliminates 710 kg of carbon emissions, directly feeding verified ESG reporting and carbon credit claims.",
      source: "CEA CO₂ Baseline Database v21.0 (2024–25)",
      badge: "Carbon Multiplier",
    },
  ];

  return (
    <section id="data-strip" className="relative border-y border-[#1E3529] bg-[#0B1410] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4ADE80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
              Ground-Truth Industrial Realities
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
              Backed by Verified Indian Energy Data
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#94A3B8] md:text-right">
            Every metric monitored by Electrad is anchored in official Indian regulatory frameworks and national baseline registries.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-[#1E3529] bg-[#122019] p-6 transition-all duration-300 hover:border-[#22C55E]/60 hover:shadow-[0_4px_25px_rgba(34,197,94,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#1E3529] bg-[#0B1410] text-[#4ADE80] transition-colors group-hover:bg-[#22C55E] group-hover:text-[#0B1410]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[#1E3529] bg-[#0B1410] px-2.5 py-0.5 text-[10px] font-medium text-[#94A3B8]">
                      {stat.badge}
                    </span>
                  </div>

                  <div className="mt-5">
                    <span className="text-2xl font-extrabold tracking-tight text-[#F8FAFC] group-hover:text-[#4ADE80] transition-colors">
                      {stat.highlight}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-[#F8FAFC]/90">
                      {stat.headline}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                      {stat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#1E3529]/60 pt-3">
                  <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span className="font-mono">Footnote Source:</span>
                    <span className="font-semibold text-[#4ADE80]/90 text-right truncate ml-2">
                      {stat.source}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
