"use client";

import { FIELDS, ALERTS, WEATHER_FORECAST } from "@/lib/plantation-data";
import {
  AlertTriangle,
  CloudRain,
  CheckCircle2,
  Sprout,
  Sparkles,
} from "lucide-react";

interface BriefingItem {
  icon: React.ReactNode;
  text: string;
  type: "critical" | "warning" | "info" | "success";
}

function generateBriefing(): BriefingItem[] {
  const items: BriefingItem[] = [];

  const stressedFields = FIELDS.filter((f) => f.status === "stress");
  if (stressedFields.length > 0) {
    for (const f of stressedFields) {
      const alerts = ALERTS.filter(
        (a) =>
          a.field === f.name && (a.type === "danger" || a.type === "warning")
      );
      const reasons = alerts.map((a) => a.message.toLowerCase()).join("; ");
      items.push({
        icon: <AlertTriangle className="size-4 shrink-0 text-red-400" />,
        text: `${f.name} needs urgent attention — ${reasons || `moisture at ${f.moisture}%, NDVI declining`}.`,
        type: "critical",
      });
    }
  }

  const rainyDays = WEATHER_FORECAST.filter((w) => w.rain > 60);
  if (rainyDays.length > 0) {
    items.push({
      icon: <CloudRain className="size-4 shrink-0 text-amber-400" />,
      text: `Heavy rain expected ${rainyDays.map((w) => w.day).join(" & ")} — prepare drainage and pause outdoor operations.`,
      type: "warning",
    });
  }

  const wetFields = FIELDS.filter((f) => f.status === "wet");
  if (wetFields.length > 0) {
    items.push({
      icon: <Sprout className="size-4 shrink-0 text-amber-400" />,
      text: `${wetFields.map((f) => f.name).join(", ")} — moisture too high. Consider reducing irrigation.`,
      type: "warning",
    });
  }

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

const ACCENT_COLORS = {
  critical: "border-l-red-500/60",
  warning: "border-l-amber-500/60",
  info: "border-l-blue-500/60",
  success: "border-l-emerald-500/60",
};

export function AIBriefing() {
  const items = generateBriefing();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="size-3.5 text-emerald-400" />
        <h2 className="text-sm font-semibold text-foreground">
          Today&apos;s Briefing
        </h2>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
          AI
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`animate-fade-in-up flex items-start gap-3 rounded-lg border border-border border-l-2 bg-card/50 px-4 py-3 ${ACCENT_COLORS[item.type]} stagger-${i + 1}`}
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
