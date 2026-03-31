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
        <h2 className="mb-1 text-lg font-semibold">AI Recommendations</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Based on current sensor data, weather forecast, and field health
          analysis.
        </p>
        <div className="space-y-3">
          {RECOMMENDATIONS.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
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
                  {rec.field}:{" "}
                  <span className="font-normal text-muted-foreground">
                    {rec.action}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/70">
                  Expected: {rec.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Run Simulation */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="gap-2"
        >
          {isRunning ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Zap className="size-4" />
          )}
          {isRunning ? "Running Simulation..." : "Run Simulation"}
        </Button>
        <span className="text-xs text-muted-foreground">
          See projected outcome if all recommendations are applied
        </span>
      </div>

      {/* Results */}
      {simResult && (
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold">Simulation Results</h3>

          {/* Before / After */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-background p-4 text-center">
              <p className="text-xs text-muted-foreground">Current Yield</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {simResult.currentYield.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">kg/ha</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 text-emerald-500">
                <ArrowRight className="size-5" />
                <TrendingUp className="size-5" />
              </div>
            </div>
            <div className="rounded-lg bg-emerald-500/5 p-4 text-center ring-1 ring-emerald-500/20">
              <p className="text-xs text-emerald-400">Projected Yield</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-400">
                {simResult.projectedYield.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-400/70">
                kg/ha (+{simResult.improvement}%)
              </p>
            </div>
          </div>

          {/* Per-field breakdown */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Per-field breakdown
            </p>
            {simResult.fieldResults.map((fr) => {
              const improved = fr.projected > fr.current;
              return (
                <div
                  key={fr.name}
                  className="flex items-center justify-between rounded-lg bg-background px-3 py-2"
                >
                  <span className="text-sm">{fr.name}</span>
                  <div className="flex items-center gap-3 text-xs tabular-nums">
                    <span className="text-muted-foreground">
                      {fr.current.toLocaleString()}
                    </span>
                    <ArrowRight className="size-3 text-muted-foreground/50" />
                    <span
                      className={
                        improved ? "font-medium text-emerald-400" : "text-muted-foreground"
                      }
                    >
                      {fr.projected.toLocaleString()} kg/ha
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Approve */}
          {!approved ? (
            <Button
              onClick={() => setApproved(true)}
              className="w-full gap-2"
            >
              <CheckCircle2 className="size-4" />
              Approve Recommendations
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 py-3 text-sm font-medium text-emerald-400">
              <CheckCircle2 className="size-4" />
              Recommendations approved — actions queued
            </div>
          )}
        </div>
      )}
    </div>
  );
}
