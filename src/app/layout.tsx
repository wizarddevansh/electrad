import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electrad | Industrial Energy Monitoring & Waste Detection",
  description:
    "Non-invasive CT clamp + ESP32 monitoring with a statistical baseline engine and 1-tap floor confirmation for Indian industries. Built by Devansh Patel (Founder, WizoupWorks) for India's National Startup Awards 6.0.",
  keywords: [
    "Electrad",
    "Industrial Energy Monitoring",
    "Energy Waste Detection",
    "BEE ADEETIE",
    "Compressed Air Leak Detection",
    "Statistical Baseline Engine",
    "CT Clamp ESP32 IoT",
    "Indian Manufacturing Energy Savings",
    "National Startup Awards",
    "WizoupWorks",
  ],
  authors: [{ name: "Devansh Patel (WizoupWorks)" }],
  openGraph: {
    title: "Electrad — Stop Operating Energy-Blind",
    description:
      "CT clamp + ESP32 edge telemetry and statistical idle baselines to eliminate industrial power waste across Indian MSMEs and enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0B1410] text-[#F8FAFC] antialiased selection:bg-[#22C55E]/30 selection:text-[#4ADE80]">
        {children}
      </body>
    </html>
  );
}
