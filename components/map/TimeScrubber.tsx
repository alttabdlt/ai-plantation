"use client";

const TIME_RANGES = ["1h", "6h", "24h", "7d", "30d", "Season"];

interface TimeScrubberProps {
  activeRange: string;
  onChange: (range: string) => void;
}

export function TimeScrubber({ activeRange, onChange }: TimeScrubberProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-0.5 rounded-lg bg-black/60 p-1 backdrop-blur-md">
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => onChange(range)}
            className={`rounded-md px-3 py-1 font-mono text-[11px] transition-all ${
              activeRange === range
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
