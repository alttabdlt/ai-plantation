"use client";

import { useState } from "react";
import { FIELDS, YIELD_PREDICTION } from "@/lib/plantation-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Loader2,
  Zap,
  Sparkles,
} from "lucide-react";

interface Recommendation {
  field: string;
  action: string;
  impact: string;
  priority: "high" | "medium" | "low";
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    field: "Catuai Ridge",
    action: "Increase irrigation by 30% immediately",
    impact: "Moisture recovers from 22% to 35% within 48h",
    priority: "high",
  },
  {
    field: "Catuai Ridge",
    action: "Apply copper-based fungicide within 48 hours",
    impact: "Stops leaf rust spread, NDVI stabilizes within 2 weeks",
    priority: "high",
  },
  {
    field: "Gesha Garden",
    action: "Reduce irrigation by 20%",
    impact: "Moisture drops from 58% to optimal 42-45%",
    priority: "medium",
  },
  {
    field: "All Fields",
    action: "Prep drainage channels before Tuesday rain",
    impact: "Prevents waterlogging during 72-85% rainfall period",
    priority: "medium",
  },
];

interface SimulationResult {
  currentYield: number;
  projectedYield: number;
  improvement: number;
  fieldResults: {
    name: string;
    current: number;
    projected: number;
  }[];
}

function runSimulation(): SimulationResult {
  const currentYield = YIELD_PREDICTION.current;
  const projectedYield = 3150;
  const fieldResults = FIELDS.map((f) => {
    const current =
      YIELD_PREDICTION.byField.find(
        (b) => b.name === f.name.split(" ")[0]
      )?.predicted ?? 2800;
    let boost = 1.0;
    if (f.status === "stress") boost = 1.25;
    else if (f.status === "wet") boost = 1.1;
    else boost = 1.03;
    return {
      name: f.name,
      current,
      projected: Math.round(current * boost),
    };
  });
  return {
    currentYield,
    projectedYield,
    improvement: Math.round(
      ((projectedYield - currentYield) / currentYield) * 100
    ),
    fieldResults,
  };
}

export function SimulationCard() {
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setApproved(false);
    setTimeout(() => {
      setSimResult(runSimulation());
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="size-4 text-emerald-400" />
          <h2 className="text-lg font-semibold">AI Recommendations</h2>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
            AI
          </span>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Based on current sensor data, weather forecast, and field health
          analysis.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {RECOMMENDATIONS.map((rec, i) => (
            <div
              key={i}
              className={`animate-fade-in-up stagger-${i + 1} flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:bg-card/80 ${
                rec.priority === "high"
                  ? "border-l-2 border-l-red-500/50"
                  : rec.priority === "medium"
                    ? "border-l-2 border-l-amber-500/50"
                    : ""
              }`}
            >
              <Badge
                variant={
                  rec.priority === "high"
                    ? "destructive"
                    : rec.priority === "medium"
                      ? "warning"
                      : "secondary"
                }
                className="mt-0.5 shrink-0"
              >
                {rec.priority}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {rec.field}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {rec.action}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground/60">
                  {rec.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Run Simulation */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="glow-button gap-2"
          size="lg"
        >
          {isRunning ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Zap className="size-4" />
          )}
          {isRunning ? "Running Simulation..." : "Run Simulation"}
        </Button>
        <span className="text-xs text-muted-foreground">
          Projected outcome if all recommendations are applied
        </span>
      </div>

      {/* Processing animation */}
      {isRunning && (
        <div className="shimmer-bg rounded-xl border border-border p-12 text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-emerald-400" />
          <p className="mt-3 text-sm text-muted-foreground">
            Analyzing 179 sensor feeds and forecasting yield impact...
          </p>
        </div>
      )}

      {/* Results */}
      {simResult && !isRunning && (
        <div className="animate-fade-in-up space-y-5 rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Simulation Results
          </h3>

          {/* Before / After */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="rounded-xl bg-background p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Current Yield
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {simResult.currentYield.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">kg/ha</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-emerald-400">
                <ArrowRight className="size-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-400">
                +{simResult.improvement}%
              </span>
            </div>
            <div className="animate-pulse-glow rounded-xl bg-emerald-500/5 p-5 text-center ring-1 ring-emerald-500/20">
              <p className="text-[11px] uppercase tracking-wider text-emerald-400">
                Projected Yield
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-emerald-400">
                {simResult.projectedYield.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-400/70">kg/ha</p>
            </div>
          </div>

          {/* Per-field breakdown with bars */}
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Per-field breakdown
            </p>
            {simResult.fieldResults.map((fr) => {
              const improved = fr.projected > fr.current;
              const maxVal = Math.max(
                ...simResult.fieldResults.map((r) => r.projected)
              );
              const barWidth = (fr.projected / maxVal) * 100;
              const currentBarWidth = (fr.current / maxVal) * 100;
              return (
                <div key={fr.name} className="rounded-lg bg-background px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{fr.name}</span>
                    <div className="flex items-center gap-3 text-xs tabular-nums">
                      <span className="text-muted-foreground">
                        {fr.current.toLocaleString()}
                      </span>
                      <ArrowRight className="size-3 text-muted-foreground/50" />
                      <span
                        className={
                          improved
                            ? "font-medium text-emerald-400"
                            : "text-muted-foreground"
                        }
                      >
                        {fr.projected.toLocaleString()} kg/ha
                      </span>
                    </div>
                  </div>
                  {/* Visual bar */}
                  <div className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-border/50">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/20"
                      style={{ width: `${currentBarWidth}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/50 transition-all duration-700"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Approve */}
          {!approved ? (
            <Button
              onClick={() => setApproved(true)}
              className="glow-button w-full gap-2"
              size="lg"
            >
              <CheckCircle2 className="size-4" />
              Approve Recommendations
            </Button>
          ) : (
            <div className="animate-fade-in-up flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 py-3 text-sm font-medium text-emerald-400">
              <CheckCircle2 className="size-4" />
              Recommendations approved — actions queued
            </div>
          )}
        </div>
      )}
    </div>
  );
}
