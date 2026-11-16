import React from "react";
import {
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  TrendingUp,
  Percent,
  Check,
  Building,
  HelpCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function BusinessModel() {
  return (
    <section id="business-model" className="relative bg-[#0B1410] py-20 border-b border-[#1E3529]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3529] bg-[#122019] px-3 py-1 text-xs font-semibold text-[#4ADE80] uppercase tracking-wider">
            <Percent className="h-3.5 w-3.5 text-[#22C55E]" />
            <span>Honest Industrial Economics</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
            2-Part Transparent Business Model
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Engineered to overcome the trust hurdle in Indian manufacturing: Capex-light hardware installation paired with an outcome-aligned SaaS contract where we only win when you save.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Part 1: Non-Invasive Hardware Kit */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#1E3529] bg-[#122019] p-8 transition-all hover:border-[#22C55E]/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#0B1410] px-2.5 py-1 text-xs font-mono font-bold text-[#4ADE80]">
                  PART 01 • PHYSICAL INFRASTRUCTURE
                </span>
                <span className="text-xs text-[#94A3B8]">One-Time Setup</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-[#F8FAFC]">
                Non-Invasive Hardware Kit
              </h3>
              <p className="mt-2 text-xs font-mono text-[#22C55E]">
                Scoped Per Facility Size & Branch Circuit Feeder Count
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                Every plant layout is unique. Instead of forcing rigid, overpriced proprietary boxes, Electrad scopes the physical kit to your exact breaker panels, transformer incomers, and critical motor loads.
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-[#F8FAFC]">
                <div className="flex items-start gap-3 rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
                  <Cpu className="h-5 w-5 shrink-0 text-[#22C55E] mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#F8FAFC]">
                      Split-Core Current Transformers (100A – 800A)
                    </strong>
                    <span className="text-[#94A3B8] leading-relaxed">
                      Snap-on installation around live busbars. Zero plant shutdowns, zero wire splicing, zero production loss.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
                  <Zap className="h-5 w-5 shrink-0 text-[#22C55E] mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#F8FAFC]">
                      Dual-Core ESP32 Edge Gateway & Enclosure
                    </strong>
                    <span className="text-[#94A3B8] leading-relaxed">
                      IP65 rated flame-retardant industrial enclosure, protected isolated switch-mode power supply, and surge suppression.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-[#1E3529] bg-[#0B1410]/70 p-3.5">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#22C55E] mt-0.5" />
                  <div>
                    <strong className="block text-sm text-[#F8FAFC]">
                      On-Site Calibration & Plant Commissioning
                    </strong>
                    <span className="text-[#94A3B8] leading-relaxed">
                      Our certified electrical technician validates phase orientation, CT ratio calibration, and plant network handshake.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#1E3529] pt-4 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]"></span>
                <span className="font-semibold text-[#F8FAFC]">No Fake Fixed BOM Pricing:</span>
              </div>
              <p className="mt-1 text-[11px]">
                Hardware is quoted strictly at transparent cost based on the number of measured feeders (e.g. 3-node pilot vs 24-node plant).
              </p>
            </div>
          </div>

          {/* Part 2: Outcome-Aligned SaaS */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#22C55E]/50 bg-gradient-to-b from-[#122019] to-[#0E1A14] p-8 shadow-[0_0_25px_rgba(34,197,94,0.12)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#22C55E]/20 px-2.5 py-1 text-xs font-mono font-bold text-[#4ADE80]">
                  PART 02 • OUTCOME-ALIGNED SAAS
                </span>
                <span className="rounded-full bg-[#22C55E] px-2 py-0.5 text-[10px] font-bold text-[#0B1410]">
                  ZERO DOWNSIDE
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-[#F8FAFC]">
                Shared Success Software Model
              </h3>
              <p className="mt-2 text-xs font-mono text-[#22C55E]">
                We Earn Only When Your Factory Stops Paying for Wasted Power
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
                Traditional industrial energy software demands hefty upfront annual licenses. Electrad aligns skin in the game with the plant owner through two clear thresholds:
              </p>

              {/* 2 Thresholds Breakdown */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-[#22C55E]/40 bg-[#0B1410] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4ADE80]">
                      Scenario A: High Savings Month
                    </span>
                    <span className="rounded bg-[#22C55E]/20 px-2 py-0.5 text-[10px] font-mono text-[#22C55E]">
                      Savings &gt; ₹10,000/mo
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold font-mono text-[#22C55E]">
                      ₹0 Base Software Fee
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#94A3B8]">
                    Electrad bills a pre-agreed fixed percentage cut (e.g. 15–20%) of <strong className="text-[#F8FAFC]">strictly verified savings</strong> confirmed on your plant floor. If you save ₹1,50,000, we invoice our share from money already retained from the discom.
                  </p>
                </div>

                <div className="rounded-xl border border-[#1E3529] bg-[#0B1410] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Scenario B: Maintenance Baseline Month
                    </span>
                    <span className="rounded bg-[#1E3529] px-2 py-0.5 text-[10px] font-mono text-[#94A3B8]">
                      Savings ≤ ₹10,000/mo
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-bold font-mono text-[#F8FAFC]">
                      Nominal Maintenance Base
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#94A3B8]">
                    When your facility has already achieved steady-state lean efficiency, a low nominal base subscription covers secure MQTT cloud data pipelines, automated WhatsApp dispatch, and BEE compliance reporting.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#1E3529] pt-4">
              <Link
                href="/#pilot"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] py-3 text-xs font-bold text-[#0B1410] transition-colors hover:bg-[#4ADE80]"
              >
                <span>Request Facility Audit & Feasibility Scope</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
