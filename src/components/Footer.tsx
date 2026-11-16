import React from "react";
import Link from "next/link";
import { ElectradLogo } from "@/components/ElectradLogo";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1C2E25] bg-[#0A110E] text-[#94A39B]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <ElectradLogo className="h-7 w-7" />
              <span className="text-xl font-bold tracking-tight text-[#F4F7F5]">
                ELECTRAD
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#94A39B]">
              Non-invasive machine-level energy visibility for Indian industry.
            </p>
            <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-[#94A39B]/80">
              CT clamp telemetry, automated idle floors, and BEE-standard compressor leak diagnostics.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F7F5]">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/#overview" className="hover:text-[#F4F7F5] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#F4F7F5] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#simulator" className="hover:text-[#F4F7F5] transition-colors">
                  Impact Simulator
                </Link>
              </li>
              <li>
                <Link href="/#business-model" className="hover:text-[#F4F7F5] transition-colors">
                  Business Model
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#10B981] font-medium hover:underline inline-flex items-center gap-1">
                  <span>Live PoC Dashboard</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#F4F7F5] transition-colors">
                  Disclaimer & Regulatory Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Indian Regulatory & Research Baselines */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F7F5]">
              Regulatory & Research Baselines
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[#94A39B]">
              <li>
                <a
                  href="https://www.mospi.gov.in/sites/default/files/publication_reports/Energy_Statistics_2025/Energy%20Statistics%20India%202025_27032025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>MoSPI Energy Statistics India 2025</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>BEE ADEETIE Scheme (PIB / MoP)</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://cea.nic.in/api/cdm-report-version/view-pdf/en/82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>CEA CO₂ Baseline v21.0 (0.710 kg/kWh)</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://beeindia.gov.in/WriteReadData/L45218/1734411984.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>BEE MSME Energy Conservation</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://jitmap.org/files/reports/Compressed-air-system-for-forging-2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>IGES / JITMAP Forging Study</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.uperc.org/App_File/DiscomsPressNote-pdf72202640356PM.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
                >
                  <span>UPERC FY 2026–27 Tariff Order</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Strict Clean Bottom Bar */}
        <div className="mt-10 border-t border-[#1C2E25] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A39B]">
          <p>© 2026 Electrad. Illustrative Concept &amp; PoC Demonstration.</p>
          <div className="mt-2 sm:mt-0 flex items-center gap-4 text-[11px]">
            <Link href="/disclaimer" className="hover:text-[#10B981] transition-colors">
              Technical Disclaimer
            </Link>
            <span className="text-[#1C2E25]">|</span>
            <Link href="/dashboard" className="hover:text-[#10B981] transition-colors">
              Live PoC Telemetry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
