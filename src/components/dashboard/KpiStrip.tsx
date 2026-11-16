"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  IndianRupee,
  Leaf,
  TrendingDown,
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
      {/* 1. Monitored Load */}
      <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-5 transition-all hover:border-[#2A4739]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#94A39B]">
            Today's Monitored Load
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0A110E] text-[#10B981]">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#F4F7F5] tabular-nums">
            {formatNumber(currentKw)}
          </span>
          <span className="text-xs font-semibold text-[#10B981]">kW</span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#94A39B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]"></span>
          <span>Combined 3-feeder instantaneous draw</span>
        </div>
      </div>

      {/* 2. Flagged Idle/Leak Waste */}
      <div className="rounded-xl border border-[#F59E0B]/30 bg-[#101B16] p-5 transition-all hover:border-[#F59E0B]/60">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#F59E0B]">
            Flagged Idle/Leak Waste (Today)
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#F59E0B] tabular-nums">
            {formatNumber(flaggedWasteKwh)}
          </span>
          <span className="text-xs font-mono text-[#F59E0B]">kWh</span>
          <span className="text-xs text-[#94A39B]">
            ({formatINR(flaggedWasteRupees)})
          </span>
        </div>

        <div className="mt-2 text-xs text-[#94A39B]">
          <span className="text-[#F59E0B] font-medium">Pending verification</span> in 1-tap floor loop
        </div>
      </div>

      {/* 3. Verified Monthly Savings */}
      <div
        className={`rounded-xl border bg-[#101B16] p-5 transition-all duration-300 ${
          isPulsingSavings
            ? "border-[#10B981] ring-1 ring-[#10B981]"
            : "border-[#10B981]/40 hover:border-[#10B981]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#10B981]">
            Verified Monthly Savings
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]">
            <IndianRupee className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#10B981] tabular-nums">
            {formatINR(verifiedMonthlySavingsRupees)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-[#10B981]">
          <TrendingDown className="h-3.5 w-3.5" />
          <span>Audit-confirmed rupee waste eliminated</span>
        </div>
      </div>

      {/* 4. Verified CO₂ Avoided */}
      <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-5 transition-all hover:border-[#2A4739]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#94A39B]">
            Verified CO₂ Avoided
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0A110E] text-[#10B981]">
            <Leaf className="h-4 w-4 text-[#10B981]" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-mono text-[#F4F7F5] tabular-nums">
            {formatNumber(verifiedCo2Kg)}
          </span>
          <span className="text-xs font-mono text-[#10B981]">kg CO₂</span>
        </div>

        <div className="mt-2 text-xs text-[#94A39B]">
          <span className="text-[#10B981] font-mono">0.710 kg/kWh</span> CEA Baseline v21.0
        </div>
      </div>
    </div>
  );
}
