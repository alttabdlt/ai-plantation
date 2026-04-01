import { ALERTS, MACHINERY } from "@/lib/plantation-data";

export type LayerID =
  | "health"
  | "stress"
  | "disease"
  | "weather"
  | "water"
  | "assets"
  | "infrastructure"
  | "market"
  | "threats";

export interface IntelEvent {
  id: string;
  layer: LayerID;
  severity: "info" | "low" | "medium" | "high" | "critical";
  lat: number;
  lng: number;
  title: string;
  detail: string;
  source: string;
  timestamp: string; // ISO 8601
  relatedBlockId?: string;
  aiSummary?: string;
  recommendedAction?: string;
}

export interface LayerConfig {
  id: LayerID;
  name: string;
  color: string;
  description: string;
}

export const LAYER_CONFIGS: LayerConfig[] = [
  { id: "health", name: "Field Health", color: "#22c55e", description: "Per-block health heatmap" },
  { id: "stress", name: "Stress Hotspots", color: "#ef4444", description: "Multi-signal stress convergence" },
  { id: "disease", name: "Disease & Pest", color: "#f97316", description: "Outbreak detection & regional alerts" },
  { id: "weather", name: "Weather", color: "#3b82f6", description: "Live conditions & forecast" },
  { id: "water", name: "Water Intel", color: "#06b6d4", description: "Irrigation & moisture contours" },
  { id: "assets", name: "Equipment", color: "#8b5cf6", description: "Drone, tractor & station positions" },
  { id: "infrastructure", name: "Infrastructure", color: "#f59e0b", description: "Sensor health & connectivity" },
  { id: "market", name: "Market", color: "#ec4899", description: "Coffee price & futures" },
  { id: "threats", name: "Active Threats", color: "#ef4444", description: "Urgent action items" },
];

// Block center coordinates for placing events within blocks
const BLOCK_CENTERS: Record<string, { lat: number; lng: number }> = {
  A: { lng: 108.048, lat: 12.686 },
  B: { lng: 108.057, lat: 12.686 },
  C: { lng: 108.065, lat: 12.685 },
  D: { lng: 108.046, lat: 12.679 },
  E: { lng: 108.055, lat: 12.679 },
  F: { lng: 108.062, lat: 12.679 },
};

// Map alert field names to block IDs
function fieldToBlockId(field: string): string | undefined {
  const map: Record<string, string> = {
    "Bourbon Block": "A",
    "Typica Terrace": "B",
    "Gesha Garden": "C",
    "Catuai Ridge": "D",
    "SL28 Slope": "E",
    "Caturra Flat": "F",
  };
  return map[field];
}

function alertSeverityToIntel(type: string): IntelEvent["severity"] {
  if (type === "danger") return "critical";
  if (type === "warning") return "high";
  if (type === "info") return "medium";
  return "low";
}

function alertToLayer(type: string): LayerID {
  if (type === "danger") return "threats";
  if (type === "warning") return "stress";
  return "health";
}

// Convert mock ALERTS to IntelEvents
const alertEvents: IntelEvent[] = ALERTS.map((alert) => {
  const blockId = fieldToBlockId(alert.field);
  const center = blockId ? BLOCK_CENTERS[blockId] : BLOCK_CENTERS.A;
  // Add small random offset so events don't stack
  const jitter = () => (Math.random() - 0.5) * 0.002;

  return {
    id: `alert-${alert.id}`,
    layer: alertToLayer(alert.type),
    severity: alertSeverityToIntel(alert.type),
    lat: center.lat + jitter(),
    lng: center.lng + jitter(),
    title: `${alert.field}: ${alert.message.split("—")[0].trim()}`,
    detail: alert.message,
    source: blockId ? `Sensor Array Block ${blockId}` : "Estate-wide",
    timestamp: new Date(2026, 2, 31, parseInt(alert.time.split(":")[0]), parseInt(alert.time.split(":")[1])).toISOString(),
    relatedBlockId: blockId,
    aiSummary: alert.type === "danger"
      ? "NDVI decline pattern consistent with early-stage leaf rust. Cross-reference with moisture deficit and regional disease alerts."
      : undefined,
    recommendedAction: alert.type === "danger"
      ? "Deploy fungicide application to Catuai Ridge within 48 hours. Schedule drone NDVI rescan for Wednesday."
      : alert.type === "warning"
      ? "Monitor closely. Prepare contingency irrigation or drainage adjustment."
      : undefined,
  };
});

// Additional mock events for other layers
const additionalEvents: IntelEvent[] = [
  // Weather events
  {
    id: "weather-1",
    layer: "weather",
    severity: "high",
    lat: 12.684,
    lng: 108.052,
    title: "Heavy rain system approaching",
    detail: "72-85% precipitation probability Tue-Wed. Expected 45-60mm over 36 hours.",
    source: "Open-Meteo Forecast",
    timestamp: new Date(2026, 2, 31, 6, 0).toISOString(),
    aiSummary: "Rain system will elevate soil moisture across all blocks. Gesha Garden (already at 58%) at risk of waterlogging.",
    recommendedAction: "Activate drainage channels in Block C. Pause irrigation Zone 1 & 2 from Monday evening.",
  },
  // Disease events
  {
    id: "disease-1",
    layer: "disease",
    severity: "high",
    lat: 12.680,
    lng: 108.047,
    title: "Leaf rust risk — Catuai Ridge",
    detail: "NDVI declining at 0.54 combined with moisture stress at 22%. Regional leaf rust reports within 40km.",
    source: "AI Cross-layer Analysis",
    timestamp: new Date(2026, 2, 31, 7, 15).toISOString(),
    relatedBlockId: "D",
    aiSummary: "High confidence leaf rust risk. Moisture deficit + NDVI decline + regional spread vector all converge on Block D.",
    recommendedAction: "Apply preventive fungicide before Tuesday rain. Schedule lab sample collection.",
  },
  // Asset events
  {
    id: "asset-1",
    layer: "assets",
    severity: "info",
    lat: 12.687,
    lng: 108.047,
    title: "Drone Alpha — NDVI scanning",
    detail: "Active mission: Field A NDVI mapping. Battery 72%. ETA completion: 45 min.",
    source: "Drone Telemetry",
    timestamp: new Date(2026, 2, 31, 10, 30).toISOString(),
    relatedBlockId: "A",
  },
  {
    id: "asset-2",
    layer: "assets",
    severity: "info",
    lat: 12.679,
    lng: 108.063,
    title: "Tractor Unit 1 — fertilizer application",
    detail: "Fertilizer application in progress at Caturra Flat. 60% complete.",
    source: "Equipment GPS",
    timestamp: new Date(2026, 2, 31, 9, 45).toISOString(),
    relatedBlockId: "F",
  },
  // Water events
  {
    id: "water-1",
    layer: "water",
    severity: "high",
    lat: 12.685,
    lng: 108.065,
    title: "Overwatered zone — Gesha Garden",
    detail: "Soil moisture at 58%, well above optimal range (30-45%). Risk of root stress.",
    source: "Moisture Sensor C-04",
    timestamp: new Date(2026, 2, 31, 9, 45).toISOString(),
    relatedBlockId: "C",
    recommendedAction: "Reduce irrigation Zone 1 by 40%. Monitor drainage output.",
  },
  {
    id: "water-2",
    layer: "water",
    severity: "critical",
    lat: 12.678,
    lng: 108.046,
    title: "Critically low moisture — Catuai Ridge",
    detail: "Soil moisture at 22%, critically below optimal. Plants showing visible wilting.",
    source: "Moisture Sensor D-02",
    timestamp: new Date(2026, 2, 31, 8, 32).toISOString(),
    relatedBlockId: "D",
    recommendedAction: "Emergency irrigation activation. Priority: Block D southwest sector.",
  },
  // Market events
  {
    id: "market-1",
    layer: "market",
    severity: "medium",
    lat: 12.683,
    lng: 108.055,
    title: "Arabica futures up 3.2%",
    detail: "ICE Arabica futures $4.82/lb (+3.2% WoW). Brazilian drought concerns driving prices.",
    source: "ICE Futures",
    timestamp: new Date(2026, 2, 31, 8, 0).toISOString(),
  },
  // Infrastructure events
  {
    id: "infra-1",
    layer: "infrastructure",
    severity: "medium",
    lat: 12.677,
    lng: 108.056,
    title: "7 sensors offline",
    detail: "7 of 186 sensors reporting connection failure. Primarily in Block E southern cluster.",
    source: "Sensor Health Monitor",
    timestamp: new Date(2026, 2, 31, 5, 0).toISOString(),
    relatedBlockId: "E",
    recommendedAction: "Dispatch maintenance team to Block E. Check solar panel and LoRa gateway.",
  },
  // Stress events (AI-derived)
  {
    id: "stress-1",
    layer: "stress",
    severity: "critical",
    lat: 12.678,
    lng: 108.047,
    title: "Multi-signal stress convergence — Catuai Ridge",
    detail: "NDVI 0.54 (declining), moisture 22% (critical low), temp 24.6°C (above optimal). Three stress vectors converging.",
    source: "AI Stress Analysis",
    timestamp: new Date(2026, 2, 31, 7, 0).toISOString(),
    relatedBlockId: "D",
    aiSummary: "Highest-priority block. Compound stress from drought + heat + declining canopy health. Immediate intervention required.",
    recommendedAction: "1) Emergency irrigation. 2) Fungicide application. 3) Drone rescan Thursday to assess response.",
  },
  // Threat summary events
  {
    id: "threat-1",
    layer: "threats",
    severity: "critical",
    lat: 12.679,
    lng: 108.046,
    title: "PRIORITY: Catuai Ridge compound threat",
    detail: "Block D faces simultaneous drought stress, possible leaf rust, and incoming heavy rain that may spread fungal spores.",
    source: "AI Threat Assessment",
    timestamp: new Date(2026, 2, 31, 7, 30).toISOString(),
    relatedBlockId: "D",
    aiSummary: "Critical compound threat. Rain arriving Tue will spread rust spores to moisture-stressed Block D. Window for preventive action: 36 hours.",
    recommendedAction: "Apply copper-based fungicide today. Activate emergency irrigation. Brief field team.",
  },
];

export const INTEL_EVENTS: IntelEvent[] = [...alertEvents, ...additionalEvents];

// Default active layers on initial load
export const DEFAULT_LAYERS: LayerID[] = ["health", "threats", "infrastructure"];
