# CLAUDE.md — AI Plantation OS: Vision, Architecture & Build Guide

> This file is the canonical reference for any AI agent or developer working on this codebase.
> Read this before touching anything. It defines what we are building, why, and how.

---

## What This Is

**CafePulse** is a plantation intelligence platform — not a farm management dashboard.

The distinction matters. A dashboard displays metrics. An intelligence platform gives you **situational awareness**: layered signals from multiple domains, synthesized by AI, anchored to geography, filterable by time. You understand not just what is happening, but what it means, what's driving it, and what to do next.

The reference product is **WorldMonitor** (worldmonitor.app) — a real-time global OSINT intelligence platform showing conflicts, military bases, weather systems, sanctions, economic events, and natural disasters as toggleable layers on a live map. That product, but for a plantation.

The plantation is a theater of operations. Every field block, sensor node, irrigation channel, and equipment asset is a point of intelligence. External forces — weather systems, commodity markets, regional disease alerts, water stress — are additional intelligence streams that intersect with that theater. The AI reads across all active layers and produces a situation report.

---

## Core Design Principles

### 1. Map-First, Always
The map is the entire screen — full viewport, always on. It is not a card, not a panel, not a section. Everything else (layer controls, time scrubber, AI synthesis, incident detail) floats on top of the map as overlays. There is no "layout" in the traditional sense. There is only the map and what lives on it.

### 2. Intelligence Layers, Not Pages
Data is organized into **intelligence domains** (layers), not pages or tabs. Each layer is:
- Independently toggleable (on/off)
- Independently styled (heatmap, markers, contours, polygons)
- Independently sourced (sensor API, weather API, commodity feed, etc.)
- URL-encoded so any view is shareable: `?layers=health,weather,disease&timeRange=7d`

### 3. Time is a First-Class Dimension
Every piece of data has a timestamp. The time range control (`1h | 6h | 24h | 7d | 30d | Season`) filters ALL active layers simultaneously. You can scrub back through time to replay how events propagated across the estate.

### 4. Events Are Geolocated, Not Listed
Incidents, alerts, and detections are not a list in a sidebar. They are **geolocated events on the map**: pulsing markers, clustered when zoomed out, expanded when clicked. Each event card shows source, severity, AI analysis, and recommended action.

### 5. AI Synthesizes, Does Not Just Report
The AI doesn't just summarize sensor readings. It performs **cross-layer correlation**: weather + soil moisture + regional disease alert = a threat assessment with confidence level and recommended action window. This is the intelligence product. It auto-regenerates when layers change or a high-severity event fires.

---

## Intelligence Layers (Full Specification)

Each layer maps to a domain. Internal layers come from sensors/telemetry. External layers come from APIs.

| Layer ID | Name | Visual Style | Data Source | Description |
|---|---|---|---|---|
| `health` | Field Health | Heatmap overlay on field polygons | Internal sensors (NDVI, soil moisture, pH, temp) | Per-block health score, color-graded green→amber→red |
| `stress` | Stress Hotspots | Pulsing radius markers | Derived: AI combines NDVI decline + moisture anomaly + temp | Computed hotspots where multiple stress signals converge |
| `disease` | Disease & Pest | Warning markers with severity ring | FAO EMPRES, CABI IPM, internal camera ML detection | Active outbreaks, detection events, regional spread vectors |
| `weather` | Weather Systems | Radar overlay + wind vectors + storm tracks | Open-Meteo, radar tiles | Live conditions, forecast, severe weather alerts, rain probability |
| `water` | Water Intelligence | Flow lines + moisture contour bands | Internal irrigation sensors, water table readings | Irrigation channel status, soil moisture contours, over/under-water zones |
| `assets` | Equipment & Assets | Moving icons (drones, tractors) + static icons (stations) | Equipment GPS telemetry | Drone positions/missions, tractor locations, irrigation stations, processing units |
| `infrastructure` | Infrastructure | Status icons at node locations | Sensor health API, connectivity monitoring | Offline sensors, power interruptions, connectivity failures |
| `market` | Market Intelligence | Price ticker overlay + trend indicator | ICE Futures (arabica), commodity APIs, FX rates | Coffee spot price, futures curve, relevant export market signals |
| `natural` | Natural Events | Event markers (flood, fire, drought) | GDACS, FIRMS (NASA fire), regional agricultural alerts | Regional floods, fires, drought index anomalies |
| `threats` | Active Threats | Red pulsing markers, highest z-index | Derived from all layers, AI-flagged | Right now: named, active, urgent — the "what needs action today" layer |
| `coverage` | Sensor Coverage | Translucent coverage radius per node | Internal sensor topology | Shows gaps in sensing coverage, informs deployment decisions |

### Layer Toggle UI
- Floating chip-pills panel, top-left or collapsible side drawer
- Each chip: icon + name + color dot
- Active layers visually elevated (filled), inactive ghosted
- Mobile: bottom sheet drawer

---

## Data Architecture

### Internal Data Model

```typescript
// A geolocated intelligence event (universal across all layers)
interface IntelEvent {
  id: string
  layer: LayerID
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical'
  lat: number
  lng: number
  title: string
  detail: string
  source: string          // "Sensor B-04" | "Open-Meteo" | "FAO EMPRES"
  timestamp: string       // ISO 8601
  expires?: string        // for weather events etc.
  relatedBlockId?: string // links to field block
  aiSummary?: string      // one-line AI synthesis of this event
  recommendedAction?: string
}

// A field block — real coordinates, not SVG
interface Block {
  id: string
  name: string
  variety: string
  polygonGeoJSON: GeoJSON.Polygon  // real lat/lng coordinates
  hectares: number
  altitude: number
  currentHealth: number   // 0–100, AI-computed
  status: 'healthy' | 'stress' | 'critical' | 'wet' | 'dormant'
  sensors: Sensor[]
  latestReadings: BlockReadings
}
```

### Current Mock Data
All data currently lives in `lib/mock-data.ts`. Field blocks use arbitrary SVG coordinates, not real lat/lng. **This must be migrated to GeoJSON with real coordinates** (the actual plantation location) when moving to the real map engine.

---

## Map Engine

### Decision: Mapbox GL JS (recommended) vs Deck.gl

| | Mapbox GL JS | Deck.gl |
|---|---|---|
| Visual quality | ★★★★★ | ★★★★ |
| API key required | Yes (free tier generous) | No |
| Satellite basemap | Built-in | Needs Mapbox/Google tiles anyway |
| Animation/real-time | Excellent | Excellent |
| React integration | `react-map-gl` wrapper | Native React |
| Heatmaps | Built-in layer type | Built-in layer type |

**Recommendation:** Mapbox GL JS via `react-map-gl`. The visual quality — especially the dark satellite basemap — is essential for the intelligence aesthetic. Free tier handles this volume comfortably.

### Basemap Style
Use Mapbox `dark-v11` satellite style or a custom dark style. The map should feel like a military ops room, not Google Maps. Dark terrain with subtle grid, estate visible as terrain polygon.

---

## Pages & Routes

### `/` — Intelligence Theater (main)
Full-viewport map. All layers visible. Layer toggles. Time scrubber. AI situation report floating panel. Click any incident to expand. This is the product.

### `/simulation` — Scenario War Room
Inject synthetic scenarios (drought, price shock, disease outbreak) and watch them cascade across layers in accelerated time. Run "what if" intelligence assessments. Currently has `scenario-builder.tsx` and `results-panel.tsx` — keep, evolve to be scenario → map animation.

### `/chat` — AI Intelligence Analyst
Conversational interface to the plantation AI. Context-aware: knows active layers, current incidents, recent history. Ask "what's the risk of leaf rust spreading to Bourbon Block this week?" and get a properly sourced, cross-layer answer. Currently has `chat-interface.tsx` — keep.

---

## Current Codebase State

### What Exists (as of April 2026)
```
app/
  page.tsx              → Main dashboard — needs full rebuild as map-first
  layout.tsx            → Nav sidebar layout — needs to become floating overlay
  simulation/page.tsx   → Simulation page — keep, evolve
  chat/page.tsx         → AI chat — keep, evolve
  api/chat/             → AI API route — keep, evolve
  globals.css           → Design tokens — keep
components/
  nav-sidebar.tsx       → Current sidebar nav — replace with floating layer controls
  field-map.tsx         → SVG estate map — REPLACE with Mapbox component
  health-ring.tsx       → Health gauge — keep as floating overlay widget
  ai-briefing.tsx       → AI briefing cards — evolve into situation report panel
  live-activity.tsx     → Activity feed — evolve into event stream panel
  quick-stats.tsx       → KPI stats — keep as floating mini-panel
  weather-strip.tsx     → Weather strip — absorb into weather layer
  status-footer.tsx     → Status bar — keep as minimal bottom overlay
  dashboard/
    alert-feed.tsx      → Migrate to geolocated event markers
    kpi-cards.tsx       → Keep as floating overlay
    recommended-actions.tsx → Integrate into AI synthesis panel
    weather-forecast.tsx → Absorb into weather layer
  maps/
    estate-map.tsx      → SVG estate map — REPLACE
  simulation/
    scenario-builder.tsx → Keep, evolve
    comparison-view.tsx  → Keep, evolve
    results-panel.tsx    → Keep, evolve
    scenario-card.tsx    → Keep, evolve
  ui/                   → shadcn components — keep all
lib/
  mock-data.ts          → Migrate to GeoJSON-based model
```

### What Needs to Be Built
- `components/map/IntelMap.tsx` — Main Mapbox GL map component
- `components/map/LayerToggle.tsx` — Layer chip-pill controls
- `components/map/EventMarker.tsx` — Geolocated incident marker
- `components/map/EventDetailCard.tsx` — Click-to-expand incident panel
- `components/map/TimeScrubber.tsx` — Time range control
- `components/map/SituationReport.tsx` — AI cross-layer synthesis panel
- `components/map/FieldPolygon.tsx` — GeoJSON field block renderer
- `components/map/HeatmapLayer.tsx` — Health/moisture heatmap renderer
- `lib/layers/` — Per-layer data fetchers and transformers
- `lib/intel-events.ts` — IntelEvent model and helpers
- `lib/geo/` — GeoJSON block definitions for the plantation

---

## Build Phases

### Phase 1 — Map Foundation
**Goal:** Replace SVG with Mapbox GL JS full-viewport map. Plantation fields rendered as real GeoJSON polygons. Sensor nodes as points.

Install: `react-map-gl`, `mapbox-gl`  
Output: `/` renders a full-screen dark map with field polygons and basic hover state.  
Mock data: Convert existing block data to placeholder GeoJSON coordinates.

### Phase 2 — Layer System
**Goal:** Build the layer toggle infrastructure. 4 starter layers: Field Health (heatmap), Equipment (moving icons), Threats (pulsing markers), Weather (conditions overlay).

Output: Layer toggle chips. URL encodes active layers. Each layer independently toggleable with distinct visual style.

### Phase 3 — Time Range Control
**Goal:** Time scrubber that filters all events across all layers.

Output: `1h | 6h | 24h | 7d | 30d | Season` control. Events/readings filtered by selected range. Basic replay functionality.

### Phase 4 — Event System
**Goal:** Migrate all alerts/incidents to geolocated IntelEvent model. Click-to-expand event detail cards with AI summary field.

Output: Pulsing markers on map. Click opens card with: event type, severity, source, timestamp, AI one-liner, recommended action.

### Phase 5 — External Intelligence Feeds
**Goal:** Connect real external APIs.

Priority feeds:
1. **Open-Meteo** — hyperlocal weather for plantation coordinates (free, no key)
2. **Arabica futures** — coffee commodity price (ICE or proxy API)
3. **NASA FIRMS** — fire/thermal anomaly detection near plantation
4. **FAO EMPRES-i** — regional disease/pest alert feed

Output: Weather and Market layers show real data. Natural layer shows fire/anomaly events.

### Phase 6 — AI Synthesis
**Goal:** Situation report that auto-generates based on active layers + time range + current severity.

The AI reads: active layers, current IntelEvents (filtered by time), block health scores, external feed data.  
It produces: a structured situation report with cross-layer correlations, threat assessments, action recommendations.  
It regenerates: on layer toggle, on time range change, on new critical event.

Output: `SituationReport.tsx` floating panel. Replaces the current `ai-briefing.tsx` cards.

### Phase 7 — Simulation War Room
**Goal:** Scenario engine that injects synthetic IntelEvents into the layer system and plays them forward in time on the map.

Output: `/simulation` page with scenario selector → animated map playback → AI-generated scenario assessment.

---

## Intelligence Aesthetic

This is an ops room, not a farm app. Every UI decision should reinforce that.

- **Map** is always the background — never cropped, never framed in a card
- **Dark** — `dark-v11` satellite base, dark UI overlays with `bg-black/60 backdrop-blur`
- **Overlays** are floating, semi-transparent, minimal — they don't compete with the map
- **Markers** pulse when active, cluster when dense, have severity-graded colors
- **Text** is tight, labeled, sourced — like intelligence product text, not consumer UI copy
- **No gradients or decorative elements** that aren't data-driven
- **Color language**: green = nominal, amber = watch, red = action required, blue = informational
- **Typography**: monospace for data values (coordinates, readings, prices), sans-serif for labels

### What to Avoid
- Cards with rounded corners that look like a weather app
- Panels that take up half the viewport
- Any UI element that hides the map
- Animated counters / "gamified" health scores
- Generic dashboard chrome (shadows, card borders, icon badges)

---

## Key Technical Decisions (Locked)

1. **Framework**: Next.js 16 (App Router) — keep
2. **Styling**: Tailwind CSS — keep
3. **Map Engine**: Mapbox GL JS via `react-map-gl` — Phase 1 target
4. **AI**: Existing `/api/chat` route — evolve for cross-layer synthesis
5. **Data**: Mock data → real GeoJSON + external APIs over phases
6. **State**: Layer toggle state in URL params (like WorldMonitor) — shareable views
7. **Deploy**: Cloudflare Tunnel for dev, Cloudflare Pages or Vercel for prod

---

## What Success Looks Like

Open the app. Full-screen dark satellite map of the plantation. Field polygons glow with health color. A stress hotspot pulses red in Catuai Ridge. Weather layer shows a rain system approaching. Disease layer shows a regional leaf rust alert 40km east. You click the stress marker — it expands: soil moisture 22%, NDVI declining, AI cross-reference says "leaf rust risk HIGH given incoming moisture + regional spread vector — apply fungicide before Tuesday." Layer toggle in the top-left. Time scrubber at the bottom. AI situation report floating right. You toggle to 7-day view and watch the moisture drain from the block over the past week. You understand exactly what is happening and exactly what to do.

That is the product.
