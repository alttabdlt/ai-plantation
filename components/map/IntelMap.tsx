"use client";

import { useState, useCallback, useMemo } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl";
import type { MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  PLANTATION_CENTER,
  PLANTATION_ZOOM,
  FIELD_BLOCKS_GEOJSON,
  SENSOR_POINTS_GEOJSON,
} from "@/lib/geo/blocks";
import type { IntelEvent } from "@/lib/intel-events";
import { EventMarker } from "./EventMarker";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface HoveredBlock {
  id: string;
  name: string;
  variety: string;
  hectares: number;
  status: string;
  ndvi: number;
  moisture: number;
  altitude: number;
  lng: number;
  lat: number;
}

interface IntelMapProps {
  activeLayers: string[];
  events: IntelEvent[];
  onEventClick: (event: IntelEvent) => void;
}

export function IntelMap({ activeLayers, events, onEventClick }: IntelMapProps) {
  const [hoveredBlock, setHoveredBlock] = useState<HoveredBlock | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);

  const showHealth = activeLayers.includes("health");
  const showInfrastructure = activeLayers.includes("infrastructure");

  const onBlockHover = useCallback((e: MapLayerMouseEvent) => {
    if (e.features && e.features.length > 0) {
      const f = e.features[0];
      const props = f.properties;
      if (props) {
        setHoveredBlockId(props.id);
        setHoveredBlock({
          id: props.id,
          name: props.name,
          variety: props.variety,
          hectares: props.hectares,
          status: props.status,
          ndvi: props.ndvi,
          moisture: props.moisture,
          altitude: props.altitude,
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        });
      }
    }
  }, []);

  const onBlockLeave = useCallback(() => {
    setHoveredBlock(null);
    setHoveredBlockId(null);
  }, []);

  // Filter for hovered block highlight
  const highlightFilter = useMemo(
    () => ["==", ["get", "id"], hoveredBlockId || ""],
    [hoveredBlockId]
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="font-mono text-lg text-red-400">MAPBOX TOKEN REQUIRED</p>
          <p className="mt-2 text-sm text-white/60">
            Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: PLANTATION_CENTER[0],
        latitude: PLANTATION_CENTER[1],
        zoom: PLANTATION_ZOOM,
        pitch: 0,
        bearing: 0,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      interactiveLayerIds={showHealth ? ["field-blocks-fill"] : []}
      onMouseMove={showHealth ? onBlockHover : undefined}
      onMouseLeave={showHealth ? onBlockLeave : undefined}
      attributionControl={false}
    >
      {/* Field block polygons — health layer */}
      {showHealth && (
        <Source id="field-blocks" type="geojson" data={FIELD_BLOCKS_GEOJSON}>
          {/* Base fill */}
          <Layer
            id="field-blocks-fill"
            type="fill"
            paint={{
              "fill-color": ["get", "fillColor"],
              "fill-opacity": 0.6,
            }}
          />
          {/* Outline */}
          <Layer
            id="field-blocks-outline"
            type="line"
            paint={{
              "line-color": ["get", "strokeColor"],
              "line-width": 1.5,
              "line-opacity": 0.8,
            }}
          />
          {/* Hover highlight */}
          <Layer
            id="field-blocks-highlight"
            type="line"
            filter={highlightFilter}
            paint={{
              "line-color": "#ffffff",
              "line-width": 3,
              "line-opacity": 0.9,
            }}
          />
        </Source>
      )}

      {/* Sensor nodes — infrastructure layer */}
      {showInfrastructure && (
        <Source id="sensor-nodes" type="geojson" data={SENSOR_POINTS_GEOJSON}>
          <Layer
            id="sensor-dots"
            type="circle"
            paint={{
              "circle-radius": 5,
              "circle-color": ["get", "color"],
              "circle-opacity": 0.9,
              "circle-stroke-width": 1,
              "circle-stroke-color": "rgba(255,255,255,0.3)",
            }}
          />
        </Source>
      )}

      {/* Event markers */}
      {events.map((event) => (
        <EventMarker key={event.id} event={event} onClick={onEventClick} />
      ))}

      {/* Hover popup */}
      {hoveredBlock && (
        <Popup
          longitude={hoveredBlock.lng}
          latitude={hoveredBlock.lat}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
          offset={8}
          className="intel-popup"
        >
          <div className="min-w-[180px] rounded bg-black/90 p-2.5 text-white backdrop-blur-md">
            <p className="text-xs font-semibold text-white/90">{hoveredBlock.name}</p>
            <p className="text-[10px] text-white/50">{hoveredBlock.variety} &middot; {hoveredBlock.hectares} Ha &middot; {hoveredBlock.altitude}m</p>
            <div className="mt-1.5 grid grid-cols-3 gap-2 text-[10px]">
              <div>
                <span className="text-white/40">NDVI</span>
                <p className="font-mono text-white/80">{hoveredBlock.ndvi}</p>
              </div>
              <div>
                <span className="text-white/40">Moisture</span>
                <p className="font-mono text-white/80">{hoveredBlock.moisture}%</p>
              </div>
              <div>
                <span className="text-white/40">Status</span>
                <p className={`font-mono ${hoveredBlock.status === "stress" ? "text-red-400" : hoveredBlock.status === "wet" ? "text-amber-400" : "text-emerald-400"}`}>
                  {hoveredBlock.status}
                </p>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
