"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  IndianRupee,
  Leaf,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils";

interface KpiStripProps {
  currentKw: number;
  flaggedWasteKwh: number;
  flaggedWasteRupees: number;
  verifiedMonthlySavingsRupees: number;
  verifiedCo2Kg: number;
  isPulsingSavings?: boolean;
}

export function KpiStrip({
  currentKw,
  flaggedWasteKwh,
  flaggedWasteRupees,
  verifiedMonthlySavingsRupees,
  verifiedCo2Kg,
  isPulsingSavings = false,
}: KpiStripProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Today's Monitored Load */}
      <div className="rounded-2xl border border-[#1E3529] bg-[#122019] p-5 shadow-sm transition-all hover:border-[#22C55E]/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#94A3B8]">
            Today's Monitored Load
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B1410] text-[#4ADE80]">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#F8FAFC]">
            {formatNumber(currentKw)}
          </span>
          <span className="text-sm font-semibold text-[#4ADE80]">kW</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#94A3B8]">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse"></span>
          <span>Combined 3-feeder instantaneous draw</span>
        </div>
      </div>

      {/* 2. Flagged Idle/Leak Waste */}
      <div className="rounded-2xl border border-amber-500/40 bg-[#122019] p-5 shadow-sm transition-all hover:border-amber-500/70">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-300">
            Flagged Idle/Leak Waste (Today)
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-amber-400">
            {formatNumber(flaggedWasteKwh)}
          </span>
          <span className="text-xs font-mono text-amber-300">kWh</span>
          <span className="text-xs text-[#94A3B8]">
            ({formatINR(flaggedWasteRupees)})
          </span>
        </div>

        <div className="mt-2 text-xs text-[#94A3B8]">
          <span className="font-semibold text-amber-400">2 active alerts</span> pending plant floor confirmation
        </div>
      </div>

      {/* 3. Verified Monthly Savings */}
      <div
        className={`rounded-2xl border bg-gradient-to-b from-[#122019] to-[#0D1812] p-5 shadow-sm transition-all duration-300 ${
          isPulsingSavings
            ? "border-[#4ADE80] ring-2 ring-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            : "border-[#22C55E]/40 hover:border-[#22C55E]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#4ADE80]">
            Verified Monthly Savings
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22C55E]/20 text-[#22C55E]">
            <IndianRupee className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#22C55E]">
            {formatINR(verifiedMonthlySavingsRupees)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-[#4ADE80]">
          <TrendingDown className="h-3.5 w-3.5" />
          <span>Audit-confirmed rupee waste eliminated</span>
        </div>
      </div>

      {/* 4. Verified CO₂ Avoided */}
      <div className="rounded-2xl border border-[#1E3529] bg-[#122019] p-5 shadow-sm transition-all hover:border-[#22C55E]/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#94A3B8]">
            Verified CO₂ Avoided
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B1410] text-[#4ADE80]">
            <Leaf className="h-4 w-4 text-[#22C55E]" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#F8FAFC]">
            {formatNumber(verifiedCo2Kg)}
          </span>
          <span className="text-xs font-mono text-[#4ADE80]">kg CO₂</span>
        </div>

        <div className="mt-2 text-xs text-[#94A3B8]">
          <span className="text-[#4ADE80] font-mono">0.710 kg/kWh</span> CEA Baseline v21.0
        </div>
      </div>
    </div>
  );
}
