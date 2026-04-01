"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { IntelMap } from "@/components/map/IntelMap";
import { FloatingNav } from "@/components/map/FloatingNav";
import { LayerToggle } from "@/components/map/LayerToggle";
import { TimeScrubber } from "@/components/map/TimeScrubber";
import { SituationReport } from "@/components/map/SituationReport";
import { EventDetailCard } from "@/components/map/EventDetailCard";
import { MiniStatsBar } from "@/components/map/MiniStatsBar";
import { INTEL_EVENTS, DEFAULT_LAYERS } from "@/lib/intel-events";
import type { IntelEvent, LayerID } from "@/lib/intel-events";

function getInitialLayers(): LayerID[] {
  if (typeof window === "undefined") return DEFAULT_LAYERS;
  const params = new URLSearchParams(window.location.search);
  const layersParam = params.get("layers");
  if (layersParam) return layersParam.split(",") as LayerID[];
  return DEFAULT_LAYERS;
}

function getInitialTimeRange(): string {
  if (typeof window === "undefined") return "24h";
  const params = new URLSearchParams(window.location.search);
  return params.get("timeRange") || "24h";
}

export default function IntelligenceTheater() {
  const [activeLayers, setActiveLayers] = useState<LayerID[]>(getInitialLayers);
  const [timeRange, setTimeRange] = useState<string>(getInitialTimeRange);
  const [selectedEvent, setSelectedEvent] = useState<IntelEvent | null>(null);

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("layers", activeLayers.join(","));
    params.set("timeRange", timeRange);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeLayers, timeRange]);

  const toggleLayer = useCallback((layerId: string) => {
    setActiveLayers((prev) => {
      if (prev.includes(layerId as LayerID)) {
        return prev.filter((l) => l !== layerId);
      }
      return [...prev, layerId as LayerID];
    });
  }, []);

  // Filter events by active layers
  const filteredEvents = useMemo(() => {
    return INTEL_EVENTS.filter((e) => activeLayers.includes(e.layer));
  }, [activeLayers]);

  const onEventClick = useCallback((event: IntelEvent) => {
    setSelectedEvent(event);
  }, []);

  const onCloseDetail = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Full-viewport map */}
      <IntelMap
        activeLayers={activeLayers}
        events={filteredEvents}
        onEventClick={onEventClick}
      />

      {/* Floating overlays */}
      <FloatingNav />
      <LayerToggle activeLayers={activeLayers} onToggle={toggleLayer} />
      <TimeScrubber activeRange={timeRange} onChange={setTimeRange} />
      <SituationReport activeLayers={activeLayers} events={filteredEvents} />
      <MiniStatsBar alertCount={filteredEvents.length} />
      <EventDetailCard event={selectedEvent} onClose={onCloseDetail} />
    </div>
  );
}
