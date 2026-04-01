"use client";

import { NavSidebar } from "@/components/nav-sidebar";
import { StatusFooter } from "@/components/status-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavSidebar />
      <main className="ml-[220px] min-h-screen bg-background pb-8">
        {children}
      </main>
      <StatusFooter />
    </>
  );
}
