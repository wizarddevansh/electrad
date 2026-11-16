# Electrad — Industrial Energy Intelligence & Waste Detection

> **"Stop Operating Energy-Blind"**  
> Non-invasive CT clamp + ESP32 edge telemetry with a statistical baseline engine and 1-tap floor confirmation for Indian industrial facilities.

---

## ⚡ Ground-Truth Energy Waste in Indian Manufacturing

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

## 💼 Transparent Business Model

- **Hardware Scope**: Non-invasive hardware kit scoped to facility size and circuit branching (split-core CT clamps, IP65 industrial enclosure, ESP32 gateway module, and on-site phase calibration).
- **Outcome-Aligned Tiering**:
  - **Verified Savings > ₹10,000/month**: **₹0 base software fee**. Electrad bills an agreed percentage cut of *only* verified savings proven on the plant floor.
  - **Verified Savings ≤ ₹10,000/month**: Nominal base maintenance subscription covering MQTT cloud pipeline, telemetry storage, and compliance report exports.

---

## 🚀 Zero-Dependency Architecture

This web application is **100% self-contained and client-side resilient**:
- **Zero Database Required**: All state (1-Tap floor confirmations, verified ledger updates, simulated feeder telemetry, and interactive controls) runs safely in React state + `localStorage`.
- **Zero Environment Variables Required**: Builds and deploys instantly on Vercel without configuring `.env` keys.

---

## 💻 Local Development & Build

### 1. Installation
```bash
git clone https://github.com/wizarddevansh/electrad-nsa6.git electrad
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

- **Background**: Deep Charcoal Canvas (`#0A110E`)
- **Card Surfaces**: Elevated Industrial Dark Slate (`#101B16`)
- **Borders**: Subdued Grid (`#1C2E25`)
- **Primary Text**: Crisp Off-White (`#F4F7F5`)
- **Secondary Text**: Muted Sage (`#94A39B`)
- **Brand Accent**: Emerald Green (`#10B981`)
- **Status Indicators**: Normal (`#10B981`), Amber (`#F59E0B`), Alert (`#EF4444`)

---

## ⚖️ Disclaimer

Electrad is an illustrative technology concept and interactive proof-of-concept (PoC) demonstration for industrial energy monitoring. Telemetry feeds shown in the demonstration dashboard are simulated models for illustrative purposes. For citations and methodology, see `/disclaimer`.

© 2026 Electrad. Illustrative Concept & PoC Demonstration.
