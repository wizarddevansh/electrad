"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  IndianRupee,
  Leaf,
  Sparkles,
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

  // Load persisted history from localStorage
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
    <div className="rounded-2xl border border-[#1E3529] bg-[#122019] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#1E3529] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#F8FAFC]">
              1-Tap Plant Floor Confirmation Loop
            </h3>
            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300">
              {pendingAlerts.length} Actionable Anomali{pendingAlerts.length === 1 ? "es" : "es"}
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Empower floor supervisors to classify idle draw in 1-tap. Confirmed waste immediately updates the audited savings ledger.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
          <span>Zero False Alarms via Human-in-the-Loop</span>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="mt-6 space-y-4">
        {pendingAlerts.length === 0 ? (
          <div className="rounded-xl border border-[#1E3529] bg-[#0B1410] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="mt-3 text-sm font-bold text-[#F8FAFC]">
              All Floor Alerts Addressed!
            </h4>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Plant telemetry is operating within statistical baselines. Savings have been credited to the verified ledger.
            </p>
          </div>
        ) : (
          pendingAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-amber-500/40 bg-[#0B1410] p-4 sm:p-5 transition-all hover:border-amber-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-amber-400">
                      {alert.feederName}
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Detected {alert.detectedAt}
                    </span>
                  </div>

                  <h4 className="mt-1.5 text-sm font-bold text-[#F8FAFC]">
                    {alert.anomalyTitle}
                  </h4>

                  <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">
                    {alert.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="text-amber-400">
                      Excess Draw: <strong>+{alert.excessKw} kW</strong>
                    </span>
                    <span className="text-[#1E3529]">•</span>
                    <span className="text-[#94A3B8]">
                      Duration: <strong>{alert.durationMinutes} mins</strong>
                    </span>
                    <span className="text-[#1E3529]">•</span>
                    <span className="text-rose-400 font-bold">
                      Calculated Rupee Loss: {formatINR(alert.potentialWasteRupees)}
                    </span>
                    <span className="text-[#1E3529]">•</span>
                    <span className="text-[#4ADE80]">
                      {alert.potentialCo2Kg} kg CO₂
                    </span>
                  </div>
                </div>

                {/* 1-Tap Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleIgnore(alert)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#1E3529] bg-[#122019] px-4 py-2.5 text-xs font-semibold text-[#94A3B8] transition-colors hover:border-[#F8FAFC]/30 hover:text-[#F8FAFC]"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Confirm Production</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleConfirm(alert)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#22C55E] px-4 py-2.5 text-xs font-bold text-[#0B1410] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all hover:bg-[#4ADE80]"
                  >
                    <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                    <span>Confirm Idle Waste</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Resolved Audit History */}
      {resolvedHistory.length > 0 && (
        <div className="mt-6 border-t border-[#1E3529] pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
              <History className="h-3.5 w-3.5 text-[#22C55E]" />
              <span>Floor Decision Ledger (Audit Trail)</span>
            </div>
            <button
              type="button"
              onClick={() => saveHistory([])}
              className="text-[10px] text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              Clear Log
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {resolvedHistory.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-between rounded-lg border border-[#1E3529] bg-[#0B1410]/70 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  {item.outcome === "confirmed" ? (
                    <span className="flex h-2 w-2 rounded-full bg-[#22C55E]" />
                  ) : (
                    <span className="flex h-2 w-2 rounded-full bg-[#94A3B8]" />
                  )}
                  <span className="font-medium text-[#F8FAFC] truncate max-w-xs sm:max-w-md">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono shrink-0">
                  {item.outcome === "confirmed" ? (
                    <span className="text-[#22C55E] font-bold">
                      +{formatINR(item.rupees)} saved ({item.co2} kg CO₂)
                    </span>
                  ) : (
                    <span className="text-[#94A3B8]">Logged as Scheduled</span>
                  )}
                  <span className="text-[10px] text-[#94A3B8]">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
