"use client";

import { FIELDS, ALERTS, WEATHER_FORECAST } from "@/lib/plantation-data";
import { AlertTriangle, CloudRain, CheckCircle2, Sprout } from "lucide-react";

interface BriefingItem {
  icon: React.ReactNode;
  text: string;
  type: "critical" | "warning" | "info" | "success";
}

function generateBriefing(): BriefingItem[] {
  const items: BriefingItem[] = [];

  // Stressed fields
  const stressedFields = FIELDS.filter((f) => f.status === "stress");
  if (stressedFields.length > 0) {
    for (const f of stressedFields) {
      const alerts = ALERTS.filter(
        (a) => a.field === f.name && (a.type === "danger" || a.type === "warning")
      );
      const reasons = alerts.map((a) => a.message.toLowerCase()).join("; ");
      items.push({
        icon: <AlertTriangle className="size-4 shrink-0 text-red-400" />,
        text: `${f.name} needs urgent attention — ${reasons || `moisture at ${f.moisture}%, NDVI declining`}.`,
        type: "critical",
      });
    }
  }

  // Weather warnings
  const rainyDays = WEATHER_FORECAST.filter((w) => w.rain > 60);
  if (rainyDays.length > 0) {
    items.push({
      icon: <CloudRain className="size-4 shrink-0 text-amber-400" />,
      text: `Heavy rain expected ${rainyDays.map((w) => w.day).join(" & ")} — prepare drainage and pause outdoor operations.`,
      type: "warning",
    });
  }

  // Over-watered fields
  const wetFields = FIELDS.filter((f) => f.status === "wet");
  if (wetFields.length > 0) {
    items.push({
      icon: <Sprout className="size-4 shrink-0 text-amber-400" />,
      text: `${wetFields.map((f) => f.name).join(", ")} — moisture too high. Consider reducing irrigation.`,
      type: "warning",
    });
  }

  // Good news
  const healthyCount = FIELDS.filter((f) => f.status === "healthy").length;
  if (healthyCount > 0) {
    items.push({
      icon: <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />,
      text: `${healthyCount} of ${FIELDS.length} fields are in good health. Yield on track at 2,850 kg/ha.`,
      type: "success",
    });
  }

  return items;
}

export function AIBriefing() {
  const items = generateBriefing();

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">
        Today&apos;s Briefing
      </h2>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-border bg-card/50 px-4 py-3"
          >
            {item.icon}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
