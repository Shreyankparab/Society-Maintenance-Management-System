"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import TopBar from "@/components/ui/TopBar";

export default function AdminLayout({ children, title, subtitle }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarW = collapsed
    ? "var(--sidebar-collapsed)"
    : "var(--sidebar-width)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-0)" }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Subtle grid texture */}
      <div
        className="bg-grid"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <TopBar
        sidebarWidth={sidebarW}
        onMenuClick={() => setMobileOpen(true)}
        title={title}
        subtitle={subtitle}
      />

      <main
        className="page-content"
        style={{
          marginLeft: sidebarW,
          paddingTop: "var(--topbar-height)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="page-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
