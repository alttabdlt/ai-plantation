"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LAYER_CONFIGS } from "@/lib/intel-events";

interface LayerToggleProps {
  activeLayers: string[];
  onToggle: (layerId: string) => void;
}

export function LayerToggle({ activeLayers, onToggle }: LayerToggleProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="absolute left-4 top-[152px] z-40 flex flex-col gap-1">
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-md transition-colors hover:text-white/70"
      >
        Layers
        {collapsed ? (
          <ChevronDown className="size-3" />
        ) : (
          <ChevronUp className="size-3" />
        )}
      </button>

      {/* Layer chips */}
      {!collapsed && (
        <div className="flex flex-col gap-1 rounded-lg bg-black/60 p-2 backdrop-blur-md">
          {LAYER_CONFIGS.map((layer) => {
            const isActive = activeLayers.includes(layer.id);
            return (
              <button
                key={layer.id}
                onClick={() => onToggle(layer.id)}
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[11px] transition-all ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${isActive ? "" : "opacity-30"}`}
                  style={{ backgroundColor: layer.color }}
                />
                <span>{layer.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
