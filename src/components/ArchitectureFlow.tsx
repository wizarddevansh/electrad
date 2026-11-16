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
  ShieldAlert,
  Sparkles,
  Layers,
} from "lucide-react";

export function ArchitectureFlow() {
  const [activeTab, setActiveTab] = useState<"poc" | "phase2">("poc");

  const steps = [
    {
      num: "01",
      title: "Split-Core CT Clamps",
      subtitle: "Non-Invasive Sensing",
      icon: Radio,
      pocDetail: "100A–600A split-core current transformers clip over existing incoming busbars or motor cable runs. Zero plant shutdown or busbar cutting.",
      phase2Detail: "High-accuracy Rogowski coils for tight switchgear enclosures and multi-feeder branch cabinets up to 3200A.",
      tag: "Edge Physical",
    },
    {
      num: "02",
      title: "ESP32 Edge Node",
      subtitle: "High-Rate ADC Sampling",
      icon: Cpu,
      pocDetail: "Dual-core ESP32 sampling at 2 kHz to calculate true RMS current (I_rms) and apparent load, filtering electrical noise locally.",
      phase2Detail: "Edge ML anomaly inference on microcontroller, 3-phase true power factor cos(φ), and THD harmonic distortion metrics.",
      tag: "Edge Compute",
    },
    {
      num: "03",
      title: "Wi-Fi / GSM Mesh",
      subtitle: "Fail-Safe Industrial Comms",
      icon: Wifi,
      pocDetail: "Factory Wi-Fi with local flash buffering (retains up to 72 hours of telemetry during broadband outages) over lightweight MQTT.",
      phase2Detail: "Industrial LoRaWAN long-range mesh covering 2 km factory floor spans + 4G/5G multi-carrier eSIM fallback.",
      tag: "Telemetry Bus",
    },
    {
      num: "04",
      title: "Statistical Baseline Engine",
      subtitle: "Idle & BEE Leak Algorithms",
      icon: BarChart3,
      pocDetail: "Calculates rolling 7-day median idle floor per machine. Compares compressor on-load vs. off-load duty cycles against BEE standards.",
      phase2Detail: "Multi-parameter shift schedule matching, seasonal thermal corrections, and automated predictive maintenance alerts.",
      tag: "Core Intelligence",
    },
    {
      num: "05",
      title: "1-Tap Floor Confirm",
      subtitle: "Human-in-the-Loop Loop",
      icon: CheckSquare,
      pocDetail: "Instant push to plant manager / supervisor: 'Planned Production' vs 'Confirm Idle Waste'. Zero noisy false positives.",
      phase2Detail: "Automated WhatsApp Bot with voice notes and automated Modbus relays to trip auxiliary idling cooling towers.",
      tag: "Decision Loop",
    },
    {
      num: "06",
      title: "Verified Audit Ledger",
      subtitle: "Rupees & CEA Carbon Proof",
      icon: FileSpreadsheet,
      pocDetail: "Real-time ledger recording confirmed wasted kWh, discom rupee loss stopped, and official CEA 0.710 kg CO₂ avoided.",
      phase2Detail: "BEE ADEETIE audit-ready PDF compliance reports and tokenized carbon credit verification exports.",
      tag: "Outcome Proof",
    },
  ];

  return (
    <section id="architecture" className="relative bg-[#0B1410] py-20 border-b border-[#1E3529]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4ADE80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]"></span>
              End-to-End Pipeline
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
              6-Step Industrial Waste Detection Architecture
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#94A3B8]">
              From non-invasive clamp telemetry to verified financial and carbon audit reports — engineered specifically for Indian MSME switchboards.
            </p>
          </div>

          {/* Scope Selector: PoC vs Phase 2 */}
          <div className="inline-flex rounded-xl border border-[#1E3529] bg-[#122019] p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("poc")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "poc"
                  ? "bg-[#22C55E] text-[#0B1410] shadow-md"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Current PoC Scope</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("phase2")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "phase2"
                  ? "bg-[#22C55E] text-[#0B1410] shadow-md"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Phase 2 Scale-Out</span>
            </button>
          </div>
        </div>

        {/* Scope Indicator Banner */}
        <div className="mb-8 rounded-xl border border-[#1E3529] bg-[#122019]/70 px-4 py-3 text-xs text-[#94A3B8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#F8FAFC]">
              {activeTab === "poc" ? "Active Scope (NSA 6.0 PoC Demonstration):" : "Roadmap (Phase 2 Cluster Deployment):"}
            </span>
            <span>
              {activeTab === "poc"
                ? "Physical non-invasive split-core clamps + ESP32 edge telemetry + real-time statistical idle algorithms."
                : "200+ mesh nodes per plant, multi-carrier eSIM failover, LoRaWAN, and automated relay shutoff control."}
            </span>
          </div>
          <span className="hidden sm:inline-block rounded bg-[#0B1410] px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]">
            {activeTab === "poc" ? "READY FOR PILOT" : "PHASE 2 ROADMAP"}
          </span>
        </div>

        {/* 6 Steps Grid with Flow Connectors */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between rounded-xl border border-[#1E3529] bg-[#122019] p-6 transition-all duration-300 hover:border-[#22C55E]/60 hover:bg-[#15271F]"
              >
                <div>
                  {/* Top Bar with Number & Tag */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#4ADE80]">
                      STEP {step.num}
                    </span>
                    <span className="rounded bg-[#0B1410] px-2 py-0.5 text-[10px] font-mono text-[#94A3B8]">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#1E3529] bg-[#0B1410] text-[#22C55E] group-hover:scale-105 group-hover:bg-[#22C55E] group-hover:text-[#0B1410] transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC]">
                        {step.title}
                      </h3>
                      <div className="text-xs text-[#94A3B8]">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Body Text depending on Active Tab */}
                  <div className="mt-4 rounded-lg bg-[#0B1410]/70 p-3.5 border border-[#1E3529]/60">
                    <div className="text-[11px] font-semibold text-[#4ADE80] uppercase tracking-wide mb-1">
                      {activeTab === "poc" ? "PoC Implementation" : "Phase 2 Expansion"}
                    </div>
                    <p className="text-xs leading-relaxed text-[#94A3B8]">
                      {activeTab === "poc" ? step.pocDetail : step.phase2Detail}
                    </p>
                  </div>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-5 flex items-center justify-between text-[11px] text-[#94A3B8] border-t border-[#1E3529]/50 pt-3">
                  <span>
                    {idx < steps.length - 1 ? `Feeds into Step 0${idx + 2}` : "Continuous Audit Cycle"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#22C55E] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
