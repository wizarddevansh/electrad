"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Activity,
  ArrowLeft,
  Clock,
  Radio,
  Wifi,
  Download,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function DashboardHeader({
  onResetDemo,
}: {
  onResetDemo: () => void;
}) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-[#1E3529] bg-[#0B1410]/95 sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Title & Pre-Pilot Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1E3529] bg-[#122019] text-[#94A3B8] transition-colors hover:border-[#22C55E] hover:text-[#F8FAFC]"
              title="Return to Landing Page"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-[#F8FAFC]">
                  Electrad PoC Telemetry Engine
                </h1>
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                  Simulated PoC Telemetry (Pre-Pilot Demo)
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] flex items-center gap-2 mt-0.5">
                <span>Facility: <strong>Apex Forgings MSME Unit-2 (Peenya Cluster)</strong></span>
                <span className="text-[#1E3529]">•</span>
                <span>Feeder Bus: 415V / 50Hz 3-Phase</span>
              </div>
            </div>
          </div>

          {/* Right Status Indicators & Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-[#1E3529] bg-[#122019] px-3 py-1.5 text-xs font-mono text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"></span>
              </span>
              <span className="text-[#4ADE80]">MQTT LIVE</span>
              <span className="text-[#1E3529]">|</span>
              <span className="text-[#F8FAFC]">{time || "12:00:00"}</span>
            </div>

            <button
              type="button"
              onClick={onResetDemo}
              className="flex items-center gap-1.5 rounded-lg border border-[#1E3529] bg-[#122019] px-3 py-1.5 text-xs font-semibold text-[#94A3B8] transition-colors hover:border-[#22C55E]/60 hover:text-[#F8FAFC]"
              title="Reset Simulated Alerts"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#22C55E]" />
              <span className="hidden sm:inline">Reset Simulation</span>
            </button>

            <Link
              href="/#pilot"
              className="flex items-center gap-1.5 rounded-lg bg-[#22C55E] px-3.5 py-1.5 text-xs font-bold text-[#0B1410] shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-[#4ADE80]"
            >
              <span>Deploy Physical Pilot</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
