"use client";

import Link from "next/link";
import { Coffee, FlaskConical, MessageCircle, Wifi } from "lucide-react";
import { SENSORS } from "@/lib/plantation-data";

export function FloatingNav() {
  return (
    <div className="absolute left-4 top-4 z-50 flex flex-col gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-md">
        <div className="flex size-7 items-center justify-center rounded-md bg-emerald-500/20">
          <Coffee className="size-4 text-emerald-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white/90">CafePulse</p>
          <p className="text-[9px] text-white/40">Intelligence Platform</p>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex gap-1.5">
        <Link
          href="/simulation"
          className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-[10px] text-white/70 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white"
        >
          <FlaskConical className="size-3" />
          Simulation
        </Link>
        <Link
          href="/chat"
          className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-[10px] text-white/70 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white"
        >
          <MessageCircle className="size-3" />
          Ask AI
        </Link>
      </div>

      {/* Sensor status */}
      <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-md">
        <Wifi className="size-3 text-emerald-400" />
        <span className="font-mono text-[10px] text-white/70">
          {SENSORS.active}/{SENSORS.total} sensors
        </span>
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}
