// All plantation state data — consumed by the AI, not displayed raw to users

export interface Field {
  id: string;
  name: string;
  hectares: number;
  variety: string;
  altitude: number;
  status: "healthy" | "stress" | "wet";
  ndvi: number;
  moisture: number;
  temp: number;
  ph: number;
  cherryStage: string;
  plants: number;
  age: number;
  color: string;
}

export interface Alert {
  id: number;
  type: "warning" | "danger" | "info" | "success";
  field: string;
  message: string;
  time: string;
}

export interface WeatherDay {
  day: string;
  icon: string;
  high: number;
  low: number;
  rain: number;
  humidity: number;
  wind: number;
}

export const FIELDS: Field[] = [
  { id: "A", name: "Bourbon Block", hectares: 42, variety: "Bourbon", altitude: 1650, status: "healthy", ndvi: 0.81, moisture: 38, temp: 22.4, ph: 5.8, cherryStage: "Green", plants: 12600, age: 4, color: "#22c55e" },
  { id: "B", name: "Typica Terrace", hectares: 35, variety: "Typica", altitude: 1720, status: "healthy", ndvi: 0.76, moisture: 42, temp: 21.8, ph: 6.1, cherryStage: "Turning", plants: 10500, age: 6, color: "#3b82f6" },
  { id: "C", name: "Gesha Garden", hectares: 28, variety: "Gesha", altitude: 1890, status: "wet", ndvi: 0.69, moisture: 58, temp: 20.1, ph: 5.5, cherryStage: "Green", plants: 8400, age: 3, color: "#f59e0b" },
  { id: "D", name: "Catuai Ridge", hectares: 38, variety: "Catuai", altitude: 1580, status: "stress", ndvi: 0.54, moisture: 22, temp: 24.6, ph: 6.4, cherryStage: "Ripe", plants: 11400, age: 8, color: "#ef4444" },
  { id: "E", name: "SL28 Slope", hectares: 31, variety: "SL28", altitude: 1760, status: "healthy", ndvi: 0.78, moisture: 36, temp: 21.2, ph: 5.9, cherryStage: "Turning", plants: 9300, age: 5, color: "#8b5cf6" },
  { id: "F", name: "Caturra Flat", hectares: 26, variety: "Caturra", altitude: 1640, status: "healthy", ndvi: 0.73, moisture: 40, temp: 22.8, ph: 6.0, cherryStage: "Green", plants: 7800, age: 2, color: "#06b6d4" },
];

export const SENSORS = {
  total: 186, active: 179,
  types: { soil: 62, weather: 24, camera: 18, moisture: 48, ndvi: 20, pest: 14 },
};

export const WEATHER_FORECAST: WeatherDay[] = [
  { day: "Today", icon: "sun", high: 24, low: 14, rain: 5, humidity: 62, wind: 8 },
  { day: "Mon", icon: "cloud-sun", high: 22, low: 13, rain: 15, humidity: 68, wind: 12 },
  { day: "Tue", icon: "cloud-rain", high: 19, low: 12, rain: 72, humidity: 85, wind: 18 },
  { day: "Wed", icon: "cloud-rain", high: 18, low: 11, rain: 85, humidity: 90, wind: 22 },
  { day: "Thu", icon: "cloud-sun", high: 21, low: 12, rain: 25, humidity: 72, wind: 14 },
  { day: "Fri", icon: "sun", high: 23, low: 13, rain: 8, humidity: 60, wind: 9 },
  { day: "Sat", icon: "sun", high: 25, low: 14, rain: 3, humidity: 55, wind: 7 },
];

export const SOIL_DATA = [
  { name: "Nitrogen", value: 68, optimal: "60-80", unit: "ppm", status: "good" },
  { name: "Phosphorus", value: 42, optimal: "30-50", unit: "ppm", status: "good" },
  { name: "Potassium", value: 185, optimal: "150-250", unit: "ppm", status: "good" },
  { name: "Calcium", value: 1200, optimal: "1000-1500", unit: "ppm", status: "good" },
  { name: "Magnesium", value: 95, optimal: "100-200", unit: "ppm", status: "low" },
  { name: "Iron", value: 32, optimal: "10-50", unit: "ppm", status: "good" },
  { name: "Organic Matter", value: 4.2, optimal: "3-6", unit: "%", status: "good" },
];

export const ALERTS: Alert[] = [
  { id: 1, type: "warning", field: "Catuai Ridge", message: "Soil moisture critically low (22%)", time: "08:32" },
  { id: 2, type: "danger", field: "Catuai Ridge", message: "NDVI declining — possible leaf rust detected", time: "07:15" },
  { id: 3, type: "info", field: "Gesha Garden", message: "High moisture alert (58%) — reduce irrigation", time: "09:45" },
  { id: 4, type: "warning", field: "All Fields", message: "Heavy rain forecast Tue-Wed — prep drainage", time: "06:00" },
  { id: 5, type: "success", field: "Bourbon Block", message: "Optimal NDVI reached (0.81) — healthy canopy", time: "10:12" },
  { id: 6, type: "info", field: "SL28 Slope", message: "Cherry turning stage detected — monitor ripeness", time: "11:30" },
];

export const MACHINERY = [
  { name: "Drone Alpha", status: "active", task: "NDVI Scanning Field A", battery: 72 },
  { name: "Drone Beta", status: "charging", task: "Standby", battery: 34 },
  { name: "Irrigation Zone 1", status: "active", task: "Field B & E watering cycle", battery: null },
  { name: "Irrigation Zone 2", status: "idle", task: "Scheduled 14:00", battery: null },
  { name: "Tractor Unit 1", status: "active", task: "Fertilizer application Field F", battery: null },
  { name: "Weather Station", status: "active", task: "Continuous monitoring", battery: 95 },
  { name: "Pest Camera Array", status: "active", task: "ML detection running", battery: 88 },
];

export const YIELD_PREDICTION = {
  current: 2850, target: 3200, lastYear: 2640, unit: "kg/ha",
  byField: FIELDS.map(f => ({
    name: f.name.split(" ")[0],
    predicted: Math.round(2400 + Math.random() * 1200),
    target: 3200,
  })),
};

export const CHERRY_STAGES = [
  { name: "Flower", value: 8, color: "#f9fafb" },
  { name: "Green", value: 35, color: "#22c55e" },
  { name: "Turning", value: 28, color: "#f59e0b" },
  { name: "Ripe", value: 22, color: "#ef4444" },
  { name: "Overripe", value: 7, color: "#7c2d12" },
];

export const GROWTH_DATA = Array.from({ length: 12 }, (_, i) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return {
    month: months[i],
    thisYear: [12, 18, 28, 42, 55, 62, 68, 72, 74, 70, 58, 35][i],
    lastYear: [10, 15, 24, 38, 50, 58, 64, 68, 71, 66, 52, 30][i],
    rainfall: [45, 62, 88, 120, 145, 85, 42, 38, 55, 95, 130, 78][i],
  };
});
