"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ElectradLogo } from "@/components/ElectradLogo";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1C2E25] bg-[#0A110E]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand: Logo + Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <ElectradLogo className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#F4F7F5]">
                ELECTRAD
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-[#94A39B]">
                Industrial Energy Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-[#94A39B]">
          <Link
            href="/#overview"
            className="transition-colors hover:text-[#F4F7F5]"
          >
            Overview
          </Link>
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-[#F4F7F5]"
          >
            How It Works
          </Link>
          <Link
            href="/#simulator"
            className="transition-colors hover:text-[#F4F7F5]"
          >
            Impact Simulator
          </Link>
          <Link
            href="/#business-model"
            className="transition-colors hover:text-[#F4F7F5]"
          >
            Business Model
          </Link>
          <Link
            href="/disclaimer"
            className="transition-colors hover:text-[#F4F7F5]"
          >
            Disclaimer
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 rounded-lg border border-[#1C2E25] bg-[#101B16] px-3.5 py-1.5 font-semibold text-[#F4F7F5] transition-all hover:border-[#10B981] hover:text-[#10B981]"
          >
            <span>Live PoC Dashboard</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#10B981]" />
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className="rounded-lg border border-[#1C2E25] bg-[#101B16] px-2.5 py-1.5 text-xs font-semibold text-[#10B981]"
          >
            PoC Demo
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-[#1C2E25] p-2 text-[#94A39B] hover:bg-[#101B16] hover:text-[#F4F7F5]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1C2E25] bg-[#0A110E] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2.5 text-sm font-medium text-[#94A39B]">
            <Link
              href="/#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#F4F7F5]"
            >
              Overview
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#F4F7F5]"
            >
              How It Works
            </Link>
            <Link
              href="/#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#F4F7F5]"
            >
              Impact Simulator
            </Link>
            <Link
              href="/#business-model"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#F4F7F5]"
            >
              Business Model
            </Link>
            <Link
              href="/disclaimer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-[#F4F7F5]"
            >
              Disclaimer & Regulatory Notes
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg border border-[#1C2E25] bg-[#101B16] px-3 py-2 text-sm font-semibold text-[#10B981]"
            >
              <span>Launch Live PoC Dashboard</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
