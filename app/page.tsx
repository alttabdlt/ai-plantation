import Link from "next/link";
import { FlaskConical, MessageCircle, Bell } from "lucide-react";
import { HealthRing } from "@/components/health-ring";
import { FieldMap } from "@/components/field-map";
import { AIBriefing } from "@/components/ai-briefing";
import { QuickStats } from "@/components/quick-stats";
import { LiveActivity } from "@/components/live-activity";
import { WeatherStrip } from "@/components/weather-strip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALERTS } from "@/lib/plantation-data";

const criticalCount = ALERTS.filter(
  (a) => a.type === "danger" || a.type === "warning"
).length;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6 pb-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning</h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s your plantation at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="outline" size="sm">
              <MessageCircle className="size-3.5" />
              Ask AI
            </Button>
          </Link>
          <Link href="/simulation">
            <Button size="sm" className="glow-button">
              <FlaskConical className="size-3.5" />
              Run Simulation
            </Button>
          </Link>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid gap-5 lg:grid-cols-[260px_1fr_240px]">
        {/* LEFT COLUMN — Health + Stats */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <HealthRing />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <QuickStats />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <WeatherStrip />
          </div>
        </div>

        {/* CENTER COLUMN — Map + Briefing */}
        <div className="space-y-5">
          <FieldMap />
          <AIBriefing />
        </div>

        {/* RIGHT COLUMN — Activity + Alerts */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <LiveActivity />
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="size-3.5 text-muted-foreground" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Alerts
                </span>
              </div>
              <Badge variant="destructive" className="text-[10px]">
                {criticalCount}
              </Badge>
            </div>
            <div className="space-y-2">
              {ALERTS.filter(
                (a) => a.type === "danger" || a.type === "warning"
              ).map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg border-l-2 border-l-red-500/40 bg-destructive/5 px-3 py-2"
                >
                  <p className="text-[11px] font-medium text-red-400">
                    {alert.field}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {alert.message}
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground/40">
                    {alert.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
