# Electrad — Industrial Energy Monitoring & Waste Detection

> **"Stop Operating Energy-Blind"**  
> Non-invasive CT clamp + ESP32 edge telemetry with a statistical baseline engine and 1-tap floor confirmation for Indian industries of all scales.

Built by **Devansh Patel** (Founder, WizoupWorks) for India's **National Startup Awards (NSA) 6.0** (Young Changemakers • Green & Blue Economy Track).

---

## ⚡ The Ground-Truth Problem in Indian Manufacturing

1. **42% Industrial Electricity Share**: Industry is the single largest consumer of India's **15,43,000 GWh** total electricity consumption (*MoSPI Energy Statistics India 2025*).
2. **BEE ADEETIE Mandate**: **60 Phase-1 Industrial Clusters** across **14 sectors** are required to demonstrate **≥10% verified energy savings** (*PIB / Bureau of Energy Efficiency*).
3. **Pneumatics Waste Vector**: **5% to 35% of total factory power** is consumed by compressed air systems, with **~30% avoidable electrical waste** caused by undetected distribution line leaks (*IGES / JITMAP Benchmarks*).
4. **CEA Carbon Factor**: Every 1,000 kWh saved eliminates **710 kg of carbon emissions** (*CEA CO₂ Baseline Database v21.0, 0.710 kg CO₂/kWh*).

---

## 🛠️ 6-Step Waste Detection Architecture

```
[01. CT Clamps] ──> [02. ESP32 Edge Node] ──> [03. Wi-Fi / GSM] ──> [04. Baseline Engine] ──> [05. 1-Tap Confirm] ──> [06. Verified Ledger]
  (Split-Core)        (True RMS 2kHz)           (Lightweight MQTT)    (Idle + BEE Leak)      ("Confirm Idle Waste")    (Rupees & CEA CO₂)
```

1. **Split-Core CT Clamps (Non-Invasive)**: 100A–800A snap-on current transformers around existing incoming busbars and machine feeder cables. Zero plant shutdowns, zero wire slicing.
2. **ESP32 Edge Node (ADC Sampling)**: 2 kHz ADC sampling computing true RMS current ($I_{rms}$) and apparent load, with local noise filtering and power factor estimation.
3. **Wi-Fi / GSM (MQTT Telemetry)**: Fail-safe telemetry bus with local storage buffering during factory network drops.
4. **Statistical Baseline Engine**: Rolling median calculation isolating off-shift idle floors and automating BEE-standard on-load vs. off-load duty-cycle timing ($L = \frac{T}{T+t}$) without requiring plant shutdowns.
5. **1-Tap Floor Confirm Loop**: Instant alerts to plant supervisors ("Confirm Production" vs. "Confirm Idle Waste") ensuring human-in-the-loop accuracy and eliminating false positives.
6. **Verified Audit Ledger**: Real-time financial ledger calculating rupees saved and CEA-certified metric tonnes of CO₂ avoided for ESG and BEE ADEETIE compliance.

---

## 💼 2-Part Transparent Business Model

- **Part 1: Non-Invasive Hardware Kit**: Scoped transparently to the facility size and circuit branching (split-core CT clamps, IP65 industrial enclosure, ESP32 gateway module, and on-site phase calibration). No arbitrary fixed BOM inflation.
- **Part 2: Outcome-Aligned SaaS**:
  - **Verified Savings > ₹10,000/month**: **₹0 base software fee**. Electrad bills an agreed percentage cut of *only* verified savings proven on the plant floor.
  - **Verified Savings ≤ ₹10,000/month**: Nominal base maintenance subscription covering MQTT cloud pipeline, alert dispatch, and compliance report exports.

---

## 🚀 Zero-Dependency Architecture

This web application is **100% self-contained and client-side resilient**:
- **Zero Database Required**: All state (1-Tap floor confirmations, verified ledger updates, simulated feeder telemetry, and pilot inquiries) runs safely in React state + `localStorage`.
- **Zero Environment Variables Required**: Builds and deploys instantly on Vercel without configuring `.env` keys.
- **Direct Founder Reachout**: One-click direct email link to `wizarddevansh21@gmail.com` for immediate pilot scheduling.

---

## 💻 Local Development & Build

### 1. Installation
```bash
git clone <repo-url> electrad
cd electrad
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the interactive PoC demo.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🎨 Visual & Brand System

- **Background**: Deep Charcoal-Green (`#0B1410`)
- **Card Surfaces**: Elevated Industrial Dark Slate (`#122019`)
- **Borders**: Subdued Forest Grid (`#1E3529`)
- **Primary Text**: Crisp White (`#F8FAFC`)
- **Secondary Text**: Muted Sage (`#94A3B8`)
- **Neon-Mint Accent**: (`#22C55E` / `#4ADE80`)
- **Warning & Anomaly**: Amber (`#F59E0B`) & Alert Rose (`#EF4444`)

---

## 🏆 National Startup Awards (NSA) 6.0

- **Track**: Young Changemakers • Green & Blue Economy
- **Founder**: Devansh Patel
- **Studio**: WizoupWorks
- **Contact**: [wizarddevansh21@gmail.com](mailto:wizarddevansh21@gmail.com)
- **Brand**: Electrad
