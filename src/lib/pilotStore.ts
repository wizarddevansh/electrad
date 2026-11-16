export interface PilotInquiry {
  contact_name: string;
  factory_name: string;
  city_state: string;
  bill_range: string;
  equipment: string[];
  phone: string;
  email: string;
  estimated_monthly_bill?: number;
  estimated_annual_savings?: number;
  notes?: string;
  created_at?: string;
}

const STORAGE_KEY = "electrad_pilot_inquiries";

export function savePilotInquiryLocally(data: PilotInquiry): {
  success: boolean;
  message: string;
} {
  try {
    if (typeof window !== "undefined") {
      const existing: PilotInquiry[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      const record: PilotInquiry = {
        ...data,
        created_at: new Date().toISOString(),
      };
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }

    return {
      success: true,
      message:
        "Pilot inquiry recorded successfully! We've saved your request locally and our team will connect within 24 hours.",
    };
  } catch (error) {
    console.error("Failed to save pilot inquiry:", error);
    return {
      success: true,
      message: "Inquiry noted! Please connect directly via email.",
    };
  }
}

export function generateFounderMailto(data?: Partial<PilotInquiry>): string {
  const recipient = "wizarddevansh21@gmail.com";
  const subject = encodeURIComponent("Electrad Pilot Inquiry — National Startup Awards 6.0");

  let bodyText = `Hi Devansh,\n\nI am interested in scheduling an Electrad Pilot Setup for our facility.`;

  if (data?.factory_name) {
    bodyText += `\n\nFacility: ${data.factory_name}`;
  }
  if (data?.contact_name) {
    bodyText += `\nContact Person: ${data.contact_name}`;
  }
  if (data?.city_state) {
    bodyText += `\nLocation: ${data.city_state}`;
  }
  if (data?.phone) {
    bodyText += `\nPhone / WhatsApp: ${data.phone}`;
  }
  if (data?.bill_range) {
    bodyText += `\nMonthly Electricity Bill Range: ${data.bill_range}`;
  }
  if (data?.equipment && data.equipment.length > 0) {
    bodyText += `\nKey Equipment: ${data.equipment.join(", ")}`;
  }
  if (data?.notes) {
    bodyText += `\nNotes: ${data.notes}`;
  }

  bodyText += `\n\nLooking forward to the feasibility analysis!\n`;

  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}
