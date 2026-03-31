"use client";

import { useState } from "react";
import { FIELDS, type Field } from "@/lib/plantation-data";

const FIELD_PATHS = [
  { id: "A", d: "M80,60 L200,40 L220,140 L160,180 L70,150 Z", cx: 145, cy: 100 },
  { id: "B", d: "M200,40 L340,30 L350,110 L220,140 Z", cx: 275, cy: 80 },
  { id: "C", d: "M70,150 L160,180 L170,300 L60,280 Z", cx: 115, cy: 225 },
  { id: "D", d: "M160,180 L220,140 L350,110 L370,200 L340,300 L170,300 Z", cx: 270, cy: 210 },
  { id: "E", d: "M350,110 L480,60 L510,180 L370,200 Z", cx: 430, cy: 140 },
  { id: "F", d: "M370,200 L510,180 L530,310 L340,300 Z", cx: 440, cy: 250 },
];

const SENSOR_POSITIONS = [
  { x: 120, y: 90, type: "soil" },
  { x: 170, y: 120, type: "moisture" },
  { x: 260, y: 65, type: "weather" },
  { x: 310, y: 95, type: "camera" },
  { x: 100, y: 210, type: "soil" },
  { x: 130, y: 260, type: "moisture" },
  { x: 240, y: 180, type: "ndvi" },
  { x: 300, y: 240, type: "soil" },
  { x: 430, y: 110, type: "moisture" },
  { x: 470, y: 160, type: "pest" },
  { x: 410, y: 230, type: "soil" },
  { x: 480, y: 270, type: "camera" },
  { x: 200, y: 260, type: "moisture" },
  { x: 350, y: 160, type: "weather" },
];

const SENSOR_COLORS: Record<string, string> = {
  soil: "#f59e0b",
  moisture: "#3b82f6",
  weather: "#22c55e",
  camera: "#a78bfa",
  ndvi: "#10b981",
  pest: "#ef4444",
};

function getStatusColor(field: Field): string {
  if (field.status === "stress") return "rgba(239,68,68,0.45)";
  if (field.status === "wet") return "rgba(245,158,11,0.4)";
  return "rgba(34,197,94,0.35)";
}

function getStatusBorder(field: Field): string {
  if (field.status === "stress") return "#ef4444";
  if (field.status === "wet") return "#f59e0b";
  return "#22c55e";
}

export function FieldMap() {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <div className="scan-line-overlay relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#0a1628] to-[#0f1d32]">
      <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Highland Coffee Estate — Live
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Healthy
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-amber-500" /> Attention
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-red-500" /> Critical
          </span>
        </div>
      </div>

      <svg viewBox="0 0 590 340" className="w-full">
        <defs>
          <pattern
            id="terrain"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect width="20" height="20" fill="#0a1628" />
            <circle cx="10" cy="10" r="0.5" fill="#1a3a2a" opacity="0.3" />
            <circle cx="5" cy="5" r="0.3" fill="#1a3a2a" opacity="0.2" />
            <circle cx="15" cy="15" r="0.4" fill="#1a3a2a" opacity="0.25" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="roadGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#374151" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#4b5563" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="590" height="340" fill="url(#terrain)" />

        {/* Roads */}
        <path
          d="M0,170 Q150,160 295,170 Q440,180 590,165"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="2.5"
          strokeDasharray="8,4"
        />
        <path
          d="M295,0 Q290,85 295,170 Q300,255 295,340"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="2"
          strokeDasharray="6,4"
        />

        {/* Contour lines */}
        {[80, 160, 240].map((y) => (
          <path
            key={y}
            d={`M0,${y} Q150,${y - 15} 295,${y + 5} Q440,${y - 10} 590,${y}`}
            fill="none"
            stroke="#1e3a2e"
            strokeWidth="0.5"
            opacity="0.3"
            strokeDasharray="4,8"
          />
        ))}

        {/* Water feature */}
        <path
          d="M0,320 Q80,300 140,310 Q200,320 260,305 Q320,290 380,300"
          fill="none"
          stroke="#1e40af"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Fields */}
        {FIELD_PATHS.map((fp) => {
          const field = FIELDS.find((f) => f.id === fp.id)!;
          const isHovered = hoveredField === fp.id;
          return (
            <g
              key={fp.id}
              onMouseEnter={() => setHoveredField(fp.id)}
              onMouseLeave={() => setHoveredField(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={fp.d}
                fill={getStatusColor(field)}
                stroke={getStatusBorder(field)}
                strokeWidth={isHovered ? 2.5 : 1}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: "all 0.3s ease" }}
              />
              {isHovered && (
                <path
                  d={fp.d}
                  fill="none"
                  stroke={getStatusBorder(field)}
                  strokeWidth="1"
                  opacity="0.4"
                  filter="url(#glow)"
                />
              )}
              {/* Label */}
              <g transform={`translate(${fp.cx}, ${fp.cy})`}>
                <rect
                  x="-36"
                  y="-14"
                  width="72"
                  height="28"
                  rx="6"
                  fill="#0f172aDD"
                  stroke={getStatusBorder(field)}
                  strokeWidth="0.6"
                />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="system-ui"
                >
                  {field.name}
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="7.5"
                  fontFamily="system-ui"
                >
                  {field.status === "stress"
                    ? "Needs attention"
                    : field.status === "wet"
                      ? "Over-watered"
                      : "Healthy"}
                </text>
              </g>
            </g>
          );
        })}

        {/* Sensor pulse dots — ambient life */}
        {SENSOR_POSITIONS.map((s, i) => {
          const c = SENSOR_COLORS[s.type];
          return (
            <g key={`sensor-${i}`}>
              <circle cx={s.x} cy={s.y} r="2.5" fill={c} opacity="0.7" />
              <circle
                cx={s.x}
                cy={s.y}
                r="5"
                fill="none"
                stroke={c}
                strokeWidth="0.5"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values="3;7;3"
                  dur={`${2.5 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.05;0.3"
                  dur={`${2.5 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Irrigation flow lines */}
        <path
          d="M100,150 L160,180 L170,220 L140,260"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="4,3"
        >
          <animate
            attributeName="strokeDashoffset"
            values="0;-7"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M220,140 L260,170 L300,200 L340,230"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="4,3"
        >
          <animate
            attributeName="strokeDashoffset"
            values="0;-7"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Drone path */}
        <path
          d="M120,80 Q200,60 280,90 Q360,120 430,100"
          fill="none"
          stroke="#22c55e"
          strokeWidth="0.6"
          opacity="0.35"
          strokeDasharray="3,6"
        >
          <animate
            attributeName="strokeDashoffset"
            values="0;-9"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        <circle r="3.5" fill="#22c55e" opacity="0.8">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M120,80 Q200,60 280,90 Q360,120 430,100 Q360,120 280,90 Q200,60 120,80"
          />
        </circle>

        {/* Scale bar */}
        <g transform="translate(460, 320)">
          <line
            x1="0"
            y1="0"
            x2="80"
            y2="0"
            stroke="#64748b"
            strokeWidth="0.8"
          />
          <line
            x1="0"
            y1="-3"
            x2="0"
            y2="3"
            stroke="#64748b"
            strokeWidth="0.8"
          />
          <line
            x1="80"
            y1="-3"
            x2="80"
            y2="3"
            stroke="#64748b"
            strokeWidth="0.8"
          />
          <text
            x="40"
            y="-5"
            textAnchor="middle"
            fill="#64748b"
            fontSize="7"
            fontFamily="system-ui"
          >
            500m
          </text>
        </g>
      </svg>
    </div>
  );
}
