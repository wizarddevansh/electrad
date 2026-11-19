"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  History,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface AlertItem {
  id: string;
  feederName: string;
  machineType: string;
  anomalyTitle: string;
  description: string;
  detectedAt: string;
  excessKw: number;
  durationMinutes: number;
  potentialWasteRupees: number;
  potentialCo2Kg: number;
  status: "pending" | "confirmed_waste" | "planned_production";
}

interface ResolvedHistoryItem {
  id: string;
  title: string;
  outcome: "confirmed" | "ignored";
  rupees: number;
  co2: number;
  timestamp: string;
}

const HISTORY_STORAGE_KEY = "electrad_resolved_floor_alerts";

export function FloorConfirmLoop({
  alerts,
  onConfirmWaste,
  onIgnoreAlert,
}: {
  alerts: AlertItem[];
  onConfirmWaste: (alert: AlertItem) => void;
  onIgnoreAlert: (alert: AlertItem) => void;
}) {
  const [resolvedHistory, setResolvedHistory] = useState<ResolvedHistoryItem[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (saved) {
          setResolvedHistory(JSON.parse(saved));
        }
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const saveHistory = (items: ResolvedHistoryItem[]) => {
    setResolvedHistory(items);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      // Graceful fallback
    }
  };

  const handleConfirm = (alert: AlertItem) => {
    onConfirmWaste(alert);
    const newEntry: ResolvedHistoryItem = {
      id: alert.id,
      title: `${alert.feederName} — ${alert.anomalyTitle}`,
      outcome: "confirmed",
      rupees: alert.potentialWasteRupees,
      co2: alert.potentialCo2Kg,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    saveHistory([newEntry, ...resolvedHistory]);
  };

  const handleIgnore = (alert: AlertItem) => {
    onIgnoreAlert(alert);
    const newEntry: ResolvedHistoryItem = {
      id: alert.id,
      title: `${alert.feederName} — ${alert.anomalyTitle}`,
      outcome: "ignored",
      rupees: 0,
      co2: 0,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };
    saveHistory([newEntry, ...resolvedHistory]);
  };

  const pendingAlerts = alerts.filter((a) => a.status === "pending");

  return (
    <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1C2E25] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#F4F7F5]">
              1-Tap Plant Floor Confirmation Loop
            </h3>
            <span className="rounded bg-[#EF4444]/10 border border-[#EF4444]/30 px-2 py-0.5 text-[10px] font-mono text-[#EF4444]">
              {pendingAlerts.length} Actionable Anomali{pendingAlerts.length === 1 ? "es" : "es"}
            </span>
          </div>
          <p className="text-xs text-[#94A39B] mt-1">
            Empower floor supervisors to classify idle draw in 1 tap. Confirmed waste immediately updates the projected savings ledger.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94A39B]">
          <ShieldCheck className="h-4 w-4 text-[#10B981]" />
          <span>Human-in-the-Loop Validation</span>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mt-5 space-y-3.5">
        {pendingAlerts.length === 0 ? (
          <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-7 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="mt-2.5 text-sm font-semibold text-[#F4F7F5]">
              All Floor Alerts Resolved
            </h4>
            <p className="mt-1 text-xs text-[#94A39B]">
              Feeder loads are running within statistical baselines. Confirmed waste savings are booked into the simulated ledger.
            </p>
          </div>
        ) : (
          pendingAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4 sm:p-5 transition-all hover:border-[#2A4739]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#101B16] border border-[#1C2E25] px-2 py-0.5 text-[10px] font-mono text-[#94A39B]">
                      {alert.feederName}
                    </span>
                    <span className="text-[11px] text-[#94A39B]">
                      Detected {alert.detectedAt}
                    </span>
                  </div>

                  <h4 className="mt-1.5 text-sm font-semibold text-[#F4F7F5]">
                    {alert.anomalyTitle}
                  </h4>

                  <p className="mt-1 text-xs leading-relaxed text-[#94A39B]">
                    {alert.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="text-[#F59E0B]">
                      Excess Draw: <strong>+{alert.excessKw} kW</strong>
                    </span>
                    <span className="text-[#1C2E25]">•</span>
                    <span className="text-[#94A39B]">
                      Duration: <strong>{alert.durationMinutes} mins</strong>
                    </span>
                    <span className="text-[#1C2E25]">•</span>
                    <span className="text-[#EF4444] font-medium">
                      Loss: {formatINR(alert.potentialWasteRupees)}
                    </span>
                    <span className="text-[#1C2E25]">•</span>
                    <span className="text-[#10B981]">
                      {alert.potentialCo2Kg} kg CO₂
                    </span>
                  </div>
                </div>

                {/* 1-Tap Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleIgnore(alert)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#1C2E25] bg-[#101B16] px-3.5 py-2 text-xs font-medium text-[#94A39B] transition-colors hover:text-[#F4F7F5] hover:border-[#2A4739]"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Confirm Production</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleConfirm(alert)}
                    className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-3.5 py-2 text-xs font-semibold text-[#0A110E] transition-all hover:bg-[#059669]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Confirm Idle Waste</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resolved History */}
      {resolvedHistory.length > 0 && (
        <div className="mt-6 border-t border-[#1C2E25] pt-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A39B]">
              <History className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Shift Floor Decision Ledger</span>
            </div>
            <button
              type="button"
              onClick={() => saveHistory([])}
              className="text-[10px] text-[#94A39B] hover:text-[#F4F7F5]"
            >
              Clear Log
            </button>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {resolvedHistory.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-between rounded border border-[#1C2E25] bg-[#0A110E] px-3 py-1.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.outcome === "confirmed" ? "bg-[#10B981]" : "bg-[#94A39B]"
                    }`}
                  />
                  <span className="text-[#F4F7F5] truncate max-w-xs sm:max-w-md text-[11px]">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px] shrink-0">
                  {item.outcome === "confirmed" ? (
                    <span className="text-[#10B981] font-medium">
                      +{formatINR(item.rupees)} ({item.co2} kg CO₂)
                    </span>
                  ) : (
                    <span className="text-[#94A39B]">Scheduled Production</span>
                  )}
                  <span className="text-[10px] text-[#94A39B]">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
