"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, AlertTriangle, Shield } from "lucide-react";
import { FIELDS } from "@/lib/plantation-data";
import { computeHealthScore, getHealthLabel } from "@/lib/health-score";
import type { IntelEvent } from "@/lib/intel-events";

interface SituationReportProps {
  activeLayers: string[];
  events: IntelEvent[];
}

export function SituationReport({ activeLayers, events }: SituationReportProps) {
  const [collapsed, setCollapsed] = useState(false);

  const healthScore = useMemo(() => computeHealthScore(), []);
  const healthLabel = useMemo(() => getHealthLabel(healthScore), [healthScore]);

  const criticalEvents = useMemo(
    () => events.filter((e) => e.severity === "critical" || e.severity === "high"),
    [events]
  );

  const stressedFields = FIELDS.filter((f) => f.status === "stress");
  const wetFields = FIELDS.filter((f) => f.status === "wet");

  // Generate situation assessment
  const assessment = useMemo(() => {
    if (criticalEvents.length >= 3) return "ELEVATED THREAT";
    if (criticalEvents.length >= 1) return "ACTIVE CONCERNS";
    return "NOMINAL";
  }, [criticalEvents]);

  const assessmentColor = useMemo(() => {
    if (assessment === "ELEVATED THREAT") return "text-red-400";
    if (assessment === "ACTIVE CONCERNS") return "text-amber-400";
    return "text-emerald-400";
  }, [assessment]);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="absolute right-4 top-4 z-40 flex items-center gap-1 rounded-lg bg-black/60 px-2.5 py-2 text-[10px] text-white/60 backdrop-blur-md transition-colors hover:text-white"
      >
        <ChevronLeft className="size-3" />
        SITREP
      </button>
    );
  }

  return (
    <div className="absolute right-4 top-4 z-40 w-[340px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg bg-black/70 backdrop-blur-md">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-black/80 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="size-3.5 text-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            Situation Report
          </span>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="text-white/40 transition-colors hover:text-white"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <div className="space-y-3 p-3">
        {/* Overall assessment */}
        <div className="rounded-md bg-white/5 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-white/40">Assessment</p>
          <p className={`font-mono text-sm font-bold ${assessmentColor}`}>{assessment}</p>
          <p className="mt-1 text-[10px] text-white/50">
            Estate health {healthScore}/100 ({healthLabel}) &middot;{" "}
            {activeLayers.length} layers active &middot;{" "}
            {events.length} events tracked
          </p>
        </div>

        {/* Critical items */}
        {criticalEvents.length > 0 && (
          <div>
            <p className="mb-1.5 flex items-center gap-1 text-[9px] uppercase tracking-wider text-red-400/70">
              <AlertTriangle className="size-3" />
              Priority alerts ({criticalEvents.length})
            </p>
            <div className="space-y-1.5">
              {criticalEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="rounded-md border-l-2 border-l-red-500/50 bg-red-500/5 px-2.5 py-1.5"
                >
                  <p className="text-[11px] font-medium text-white/80">{event.title}</p>
                  {event.aiSummary && (
                    <p className="mt-0.5 text-[10px] text-white/40">{event.aiSummary}</p>
                  )}
                  <p className="mt-0.5 font-mono text-[9px] text-white/30">{event.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Field status summary */}
        <div>
          <p className="mb-1.5 text-[9px] uppercase tracking-wider text-white/40">
            Field status
          </p>
          <div className="space-y-1">
            {FIELDS.map((field) => (
              <div key={field.id} className="flex items-center justify-between text-[10px]">
                <span className="text-white/60">{field.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/40">NDVI {field.ndvi}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                      field.status === "stress"
                        ? "bg-red-500/15 text-red-400"
                        : field.status === "wet"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {field.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended actions */}
        <div>
          <p className="mb-1.5 text-[9px] uppercase tracking-wider text-white/40">
            Recommended actions
          </p>
          <div className="space-y-1.5">
            {stressedFields.length > 0 && (
              <div className="rounded-md bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60">
                <span className="font-medium text-red-400">1.</span> Emergency irrigation + fungicide for{" "}
                {stressedFields.map((f) => f.name).join(", ")}. Window: 36 hours.
              </div>
            )}
            {wetFields.length > 0 && (
              <div className="rounded-md bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60">
                <span className="font-medium text-amber-400">2.</span> Reduce irrigation for{" "}
                {wetFields.map((f) => f.name).join(", ")}. Activate drainage.
              </div>
            )}
            <div className="rounded-md bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60">
              <span className="font-medium text-blue-400">3.</span> Prep all drainage channels before
              Tuesday rain system (72-85% probability).
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <p className="font-mono text-[9px] text-white/20">
          Generated {new Date().toLocaleTimeString()} &middot; {activeLayers.length} layers
        </p>
      </div>
    </div>
  );
}
