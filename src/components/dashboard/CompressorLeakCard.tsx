"use client";

import React, { useState } from "react";
import {
  Wind,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  Gauge,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils";

export function CompressorLeakCard() {
  const [showFormulaExplanation, setShowFormulaExplanation] = useState(false);

  // BEE Standard Air Leak calculation parameters
  const onLoadTimeSec = 14.2; // T
  const offLoadTimeSec = 38.6; // t
  const totalCycle = onLoadTimeSec + offLoadTimeSec; // T + t = 52.8s
  const leakPercentage = (onLoadTimeSec / totalCycle) * 100; // 26.89%

  const compressorRatedKw = 55; // 55 kW screw compressor
  const estimatedAnnualWasteKwh = 25694; // kWh lost annually on non-productive cycling
  const tariffRate = 8.5; // ₹/kWh
  const annualRupeeWaste = estimatedAnnualWasteKwh * tariffRate; // ~₹2,18,399
  const annualCo2Tonnes = (estimatedAnnualWasteKwh * 0.71) / 1000; // 18.24 Tonnes

  return (
    <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-[#122019] to-[#0E1A14] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1E3529] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#F8FAFC]">
                BEE Standard Compressor Leak Detection
              </h3>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400">
                ACTIVE LEAK WARNING
              </span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Automated on-load vs. off-load duty-cycle analysis conducted during unstaffed breaks without shutting down plant production.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFormulaExplanation(!showFormulaExplanation)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3529] bg-[#0B1410] px-3 py-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
        >
          <HelpCircle className="h-3.5 w-3.5 text-[#22C55E]" />
          <span>{showFormulaExplanation ? "Hide BEE Formula" : "View BEE Formula"}</span>
        </button>
      </div>

      {/* Formula Explanation Drawer */}
      {showFormulaExplanation && (
        <div className="mt-4 rounded-xl border border-[#1E3529] bg-[#0B1410] p-4 text-xs text-[#94A3B8] font-mono leading-relaxed">
          <div className="text-sm font-bold text-[#F8FAFC] font-sans mb-1">
            Bureau of Energy Efficiency (BEE) Compressor Audit Standard:
          </div>
          <div className="rounded-lg bg-[#122019] p-2.5 my-2 text-amber-300">
            Leakage Ratio % (L) = [ T / (T + t) ] × 100
          </div>
          <p className="text-[11px] font-sans">
            Where <strong>T</strong> = Compressor operating time on load, and <strong>t</strong> = Operating time off load.
            While standard audits require weekend plant shutdowns, Electrad isolates non-operating windows (lunch breaks, shift changes) automatically via edge telemetry to compute this metric 24/7.
          </p>
        </div>
      )}

      {/* Duty Cycle Breakdown Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* On-Load Time */}
        <div className="rounded-xl border border-[#1E3529] bg-[#0B1410] p-4">
          <div className="text-[11px] text-[#94A3B8]">On-Load Operating Time (T)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-amber-400">
              {onLoadTimeSec}
            </span>
            <span className="text-xs text-[#94A3B8]">seconds</span>
          </div>
          <div className="mt-1 text-[10px] text-[#94A3B8]">Pumping against distribution leaks</div>
        </div>

        {/* Off-Load Time */}
        <div className="rounded-xl border border-[#1E3529] bg-[#0B1410] p-4">
          <div className="text-[11px] text-[#94A3B8]">Off-Load Idling Time (t)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#F8FAFC]">
              {offLoadTimeSec}
            </span>
            <span className="text-xs text-[#94A3B8]">seconds</span>
          </div>
          <div className="mt-1 text-[10px] text-[#94A3B8]">Unloaded motor draw: 14.8 kW</div>
        </div>

        {/* Calculated Leakage Ratio */}
        <div className="rounded-xl border border-rose-500/40 bg-[#0B1410] p-4">
          <div className="text-[11px] text-rose-300 font-semibold">Total Air Leakage Ratio (L)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-rose-400">
              {leakPercentage.toFixed(1)}%
            </span>
            <span className="text-xs font-semibold text-rose-300">of capacity</span>
          </div>
          <div className="mt-1 text-[10px] text-rose-300/80">
            Acceptable industry threshold: &lt; 10%
          </div>
        </div>
      </div>

      {/* Financial & Environmental Waste Impact */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-4">
        <div className="space-y-1">
          <div className="text-xs text-[#94A3B8]">
            Estimated Preventable Electrical Loss at Current Leak Velocity:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-bold font-mono text-[#22C55E]">
              {formatINR(annualRupeeWaste)} / year
            </span>
            <span className="text-xs text-[#94A3B8]">•</span>
            <span className="text-sm font-semibold font-mono text-[#4ADE80]">
              {formatNumber(annualCo2Tonnes)} Tonnes CO₂ / year
            </span>
          </div>
        </div>

        <div className="text-xs text-[#94A3B8] text-right">
          <span className="block font-semibold text-[#F8FAFC]">Non-Invasive Verification:</span>
          <span>Zero pressure drops or pipe cutting required</span>
        </div>
      </div>
    </div>
  );
}
