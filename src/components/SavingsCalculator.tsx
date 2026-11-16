"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Leaf,
  Zap,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils";

interface TariffPreset {
  id: string;
  name: string;
  rate: number;
  description: string;
}

const TARIFF_PRESETS: TariffPreset[] = [
  {
    id: "up-lmv6",
    name: "UPERC LMV-6 (₹9.02)",
    rate: 9.02,
    description: "MSME Light & Medium Power (Uttar Pradesh / North India)",
  },
  {
    id: "up-hv2",
    name: "UPERC HV-2 (₹7.97)",
    rate: 7.97,
    description: "Heavy Industrial High Voltage (Continuous Process / Forging)",
  },
  {
    id: "custom",
    name: "Custom Tariff",
    rate: 8.5,
    description: "Enter your factory's blended ₹/kWh discom rate",
  },
];

export function SavingsCalculator({
  onSelectEstimate,
}: {
  onSelectEstimate?: (bill: number, savings: number) => void;
}) {
  const [monthlyBill, setMonthlyBill] = useState<number>(650000); // ₹6.5 Lakhs default
  const [selectedTariffId, setSelectedTariffId] = useState<string>("up-lmv6");
  const [customTariff, setCustomTariff] = useState<number>(8.5);
  const [savingsPercent, setSavingsPercent] = useState<number>(10); // 10% ADEETIE default

  const effectiveTariff = useMemo(() => {
    if (selectedTariffId === "custom") {
      return customTariff > 0 ? customTariff : 8.5;
    }
    const found = TARIFF_PRESETS.find((t) => t.id === selectedTariffId);
    return found ? found.rate : 9.02;
  }, [selectedTariffId, customTariff]);

  // Calculations:
  // Total Monthly kWh Consumed = Monthly Bill / Tariff
  // Monthly kWh Saved = Total Monthly kWh * (Savings % / 100)
  // Monthly ₹ Saved = Monthly Bill * (Savings % / 100)
  // Annual ₹ Saved = Monthly ₹ Saved * 12
  // Annual kWh Saved = Monthly kWh Saved * 12
  // Annual CO₂ Avoided (Tonnes) = (Annual kWh Saved * 0.710) / 1000
  const metrics = useMemo(() => {
    const bill = Math.max(10000, monthlyBill);
    const totalKwh = bill / effectiveTariff;
    const monthlyKwhSaved = totalKwh * (savingsPercent / 100);
    const monthlyRupeesSaved = bill * (savingsPercent / 100);
    const annualRupeesSaved = monthlyRupeesSaved * 12;
    const annualKwhSaved = monthlyKwhSaved * 12;
    const annualCo2Tonnes = (annualKwhSaved * 0.71) / 1000;

    return {
      monthlyKwhSaved,
      monthlyRupeesSaved,
      annualRupeesSaved,
      annualKwhSaved,
      annualCo2Tonnes,
    };
  }, [monthlyBill, effectiveTariff, savingsPercent]);

  const handleApplyToPilot = () => {
    if (onSelectEstimate) {
      onSelectEstimate(monthlyBill, metrics.annualRupeesSaved);
    }
    const pilotSection = document.getElementById("pilot");
    if (pilotSection) {
      pilotSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="relative bg-[#0B1410] py-20 border-b border-[#1E3529]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3529] bg-[#122019] px-3 py-1 text-xs font-semibold text-[#4ADE80] uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5 text-[#22C55E]" />
            <span>Interactive Industrial ROI Engine</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
            Simulate Your Plant's Waste Elimination & ESG Impact
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Input your monthly discom electricity bill and select your industrial tariff structure to calculate verified rupee savings and CEA-certified carbon reductions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 rounded-2xl border border-[#1E3529] bg-[#122019] p-6 sm:p-8">
            <h3 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#22C55E]" />
              <span>Plant Energy Parameters</span>
            </h3>

            {/* Monthly Bill Input & Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="monthly-bill" className="font-semibold text-[#F8FAFC]">
                  Monthly Electricity Bill (₹)
                </label>
                <span className="font-mono text-base font-bold text-[#22C55E]">
                  {formatINR(monthlyBill)}
                </span>
              </div>

              <div className="mt-3">
                <input
                  id="monthly-bill"
                  type="range"
                  min="50000"
                  max="5000000"
                  step="25000"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-[#0B1410] rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94A3B8]">
                  <span>₹50,000 (Small MSME)</span>
                  <span>₹10,00,000</span>
                  <span>₹50,00,000+ (Heavy Plant)</span>
                </div>
              </div>

              {/* Quick bill preset chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "₹2.5 Lakhs", val: 250000 },
                  { label: "₹6.5 Lakhs (Avg MSME)", val: 650000 },
                  { label: "₹15 Lakhs", val: 150000 },
                  { label: "₹35 Lakhs", val: 3500000 },
                ].map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setMonthlyBill(chip.val)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-mono transition-all ${
                      monthlyBill === chip.val
                        ? "border-[#22C55E] bg-[#22C55E]/15 text-[#4ADE80]"
                        : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tariff Selector */}
            <div className="mt-8">
              <label className="block text-xs font-semibold text-[#F8FAFC] mb-2">
                Industrial Tariff Structure (State Discom)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TARIFF_PRESETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTariffId(t.id)}
                    className={`text-left rounded-xl border p-3 transition-all ${
                      selectedTariffId === t.id
                        ? "border-[#22C55E] bg-[#22C55E]/10 text-[#F8FAFC]"
                        : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:border-[#22C55E]/40"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F8FAFC]">{t.name}</div>
                    <div className="mt-1 text-[10px] text-[#94A3B8] line-clamp-2">
                      {t.description}
                    </div>
                  </button>
                ))}
              </div>

              {selectedTariffId === "custom" && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#1E3529] bg-[#0B1410] px-3 py-2">
                  <span className="text-xs text-[#94A3B8]">Custom Rate:</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span className="text-xs text-[#4ADE80]">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      min="4"
                      max="20"
                      value={customTariff}
                      onChange={(e) => setCustomTariff(Number(e.target.value))}
                      className="w-20 bg-transparent text-sm font-bold text-[#F8FAFC] focus:outline-none"
                    />
                    <span className="text-xs text-[#94A3B8]">/ kWh</span>
                  </div>
                </div>
              )}
            </div>

            {/* Target Savings Percentage */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="target-savings" className="font-semibold text-[#F8FAFC]">
                  Target Waste Elimination Percentage
                </label>
                <span className="font-mono text-base font-bold text-[#4ADE80]">
                  {savingsPercent}%
                </span>
              </div>

              {/* Preset buttons */}
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSavingsPercent(10)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    savingsPercent === 10
                      ? "border-[#22C55E] bg-[#22C55E] text-[#0B1410]"
                      : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>10% ADEETIE Mandate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSavingsPercent(11)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    savingsPercent === 11
                      ? "border-[#22C55E] bg-[#22C55E] text-[#0B1410]"
                      : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  <span>11% IEA Benchmark</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSavingsPercent(18)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    savingsPercent === 18
                      ? "border-[#22C55E] bg-[#22C55E] text-[#0B1410]"
                      : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  <span>18% (Pneumatics + Idle)</span>
                </button>
              </div>

              <div className="mt-3">
                <input
                  id="target-savings"
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={savingsPercent}
                  onChange={(e) => setSavingsPercent(Number(e.target.value))}
                  className="w-full h-2 bg-[#0B1410] rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94A3B8]">
                  <span>5% (Conservative)</span>
                  <span>15% (Typical MSME)</span>
                  <span>30% (High Leak Facilities)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 rounded-2xl border border-[#22C55E]/40 bg-gradient-to-b from-[#122019] to-[#0E1A14] p-6 sm:p-8 shadow-[0_0_30px_rgba(34,197,94,0.12)]">
            <div className="flex items-center justify-between border-b border-[#1E3529] pb-4">
              <span className="text-xs font-mono font-semibold uppercase text-[#4ADE80]">
                Verified Outcome Projection
              </span>
              <span className="rounded bg-[#22C55E]/20 px-2 py-0.5 text-[10px] font-mono text-[#22C55E]">
                CEA Baseline v21.0
              </span>
            </div>

            {/* Big Annual Savings Number */}
            <div className="mt-6">
              <div className="text-xs font-medium text-[#94A3B8]">Annual Verified Savings</div>
              <div className="mt-1 text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#22C55E]">
                {formatINR(metrics.annualRupeesSaved)}
              </div>
              <div className="mt-1 text-xs text-[#94A3B8]">
                Discom electricity waste stopped and retained on bottom line
              </div>
            </div>

            {/* Detailed Metric Cards */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-[#1E3529] bg-[#0B1410]/80 p-3.5">
                <div>
                  <div className="text-[11px] text-[#94A3B8]">Monthly Cash Savings</div>
                  <div className="text-sm font-bold font-mono text-[#F8FAFC]">
                    {formatINR(metrics.monthlyRupeesSaved)} / month
                  </div>
                </div>
                <IndianRupee className="h-5 w-5 text-[#4ADE80]" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#1E3529] bg-[#0B1410]/80 p-3.5">
                <div>
                  <div className="text-[11px] text-[#94A3B8]">Monthly Electrical Energy Saved</div>
                  <div className="text-sm font-bold font-mono text-[#F8FAFC]">
                    {formatNumber(metrics.monthlyKwhSaved)} kWh
                  </div>
                </div>
                <Zap className="h-5 w-5 text-amber-400" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#1E3529] bg-[#0B1410]/80 p-3.5">
                <div>
                  <div className="text-[11px] text-[#94A3B8]">Annual Carbon Avoidance</div>
                  <div className="text-sm font-bold font-mono text-[#4ADE80]">
                    {formatNumber(metrics.annualCo2Tonnes)} Tonnes CO₂
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">
                    Calculated @ 0.710 kg CO₂/kWh CEA factor
                  </div>
                </div>
                <Leaf className="h-5 w-5 text-[#22C55E]" />
              </div>
            </div>

            {/* Outcome SaaS Highlight */}
            <div className="mt-6 rounded-xl border border-[#1E3529] bg-[#0B1410] p-4 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1.5 font-semibold text-[#F8FAFC]">
                <Info className="h-4 w-4 text-[#22C55E]" />
                <span>Zero Risk: Outcome-Aligned SaaS</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                Under the Electrad model, if monthly savings exceed ₹10,000, software fees are a simple percentage of proven savings — <strong className="text-[#4ADE80]">₹0 base software fee</strong>.
              </p>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleApplyToPilot}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] py-3.5 text-sm font-bold text-[#0B1410] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:bg-[#4ADE80]"
            >
              <span>Lock In Pilot with this Estimate</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
