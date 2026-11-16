"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  Layers,
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

const COMBINED_DATA: DataPoint[] = [
  { time: "00:00", loadKw: 24.5, baselineIdleKw: 12.0, anomaly: "idle", note: "Night shift auxiliary pump idling" },
  { time: "02:00", loadKw: 22.1, baselineIdleKw: 12.0, anomaly: "idle", note: "Unattended hydraulic motor left powered" },
  { time: "04:00", loadKw: 19.8, baselineIdleKw: 12.0, anomaly: "idle", note: "Off-shift baseline exceedance" },
  { time: "06:00", loadKw: 48.0, baselineIdleKw: 12.0, note: "Shift-1 morning pre-heat start" },
  { time: "08:00", loadKw: 138.4, baselineIdleKw: 12.0, note: "Full production machining lines" },
  { time: "10:00", loadKw: 154.2, baselineIdleKw: 12.0, note: "Peak machining cycle" },
  { time: "12:00", loadKw: 146.0, baselineIdleKw: 12.0, note: "Stable batch production" },
  { time: "13:00", loadKw: 68.5, baselineIdleKw: 12.0, anomaly: "leak", note: "Lunch break: Compressor cycling on air leaks" },
  { time: "14:00", loadKw: 149.2, baselineIdleKw: 12.0, note: "Shift-2 production resumed" },
  { time: "16:00", loadKw: 158.0, baselineIdleKw: 12.0, note: "Peak afternoon load" },
  { time: "18:00", loadKw: 132.5, baselineIdleKw: 12.0, note: "Shift changeover window" },
  { time: "20:00", loadKw: 88.0, baselineIdleKw: 12.0, note: "Partial evening shift" },
  { time: "22:00", loadKw: 42.0, baselineIdleKw: 12.0, note: "Shift handover" },
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

  const getX = (index: number) => {
    return paddingLeft + (index / (dataset.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    return paddingTop + chartH - (val / maxKw) * chartH;
  };

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
    <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1C2E25] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#F4F7F5]">
              24-Hour Time-Series Load Curve vs. Statistical Baseline
            </h3>
            <span className="rounded bg-[#0A110E] px-2 py-0.5 text-[10px] font-mono text-[#10B981]">
              True RMS (kW)
            </span>
          </div>
          <p className="text-xs text-[#94A39B] mt-1">
            Dotted line denotes rolling median off-shift idle baseline learned by the statistical engine.
          </p>
        </div>

        {/* Feeder Switcher */}
        <div className="inline-flex rounded-lg border border-[#1C2E25] bg-[#0A110E] p-1">
          <button
            type="button"
            onClick={() => setSelectedFeeder("combined")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              selectedFeeder === "combined"
                ? "bg-[#10B981] text-[#0A110E] font-semibold"
                : "text-[#94A39B] hover:text-[#F4F7F5]"
            }`}
          >
            Combined Incomer
          </button>
          <button
            type="button"
            onClick={() => setSelectedFeeder("compressor")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              selectedFeeder === "compressor"
                ? "bg-[#10B981] text-[#0A110E] font-semibold"
                : "text-[#94A39B] hover:text-[#F4F7F5]"
            }`}
          >
            Air Compressor #1
          </button>
          <button
            type="button"
            onClick={() => setSelectedFeeder("cnc")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              selectedFeeder === "cnc"
                ? "bg-[#10B981] text-[#0A110E] font-semibold"
                : "text-[#94A39B] hover:text-[#F4F7F5]"
            }`}
          >
            Hydraulic Press Line
          </button>
        </div>
      </div>

      {/* Legends */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[#94A39B]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-full bg-[#10B981]"></span>
          <span className="text-[#F4F7F5]">Simulated Power Draw (kW)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-[#F59E0B]"></span>
          <span className="text-[#F59E0B]">Statistical Idle Floor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span>
          <span className="text-[#EF4444]">Flagged Anomaly</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative mt-4 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
        >
          <defs>
            <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
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
                  stroke="#1C2E25"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94A39B"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {kwLabel}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#loadGradient)" />

          {/* Baseline threshold */}
          <line
            x1={paddingLeft}
            y1={idleBaselineY}
            x2={width - paddingRight}
            y2={idleBaselineY}
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x={width - paddingRight}
            y={idleBaselineY - 5}
            textAnchor="end"
            fill="#F59E0B"
            fontSize="10"
            fontFamily="monospace"
          >
            IDLE FLOOR: {dataset[0]?.baselineIdleKw} kW
          </text>

          {/* Main Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {dataset.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.loadKw);
            const isAnomaly = Boolean(pt.anomaly);
            const isHovered = hoveredPoint?.time === pt.time;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle cx={x} cy={y} r="14" fill="transparent" />

                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "5" : isAnomaly ? "4" : "3"}
                  fill={isAnomaly ? "#EF4444" : "#10B981"}
                  stroke="#0A110E"
                  strokeWidth="1.5"
                />

                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  fill="#94A39B"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="pointer-events-none absolute top-4 right-4 rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3 text-xs font-mono shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#1C2E25] pb-1 mb-1.5">
              <span className="text-[#94A39B]">{hoveredPoint.time}</span>
              {hoveredPoint.anomaly ? (
                <span className="text-[#EF4444] font-semibold">Anomaly Flagged</span>
              ) : (
                <span className="text-[#10B981]">Normal Operation</span>
              )}
            </div>
            <div className="space-y-0.5">
              <div className="flex justify-between gap-4">
                <span className="text-[#94A39B]">Active Draw:</span>
                <span className="text-[#F4F7F5] font-bold tabular-nums">{hoveredPoint.loadKw} kW</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#F59E0B]">Idle Baseline:</span>
                <span className="text-[#F59E0B] tabular-nums">{hoveredPoint.baselineIdleKw} kW</span>
              </div>
              {hoveredPoint.note && (
                <div className="mt-1 pt-1 border-t border-[#1C2E25] text-[10px] text-[#94A39B] font-sans">
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
