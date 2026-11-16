"use client";

import React, { useState } from "react";
import {
  Factory,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import {
  savePilotInquiryLocally,
  generateFounderMailto,
  type PilotInquiry,
} from "@/lib/pilotStore";
import { formatINR } from "@/lib/utils";

const BILL_RANGES = [
  "₹50,000 – ₹2,00,000 / month (Small MSME)",
  "₹2,00,000 – ₹10,00,000 / month (Medium Industrial)",
  "₹10,00,000 – ₹50,00,000 / month (Large Manufacturing)",
  "₹50,00,000+ / month (Heavy Process / Steel / Cement)",
];

const EQUIPMENT_OPTIONS = [
  { id: "compressors", label: "Air Compressors (Pneumatics Utility)" },
  { id: "motors", label: "Induction Motors & Pumps" },
  { id: "furnaces", label: "Furnaces, Ovens & Heaters" },
  { id: "cnc", label: "CNC Machines & Hydraulic Presses" },
  { id: "chillers", label: "Cooling Towers & Chillers" },
  { id: "other", label: "Other Heavy Feeder Lines" },
];

export function PilotForm({
  initialBill,
  initialSavings,
}: {
  initialBill?: number;
  initialSavings?: number;
}) {
  const [formData, setFormData] = useState<PilotInquiry>({
    contact_name: "",
    factory_name: "",
    city_state: "",
    bill_range: BILL_RANGES[1],
    equipment: ["compressors", "motors"],
    phone: "",
    email: "",
    estimated_monthly_bill: initialBill,
    estimated_annual_savings: initialSavings,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCheckboxToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.equipment.includes(id);
      return {
        ...prev,
        equipment: exists
          ? prev.equipment.filter((item) => item !== id)
          : [...prev.equipment, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.contact_name ||
      !formData.factory_name ||
      !formData.phone ||
      !formData.email
    ) {
      setErrorMessage("Please fill in all required fields (Name, Factory, Phone, Email).");
      return;
    }

    setLoading(true);
    try {
      const response = savePilotInquiryLocally(formData);
      setSubmitted(true);
      setResultMessage(response.message);
    } catch {
      setErrorMessage("Could not record inquiry. Please reach out directly via email.");
    } finally {
      setLoading(false);
    }
  };

  const directMailtoUrl = generateFounderMailto(formData);

  return (
    <section id="pilot" className="relative bg-[#0B1410] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3529] bg-[#122019] px-3 py-1 text-xs font-semibold text-[#4ADE80] uppercase tracking-wider">
            <Factory className="h-3.5 w-3.5 text-[#22C55E]" />
            <span>Industrial Pilot Onboarding</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
            Request an On-Site Electrad Pilot Setup
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Equip up to 3 major machine feeders with non-invasive split-core CT clamps for a 30-day zero-disruption trial. We verify your idle baseline and detect hidden air leaks.
          </p>

          {/* Direct Founder Email Quick Bar */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="mailto:wizarddevansh21@gmail.com?subject=Electrad%20Pilot%20Inquiry"
              className="inline-flex items-center gap-2 rounded-xl border border-[#22C55E]/40 bg-[#122019] px-4 py-2 text-xs font-semibold text-[#4ADE80] shadow-sm transition-all hover:bg-[#16281F] hover:border-[#22C55E]"
            >
              <Mail className="h-4 w-4 text-[#22C55E]" />
              <span>Direct Email: wizarddevansh21@gmail.com</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1E3529] bg-[#122019] p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E]">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#F8FAFC]">
                Pilot Request Saved Locally!
              </h3>
              <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed text-[#94A3B8]">
                {resultMessage}
              </p>

              {/* 1-Click Direct Mailto Button with Pre-filled payload */}
              <div className="mt-6 max-w-md mx-auto rounded-xl border border-[#22C55E]/40 bg-[#0B1410] p-5 text-left">
                <div className="text-xs font-semibold text-[#4ADE80] flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Immediate Direct Connect:</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  For judges, investors, or factory plant heads seeking priority review, click below to dispatch this inquiry straight to Founder Devansh Patel:
                </p>
                <a
                  href={directMailtoUrl}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-4 py-3 text-xs font-bold text-[#0B1410] shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:bg-[#4ADE80]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email to Founder (wizarddevansh21@gmail.com)</span>
                </a>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      contact_name: "",
                      factory_name: "",
                      city_state: "",
                      bill_range: BILL_RANGES[1],
                      equipment: ["compressors", "motors"],
                      phone: "",
                      email: "",
                      notes: "",
                    });
                  }}
                  className="rounded-xl border border-[#1E3529] bg-[#0B1410] px-6 py-2.5 text-xs font-semibold text-[#F8FAFC] hover:border-[#22C55E]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ROI Banner if pre-filled */}
              {formData.estimated_annual_savings && (
                <div className="flex items-center justify-between rounded-xl border border-[#22C55E]/40 bg-[#0B1410] p-4 text-xs">
                  <div className="flex items-center gap-2 text-[#4ADE80]">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-semibold">Calculated Target Savings:</span>
                  </div>
                  <span className="font-mono font-bold text-[#22C55E] text-sm">
                    {formatINR(formData.estimated_annual_savings)} / year
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Contact Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma (Plant Head)"
                    value={formData.contact_name}
                    onChange={(e) =>
                      setFormData({ ...formData, contact_name: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                  />
                </div>

                {/* Factory Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Factory / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Precision Forgings Pvt Ltd"
                    value={formData.factory_name}
                    onChange={(e) =>
                      setFormData({ ...formData, factory_name: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                  />
                </div>

                {/* City & State */}
                <div>
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Industrial Cluster / City & State *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Peenya, Bengaluru, Karnataka"
                      value={formData.city_state}
                      onChange={(e) =>
                        setFormData({ ...formData, city_state: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                    />
                    <MapPin className="absolute right-3.5 top-3.5 h-4 w-4 text-[#94A3B8]" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                    />
                    <Phone className="absolute right-3.5 top-3.5 h-4 w-4 text-[#94A3B8]" />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Official Work Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="rajesh@apexforgings.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                    />
                    <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-[#94A3B8]" />
                  </div>
                </div>

                {/* Electricity Bill Range */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Current Monthly Electricity Bill Range
                  </label>
                  <select
                    value={formData.bill_range}
                    onChange={(e) =>
                      setFormData({ ...formData, bill_range: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none"
                  >
                    {BILL_RANGES.map((r) => (
                      <option key={r} value={r} className="bg-[#0B1410] text-[#F8FAFC]">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Primary Heavy Equipment */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-2">
                    Primary Heavy Equipment on Site (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EQUIPMENT_OPTIONS.map((item) => {
                      const checked = formData.equipment.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleCheckboxToggle(item.id)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                            checked
                              ? "border-[#22C55E] bg-[#22C55E]/10 text-[#F8FAFC]"
                              : "border-[#1E3529] bg-[#0B1410] text-[#94A3B8] hover:border-[#22C55E]/30"
                          }`}
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              checked
                                ? "border-[#22C55E] bg-[#22C55E] text-[#0B1410]"
                                : "border-[#1E3529] bg-[#0B1410]"
                            }`}
                          >
                            {checked && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#F8FAFC] mb-1.5">
                    Specific Plant Concerns / Breaker Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We have two 55kW screw compressors and suspect frequent night-shift idling..."
                    value={formData.notes || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#1E3529] bg-[#0B1410] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:border-[#22C55E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit & Mailto dual actions */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] py-4 text-base font-bold text-[#0B1410] shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all hover:bg-[#4ADE80] disabled:opacity-50"
                >
                  <span>Submit Pilot Onboarding Request</span>
                  <Send className="h-4 w-4" />
                </button>

                <div className="text-center">
                  <span className="text-xs text-[#94A3B8]">or </span>
                  <a
                    href="mailto:wizarddevansh21@gmail.com?subject=Electrad%20Pilot%20Inquiry"
                    className="text-xs font-medium text-[#4ADE80] hover:underline"
                  >
                    Email wizarddevansh21@gmail.com directly
                  </a>
                </div>

                <p className="text-center text-[11px] text-[#94A3B8]">
                  Zero plant shutdown • 10-minute clamp installation • NDA protected electrical data
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
