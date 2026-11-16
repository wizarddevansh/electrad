"use client";

import React, { useState } from "react";
import {
  Wind,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils";

export function CompressorLeakCard() {
  const [showFormula, setShowFormula] = useState(false);

  const onLoadTimeSec = 14.2;
  const offLoadTimeSec = 38.6;
  const totalCycle = onLoadTimeSec + offLoadTimeSec;
  const leakPercentage = (onLoadTimeSec / totalCycle) * 100;

  const estimatedAnnualWasteKwh = 25694;
  const tariffRate = 8.5;
  const annualRupeeWaste = estimatedAnnualWasteKwh * tariffRate;
  const annualCo2Tonnes = (estimatedAnnualWasteKwh * 0.71) / 1000;

  return (
    <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1C2E25] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#F4F7F5]">
                BEE Standard Compressor Leak Detection
              </h3>
              <span className="rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 text-[10px] font-mono text-[#F59E0B]">
                LEAK ANOMALY
              </span>
            </div>
            <p className="text-xs text-[#94A39B]">
              Automated on-load vs. off-load duty-cycle analysis conducted during unstaffed breaks without production shutdowns.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1C2E25] bg-[#0A110E] px-3 py-1.5 text-xs text-[#94A39B] hover:text-[#F4F7F5] transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5 text-[#10B981]" />
          <span>{showFormula ? "Hide Formula" : "View BEE Standard Formula"}</span>
        </button>
      </div>

      {/* Formula Explanation */}
      {showFormula && (
        <div className="mt-4 rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4 text-xs text-[#94A39B] font-mono leading-relaxed">
          <div className="text-xs font-bold text-[#F4F7F5] font-sans mb-1">
            Bureau of Energy Efficiency (BEE) Compressor Audit Standard:
          </div>
          <div className="rounded bg-[#101B16] p-2.5 my-2 text-[#F59E0B]">
            Leakage Ratio % (L) = [ T / (T + t) ] × 100
          </div>
          <p className="text-[11px] font-sans">
            Where <strong>T</strong> = Compressor operating time on load, and <strong>t</strong> = Operating time off load.
            Traditional audits mandate weekend plant shutdowns. Electrad isolates unstaffed break windows automatically via edge telemetry to compute this metric continuously.
          </p>
        </div>
      )}

      {/* Duty Cycle Breakdown */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4">
          <div className="text-[11px] text-[#94A39B]">On-Load Time (T)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#F59E0B] tabular-nums">
              {onLoadTimeSec}
            </span>
            <span className="text-xs text-[#94A39B]">seconds</span>
          </div>
          <div className="mt-1 text-[10px] text-[#94A39B]">Pumping against air line leaks</div>
        </div>

        <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4">
          <div className="text-[11px] text-[#94A39B]">Off-Load Idling Time (t)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#F4F7F5] tabular-nums">
              {offLoadTimeSec}
            </span>
            <span className="text-xs text-[#94A39B]">seconds</span>
          </div>
          <div className="mt-1 text-[10px] text-[#94A39B]">Unloaded idle draw: 14.8 kW</div>
        </div>

        <div className="rounded-lg border border-[#EF4444]/30 bg-[#0A110E] p-4">
          <div className="text-[11px] text-[#EF4444]">Total Air Leakage Ratio (L)</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-[#EF4444] tabular-nums">
              {leakPercentage.toFixed(1)}%
            </span>
            <span className="text-xs text-[#EF4444]">of capacity</span>
          </div>
          <div className="mt-1 text-[10px] text-[#EF4444]/80">
            Acceptable industry threshold: &lt; 10%
          </div>
        </div>
      </div>

      {/* Financial Impact */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4">
        <div className="space-y-0.5">
          <div className="text-xs text-[#94A39B]">
            Estimated Preventable Loss at Current Leak Velocity:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold font-mono text-[#10B981] tabular-nums">
              {formatINR(annualRupeeWaste)} / year
            </span>
            <span className="text-xs text-[#94A39B]">•</span>
            <span className="text-xs font-mono text-[#10B981] tabular-nums">
              {formatNumber(annualCo2Tonnes)} Tonnes CO₂ / year
            </span>
          </div>
        </div>

        <a
          href="https://jitmap.org/files/reports/Compressed-air-system-for-forging-2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#94A39B] hover:text-[#10B981] inline-flex items-center gap-1"
        >
          <span>JITMAP Compressed Air Study Reference</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
