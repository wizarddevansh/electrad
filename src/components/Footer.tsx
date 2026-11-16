import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1E3529] bg-[#080E0B] text-[#94A3B8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#22C55E] text-[#0B1410] font-bold">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F8FAFC]">
                Electrad
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#94A3B8]">
              Industrial energy monitoring and waste-detection platform for Indian industries of all scales. Eliminating idle load waste and compressed air leaks with non-invasive CT clamp telemetry and statistical baselines.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#4ADE80]">
              <Award className="h-4 w-4 text-[#22C55E]" />
              <span>National Startup Awards (NSA) 6.0 Finalist Entry</span>
            </div>

            <div className="mt-1 text-xs text-[#94A3B8]">
              Young Changemakers • Green & Blue Economy Track
            </div>

            <div className="mt-3 text-xs text-[#F8FAFC]/90">
              Founded & Built by <strong className="text-[#F8FAFC]">Devansh Patel</strong> (Founder, WizoupWorks)
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8FAFC]">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/#data-strip" className="hover:text-[#4ADE80]">
                  Verified Indian Data Strip
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="hover:text-[#4ADE80]">
                  6-Step Architecture Flow
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-[#4ADE80]">
                  Savings & CO₂ Calculator
                </Link>
              </li>
              <li>
                <Link href="/#business-model" className="hover:text-[#4ADE80]">
                  2-Part Business Model
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#22C55E] font-medium hover:underline flex items-center gap-1">
                  <span>Interactive PoC Dashboard</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link href="/#pilot" className="hover:text-[#4ADE80]">
                  Request Plant Pilot Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory Baselines */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8FAFC]">
              Indian Regulatory Baselines
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[#94A3B8]">
              <li className="flex items-start gap-1.5">
                <span className="text-[#22C55E]">•</span>
                <span>BEE ADEETIE (≥10% MSME Savings Mandate)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#22C55E]">•</span>
                <span>CEA CO₂ Baseline v21.0 (0.710 kg/kWh)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#22C55E]">•</span>
                <span>MoSPI Energy Statistics 2025 (15,43,000 GWh)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#22C55E]">•</span>
                <span>IGES / JITMAP Compressed Air Benchmarks</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#22C55E]">•</span>
                <span>UPERC LMV-6 & HV-2 Industrial Tariffs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E3529] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Electrad (WizoupWorks). All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Engineered for Indian Manufacturing with Zero Production Downtime.
          </p>
        </div>
      </div>
    </footer>
  );
}
