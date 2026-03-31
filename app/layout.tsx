import type { Metadata } from "next";
import { NavSidebar } from "@/components/nav-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CafePulse — AI Plantation OS",
  description:
    "Simulation-first plantation operating system powered by live IoT data and AI intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <NavSidebar />
        <main className="ml-[220px] min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
