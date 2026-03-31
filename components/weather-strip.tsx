"use client";

import { WEATHER_FORECAST } from "@/lib/plantation-data";
import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  sun: <Sun className="size-4 text-amber-400" />,
  "cloud-sun": <CloudSun className="size-4 text-slate-400" />,
  "cloud-rain": <CloudRain className="size-4 text-blue-400" />,
  cloud: <Cloud className="size-4 text-slate-400" />,
};

export function WeatherStrip() {
  const days = WEATHER_FORECAST.slice(0, 4);

  return (
    <div className="space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Forecast
      </span>
      <div className="grid grid-cols-4 gap-1">
        {days.map((d) => {
          const isRainy = d.rain > 60;
          return (
            <div
              key={d.day}
              className={`flex flex-col items-center gap-1 rounded-lg px-1.5 py-2 text-center ${
                isRainy
                  ? "bg-blue-500/5 ring-1 ring-blue-500/10"
                  : "bg-card/50"
              }`}
            >
              <span className="text-[10px] text-muted-foreground">
                {d.day}
              </span>
              {ICON_MAP[d.icon] ?? <Sun className="size-4 text-amber-400" />}
              <span className="text-xs font-medium">{d.high}°</span>
              {isRainy && (
                <span className="text-[9px] font-medium text-blue-400">
                  {d.rain}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
