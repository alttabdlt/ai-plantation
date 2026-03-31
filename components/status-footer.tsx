"use client";

import { useEffect, useState } from "react";
import { SENSORS } from "@/lib/plantation-data";
import { Wifi } from "lucide-react";

export function StatusFooter() {
  const [syncAgo, setSyncAgo] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncAgo((prev) => {
        // Reset to simulate periodic sync
        if (prev >= 30) return 1;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 right-0 left-[220px] z-20 flex items-center justify-between border-t border-border bg-background/80 px-6 py-1.5 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          System Online
        </span>
        <span className="text-border">|</span>
        <span>
          {SENSORS.active}/{SENSORS.total} sensors active
        </span>
        <span className="text-border">|</span>
        <span>
          <Wifi className="mr-1 inline size-3 text-emerald-400" />
          Last sync {syncAgo}s ago
        </span>
      </div>
      <div className="text-[10px] text-muted-foreground/40">
        CafePulse v0.1 &middot; Highland Coffee Estate
      </div>
    </footer>
  );
}
