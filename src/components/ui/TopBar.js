"use client";

import { useState } from "react";
import { Bell, Search, Menu, ChevronDown, Settings, User, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NOTIFICATIONS = [
  { id: 1, msg: "Payment received from Flat B-204", time: "2m ago", unread: true },
  { id: 2, msg: "New maintenance bill generated",   time: "1h ago", unread: true },
  { id: 3, msg: "Arjun Patel raised a complaint",   time: "3h ago", unread: false },
];

export default function TopBar({ sidebarWidth, onMenuClick, title, subtitle }) {
  const { user, logout } = useAuth();
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  const dropdownBase = {
    position: "absolute", right: 0, top: "calc(100% + 8px)",
    background: "#ffffff",
    border: "1px solid var(--border-medium)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-modal)",
    zIndex: 200,
    animation: "slideUp 0.18s ease",
  };

  const close = () => { setNotifOpen(false); setProfileOpen(false); };

  return (
    <header className="topbar" style={{ left: sidebarWidth || 0 }}>

      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", minWidth: 0 }}>
        <button
          className="btn btn-ghost btn-icon"
          onClick={onMenuClick}
          id="topbar-menu-btn"
          aria-label="Open menu"
          style={{ flexShrink: 0 }}
        >
          <Menu size={20} />
        </button>
        <div style={{ minWidth: 0 }}>
          {title && (
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.12rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>

        {/* Search — hidden on mobile via CSS class */}
        <div className="topbar-search" style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={13} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", pointerEvents: "none" }} />
          <input
            placeholder="Search…"
            className="input-field"
            style={{ width: 200, paddingLeft: "2.1rem", paddingTop: "0.38rem", paddingBottom: "0.38rem", fontSize: "0.8rem" }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            id="topbar-notif-btn"
            style={{ position: "relative" }}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-dot" />}
          </button>

          {notifOpen && (
            <>
              {/* Backdrop for mobile */}
              <div
                style={{ position: "fixed", inset: 0, zIndex: 199 }}
                onClick={close}
              />
              <div style={{ ...dropdownBase, width: "min(320px, calc(100vw - 2rem))", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>Notifications</span>
                  {unreadCount > 0 && <span className="badge badge-info">{unreadCount} new</span>}
                </div>
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} style={{
                    padding: "0.875rem 1rem",
                    display: "flex", gap: "0.75rem", alignItems: "flex-start",
                    borderBottom: "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    background: n.unread ? "rgba(22,163,74,0.03)" : "transparent",
                    transition: "background 0.12s",
                  }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.unread ? "var(--accent-primary)" : "transparent", flexShrink: 0, marginTop: 5 }} />
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{n.msg}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{n.time}</div>
                    </div>
                  </div>
                ))}
                <div style={{ padding: "0.6rem" }}>
                  <button className="btn btn-ghost btn-sm" style={{ width: "100%", fontSize: "0.78rem" }}>View all notifications</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            id="topbar-profile-btn"
            style={{ gap: "0.5rem", padding: "0.38rem 0.65rem", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)" }}
          >
            <div className="avatar avatar-sm">{user?.avatar || "U"}</div>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="topbar-search">
              {user?.name?.split(" ")[0] || "User"}
            </span>
            <ChevronDown size={13} color="var(--text-dim)" />
          </button>

          {profileOpen && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 199 }}
                onClick={close}
              />
              <div style={{ ...dropdownBase, width: 200, padding: "0.5rem", overflow: "hidden", zIndex: 200 }}>
                <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "flex-start", gap: "0.6rem", color: "var(--text-secondary)" }}>
                  <User size={14} /> Profile
                </button>
                <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "flex-start", gap: "0.6rem", color: "var(--text-secondary)" }}>
                  <Settings size={14} /> Settings
                </button>
                <div style={{ height: 1, background: "var(--border-subtle)", margin: "0.35rem 0" }} />
                <button onClick={logout} className="btn btn-danger btn-sm" style={{ width: "100%", justifyContent: "flex-start", gap: "0.6rem" }}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
