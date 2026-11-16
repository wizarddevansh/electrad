import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electrad | Machine-Level Industrial Energy Intelligence",
  description:
    "Non-invasive CT clamp and edge telemetry with statistical idle baselines to eliminate industrial power waste across manufacturing facilities.",
  keywords: [
    "Electrad",
    "Industrial Energy Monitoring",
    "Energy Waste Detection",
    "BEE ADEETIE",
    "Compressed Air Leak Detection",
    "Statistical Baseline Engine",
    "CT Clamp ESP32 IoT",
    "Manufacturing Energy Savings",
  ],
  openGraph: {
    title: "Electrad — Stop Operating Energy-Blind",
    description:
      "Non-invasive CT clamp monitoring with statistical baselines and 1-tap floor confirmation for industrial operations.",
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
      <body className="min-h-screen bg-[#0A110E] text-[#F4F7F5] antialiased selection:bg-[#10B981]/25 selection:text-[#10B981]">
        {children}
      </body>
    </html>
  );
}
