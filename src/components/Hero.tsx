"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  TrendingDown,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#22C55E]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-48 -z-10 h-96 w-96 rounded-full bg-[#15803D]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Award Badge & Founder attribution */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3529] bg-[#122019]/80 px-3.5 py-1.5 text-xs font-medium text-[#4ADE80] shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
            <span>National Startup Awards (NSA) 6.0</span>
            <span className="text-[#1E3529]">•</span>
            <span className="text-[#94A3B8]">Young Changemakers (Green & Blue Economy)</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#1E3529] bg-[#122019]/50 px-3 py-1.5 text-xs text-[#94A3B8]">
            <span>By <strong className="font-semibold text-[#F8FAFC]">Devansh Patel</strong></span>
            <span className="text-xs text-[#4ADE80]/80">(Founder, WizoupWorks)</span>
          </div>
        </div>

        {/* Main Title & Value Prop */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-6xl md:text-7xl">
            Stop Operating{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#86EFAC]">
              Energy-Blind
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#94A3B8] sm:text-xl md:text-2xl">
            Non-invasive <strong className="text-[#F8FAFC] font-medium">CT clamp + ESP32 monitoring</strong> with a{" "}
            <strong className="text-[#F8FAFC] font-medium">statistical baseline engine</strong> and{" "}
            <strong className="text-[#4ADE80] font-medium">1-tap floor confirmation</strong> for Indian industries of all scales.
          </p>

          {/* Key Value Pillars */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-[#94A3B8] sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>Zero Factory Downtime (Split-Core Clamps)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>BEE ADEETIE ≥10% Mandate Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
              <span>Outcome-Aligned SaaS (% of Verified Savings)</span>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#22C55E] px-8 py-4 text-base font-bold text-[#0B1410] shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all duration-200 hover:bg-[#4ADE80] hover:shadow-[0_0_40px_rgba(74,222,128,0.55)] sm:w-auto"
            >
              <Activity className="h-5 w-5 stroke-[2.5]" />
              <span>Launch Live Demo Dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/#pilot"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1E3529] bg-[#122019] px-7 py-4 text-base font-semibold text-[#F8FAFC] transition-all duration-200 hover:border-[#22C55E]/60 hover:bg-[#16281F] sm:w-auto"
            >
              <Cpu className="h-4 w-4 text-[#4ADE80]" />
              <span>Request Pilot Setup</span>
            </Link>
          </div>
        </div>

        {/* Live Telemetry Teaser Card */}
        <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-[#1E3529] bg-[#122019] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1E3529] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-3 w-3 items-center justify-center">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#F8FAFC]">
                  Simulated Industrial Edge Telemetry
                </span>
                <span className="rounded bg-[#0B1410] px-2 py-0.5 text-[10px] font-mono font-medium text-[#4ADE80]">
                  ESP32 NODE #01 (MSME FORGING)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#22C55E]" /> Live 1-sec sampling
              </span>
              <span className="text-[#1E3529]">|</span>
              <span className="text-[#4ADE80]">RMS 415V 3-Phase</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
              <div className="text-[11px] font-medium text-[#94A3B8]">Main Incomer Draw</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#F8FAFC]">142.8</span>
                <span className="text-xs text-[#4ADE80]">kW</span>
              </div>
              <div className="mt-1 text-[10px] text-[#94A3B8]">PF: 0.96 (Capacitor OK)</div>
            </div>

            <div className="rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
              <div className="text-[11px] font-medium text-[#94A3B8]">Statistical Idle Floor</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-amber-400">18.4</span>
                <span className="text-xs text-amber-400">kW</span>
              </div>
              <div className="mt-1 text-[10px] text-amber-400/80">32% above off-shift baseline</div>
            </div>

            <div className="rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
              <div className="text-[11px] font-medium text-[#94A3B8]">Air Compressor Leak</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-rose-400">26.9%</span>
                <span className="text-xs text-rose-400">duty</span>
              </div>
              <div className="mt-1 text-[10px] text-rose-400/80">Off-load cycling detected</div>
            </div>

            <div className="rounded-xl border border-[#22C55E]/40 bg-[#122019] p-3.5 shadow-[inset_0_0_15px_rgba(34,197,94,0.1)]">
              <div className="text-[11px] font-medium text-[#4ADE80]">Verified Savings Potential</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#22C55E]">₹1.48 L</span>
                <span className="text-xs text-[#94A3B8]">/month</span>
              </div>
              <div className="mt-1 text-[10px] text-[#4ADE80]">
                <TrendingDown className="inline h-3 w-3 mr-0.5" /> 11.2 Tonnes CO₂/mo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
