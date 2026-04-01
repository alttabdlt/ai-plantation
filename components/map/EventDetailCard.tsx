"use client";

import { X } from "lucide-react";
import type { IntelEvent } from "@/lib/intel-events";

interface EventDetailCardProps {
  event: IntelEvent | null;
  onClose: () => void;
}

const SEVERITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "bg-red-500/20", text: "text-red-400", label: "CRITICAL" },
  high: { bg: "bg-red-500/15", text: "text-red-400", label: "HIGH" },
  medium: { bg: "bg-amber-500/15", text: "text-amber-400", label: "MEDIUM" },
  low: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "LOW" },
  info: { bg: "bg-blue-500/15", text: "text-blue-400", label: "INFO" },
};

export function EventDetailCard({ event, onClose }: EventDetailCardProps) {
  if (!event) return null;

  const severity = SEVERITY_STYLES[event.severity] || SEVERITY_STYLES.info;

  return (
    <div className="absolute right-[360px] top-4 z-40 w-[360px] animate-fade-in-up rounded-lg border border-white/10 bg-black/80 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-start justify-between px-3 pt-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${severity.bg} ${severity.text}`}>
              {severity.label}
            </span>
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40">
              {event.layer.toUpperCase()}
            </span>
          </div>
          <h3 className="mt-1.5 text-[13px] font-semibold leading-tight text-white/90">
            {event.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="ml-2 flex-shrink-0 text-white/30 transition-colors hover:text-white/60"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="space-y-2.5 px-3 pb-3 pt-2">
        {/* Detail */}
        <p className="text-[11px] leading-relaxed text-white/60">{event.detail}</p>

        {/* AI Summary */}
        {event.aiSummary && (
          <div className="rounded-md bg-emerald-500/5 px-2.5 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400/60">
              AI Analysis
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/60">
              {event.aiSummary}
            </p>
          </div>
        )}

        {/* Recommended action */}
        {event.recommendedAction && (
          <div className="rounded-md bg-blue-500/5 px-2.5 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-blue-400/60">
              Recommended Action
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/60">
              {event.recommendedAction}
            </p>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2">
          <span className="font-mono text-[9px] text-white/30">{event.source}</span>
          <span className="font-mono text-[9px] text-white/30">
            {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* Coordinates */}
        <p className="font-mono text-[9px] text-white/20">
          {event.lat.toFixed(4)}°N, {event.lng.toFixed(4)}°E
          {event.relatedBlockId && ` · Block ${event.relatedBlockId}`}
        </p>
      </div>
    </div>
  );
}
