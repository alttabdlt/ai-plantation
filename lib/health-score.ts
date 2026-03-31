import { FIELDS, ALERTS } from "./plantation-data";

export function computeHealthScore(): number {
  const fieldScores = FIELDS.map((f) => {
    let score = 100;
    // NDVI: ideal is > 0.75
    if (f.ndvi < 0.6) score -= 30;
    else if (f.ndvi < 0.7) score -= 15;
    else if (f.ndvi < 0.75) score -= 5;
    // Moisture: ideal 30-45%
    if (f.moisture < 25 || f.moisture > 55) score -= 25;
    else if (f.moisture < 30 || f.moisture > 50) score -= 10;
    // Status penalty
    if (f.status === "stress") score -= 20;
    if (f.status === "wet") score -= 10;
    return Math.max(0, score);
  });

  // Weight by hectares
  const totalHa = FIELDS.reduce((s, f) => s + f.hectares, 0);
  const weighted = FIELDS.reduce(
    (s, f, i) => s + fieldScores[i] * (f.hectares / totalHa),
    0
  );

  // Alert penalty: critical alerts reduce score
  const criticalAlerts = ALERTS.filter(
    (a) => a.type === "danger" || a.type === "warning"
  ).length;
  const penalty = criticalAlerts * 3;

  return Math.round(Math.max(0, Math.min(100, weighted - penalty)));
}

export function getHealthLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Fair";
  return "Needs Attention";
}

export function getHealthColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 65) return "#f59e0b";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}
