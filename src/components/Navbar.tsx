"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Activity, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E3529] bg-[#0B1410]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & NSA Tag */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#22C55E] to-[#15803D] text-[#0B1410] shadow-[0_0_15px_rgba(34,197,94,0.35)] transition-transform duration-200 group-hover:scale-105">
              <Zap className="h-5 w-5 fill-current stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#F8FAFC]">
                Electrad
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#94A3B8]">
                Industrial Energy Telemetry
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 ml-4 rounded-full border border-[#1E3529] bg-[#122019] px-2.5 py-1 text-[11px] font-medium text-[#4ADE80]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"></span>
            </span>
            <span>NSA 6.0 Finalist • Green & Blue Economy</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
          <Link
            href="/#data-strip"
            className="transition-colors hover:text-[#4ADE80]"
          >
            Verified Data
          </Link>
          <Link
            href="/#architecture"
            className="transition-colors hover:text-[#4ADE80]"
          >
            How It Works
          </Link>
          <Link
            href="/#calculator"
            className="transition-colors hover:text-[#4ADE80]"
          >
            Savings Calculator
          </Link>
          <Link
            href="/#business-model"
            className="transition-colors hover:text-[#4ADE80]"
          >
            Business Model
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-[#F8FAFC] transition-colors hover:text-[#4ADE80]"
          >
            <Activity className="h-4 w-4 text-[#22C55E]" />
            <span>PoC Demo</span>
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#pilot"
            className="rounded-lg border border-[#1E3529] bg-[#122019] px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition-all duration-200 hover:border-[#22C55E]/50 hover:bg-[#16281F]"
          >
            Request Pilot
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg bg-[#22C55E] px-4 py-2 text-xs font-semibold text-[#0B1410] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-200 hover:bg-[#4ADE80] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)]"
          >
            <span>Live Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className="rounded bg-[#22C55E] px-2.5 py-1.5 text-xs font-semibold text-[#0B1410]"
          >
            PoC Demo
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-[#1E3529] p-2 text-[#94A3B8] hover:bg-[#122019] hover:text-[#F8FAFC]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1E3529] bg-[#0B1410] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-[#94A3B8]">
            <div className="flex items-center gap-2 rounded-lg border border-[#1E3529] bg-[#122019] px-3 py-2 text-xs text-[#4ADE80]">
              <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
              <span>National Startup Awards 6.0 Finalist Entry</span>
            </div>
            <Link
              href="/#data-strip"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#4ADE80]"
            >
              Verified Indian Data
            </Link>
            <Link
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#4ADE80]"
            >
              How It Works (6-Step Architecture)
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#4ADE80]"
            >
              Savings & CO₂ Calculator
            </Link>
            <Link
              href="/#business-model"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#4ADE80]"
            >
              2-Part Outcome Business Model
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 text-[#22C55E] font-semibold"
            >
              <Activity className="h-4 w-4" />
              <span>Interactive PoC Dashboard</span>
            </Link>
            <Link
              href="/#pilot"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center rounded-lg bg-[#22C55E] py-2.5 text-xs font-semibold text-[#0B1410]"
            >
              Request Plant Pilot Setup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
