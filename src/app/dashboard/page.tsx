"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiStrip } from "@/components/dashboard/KpiStrip";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { MachineFeederCard, type FeederData } from "@/components/dashboard/MachineFeederCard";
import { CompressorLeakCard } from "@/components/dashboard/CompressorLeakCard";
import { FloorConfirmLoop, type AlertItem } from "@/components/dashboard/FloorConfirmLoop";
import { Footer } from "@/components/Footer";
import { Info, CheckCircle2 } from "lucide-react";

const INITIAL_FEEDERS: FeederData[] = [
  {
    id: "feeder-1",
    name: "Air Compressor #1 (Screw 55 kW)",
    category: "Pneumatics Utility",
    ratedKw: 55,
    currentKw: 48.2,
    baselineKw: 3.5,
    phaseR: 78.4,
    phaseY: 79.1,
    phaseB: 77.9,
    voltage: 415,
    powerFactor: 0.94,
    status: "leak_pattern",
    statusNote: "Compressor cycling every 52s during unstaffed breaks. BEE on/off-load ratio indicates 26.9% line leak.",
  },
  {
    id: "feeder-2",
    name: "Hydraulic Press & CNC Line #3",
    category: "Machining Line",
    ratedKw: 45,
    currentKw: 19.8,
    baselineKw: 2.1,
    phaseR: 32.1,
    phaseY: 31.8,
    phaseB: 32.4,
    voltage: 415,
    powerFactor: 0.88,
    status: "idle_flagged",
    statusNote: "Continuous 8.4 kW idle floor for 48 minutes with zero workpiece cycles recorded. Confirmation requested.",
  },
  {
    id: "feeder-3",
    name: "Cooling Tower & Auxiliary Pumps",
    category: "Plant Utilities",
    ratedKw: 30,
    currentKw: 16.5,
    baselineKw: 8.0,
    phaseR: 28.2,
    phaseY: 27.9,
    phaseB: 28.0,
    voltage: 415,
    powerFactor: 0.91,
    status: "normal",
    statusNote: "Steady thermal dissipation load within expected operating envelope.",
  },
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "alert-1",
    feederName: "Hydraulic Press / CNC Line #3",
    machineType: "Hydraulics",
    anomalyTitle: "Prolonged Off-Shift Idle Floor Exceedance",
    description: "Hydraulic pump motor running continuous idle at 8.4 kW for 48 minutes during scheduled shift break with zero stamping stroke activity.",
    detectedAt: "48 minutes ago",
    excessKw: 8.4,
    durationMinutes: 48,
    potentialWasteRupees: 57.12,
    potentialCo2Kg: 4.77,
    status: "pending",
  },
  {
    id: "alert-2",
    feederName: "Air Compressor #1 (Screw 55 kW)",
    machineType: "Pneumatics",
    anomalyTitle: "BEE Leak Pattern: Repetitive Loading Without Tool Demand",
    description: "Compressor loading for 14.2 seconds every 52.8 seconds during lunch break when all pneumatic tools on assembly lines are idle.",
    detectedAt: "18 minutes ago",
    excessKw: 14.8,
    durationMinutes: 60,
    potentialWasteRupees: 125.80,
    potentialCo2Kg: 10.5,
    status: "pending",
  },
];

export default function DashboardPage() {
  const [feeders, setFeeders] = useState<FeederData[]>(INITIAL_FEEDERS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const [verifiedMonthlySavingsRupees, setVerifiedMonthlySavingsRupees] = useState<number>(124650);
  const [verifiedCo2Kg, setVerifiedCo2Kg] = useState<number>(9820);
  const [isPulsingSavings, setIsPulsingSavings] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simulated live edge telemetry tick
  useEffect(() => {
    const interval = setInterval(() => {
      setFeeders((prev) =>
        prev.map((f) => {
          const jitterKw = (Math.random() - 0.5) * 0.4;
          const jitterA = (Math.random() - 0.5) * 0.3;
          return {
            ...f,
            currentKw: Math.max(1, Number((f.currentKw + jitterKw).toFixed(1))),
            phaseR: Number((f.phaseR + jitterA).toFixed(1)),
            phaseY: Number((f.phaseY + jitterA).toFixed(1)),
            phaseB: Number((f.phaseB + jitterA).toFixed(1)),
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const totalCurrentKw = feeders.reduce((sum, f) => sum + f.currentKw, 0);

  const flaggedWasteKwh = alerts
    .filter((a) => a.status === "pending")
    .reduce((sum, a) => sum + (a.excessKw * a.durationMinutes) / 60, 0);

  const flaggedWasteRupees = alerts
    .filter((a) => a.status === "pending")
    .reduce((sum, a) => sum + a.potentialWasteRupees, 0);

  const handleConfirmWaste = (alert: AlertItem) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, status: "confirmed_waste" } : a))
    );

    setVerifiedMonthlySavingsRupees((prev) => prev + alert.potentialWasteRupees);
    setVerifiedCo2Kg((prev) => Number((prev + alert.potentialCo2Kg).toFixed(1)));

    setIsPulsingSavings(true);
    setToastMessage(`✓ Confirmed waste on ${alert.feederName}: +₹${alert.potentialWasteRupees.toFixed(2)} added to verified audit ledger.`);

    setTimeout(() => {
      setIsPulsingSavings(false);
    }, 1500);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleIgnoreAlert = (alert: AlertItem) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alert.id ? { ...a, status: "planned_production" } : a))
    );
    setToastMessage(`Logged ${alert.feederName} alert as scheduled planned production.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleResetDemo = () => {
    setFeeders(INITIAL_FEEDERS);
    setAlerts(INITIAL_ALERTS);
    setVerifiedMonthlySavingsRupees(124650);
    setVerifiedCo2Kg(9820);
    setToastMessage("Telemetry simulation restored to baseline state.");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A110E] text-[#F4F7F5] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#10B981] bg-[#101B16] px-4 py-2.5 text-xs font-medium text-[#10B981] shadow-xl backdrop-blur">
          <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <DashboardHeader onResetDemo={handleResetDemo} />

      {/* Persistent Top Illustrative Simulation Banner */}
      <div className="border-b border-[#1C2E25] bg-[#101B16] py-2 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] text-[#94A39B]">
          <strong className="text-[#F4F7F5]">Illustrative Simulation:</strong> All telemetry, feeder loads, and savings on this dashboard are simulated for educational and concept-demonstration purposes.{" "}
          <Link href="/disclaimer" className="text-[#10B981] underline hover:text-[#059669]">
            Read full disclaimer
          </Link>
          .
        </p>
      </div>

      {/* Main Dashboard Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
        {/* KPI Strip */}
        <KpiStrip
          currentKw={totalCurrentKw}
          flaggedWasteKwh={flaggedWasteKwh}
          flaggedWasteRupees={flaggedWasteRupees}
          verifiedMonthlySavingsRupees={verifiedMonthlySavingsRupees}
          verifiedCo2Kg={verifiedCo2Kg}
          isPulsingSavings={isPulsingSavings}
        />

        {/* 1-Tap Floor Confirm Loop */}
        <FloorConfirmLoop
          alerts={alerts}
          onConfirmWaste={handleConfirmWaste}
          onIgnoreAlert={handleIgnoreAlert}
        />

        {/* 3 Machine Feeders Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#F4F7F5]">
                Simulated Feeder Nodes (CT Telemetry)
              </h2>
              <p className="text-xs text-[#94A39B]">
                True RMS current sampling across 3-phase incoming circuit branches (Phase R, Y, B)
              </p>
            </div>
            <span className="text-xs font-mono text-[#10B981]">
              3 Nodes Online (100% Signal)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {feeders.map((feeder) => (
              <MachineFeederCard key={feeder.id} feeder={feeder} />
            ))}
          </div>
        </div>

        {/* BEE Compressed Air Leak Analysis Card */}
        <CompressorLeakCard />

        {/* Time-Series Load Chart */}
        <TimeSeriesChart />
      </main>

      <Footer />
    </div>
  );
}
