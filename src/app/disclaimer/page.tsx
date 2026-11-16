import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ShieldAlert, Info, Database, FileText, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Disclaimer & Technical Notes | Electrad",
  description:
    "Concept demonstration scope, simulated telemetry details, and official regulatory data citations for the Electrad platform.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#0A110E] text-[#F4F7F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#94A39B] hover:text-[#10B981] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>

        <div className="border-b border-[#1C2E25] pb-6 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1C2E25] bg-[#101B16] px-3 py-1 text-xs font-medium text-[#10B981] mb-3">
            <Info className="h-3.5 w-3.5" />
            <span>Technical Notice & Compliance Disclosure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7F5]">
            Disclaimer & Regulatory Notes
          </h1>
          <p className="mt-2 text-sm text-[#94A39B]">
            Operational boundaries, synthetic telemetry disclosure, and regulatory data sources governing the Electrad web application.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1 */}
          <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-[#F4F7F5]">
                1. Concept & Educational Demonstration Only
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#94A39B]">
              Electrad is an early-stage technical concept and software Proof-of-Concept (PoC) illustrating edge-telemetry architectures and automated statistical baselining for industrial energy efficiency.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#94A39B]">
              Electrad is <strong className="text-[#F4F7F5]">not accepting commercial orders, hardware sales, paid pilot agreements, or consulting contracts</strong> at this stage. Any interfaces modeling financial outcomes, tariffs, or device topologies exist strictly to demonstrate system design and algorithmic capabilities.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <Database className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-[#F4F7F5]">
                2. Simulated Telemetry & Illustrative Data
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#94A39B]">
              All real-time telemetry streams, feeder load profiles, RMS current measurements (Phase R, Y, B), compressed air duty cycles, and facility names displayed on the <Link href="/dashboard" className="text-[#10B981] hover:underline">Live PoC Dashboard</Link> are <strong className="text-[#F4F7F5]">100% synthetic and mathematically simulated</strong>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#94A39B]">
              Plant identifiers (such as illustrative MSME cluster references) are fabricated placeholders generated for demonstration purposes and have <strong className="text-[#F4F7F5]">no affiliation with or measurement from any real-world enterprise or operating facility</strong>.
            </p>
          </div>

          {/* Section 3 */}
          <div className="rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold text-[#F4F7F5]">
                3. Approximate Calculator & Environmental Projections
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#94A39B]">
              Calculations performed in the Impact Simulator are mathematical approximations based on published regulatory standards and industrial empirical studies.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#94A39B]">
              Actual energy consumption, financial savings, and emissions avoidance in operational manufacturing plants will vary based on machine operating hours, maintenance schedules, mechanical degradation, seasonal ambient variations, actual power factor, and applicable regional DISCOM tariff schedules.
            </p>

            <div className="mt-6 border-t border-[#1C2E25] pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F4F7F5] mb-3">
                Official Regulatory Citations & Research Sources
              </h3>
              <ul className="space-y-2 text-xs text-[#94A39B]">
                <li>
                  <a
                    href="https://www.mospi.gov.in/sites/default/files/publication_reports/Energy_Statistics_2025/Energy%20Statistics%20India%202025_27032025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>Ministry of Statistics and Programme Implementation (MoSPI) — Energy Statistics India 2025</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>PIB / Ministry of Power — ADEETIE MSME Cluster Energy Efficiency Initiative</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cea.nic.in/api/cdm-report-version/view-pdf/en/82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>Central Electricity Authority (CEA) — CO₂ Baseline Database for the Indian Power Sector, Version 21.0 (0.710 kg CO₂/kWh)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://jitmap.org/files/reports/Compressed-air-system-for-forging-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>IGES / JITMAP — Compressed Air System Energy Efficiency in Indian Forging MSMEs</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.uperc.org/App_File/DiscomsPressNote-pdf72202640356PM.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>UPERC Tariff Order FY 2026–27 — Rate Schedules LMV-6 (₹9.02/kWh) and HV-2 (₹7.97/kWh)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.iea.org/commentaries/industrial-facilities-could-save-billions-by-implementing-energy-management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#10B981] inline-flex items-center gap-1.5"
                  >
                    <span>International Energy Agency (IEA) — Industrial Energy Management First-Year Benchmark</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
