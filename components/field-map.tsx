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
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#0a1628] to-[#0f1d32]">
      <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">
          Highland Coffee Estate
        </span>
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
          <pattern id="terrain" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#0a1628" />
            <circle cx="10" cy="10" r="0.5" fill="#1a3a2a" opacity="0.3" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="590" height="340" fill="url(#terrain)" />

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
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: "all 0.2s ease" }}
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
      </svg>
    </div>
  );
}
