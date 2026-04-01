import { PageShell } from "@/components/PageShell";
import { SimulationCard } from "@/components/simulation-card";

export default function SimulationPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 py-6 pb-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Simulation</h1>
          <p className="text-sm text-muted-foreground">
            AI analyzes your plantation data and recommends the best path to
            maximize yield. Run a simulation to see the projected outcome.
          </p>
        </div>
        <SimulationCard />
      </div>
    </PageShell>
  );
}
