"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  TrendingDown,
  Info,
} from "lucide-react";

export function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 md:pt-36 md:pb-28">
      {/* Subtle Ambient Industrial Backdrop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-[#10B981]/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Pill */}
        <div className="flex items-center justify-center pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1C2E25] bg-[#101B16] px-3.5 py-1 text-xs font-medium text-[#10B981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]"></span>
            <span>Machine-Level Industrial Energy Intelligence</span>
          </div>
        </div>

        {/* Title & Core Value Proposition */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F4F7F5] sm:text-6xl md:text-7xl">
            Stop Operating{" "}
            <span className="text-[#10B981]">
              Energy-Blind
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-[#94A39B] sm:text-xl md:text-2xl font-normal max-w-3xl mx-auto">
            Non-invasive <strong className="text-[#F4F7F5] font-medium">CT clamp + ESP32 monitoring</strong> with a{" "}
            <strong className="text-[#F4F7F5] font-medium">statistical baseline engine</strong> and{" "}
            <strong className="text-[#10B981] font-medium">1-tap floor confirmation</strong> for Indian industries of all scales.
          </p>

          {/* Four Key Architectural Pillars */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-[#94A39B] sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>Zero Factory Downtime (Clip-On CTs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>Supports BEE ADEETIE ≥10% Savings (FY 2025–28)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>False-Alarm Suppression via 1-Tap Operator Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>Outcome-Aligned SaaS (% of Verified Savings)</span>
            </div>
          </div>

          {/* Clean Dual CTAs: Launch Dashboard & Explore Architecture */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-7 py-3.5 text-sm font-semibold text-[#0A110E] transition-all hover:bg-[#059669] sm:w-auto"
            >
              <Activity className="h-4 w-4" />
              <span>Launch Live PoC Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#how-it-works"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#1C2E25] bg-[#101B16] px-6 py-3.5 text-sm font-medium text-[#F4F7F5] transition-all hover:border-[#2A4739] hover:bg-[#14231C] sm:w-auto"
            >
              <Layers className="h-4 w-4 text-[#10B981]" />
              <span>Explore Architecture Flow</span>
            </Link>
          </div>
        </div>

        {/* Illustrative Telemetry Preview Card */}
        <div className="mt-16 mx-auto max-w-5xl rounded-xl border border-[#1C2E25] bg-[#101B16] p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#1C2E25] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]"></span>
              </span>
              <span className="text-xs font-semibold text-[#F4F7F5]">
                Illustrative Telemetry Data (Concept Simulation Only)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#94A39B]">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#10B981]" /> 1-sec sampling simulation
              </span>
              <span className="text-[#1C2E25]">|</span>
              <span className="text-[#10B981]">415V 3-Phase Model</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
              <div className="text-[11px] font-medium text-[#94A39B]">Simulated Incomer Draw</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#F4F7F5] tabular-nums">142.8</span>
                <span className="text-xs text-[#10B981]">kW</span>
              </div>
              <div className="mt-1 text-[10px] text-[#94A39B]">PF: 0.96 (Nominal Model)</div>
            </div>

            <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
              <div className="text-[11px] font-medium text-[#94A39B]">Statistical Idle Floor</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#F59E0B] tabular-nums">18.4</span>
                <span className="text-xs text-[#F59E0B]">kW</span>
              </div>
              <div className="mt-1 text-[10px] text-[#F59E0B]/80">32% above shift baseline</div>
            </div>

            <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
              <div className="text-[11px] font-medium text-[#94A39B]">Air Compressor Leak</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#EF4444] tabular-nums">26.9%</span>
                <span className="text-xs text-[#EF4444]">duty</span>
              </div>
              <div className="mt-1 text-[10px] text-[#EF4444]/80">BEE on/off-load ratio</div>
            </div>

            <div className="rounded-lg border border-[#10B981]/30 bg-[#101B16] p-3.5">
              <div className="text-[11px] font-medium text-[#10B981]">Projected Savings Potential</div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#10B981] tabular-nums">₹1.48 L</span>
                <span className="text-xs text-[#94A39B]">/month</span>
              </div>
              <div className="mt-1 text-[10px] text-[#94A39B]">
                <TrendingDown className="inline h-3 w-3 mr-0.5 text-[#10B981]" /> 11.2 Tonnes CO₂/mo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
