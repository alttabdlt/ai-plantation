"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Coffee,
  LayoutDashboard,
  FlaskConical,
  MessageCircle,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SENSORS } from "@/lib/plantation-data";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/simulation", label: "Simulation", icon: FlaskConical },
  { href: "/chat", label: "Ask AI", icon: MessageCircle },
];

export function NavSidebar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
          <Coffee className="size-5 text-white" />
          {/* Alive dot */}
          <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full border border-sidebar bg-emerald-500" />
          </span>
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-sidebar-foreground">
            CafePulse
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            AI Plantation OS
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 pt-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary shadow-[inset_0_0_12px_rgba(34,197,94,0.06)]"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}

        {/* Sensor status */}
        <div className="mt-6 rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Radio className="size-3 text-emerald-400 animate-pulse-subtle" />
            <span className="text-[10px] font-medium text-muted-foreground">
              {SENSORS.active}/{SENSORS.total} sensors online
            </span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-emerald-500/60"
              style={{
                width: `${(SENSORS.active / SENSORS.total) * 100}%`,
              }}
            />
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4">
        <p className="text-xs font-medium text-muted-foreground">
          Highland Coffee Estate
        </p>
        <div className="mt-0.5 flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground/60">
            6 blocks &middot; 200 Ha
          </p>
          <p className="font-mono text-[10px] tabular-nums text-muted-foreground/40">
            {time}
          </p>
        </div>
      </div>
    </aside>
  );
}
