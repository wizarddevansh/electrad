"use client";

import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export interface FeederData {
  id: string;
  name: string;
  category: string;
  ratedKw: number;
  currentKw: number;
  baselineKw: number;
  phaseR: number;
  phaseY: number;
  phaseB: number;
  voltage: number;
  powerFactor: number;
  status: "normal" | "idle_flagged" | "leak_pattern";
  statusNote: string;
}

export function MachineFeederCard({ feeder }: { feeder: FeederData }) {
  const getStatusBadge = () => {
    switch (feeder.status) {
      case "idle_flagged":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-[#EF4444]/30 bg-[#EF4444]/10 px-2 py-0.5 text-[11px] font-medium text-[#EF4444]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
            Idle Waste Flagged
          </span>
        );
      case "leak_pattern":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-0.5 text-[11px] font-medium text-[#F59E0B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            Air Leak Pattern
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-0.5 text-[11px] font-medium text-[#10B981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            Normal Load
          </span>
        );
    }
  };

  const getBorder = () => {
    switch (feeder.status) {
      case "idle_flagged":
        return "border-[#EF4444]/30 hover:border-[#EF4444]/60";
      case "leak_pattern":
        return "border-[#F59E0B]/30 hover:border-[#F59E0B]/60";
      default:
        return "border-[#1C2E25] hover:border-[#2A4739]";
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border bg-[#101B16] p-5 transition-all ${getBorder()}`}
    >
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A39B]">
              {feeder.category} • RATED {feeder.ratedKw} kW
            </span>
            <h4 className="mt-0.5 text-sm font-semibold text-[#F4F7F5]">
              {feeder.name}
            </h4>
          </div>
          {getStatusBadge()}
        </div>

        {/* Live Draw vs Baseline */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3">
          <div>
            <div className="text-[10px] text-[#94A39B]">Live RMS Draw</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-[#F4F7F5] tabular-nums">
                {formatNumber(feeder.currentKw)}
              </span>
              <span className="text-xs font-semibold text-[#10B981]">kW</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#94A39B]">Idle Baseline Floor</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-[#F59E0B] tabular-nums">
                {formatNumber(feeder.baselineKw)}
              </span>
              <span className="text-xs font-semibold text-[#F59E0B]">kW</span>
            </div>
          </div>
        </div>

        {/* 3-Phase Amperage */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-[#94A39B] mb-1.5 font-mono">
            <span>3-Phase Current (CTs)</span>
            <span>{feeder.voltage}V | PF {feeder.powerFactor}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="rounded border border-[#1C2E25] bg-[#0A110E] p-1.5">
              <span className="block text-[10px] text-[#94A39B]">Phase R</span>
              <span className="text-xs font-semibold text-[#F4F7F5] tabular-nums">
                {feeder.phaseR.toFixed(1)} A
              </span>
            </div>
            <div className="rounded border border-[#1C2E25] bg-[#0A110E] p-1.5">
              <span className="block text-[10px] text-[#94A39B]">Phase Y</span>
              <span className="text-xs font-semibold text-[#F4F7F5] tabular-nums">
                {feeder.phaseY.toFixed(1)} A
              </span>
            </div>
            <div className="rounded border border-[#1C2E25] bg-[#0A110E] p-1.5">
              <span className="block text-[10px] text-[#94A39B]">Phase B</span>
              <span className="text-xs font-semibold text-[#F4F7F5] tabular-nums">
                {feeder.phaseB.toFixed(1)} A
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 border-t border-[#1C2E25] pt-3 text-xs text-[#94A39B]">
        <div className="flex items-start gap-1.5">
          {feeder.status === "normal" ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#10B981] mt-0.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#F59E0B] mt-0.5" />
          )}
          <span className="leading-relaxed text-[11px]">{feeder.statusNote}</span>
        </div>
      </div>
    </div>
  );
}
