"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Leaf,
  Zap,
  TrendingDown,
  Info,
  ExternalLink,
} from "lucide-react";
import { formatINR, formatNumber } from "@/lib/utils";

interface TariffPreset {
  id: string;
  name: string;
  rate: number;
  description: string;
  orderUrl?: string;
}

const TARIFF_PRESETS: TariffPreset[] = [
  {
    id: "up-lmv6",
    name: "UPERC LMV-6 (₹9.02)",
    rate: 9.02,
    description: "Small & Medium Power (< 50 kW/kVA) — North India DISCOMs",
    orderUrl: "https://www.uperc.org/App_File/DiscomsPressNote-pdf72202640356PM.pdf",
  },
  {
    id: "up-hv2",
    name: "UPERC HV-2 (₹7.97)",
    rate: 7.97,
    description: "Heavy Industrial / High Voltage (Continuous Process / Forging)",
    orderUrl: "https://www.uperc.org/App_File/DiscomsPressNote-pdf72202640356PM.pdf",
  },
  {
    id: "custom",
    name: "Custom Tariff",
    rate: 8.5,
    description: "Specify your plant's blended energy rate per kWh",
  },
];

export function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(150000); // ₹1.5 Lakhs default (consistent with LMV-6 <50 kW)
  const [selectedTariffId, setSelectedTariffId] = useState<string>("up-lmv6");
  const [customTariff, setCustomTariff] = useState<number>(8.5);
  const [savingsPercent, setSavingsPercent] = useState<number>(10); // 10% BEE ADEETIE default

  const effectiveTariff = useMemo(() => {
    if (selectedTariffId === "custom") {
      return customTariff > 0 ? customTariff : 8.5;
    }
    const found = TARIFF_PRESETS.find((t) => t.id === selectedTariffId);
    return found ? found.rate : 9.02;
  }, [selectedTariffId, customTariff]);

  // Exact Formulas:
  // Estimated Monthly kWh = Monthly Bill (₹) / Selected Tariff (₹/kWh)
  // Monthly kWh Saved = Estimated Monthly kWh * (Target Savings % / 100)
  // Monthly ₹ Saved = Monthly kWh Saved * Selected Tariff (₹/kWh)
  // Annual ₹ Saved = Monthly ₹ Saved * 12
  // Monthly CO₂ Avoided (Tonnes) = (Monthly kWh Saved * 0.710) / 1000
  // Annual CO₂ Avoided (Tonnes) = Monthly CO₂ Avoided * 12
  const metrics = useMemo(() => {
    const bill = Math.max(10000, monthlyBill);
    const estimatedMonthlyKwh = bill / effectiveTariff;
    const monthlyKwhSaved = estimatedMonthlyKwh * (savingsPercent / 100);
    const monthlyRupeesSaved = monthlyKwhSaved * effectiveTariff;
    const annualRupeesSaved = monthlyRupeesSaved * 12;
    const monthlyCo2Tonnes = (monthlyKwhSaved * 0.710) / 1000;
    const annualCo2Tonnes = monthlyCo2Tonnes * 12;

    return {
      estimatedMonthlyKwh,
      monthlyKwhSaved,
      monthlyRupeesSaved,
      annualRupeesSaved,
      monthlyCo2Tonnes,
      annualCo2Tonnes,
    };
  }, [monthlyBill, effectiveTariff, savingsPercent]);

  return (
    <section id="simulator" className="relative bg-[#0A110E] py-20 border-b border-[#1C2E25]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
            Interactive Industrial Impact Simulator
          </span>
          <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#F4F7F5] sm:text-4xl">
            Simulate Your Plant's Waste Elimination & ESG Impact
          </h2>
          <p className="mt-2.5 text-sm text-[#94A39B]">
            Model financial and carbon avoidance benchmarks using official state DISCOM tariffs and the Central Electricity Authority (CEA) emission baseline.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-[#F4F7F5] flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#10B981]" />
              <span>Plant Energy Parameters</span>
            </h3>

            {/* Monthly Bill Input & Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="monthly-bill" className="font-medium text-[#F4F7F5]">
                  Monthly Electricity Bill (₹)
                </label>
                <span className="font-mono text-base font-bold text-[#10B981] tabular-nums">
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
                  className="w-full h-1.5 bg-[#0A110E] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94A39B]">
                  <span>₹50,000 (Small Unit)</span>
                  <span>₹10,00,000</span>
                  <span>₹50,00,000+ (Heavy Plant)</span>
                </div>
              </div>

              {/* Quick bill preset chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "₹1.5 Lakhs (LMV-6)", val: 150000 },
                  { label: "₹6.5 Lakhs (HV-2)", val: 650000 },
                  { label: "₹15 Lakhs", val: 1500000 },
                  { label: "₹35 Lakhs", val: 3500000 },
                ].map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setMonthlyBill(chip.val)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-mono transition-all ${
                      monthlyBill === chip.val
                        ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981]"
                        : "border-[#1C2E25] bg-[#0A110E] text-[#94A39B] hover:text-[#F4F7F5]"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tariff Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs mb-2">
                <label className="font-medium text-[#F4F7F5]">
                  Industrial Tariff Structure (DISCOM)
                </label>
                <a
                  href="https://www.uperc.org/App_File/DiscomsPressNote-pdf72202640356PM.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#94A39B] hover:text-[#10B981] inline-flex items-center gap-1"
                >
                  <span>UPERC FY 2026–27 Order</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TARIFF_PRESETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTariffId(t.id)}
                    className={`text-left rounded-xl border p-3 transition-all ${
                      selectedTariffId === t.id
                        ? "border-[#10B981] bg-[#10B981]/10 text-[#F4F7F5]"
                        : "border-[#1C2E25] bg-[#0A110E] text-[#94A39B] hover:border-[#2A4739]"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F4F7F5]">{t.name}</div>
                    <div className="mt-1 text-[10px] text-[#94A39B] line-clamp-2">
                      {t.description}
                    </div>
                  </button>
                ))}
              </div>

              {selectedTariffId === "custom" && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#1C2E25] bg-[#0A110E] px-3 py-2">
                  <span className="text-xs text-[#94A39B]">Custom Rate:</span>
                  <div className="flex items-center gap-1 font-mono">
                    <span className="text-xs text-[#10B981]">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      min="4"
                      max="25"
                      value={customTariff}
                      onChange={(e) => setCustomTariff(Number(e.target.value))}
                      className="w-20 bg-transparent text-sm font-bold text-[#F4F7F5] focus:outline-none"
                    />
                    <span className="text-xs text-[#94A39B]">/ kWh</span>
                  </div>
                </div>
              )}
            </div>

            {/* Target Savings Percentage */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="target-savings" className="font-medium text-[#F4F7F5]">
                  Target Waste Elimination Percentage
                </label>
                <span className="font-mono text-base font-bold text-[#10B981] tabular-nums">
                  {savingsPercent}%
                </span>
              </div>

              {/* Preset buttons */}
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSavingsPercent(10)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    savingsPercent === 10
                      ? "border-[#10B981] bg-[#10B981] text-[#0A110E] font-semibold"
                      : "border-[#1C2E25] bg-[#0A110E] text-[#94A39B] hover:text-[#F4F7F5]"
                  }`}
                >
                  10% BEE ADEETIE Threshold
                </button>

                <button
                  type="button"
                  onClick={() => setSavingsPercent(11)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    savingsPercent === 11
                      ? "border-[#10B981] bg-[#10B981] text-[#0A110E] font-semibold"
                      : "border-[#1C2E25] bg-[#0A110E] text-[#94A39B] hover:text-[#F4F7F5]"
                  }`}
                >
                  11% IEA EMS Benchmark
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
                  className="w-full h-1.5 bg-[#0A110E] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#94A39B]">
                  <span>5% (Conservative)</span>
                  <span>10% (BEE Mandate)</span>
                  <span>30% (High Leak Facilities)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-5 rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#1C2E25] pb-4">
              <span className="text-xs font-mono font-medium uppercase text-[#10B981]">
                Illustrative Projections
              </span>
              <a
                href="https://cea.nic.in/api/cdm-report-version/view-pdf/en/82"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-[#94A39B] hover:text-[#10B981] flex items-center gap-1"
              >
                <span>CEA Baseline v21.0 (0.710 kg/kWh)</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>

            {/* Annual Savings Number */}
            <div className="mt-6">
              <div className="text-xs font-medium text-[#94A39B]">Projected Annual Savings</div>
              <div className="mt-1 text-3xl font-extrabold font-mono tracking-tight text-[#10B981] tabular-nums">
                {formatINR(metrics.annualRupeesSaved)}
              </div>
              <div className="mt-1 text-[11px] text-[#94A39B]">
                Formula: Monthly ₹ Saved ({formatINR(metrics.monthlyRupeesSaved)}) × 12 months
              </div>
            </div>

            {/* Detailed Metric Cards with Plain Formulas */}
            <div className="mt-6 space-y-3">
              <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#94A39B]">Monthly Cost Avoidance</span>
                  <IndianRupee className="h-4 w-4 text-[#10B981]" />
                </div>
                <div className="text-base font-bold font-mono text-[#F4F7F5] tabular-nums mt-0.5">
                  {formatINR(metrics.monthlyRupeesSaved)} / month
                </div>
                <div className="text-[10px] font-mono text-[#94A39B] mt-1">
                  Monthly kWh Saved ({formatNumber(metrics.monthlyKwhSaved)}) × ₹{effectiveTariff.toFixed(2)}/kWh
                </div>
              </div>

              <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#94A39B]">Monthly Energy Saved</span>
                  <Zap className="h-4 w-4 text-[#F59E0B]" />
                </div>
                <div className="text-base font-bold font-mono text-[#F4F7F5] tabular-nums mt-0.5">
                  {formatNumber(metrics.monthlyKwhSaved)} kWh / month
                </div>
                <div className="text-[10px] font-mono text-[#94A39B] mt-1">
                  Bill ({formatINR(monthlyBill)}) ÷ ₹{effectiveTariff.toFixed(2)}/kWh × {savingsPercent}% target
                </div>
              </div>

              <div className="rounded-lg border border-[#1C2E25] bg-[#0A110E] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#94A39B]">Annual Scope 2 CO₂ Avoidance</span>
                  <Leaf className="h-4 w-4 text-[#10B981]" />
                </div>
                <div className="text-base font-bold font-mono text-[#10B981] tabular-nums mt-0.5">
                  {formatNumber(metrics.annualCo2Tonnes)} Tonnes CO₂ / year
                </div>
                <div className="text-[10px] font-mono text-[#94A39B] mt-1">
                  (Annual kWh Saved × 0.710 kg CO₂/kWh) ÷ 1,000
                </div>
              </div>
            </div>

            {/* Required Visible Disclaimer Box */}
            <div className="mt-6 rounded-lg border border-[#1C2E25] bg-[#0A110E] p-4 text-xs text-[#94A39B] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-[#F4F7F5] mb-1">
                <Info className="h-4 w-4 text-[#10B981] shrink-0" />
                <span>Simulation Disclaimer</span>
              </div>
              <p className="text-[11px]">
                All calculations and figures shown are approximate and illustrative only. Estimates treat the monthly bill as energy charges and exclude fixed and demand charges. Actual factory energy use, savings, and CO₂ reductions vary based on equipment condition, duty cycles, power factor, and state DISCOM tariff structures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
