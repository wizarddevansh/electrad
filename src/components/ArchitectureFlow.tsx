"use client";

import React, { useState } from "react";
import {
  Radio,
  Cpu,
  Wifi,
  BarChart3,
  CheckSquare,
  FileSpreadsheet,
  ArrowRight,
  Gauge,
  Signal,
  FileCheck,
  Activity,
  Layers,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export function ArchitectureFlow() {
  const [activeTab, setActiveTab] = useState<"poc" | "phase2">("poc");

  const pocCards = [
    {
      step: "01",
      title: "Clip-On CT Clamp",
      subtitle: "Non-Invasive Sensing",
      desc: "Split-core current transformer clips over machine feeder cables. Fast clamp-on installation with zero cable cutting, zero busbar alteration, and zero plant downtime.",
      tag: "Edge Physical",
      icon: Radio,
    },
    {
      step: "02",
      title: "ESP32 Edge Node",
      subtitle: "RMS Current Sampling",
      desc: "Dual-core microcontroller sampling at high rate to calculate true RMS current (I_rms), applying configured nominal voltage and active noise filtration on-chip.",
      tag: "Edge Compute",
      icon: Cpu,
    },
    {
      step: "03",
      title: "Wi-Fi Telemetry",
      subtitle: "1-Minute Data Packets",
      desc: "Streams lightweight MQTT telemetry packets (kW draw, cumulative kWh, timestamp) to the cloud dashboard with local flash buffering during connection drops.",
      tag: "Telemetry Bus",
      icon: Wifi,
    },
    {
      step: "04",
      title: "Statistical Baseline Engine",
      subtitle: "Idle & BEE Leak Algorithms",
      desc: "Learns the rolling median off-shift idle floor for each feeder line and isolates non-operational break windows to calculate BEE on-load vs. off-load leak ratios.",
      tag: "Core Engine",
      icon: BarChart3,
    },
    {
      step: "05",
      title: "1-Tap Floor Confirm Loop",
      subtitle: "Human-in-the-Loop Validation",
      desc: "Enables floor supervisors to classify flagged anomalies as planned overtime vs. confirmed idle waste with 1 tap, eliminating noisy false positives.",
      tag: "Verification",
      icon: CheckSquare,
    },
    {
      step: "06",
      title: "Verified Savings Ledger",
      subtitle: "Rupees & CEA Carbon Proof",
      desc: "Audits confirmed waste reductions in real time, calculating avoided kWh, rupee savings adjusted for state DISCOM tariffs, and CEA-certified CO₂ avoidance (0.710 kg/kWh).",
      tag: "Audit Ledger",
      icon: FileSpreadsheet,
    },
  ];

  const phase2Cards = [
    {
      step: "01",
      title: "Multi-Feeder 3-Phase Sensing",
      subtitle: "Full Voltage & THD Vector",
      desc: "Direct 3-phase line-to-line voltage monitoring, true real-time power factor cos(φ), and total harmonic distortion (THD) tracking across up to 32 feeders per panel.",
      tag: "Phase 2 Hardware",
      icon: Gauge,
    },
    {
      step: "02",
      title: "Industrial GSM / 4G Failover",
      subtitle: "Dual Cellular + Flash Buffer",
      desc: "Cellular multi-carrier eSIM fallback ensuring uninterrupted edge telemetry even when plant-wide industrial Wi-Fi or broadband networks experience outages.",
      tag: "Phase 2 Network",
      icon: Signal,
    },
    {
      step: "03",
      title: "Automated BEE ADEETIE M&V",
      subtitle: "Audit-Ready Compliance Export",
      desc: "One-click generation of Bureau of Energy Efficiency standard Measurement & Verification (M&V) reports demonstrating verified ≥10% cluster savings.",
      tag: "Phase 2 Compliance",
      icon: FileCheck,
    },
    {
      step: "04",
      title: "Predictive Motor & Bearing Drift",
      subtitle: "High-Resolution Signature Analysis",
      desc: "Current signature analysis (MCSA) flags rotor imbalance, stator degradation, and bearing mechanical wear weeks before catastrophic motor burnout.",
      tag: "Phase 2 Diagnostics",
      icon: Activity,
    },
    {
      step: "05",
      title: "Multi-Plant Cluster Benchmarking",
      subtitle: "Specific Energy Consumption (SEC)",
      desc: "Compares specific energy consumption (SEC in kWh/tonne) across production lines, sibling plants, and regional cluster benchmarks.",
      tag: "Phase 2 Enterprise",
      icon: Layers,
    },
    {
      step: "06",
      title: "Carbon Credit (CCTS) Export",
      subtitle: "Scope 2 Decarbonization Registry",
      desc: "Cryptographically verified emission reduction ledgers ready for submission under India's Carbon Credit Trading Scheme (CCTS) and CEA baseline factors.",
      tag: "Phase 2 Carbon Ledger",
      icon: Sparkles,
    },
  ];

  const activeCards = activeTab === "poc" ? pocCards : phase2Cards;

  return (
    <section id="how-it-works" className="relative bg-[#0A110E] py-20 border-b border-[#1C2E25]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
              Architecture & Data Flow
            </span>
            <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#F4F7F5] sm:text-4xl">
              6-Step Energy Intelligence Pipeline
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm text-[#94A39B]">
              From non-invasive clamp telemetry to verified financial and carbon audit reports — engineered specifically for Indian manufacturing panels.
            </p>
          </div>

          {/* 2-Tab Mutually Exclusive Toggle */}
          <div className="inline-flex rounded-xl border border-[#1C2E25] bg-[#101B16] p-1 self-start md:self-end">
            <button
              type="button"
              onClick={() => setActiveTab("poc")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "poc"
                  ? "bg-[#10B981] text-[#0A110E]"
                  : "text-[#94A39B] hover:text-[#F4F7F5]"
              }`}
            >
              Current PoC Architecture
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("phase2")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "phase2"
                  ? "bg-[#10B981] text-[#0A110E]"
                  : "text-[#94A39B] hover:text-[#F4F7F5]"
              }`}
            >
              Phase 2 Scale-Out (Future Roadmap)
            </button>
          </div>
        </div>

        {/* Tab Status Bar */}
        <div className="mb-8 rounded-xl border border-[#1C2E25] bg-[#101B16] px-4 py-3 text-xs text-[#94A39B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#F4F7F5]">
              {activeTab === "poc" ? "Active Proof-of-Concept Topology:" : "Phase 2 Industrial Scale-Out Architecture:"}
            </span>
            <span>
              {activeTab === "poc"
                ? "Split-core CT clamp + ESP32 edge microcontroller + statistical idle algorithms + 1-tap floor confirm."
                : "3-Phase direct sensing, GSM failover, automated BEE ADEETIE compliance reports, and motor drift diagnostics."}
            </span>
          </div>
          <span className="hidden sm:inline-block rounded bg-[#0A110E] px-2.5 py-0.5 text-[10px] font-mono text-[#10B981]">
            {activeTab === "poc" ? "POC SCOPE" : "FUTURE ROADMAP"}
          </span>
        </div>

        {/* 6 Replaced Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                className="flex flex-col justify-between rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 transition-all hover:border-[#2A4739]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#10B981]">
                      STEP {card.step}
                    </span>
                    <span className="rounded bg-[#0A110E] px-2 py-0.5 text-[10px] font-mono text-[#94A39B]">
                      {card.tag}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#1C2E25] bg-[#0A110E] text-[#10B981]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F4F7F5]">
                        {card.title}
                      </h3>
                      <div className="text-xs text-[#94A39B]">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-[#94A39B]">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#1C2E25] pt-3 flex items-center justify-between text-[11px] text-[#94A39B]">
                  <span>{activeTab === "poc" ? "Edge Pipeline Component" : "Enterprise Roadmap Module"}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#10B981]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
