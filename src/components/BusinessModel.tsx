import React from "react";
import { Cpu, ShieldCheck, Zap, Info } from "lucide-react";

export function BusinessModel() {
  return (
    <section id="business-model" className="relative bg-[#0A110E] py-20 border-b border-[#1C2E25]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
            Commercial Structure Concept
          </span>
          <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[#F4F7F5] sm:text-4xl">
            Outcome-Aligned Industrial Business Model
          </h2>
          <p className="mt-2.5 text-sm text-[#94A39B]">
            Engineered to overcome capital expenditure barriers in manufacturing through transparent one-time hardware sizing and shared-success software tiers.
          </p>
        </div>

        {/* 3 Crisp Easy-to-Scan Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col justify-between rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-7 transition-all hover:border-[#2A4739]">
            <div>
              <span className="rounded bg-[#0A110E] px-2.5 py-1 text-[10px] font-mono font-bold text-[#10B981]">
                PART 1 • PHYSICAL KIT
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F4F7F5]">
                Scoped Hardware Setup (One-Time)
              </h3>
              <p className="mt-1 text-xs text-[#10B981] font-mono">
                Sized to Feeder Topology
              </p>

              <p className="mt-3.5 text-xs leading-relaxed text-[#94A39B]">
                Non-invasive split-core CT clamp and ESP32 edge gateway kit sized specifically to the facility's feeder count and switchgear layout.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-[#94A39B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>100A–800A snap-on split-core clamps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>IP65 industrial enclosure with surge protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>Zero plant downtime, zero wire slicing</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-[#1C2E25] pt-3 text-[11px] text-[#94A39B]">
              One-time non-invasive deployment
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-7 transition-all hover:border-[#2A4739]">
            <div>
              <span className="rounded bg-[#0A110E] px-2.5 py-1 text-[10px] font-mono font-bold text-[#94A39B]">
                PART 2A • MAINTENANCE TIER
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F4F7F5]">
                When Savings ≤ ₹10,000 / month
              </h3>
              <p className="mt-1 text-xs text-[#94A39B] font-mono">
                Standard Base Maintenance
              </p>

              <p className="mt-3.5 text-xs leading-relaxed text-[#94A39B]">
                When monthly waste elimination drops to steady-state maintenance levels, a modest base subscription covers ongoing infrastructure.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-[#94A39B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#94A39B] font-bold">•</span>
                  <span>Continuous 24/7 feeder telemetry pipeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#94A39B] font-bold">•</span>
                  <span>Compressor drift and leakage diagnostics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#94A39B] font-bold">•</span>
                  <span>Automated shift handover & compliance reporting</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-[#1C2E25] pt-3 text-[11px] text-[#94A39B]">
              Covers continuous telemetry & alert dispatch
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between rounded-xl border border-[#10B981]/40 bg-[#101B16] p-6 sm:p-7 transition-all hover:border-[#10B981]">
            <div>
              <span className="rounded bg-[#10B981]/15 px-2.5 py-1 text-[10px] font-mono font-bold text-[#10B981]">
                PART 2B • OUTCOME TIER
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#F4F7F5]">
                When Savings &gt; ₹10,000 / month
              </h3>
              <p className="mt-1 text-xs text-[#10B981] font-mono">
                ₹0 Base Fee + % of Verified Savings
              </p>

              <p className="mt-3.5 text-xs leading-relaxed text-[#94A39B]">
                Base software fee drops to ₹0. Electrad charges an agreed fixed percentage cut solely from verified electricity savings retained from the DISCOM.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-[#94A39B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>₹0 base software license fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>Billed strictly from money already saved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>Complete alignment of financial interest</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-[#1C2E25] pt-3 text-[11px] text-[#10B981] font-medium">
              Zero software cost unless waste is eliminated
            </div>
          </div>
        </div>

        {/* Required Bottom Note */}
        <div className="mt-10 rounded-lg border border-[#1C2E25] bg-[#101B16] p-4 text-xs text-[#94A39B] flex items-center justify-center gap-2 text-center">
          <Info className="h-4 w-4 text-[#10B981] shrink-0" />
          <span>
            <strong>Why plants stay connected:</strong> Continuous compressor-drift alerts and BEE ADEETIE tracking (supporting ≥10% project-level savings, FY 2025–28) require active cloud telemetry.
          </span>
        </div>
      </div>
    </section>
  );
}
