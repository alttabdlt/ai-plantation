"use client";

import { Marker } from "react-map-gl";
import type { IntelEvent } from "@/lib/intel-events";

const SEVERITY_COLORS: Record<string, string> = {
  info: "#3b82f6",
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#ef4444",
};

interface EventMarkerProps {
  event: IntelEvent;
  onClick: (event: IntelEvent) => void;
}

export function EventMarker({ event, onClick }: EventMarkerProps) {
  const color = SEVERITY_COLORS[event.severity] || "#3b82f6";
  const isCritical = event.severity === "critical" || event.severity === "high";
  const size = isCritical ? 14 : 10;

  return (
    <Marker
      longitude={event.lng}
      latitude={event.lat}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(event);
      }}
    >
      <div
        className="relative cursor-pointer"
        style={{ width: size * 3, height: size * 3 }}
      >
        {/* Pulse ring */}
        {isCritical && (
          <span
            className="absolute inset-0 animate-ping-slow rounded-full opacity-40"
            style={{ backgroundColor: color }}
          />
        )}
        {/* Outer glow */}
        <span
          className="absolute inset-1/4 rounded-full opacity-30"
          style={{ backgroundColor: color }}
        />
        {/* Core dot */}
        <span
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </Marker>
  );
}
