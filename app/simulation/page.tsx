import { SimulationCard } from "@/components/simulation-card";

export default function SimulationPage() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Simulation</h1>
        <p className="text-sm text-muted-foreground">
          AI analyzes your plantation data and recommends the best path to
          maximize yield. Run a simulation to see the projected outcome.
        </p>
      </div>
      <SimulationCard />
    </div>
  );
}
