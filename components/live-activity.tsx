"use client";

import { useEffect, useState } from "react";
import { MACHINERY, ALERTS, SENSORS } from "@/lib/plantation-data";
import { Radio, Cpu, Bug, Droplets, Leaf, CloudRain } from "lucide-react";

interface ActivityItem {
  text: string;
  icon: React.ReactNode;
  time: string;
  type: "sensor" | "machine" | "alert";
}

function generateActivities(): ActivityItem[] {
  const items: ActivityItem[] = [];

  // Machinery activities
  for (const m of MACHINERY.filter((m) => m.status === "active")) {
    items.push({
      text: `${m.name} — ${m.task}`,
      icon: <Cpu className="size-3" />,
      time: `${Math.floor(Math.random() * 5) + 1}m ago`,
      type: "machine",
    });
  }

  // Recent sensor events
  items.push({
    text: `Sensor cluster updated — ${SENSORS.active} active`,
    icon: <Radio className="size-3" />,
    time: "2s ago",
    type: "sensor",
  });
  items.push({
    text: "Moisture readings refreshed — Fields A-F",
    icon: <Droplets className="size-3" />,
    time: "15s ago",
    type: "sensor",
  });

  // Alert-based activities
  for (const a of ALERTS.filter(
    (a) => a.type === "danger" || a.type === "warning"
  ).slice(0, 2)) {
    const Icon = a.message.includes("leaf rust")
      ? Bug
      : a.message.includes("rain")
        ? CloudRain
        : a.message.includes("moisture")
          ? Droplets
          : Leaf;
    items.push({
      text: `${a.field} — ${a.message.split("—")[0].trim()}`,
      icon: <Icon className="size-3" />,
      time: a.time,
      type: "alert",
    });
  }

  return items.slice(0, 6);
}

export function LiveActivity() {
  const [activities] = useState(generateActivities);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate which item has the "latest" pulse
  const pulseIndex = tick % activities.length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Live Activity
        </span>
      </div>
      <div className="space-y-0.5">
        {activities.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors duration-500 ${
              i === pulseIndex
                ? "bg-emerald-500/5 text-foreground"
                : "text-muted-foreground"
            }`}
            style={{
              animation: `fade-in-up 0.4s ease-out both`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            <span
              className={`shrink-0 ${
                item.type === "alert"
                  ? "text-amber-400"
                  : item.type === "machine"
                    ? "text-blue-400"
                    : "text-emerald-400"
              }`}
            >
              {item.icon}
            </span>
            <span className="min-w-0 truncate">{item.text}</span>
            <span className="ml-auto shrink-0 text-[10px] text-muted-foreground/50">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
