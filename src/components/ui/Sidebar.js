"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Building2, Users, FileText, CreditCard,
  Receipt, AlertTriangle, Megaphone, BarChart3, Settings,
  ChevronLeft, ChevronRight, LogOut, Home, Wallet,
  Bell, FileBadge, MessageSquare, Shield, Globe,
} from "lucide-react";

const NAV = {
  admin: [
    {
      section: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      ],
    },
    {
      section: "Society",
      items: [
        { label: "Flats", icon: Building2, href: "/admin/flats" },
        { label: "Bills", icon: FileText, href: "/admin/bills" },
        { label: "Payments", icon: CreditCard, href: "/admin/payments" },
        { label: "Receipts", icon: Receipt, href: "/admin/receipts" },
      ],
    },
    {
      section: "Management",
      items: [
        { label: "Defaulters", icon: AlertTriangle, href: "/admin/defaulters" },
        { label: "Notices", icon: Megaphone, href: "/admin/notices" },
        { label: "Reports", icon: BarChart3, href: "/admin/reports" },
      ],
    },
  ],
  resident: [
    {
      section: "My Home",
      items: [
        { label: "Dashboard", icon: Home, href: "/resident" },
        { label: "My Dues", icon: Wallet, href: "/resident/dues" },
      ],
    },
    {
      section: "Payments",
      items: [
        { label: "History", icon: CreditCard, href: "/resident/payments" },
        { label: "Receipts", icon: FileBadge, href: "/resident/receipts" },
      ],
    },
    {
      section: "Society",
      items: [
        { label: "Notices", icon: Bell, href: "/resident/notices" },
        { label: "Complaints", icon: MessageSquare, href: "/resident/complaints" },
      ],
    },
  ],
};

const ROLE_LABEL = {
  admin: "Committee Admin",
  resident: "Resident",
};

const ROLE_ICON = {
  admin: Building2,
  resident: Home,
};

const ROLE_COLOR = {
  admin: { bg: "rgba(22,163,74,0.08)", color: "#15803d", border: "rgba(22,163,74,0.15)" },
  resident: { bg: "rgba(37,99,235,0.08)", color: "#1d4ed8", border: "rgba(37,99,235,0.15)" },
};

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const role = user?.role || "resident";
  const navGroups = NAV[role] || [];
  const RoleIcon = ROLE_ICON[role];
  const roleColors = ROLE_COLOR[role];

  useEffect(() => { setMobileOpen?.(false); }, [pathname]);

  const sidebarClass = ["sidebar", mobileOpen ? "open" : ""].filter(Boolean).join(" ");

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={sidebarClass} style={{ width: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)" }}>

        {/* Brand */}
        <div style={{
          padding: "1.1rem 1rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "0.75rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", overflow: "hidden" }}>
            <img src="/images/logo.jpg" alt="Nirwana Logo" style={{ width: 56, height: 44, borderRadius: "var(--radius-md)", objectFit: "cover", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} />
            {!collapsed && (
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>Nirvana Beyond</div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-dim)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Society Portal</div>
              </div>
            )}
          </div>
        </div>

        {/* User pill */}
        {user && (
          <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface-0)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", overflow: "hidden" }}>
              <div className="avatar avatar-sm" style={{ flexShrink: 0 }}>
                {user.avatar}
              </div>
              {!collapsed && (
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.name}
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginTop: "0.2rem", padding: "0.15rem 0.5rem", borderRadius: "99px", background: roleColors.bg, border: `1px solid ${roleColors.border}` }}>
                    <RoleIcon size={9} color={roleColors.color} />
                    <span style={{ fontSize: "0.6rem", color: roleColors.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {ROLE_LABEL[role]}
                    </span>
                  </div>
                  {user.flat && <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>Flat {user.flat} · {user.society}</div>}
                  {user.society && !user.flat && <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{user.society}</div>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
          {navGroups.map((group) => (
            <div key={group.section}>
              {!collapsed && (
                <div className="sidebar-section-label">{group.section}</div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-nav-item${isActive ? " active" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      size={17}
                      className="nav-icon"
                      strokeWidth={isActive ? 2.5 : 2}
                      style={{ flexShrink: 0, color: isActive ? "var(--accent-primary)" : undefined }}
                    />
                    {!collapsed && (
                      <span style={{ flex: 1 }}>{item.label}</span>
                    )}
                    {!collapsed && isActive && (
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-primary)", flexShrink: 0 }} />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", padding: "0.75rem 0.5rem", background: "var(--surface-0)" }}>
          <button
            onClick={logout}
            className="sidebar-nav-item"
            style={{ width: "100%", background: "none", border: "1px solid transparent", color: "var(--color-danger)" }}
          >
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
