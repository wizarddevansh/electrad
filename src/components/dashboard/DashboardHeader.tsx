"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ElectradLogo } from "@/components/ElectradLogo";
import {
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Info,
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
    <div className="border-b border-[#1C2E25] bg-[#0A110E]/95 sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1C2E25] bg-[#101B16] text-[#94A39B] transition-colors hover:border-[#10B981] hover:text-[#F4F7F5]"
              title="Return to Landing Page"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center gap-2.5">
              <ElectradLogo className="h-6 w-6" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-[#F4F7F5]">
                    ELECTRAD PoC Telemetry Engine
                  </h1>
                  <span className="rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 text-[10px] font-medium text-[#F59E0B]">
                    Concept Simulation
                  </span>
                </div>
                <div className="text-[11px] text-[#94A39B] flex flex-wrap items-center gap-1.5 mt-0.5">
                  <span className="text-[#F4F7F5] font-medium">Model Facility Feeder Panel</span>
                  <span className="text-[#1C2E25]">•</span>
                  <span className="rounded bg-[#101B16] border border-[#1C2E25] px-1.5 py-0.2 text-[10px] text-[#94A39B]">
                    Illustrative Demo Plant — No Connection to Any Real Facility
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Status Indicators & Controls */}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-[#1C2E25] bg-[#101B16] px-3 py-1.5 text-xs font-mono text-[#94A39B]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]"></span>
              </span>
              <span className="text-[#10B981]">STREAMING</span>
              <span className="text-[#1C2E25]">|</span>
              <span className="text-[#F4F7F5] tabular-nums">{time || "12:00:00"}</span>
            </div>

            <button
              type="button"
              onClick={onResetDemo}
              className="flex items-center gap-1.5 rounded-lg border border-[#1C2E25] bg-[#101B16] px-3 py-1.5 text-xs font-medium text-[#94A39B] transition-colors hover:border-[#2A4739] hover:text-[#F4F7F5]"
              title="Reset Simulated Alerts"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="hidden sm:inline">Reset Simulation</span>
            </button>

            {/* Replaced Deploy Button with Disclaimer & Data Notes */}
            <Link
              href="/disclaimer"
              className="flex items-center gap-1.5 rounded-lg border border-[#10B981]/40 bg-[#101B16] px-3.5 py-1.5 text-xs font-medium text-[#10B981] transition-all hover:bg-[#10B981] hover:text-[#0A110E]"
            >
              <Info className="h-3.5 w-3.5" />
              <span>Disclaimer &amp; Data Notes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
