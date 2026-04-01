"use client";

import { useMemo } from "react";
import { SENSORS } from "@/lib/plantation-data";
import { computeHealthScore } from "@/lib/health-score";

interface MiniStatsBarProps {
  alertCount: number;
}

export function MiniStatsBar({ alertCount }: MiniStatsBarProps) {
  const healthScore = useMemo(() => computeHealthScore(), []);

  return (
    <div className="absolute bottom-6 left-4 z-40">
      <div className="flex items-center gap-4 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-md">
        <div className="text-center">
          <p className="font-mono text-xs font-bold text-emerald-400">
            {SENSORS.active}/{SENSORS.total}
          </p>
          <p className="text-[8px] uppercase tracking-wider text-white/30">Sensors</p>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="text-center">
          <p className="font-mono text-xs font-bold text-amber-400">{alertCount}</p>
          <p className="text-[8px] uppercase tracking-wider text-white/30">Events</p>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="text-center">
          <p className={`font-mono text-xs font-bold ${healthScore >= 65 ? "text-emerald-400" : "text-amber-400"}`}>
            {healthScore}%
          </p>
          <p className="text-[8px] uppercase tracking-wider text-white/30">Health</p>
        </div>
      </div>
    </div>
  );
}
