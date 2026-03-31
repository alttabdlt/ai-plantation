"use client";

import { FIELDS, SENSORS, YIELD_PREDICTION } from "@/lib/plantation-data";
import { Leaf, Radio, TrendingUp, Mountain } from "lucide-react";

export function QuickStats() {
  const totalHa = FIELDS.reduce((s, f) => s + f.hectares, 0);

  return (
    <div className="space-y-2">
      <StatRow
        icon={<Leaf className="size-3.5 text-emerald-400" />}
        label="Total Area"
        value={`${totalHa} Ha`}
      />
      <StatRow
        icon={
          <span className="relative flex size-3.5 items-center justify-center">
            <Radio className="size-3.5 text-emerald-400" />
            <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-emerald-500 animate-pulse-subtle" />
          </span>
        }
        label="Sensors Active"
        value={`${SENSORS.active}/${SENSORS.total}`}
        sub={`${Math.round((SENSORS.active / SENSORS.total) * 100)}%`}
      />
      <StatRow
        icon={<TrendingUp className="size-3.5 text-emerald-400" />}
        label="Yield Forecast"
        value={`${YIELD_PREDICTION.current.toLocaleString()} kg/ha`}
        sub={`target ${YIELD_PREDICTION.target.toLocaleString()}`}
      />
      <StatRow
        icon={<Mountain className="size-3.5 text-blue-400" />}
        label="Altitude"
        value="1580–1890m"
      />
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span className="shrink-0">{icon}</span>
      <div className="flex flex-1 items-baseline justify-between gap-2">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <div className="text-right">
          <span className="text-xs font-semibold tabular-nums">{value}</span>
          {sub && (
            <span className="ml-1 text-[10px] text-muted-foreground/60">
              {sub}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
