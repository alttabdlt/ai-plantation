import Link from "next/link";
import { FlaskConical, MessageCircle, Bell } from "lucide-react";
import { HealthRing } from "@/components/health-ring";
import { FieldMap } from "@/components/field-map";
import { AIBriefing } from "@/components/ai-briefing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALERTS } from "@/lib/plantation-data";

const criticalCount = ALERTS.filter(
  (a) => a.type === "danger" || a.type === "warning"
).length;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Good morning
          </h1>
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
            <Button size="sm">
              <FlaskConical className="size-3.5" />
              Run Simulation
            </Button>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Left: Health score + alerts */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <HealthRing />
          </div>

          {/* Critical alerts */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Alerts</span>
              </div>
              <Badge variant="destructive">{criticalCount}</Badge>
            </div>
            <div className="space-y-2">
              {ALERTS.filter(
                (a) => a.type === "danger" || a.type === "warning"
              ).map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg bg-destructive/5 px-3 py-2"
                >
                  <p className="text-xs font-medium text-destructive">
                    {alert.field}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Map + briefing */}
        <div className="space-y-6">
          <FieldMap />
          <AIBriefing />
        </div>
      </div>
    </div>
  );
}
