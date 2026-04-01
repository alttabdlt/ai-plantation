import { FIELDS } from "@/lib/plantation-data";

// Plantation center: Vietnamese Central Highlands, Dak Lak province
export const PLANTATION_CENTER: [number, number] = [108.052, 12.681];
export const PLANTATION_ZOOM = 14.5;

// Status → fill color mapping
export function getBlockFillColor(status: string): string {
  if (status === "stress") return "rgba(239,68,68,0.45)";
  if (status === "wet") return "rgba(245,158,11,0.4)";
  return "rgba(34,197,94,0.35)";
}

export function getBlockStrokeColor(status: string): string {
  if (status === "stress") return "#ef4444";
  if (status === "wet") return "#f59e0b";
  return "#22c55e";
}

// GeoJSON polygon coordinates for each field block
// Arranged around the plantation center in a realistic highland layout
const BLOCK_POLYGONS: Record<string, [number, number][]> = {
  A: [ // Bourbon Block — northwest, 42 Ha
    [108.043, 12.688], [108.048, 12.690], [108.053, 12.689],
    [108.054, 12.685], [108.050, 12.683], [108.044, 12.684],
    [108.043, 12.688],
  ],
  B: [ // Typica Terrace — north-central, 35 Ha
    [108.054, 12.689], [108.059, 12.690], [108.062, 12.688],
    [108.061, 12.684], [108.056, 12.683], [108.054, 12.685],
    [108.054, 12.689],
  ],
  C: [ // Gesha Garden — northeast (highest altitude), 28 Ha
    [108.062, 12.688], [108.067, 12.689], [108.069, 12.686],
    [108.068, 12.683], [108.064, 12.682], [108.061, 12.684],
    [108.062, 12.688],
  ],
  D: [ // Catuai Ridge — southwest (lowest altitude, stressed), 38 Ha
    [108.044, 12.683], [108.050, 12.682], [108.052, 12.678],
    [108.048, 12.675], [108.043, 12.676], [108.041, 12.679],
    [108.044, 12.683],
  ],
  E: [ // SL28 Slope — south-central, 31 Ha
    [108.052, 12.682], [108.058, 12.683], [108.060, 12.679],
    [108.057, 12.676], [108.052, 12.676], [108.052, 12.678],
    [108.052, 12.682],
  ],
  F: [ // Caturra Flat — southeast, 26 Ha
    [108.060, 12.682], [108.065, 12.682], [108.067, 12.679],
    [108.065, 12.676], [108.060, 12.676], [108.060, 12.679],
    [108.060, 12.682],
  ],
};

// Build GeoJSON FeatureCollection from FIELDS data
export const FIELD_BLOCKS_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: FIELDS.map((field) => ({
    type: "Feature" as const,
    id: field.id,
    properties: {
      id: field.id,
      name: field.name,
      hectares: field.hectares,
      variety: field.variety,
      altitude: field.altitude,
      status: field.status,
      ndvi: field.ndvi,
      moisture: field.moisture,
      temp: field.temp,
      ph: field.ph,
      plants: field.plants,
      fillColor: getBlockFillColor(field.status),
      strokeColor: getBlockStrokeColor(field.status),
    },
    geometry: {
      type: "Polygon" as const,
      coordinates: [BLOCK_POLYGONS[field.id]],
    },
  })),
};

// Sensor node types and colors
const SENSOR_TYPE_COLORS: Record<string, string> = {
  soil: "#f59e0b",
  weather: "#22c55e",
  camera: "#a855f7",
  moisture: "#3b82f6",
  ndvi: "#14b8a6",
  pest: "#ef4444",
};

// Sensor positions scattered across field blocks
const SENSOR_POSITIONS: { lat: number; lng: number; type: string; blockId: string }[] = [
  // Block A sensors
  { lng: 108.047, lat: 12.687, type: "soil", blockId: "A" },
  { lng: 108.050, lat: 12.686, type: "moisture", blockId: "A" },
  { lng: 108.048, lat: 12.685, type: "ndvi", blockId: "A" },
  // Block B sensors
  { lng: 108.057, lat: 12.687, type: "weather", blockId: "B" },
  { lng: 108.058, lat: 12.685, type: "soil", blockId: "B" },
  // Block C sensors
  { lng: 108.065, lat: 12.686, type: "camera", blockId: "C" },
  { lng: 108.064, lat: 12.684, type: "moisture", blockId: "C" },
  // Block D sensors
  { lng: 108.046, lat: 12.679, type: "soil", blockId: "D" },
  { lng: 108.048, lat: 12.677, type: "pest", blockId: "D" },
  { lng: 108.045, lat: 12.678, type: "ndvi", blockId: "D" },
  // Block E sensors
  { lng: 108.055, lat: 12.679, type: "moisture", blockId: "E" },
  { lng: 108.056, lat: 12.677, type: "weather", blockId: "E" },
  // Block F sensors
  { lng: 108.062, lat: 12.679, type: "soil", blockId: "F" },
  { lng: 108.063, lat: 12.678, type: "camera", blockId: "F" },
];

export const SENSOR_POINTS_GEOJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: SENSOR_POSITIONS.map((s, i) => ({
    type: "Feature" as const,
    properties: {
      id: `sensor-${i}`,
      type: s.type,
      blockId: s.blockId,
      color: SENSOR_TYPE_COLORS[s.type] || "#ffffff",
    },
    geometry: {
      type: "Point" as const,
      coordinates: [s.lng, s.lat],
    },
  })),
};

export { SENSOR_TYPE_COLORS };
