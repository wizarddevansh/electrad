import React from "react";
import { ExternalLink } from "lucide-react";

export function VerifiedDataStrip() {
  const cards = [
    {
      category: "National Power Demand",
      metric: "42%",
      subtitle: "of India's 15,43,000 GWh Electricity",
      description:
        "Industrial manufacturing accounts for 42% of total national electricity consumption, representing the highest-leverage decarbonization target.",
      sourceLabel: "MoSPI Energy Statistics 2025",
      sourceUrl:
        "https://www.mospi.gov.in/sites/default/files/publication_reports/Energy_Statistics_2025/Energy%20Statistics%20India%202025_27032025.pdf",
    },
    {
      category: "BEE ADEETIE Mandate",
      metric: "60 → 160",
      subtitle: "Industrial Clusters Across 14 Sectors",
      description:
        "BEE's ₹1,000 Cr ADEETIE initiative (FY 2025–28) supports Udyam MSMEs across 60 clusters in proving ≥10% project-level energy savings; Electrad helps plants track and pre-qualify savings.",
      sourceLabel: "PIB / Ministry of Power (ADEETIE)",
      sourceUrl: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144822",
    },
    {
      category: "Pneumatics Waste Vector",
      metric: "5–35%",
      subtitle: "of Factory Power with ~30% Waste",
      description:
        "Compressed air consumes up to 35% of total plant energy, with ~30% avoidable electrical loss caused by distribution line leaks.",
      sourceLabel: "IGES / JITMAP India Forging Study",
      sourceUrl:
        "https://jitmap.org/files/reports/Compressed-air-system-for-forging-2.pdf",
    },
    {
      category: "EMS & Carbon Baselines",
      metric: "11% | 0.710",
      subtitle: "Avg. Savings & kg CO₂/kWh Factor",
      description:
        "IEA benchmarks document 11% average year-one savings from EMS, while CEA certifies India's grid factor at 0.710 kg CO₂ per kWh.",
      sourceLabel: "IEA EMS Benchmarks / CEA Baseline v21.0",
      sourceUrl: "https://cea.nic.in/api/cdm-report-version/view-pdf/en/82",
    },
  ];

  return (
    <section className="border-y border-[#1C2E25] bg-[#0A110E] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
              Indian Regulatory & Industrial Baselines
            </span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#F4F7F5] sm:text-3xl">
              Grounded in Official Indian Energy Realities
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#94A39B] md:text-right">
            Every metric and threshold modeled in Electrad is anchored in official Indian regulatory frameworks and empirical audits.
          </p>
        </div>

        {/* Clean 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#1C2E25] bg-[#101B16] p-6 transition-all hover:border-[#2A4739]"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A39B]">
                  {card.category}
                </span>

                <div className="mt-4">
                  <div className="text-3xl font-extrabold font-mono text-[#F4F7F5] tabular-nums tracking-tight">
                    {card.metric}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#10B981]">
                    {card.subtitle}
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#94A39B]">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#1C2E25] pt-3">
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[11px] text-[#94A39B] hover:text-[#10B981] transition-colors"
                >
                  <span className="truncate">{card.sourceLabel}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-[#94A39B] group-hover:text-[#10B981]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
