"use client";

import { useEffect, useState } from "react";
import { computeHealthScore, getHealthLabel, getHealthColor } from "@/lib/health-score";

export function HealthRing() {
  const targetScore = computeHealthScore();
  const label = getHealthLabel(targetScore);
  const color = getHealthColor(targetScore);

  // Count-up animation
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1200;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayScore(Math.round(eased * targetScore));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [targetScore]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="6"
          />

          {/* Outer pulse ring */}
          <circle
            cx="90"
            cy="90"
            r={radius + 6}
            fill="none"
            stroke={color}
            strokeWidth="1"
            className="animate-pulse-glow"
            opacity="0.2"
          />

          {/* Score ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 90 90)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />

          {/* Glow ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity="0.25"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 90 90)"
            filter="url(#ring-glow)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />

          {/* Orbiting dots */}
          <g style={{ transformOrigin: "90px 90px" }}>
            <circle r="2.5" fill={color} opacity="0.8">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M90,20 A70,70 0 1,1 89.99,20"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="1.5" fill={color} opacity="0.5">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M90,20 A70,70 0 1,1 89.99,20"
                begin="-4s"
              />
              <animate
                attributeName="opacity"
                values="0.5;0.15;0.5"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Tick marks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = 90 + (radius - 12) * Math.cos(rad);
            const y1 = 90 + (radius - 12) * Math.sin(rad);
            const x2 = 90 + (radius - 8) * Math.cos(rad);
            const y2 = 90 + (radius - 8) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 6 === 0 ? color : "currentColor"}
                className={i % 6 === 0 ? "" : "text-border"}
                strokeWidth={i % 6 === 0 ? "1.5" : "0.5"}
                opacity={i % 6 === 0 ? 0.6 : 0.3}
              />
            );
          })}
        </svg>

        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ animation: "count-up 0.5s ease-out" }}
        >
          <span className="text-4xl font-bold tabular-nums" style={{ color }}>
            {displayScore}
          </span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color }}>
          {label}
        </p>
        <p className="text-[10px] text-muted-foreground">Plantation Health</p>
      </div>
    </div>
  );
}
