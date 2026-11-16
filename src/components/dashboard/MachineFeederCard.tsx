"use client";

import React from "react";
import {
  Radio,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Gauge,
  Zap,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

export interface FeederData {
  id: string;
  name: string;
  category: string;
  ratedKw: number;
  currentKw: number;
  baselineKw: number;
  phaseR: number; // Amps
  phaseY: number; // Amps
  phaseB: number; // Amps
  voltage: number; // Volts
  powerFactor: number;
  status: "normal" | "idle_flagged" | "leak_pattern";
  statusNote: string;
  lastAnomalyDuration?: string;
}

export function MachineFeederCard({ feeder }: { feeder: FeederData }) {
  const getStatusBadge = () => {
    switch (feeder.status) {
      case "idle_flagged":
        return (
          <span className="flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            Idle Waste Flagged
          </span>
        );
      case "leak_pattern":
        return (
          <span className="flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Air Leak Pattern
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4ADE80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            Normal Load
          </span>
        );
    }
  };

  const getCardBorder = () => {
    switch (feeder.status) {
      case "idle_flagged":
        return "border-rose-500/40 hover:border-rose-500";
      case "leak_pattern":
        return "border-amber-500/40 hover:border-amber-500";
      default:
        return "border-[#1E3529] hover:border-[#22C55E]/60";
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border bg-[#122019] p-5 shadow-sm transition-all duration-200 ${getCardBorder()}`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
              {feeder.category} • RATED {feeder.ratedKw} kW
            </span>
            <h4 className="mt-0.5 text-base font-bold text-[#F8FAFC]">
              {feeder.name}
            </h4>
          </div>
          {getStatusBadge()}
        </div>

        {/* Current Draw vs Baseline */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-[#1E3529] bg-[#0B1410] p-3">
          <div>
            <div className="text-[10px] text-[#94A3B8]">Live True RMS Draw</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-mono text-[#F8FAFC]">
                {formatNumber(feeder.currentKw)}
              </span>
              <span className="text-xs font-semibold text-[#4ADE80]">kW</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#94A3B8]">Statistical Idle Floor</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-mono text-amber-400">
                {formatNumber(feeder.baselineKw)}
              </span>
              <span className="text-xs font-semibold text-amber-300">kW</span>
            </div>
          </div>
        </div>

        {/* 3-Phase Amperage Strip */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5">
            <span>3-Phase RMS Current (CT Clamp Data)</span>
            <span className="font-mono text-[#F8FAFC]">{feeder.voltage}V / PF {feeder.powerFactor}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#1E3529] bg-[#0B1410]/80 p-2 text-center">
              <span className="block text-[10px] font-bold text-rose-400">Phase R</span>
              <span className="font-mono text-sm font-bold text-[#F8FAFC]">
                {feeder.phaseR.toFixed(1)} A
              </span>
            </div>

            <div className="rounded-lg border border-[#1E3529] bg-[#0B1410]/80 p-2 text-center">
              <span className="block text-[10px] font-bold text-amber-400">Phase Y</span>
              <span className="font-mono text-sm font-bold text-[#F8FAFC]">
                {feeder.phaseY.toFixed(1)} A
              </span>
            </div>

            <div className="rounded-lg border border-[#1E3529] bg-[#0B1410]/80 p-2 text-center">
              <span className="block text-[10px] font-bold text-sky-400">Phase B</span>
              <span className="font-mono text-sm font-bold text-[#F8FAFC]">
                {feeder.phaseB.toFixed(1)} A
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly note / reason */}
      <div className="mt-4 border-t border-[#1E3529] pt-3 text-xs text-[#94A3B8]">
        <div className="flex items-start gap-1.5">
          {feeder.status === "normal" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22C55E] mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          )}
          <span className="leading-relaxed">{feeder.statusNote}</span>
        </div>
      </div>
    </div>
  );
}
