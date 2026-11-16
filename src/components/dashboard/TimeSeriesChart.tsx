"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  Layers,
  Info,
  Calendar,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface DataPoint {
  time: string;
  loadKw: number;
  baselineIdleKw: number;
  anomaly?: "idle" | "leak";
  note?: string;
}

// 24-hour industrial shift telemetry data (sample hourly intervals)
const COMBINED_DATA: DataPoint[] = [
  { time: "00:00", loadKw: 24.5, baselineIdleKw: 12.0, anomaly: "idle", note: "Night shift auxiliary pump idling" },
  { time: "02:00", loadKw: 22.1, baselineIdleKw: 12.0, anomaly: "idle", note: "Unattended hydraulic motor left powered" },
  { time: "04:00", loadKw: 19.8, baselineIdleKw: 12.0, anomaly: "idle", note: "Off-shift baseline exceedance" },
  { time: "06:00", loadKw: 48.0, baselineIdleKw: 12.0, note: "Shift-1 morning pre-heat start" },
  { time: "08:00", loadKw: 138.4, baselineIdleKw: 12.0, note: "Full production CNC + Press lines" },
  { time: "10:00", loadKw: 154.2, baselineIdleKw: 12.0, note: "Peak machining cycle" },
  { time: "12:00", loadKw: 146.0, baselineIdleKw: 12.0, note: "Stable batch forging" },
  { time: "13:00", loadKw: 68.5, baselineIdleKw: 12.0, anomaly: "leak", note: "Lunch break: Compressor cycling on air leaks" },
  { time: "14:00", loadKw: 149.2, baselineIdleKw: 12.0, note: "Shift-2 production resumed" },
  { time: "16:00", loadKw: 158.0, baselineIdleKw: 12.0, note: "Peak afternoon load" },
  { time: "18:00", loadKw: 132.5, baselineIdleKw: 12.0, note: "Shift-2 changeover" },
  { time: "20:00", loadKw: 88.0, baselineIdleKw: 12.0, note: "Partial evening shift" },
  { time: "22:00", loadKw: 42.0, baselineIdleKw: 12.0, note: "Cleaning & handover" },
];

const COMPRESSOR_DATA: DataPoint[] = [
  { time: "00:00", loadKw: 4.2, baselineIdleKw: 3.5, note: "Off-shift baseline" },
  { time: "02:00", loadKw: 4.0, baselineIdleKw: 3.5 },
  { time: "04:00", loadKw: 4.1, baselineIdleKw: 3.5 },
  { time: "06:00", loadKw: 32.0, baselineIdleKw: 3.5, note: "Pressurization ramp" },
  { time: "08:00", loadKw: 48.5, baselineIdleKw: 3.5, note: "Full demand" },
  { time: "10:00", loadKw: 51.2, baselineIdleKw: 3.5 },
  { time: "12:00", loadKw: 49.0, baselineIdleKw: 3.5 },
  { time: "13:00", loadKw: 28.4, baselineIdleKw: 3.5, anomaly: "leak", note: "Zero production, yet cycling 26.9% duty" },
  { time: "14:00", loadKw: 47.8, baselineIdleKw: 3.5 },
  { time: "16:00", loadKw: 52.0, baselineIdleKw: 3.5 },
  { time: "18:00", loadKw: 44.5, baselineIdleKw: 3.5 },
  { time: "20:00", loadKw: 22.0, baselineIdleKw: 3.5 },
  { time: "22:00", loadKw: 12.5, baselineIdleKw: 3.5, anomaly: "leak", note: "Night line pressure loss" },
];

const CNC_DATA: DataPoint[] = [
  { time: "00:00", loadKw: 8.4, baselineIdleKw: 2.1, anomaly: "idle", note: "Hydraulics idle continuous 8.4 kW" },
  { time: "02:00", loadKw: 8.4, baselineIdleKw: 2.1, anomaly: "idle", note: "No workpiece clamped" },
  { time: "04:00", loadKw: 8.4, baselineIdleKw: 2.1, anomaly: "idle", note: "Flagged idle waste: 48 min" },
  { time: "06:00", loadKw: 18.0, baselineIdleKw: 2.1, note: "Pre-warm" },
  { time: "08:00", loadKw: 42.0, baselineIdleKw: 2.1, note: "Continuous stamping" },
  { time: "10:00", loadKw: 44.8, baselineIdleKw: 2.1 },
  { time: "12:00", loadKw: 41.5, baselineIdleKw: 2.1 },
  { time: "13:00", loadKw: 8.4, baselineIdleKw: 2.1, anomaly: "idle", note: "Operator lunch idle" },
  { time: "14:00", loadKw: 43.0, baselineIdleKw: 2.1 },
  { time: "16:00", loadKw: 45.2, baselineIdleKw: 2.1 },
  { time: "18:00", loadKw: 38.0, baselineIdleKw: 2.1 },
  { time: "20:00", loadKw: 24.0, baselineIdleKw: 2.1 },
  { time: "22:00", loadKw: 8.4, baselineIdleKw: 2.1, anomaly: "idle" },
];

export function TimeSeriesChart() {
  const [selectedFeeder, setSelectedFeeder] = useState<"combined" | "compressor" | "cnc">("combined");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const dataset = useMemo(() => {
    switch (selectedFeeder) {
      case "compressor":
        return COMPRESSOR_DATA;
      case "cnc":
        return CNC_DATA;
      default:
        return COMBINED_DATA;
    }
  }, [selectedFeeder]);

  const maxKw = useMemo(() => {
    const maxVal = Math.max(...dataset.map((d) => d.loadKw));
    return Math.ceil((maxVal * 1.15) / 10) * 10;
  }, [dataset]);

  // SVG dimensions
  const width = 800;
  const height = 300;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Coordinate scales
  const getX = (index: number) => {
    return paddingLeft + (index / (dataset.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    return paddingTop + chartH - (val / maxKw) * chartH;
  };

  // Build SVG path strings
  const pathD = useMemo(() => {
    return dataset.reduce((acc, curr, idx) => {
      const x = getX(idx);
      const y = getY(curr.loadKw);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, "");
  }, [dataset, maxKw]);

  const areaD = useMemo(() => {
    if (!pathD) return "";
    const firstX = getX(0);
    const lastX = getX(dataset.length - 1);
    const baselineY = getY(0);
    return `${pathD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [pathD, dataset]);

  const idleBaselineY = getY(dataset[0]?.baselineIdleKw || 12);

  return (
    <div className="rounded-2xl border border-[#1E3529] bg-[#122019] p-6 shadow-sm">
      {/* Chart Top Controls & Legends */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1E3529] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#F8FAFC]">
              24-Hour Time-Series Load Curve vs. Statistical Baseline
            </h3>
            <span className="rounded bg-[#0B1410] px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]">
              True RMS (kW)
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Dotted line denotes the rolling median off-shift idle floor calculated by the Electrad engine.
          </p>
        </div>

        {/* Feeder Switcher Tabs */}
        <div className="inline-flex rounded-xl border border-[#1E3529] bg-[#0B1410] p-1">
          <button
            type="button"
            onClick={() => setSelectedFeeder("combined")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFeeder === "combined"
                ? "bg-[#22C55E] text-[#0B1410]"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            Combined Incomer
          </button>
          <button
            type="button"
            onClick={() => setSelectedFeeder("compressor")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFeeder === "compressor"
                ? "bg-[#22C55E] text-[#0B1410]"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            Air Compressor #1
          </button>
          <button
            type="button"
            onClick={() => setSelectedFeeder("cnc")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedFeeder === "cnc"
                ? "bg-[#22C55E] text-[#0B1410]"
                : "text-[#94A3B8] hover:text-[#F8FAFC]"
            }`}
          >
            CNC Press Line
          </button>
        </div>
      </div>

      {/* Legend Indicators */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-full bg-[#22C55E]"></span>
          <span className="text-[#F8FAFC] font-medium">Measured Power Draw (kW)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-amber-400"></span>
          <span className="text-amber-300 font-medium">Statistical Idle Baseline Floor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-rose-400">Flagged Waste / Leak Anomaly</span>
        </div>
      </div>

      {/* Interactive SVG Chart Area */}
      <div className="relative mt-4 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
        >
          <defs>
            <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingTop + chartH * pct;
            const kwLabel = Math.round(maxKw * (1 - pct));
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#1E3529"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {kwLabel}
                </text>
              </g>
            );
          })}

          {/* Area fill under curve */}
          <path d={areaD} fill="url(#loadGradient)" />

          {/* Baseline Idle Floor Line (Dotted Amber) */}
          <line
            x1={paddingLeft}
            y1={idleBaselineY}
            x2={width - paddingRight}
            y2={idleBaselineY}
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x={width - paddingRight}
            y={idleBaselineY - 6}
            textAnchor="end"
            fill="#F59E0B"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            BASELINE IDLE: {dataset[0]?.baselineIdleKw} kW
          </text>

          {/* Main Load Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Anomaly markers */}
          {dataset.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.loadKw);
            const isAnomaly = Boolean(pt.anomaly);
            const isHovered = hoveredPoint?.time === pt.time;

            return (
              <g
                key={idx}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Invisible larger hover hit target */}
                <circle cx={x} cy={y} r="16" fill="transparent" />

                {isAnomaly && (
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.6"
                  />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "6" : isAnomaly ? "5" : "3.5"}
                  fill={isAnomaly ? "#EF4444" : "#22C55E"}
                  stroke="#0B1410"
                  strokeWidth="2"
                />

                {/* X axis time labels */}
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="pointer-events-none absolute top-4 right-4 rounded-xl border border-[#22C55E]/60 bg-[#0B1410]/95 p-3.5 shadow-2xl backdrop-blur-md text-xs font-mono">
            <div className="flex items-center justify-between gap-4 border-b border-[#1E3529] pb-1.5 mb-1.5">
              <span className="text-[#94A3B8]">TIME: {hoveredPoint.time}</span>
              {hoveredPoint.anomaly ? (
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <AlertTriangle className="h-3 w-3" />
                  <span>ANOMALY FLAGGED</span>
                </span>
              ) : (
                <span className="text-[#4ADE80] flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>NORMAL PRODUCTION</span>
                </span>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between gap-4">
                <span className="text-[#94A3B8]">Active Load:</span>
                <span className="font-bold text-[#F8FAFC]">{hoveredPoint.loadKw} kW</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-amber-400">Idle Baseline:</span>
                <span className="font-bold text-amber-400">{hoveredPoint.baselineIdleKw} kW</span>
              </div>
              {hoveredPoint.loadKw > hoveredPoint.baselineIdleKw && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#94A3B8]">Exceedance:</span>
                  <span className="text-rose-400 font-bold">
                    +{formatNumber(hoveredPoint.loadKw - hoveredPoint.baselineIdleKw)} kW
                  </span>
                </div>
              )}
              {hoveredPoint.note && (
                <div className="mt-1.5 border-t border-[#1E3529] pt-1.5 text-[11px] font-sans text-[#F8FAFC]">
                  {hoveredPoint.note}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
