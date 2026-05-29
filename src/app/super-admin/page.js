"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Globe, Users, TrendingUp, AlertTriangle, Building2, ArrowUpRight,
  CheckCircle2, Clock, DollarSign, BarChart3, Activity,
} from "lucide-react";

const STATS = [
  { label: "Total Societies",    value: "24",     change: "+3 this month",   trend: "up",   icon: Globe,        color: "green"  },
  { label: "Active Users",       value: "3,842",  change: "+12% MoM",        trend: "up",   icon: Users,        color: "blue"   },
  { label: "Monthly Revenue",    value: "₹42.6L", change: "+8.4% vs last",   trend: "up",   icon: TrendingUp,   color: "purple" },
  { label: "Pending Issues",     value: "17",     change: "3 critical",      trend: "down", icon: AlertTriangle,color: "amber"  },
];

const SOCIETIES = [
  { name: "Greenwoods CHS",      flats: 120, collected: "₹3.6L",  pending: "₹0.8L", status: "active"  },
  { name: "Sunrise Apartments",  flats: 84,  collected: "₹2.1L",  pending: "₹0.4L", status: "active"  },
  { name: "Heritage Park",       flats: 200, collected: "₹5.8L",  pending: "₹1.2L", status: "active"  },
  { name: "Palm Grove Society",  flats: 56,  collected: "₹1.4L",  pending: "₹0.9L", status: "warning" },
  { name: "Royal Residency",     flats: 144, collected: "₹4.2L",  pending: "₹0.3L", status: "active"  },
];

const RECENT_ACTIVITY = [
  { action: "New society onboarded",        society: "Pearl Heights CHS", time: "2h ago",  type: "success" },
  { action: "Payment gateway configured",   society: "Greenwoods CHS",    time: "5h ago",  type: "info"    },
  { action: "Bulk bills generated",         society: "Heritage Park",     time: "1d ago",  type: "success" },
  { action: "Admin account created",        society: "Palm Grove Society",time: "2d ago",  type: "info"    },
  { action: "High defaulter count alert",   society: "Palm Grove Society",time: "2d ago",  type: "warning" },
];

const BADGE_COLORS = {
  success: { bg: "rgba(34,197,94,0.12)",  color: "#15803d"  },
  info:    { bg: "rgba(59,130,246,0.12)", color: "#93c5fd"  },
  warning: { bg: "rgba(245,158,11,0.12)", color: "#b45309"  },
};

export default function SuperAdminDashboard() {
  return (
    <AdminLayout title="Super Admin Dashboard" subtitle="Platform-wide overview — ResiCentral">

      {/* ── Stats ──────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`glass-card stat-card ${s.color}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(15,23,42,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color="var(--text-muted)" />
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "99px", background: s.trend === "up" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: s.trend === "up" ? "#15803d" : "#dc2626" }}>
                  {s.trend === "up" ? "▲" : "▼"} {s.change.split(" ")[0]}
                </span>
              </div>
              <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.4rem", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* ── Main Grid ──────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem" }}>

        {/* Societies table */}
        <div className="glass-card-flat" style={{ overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="section-title" style={{ marginBottom: 0 }}>Active Societies</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{SOCIETIES.length} societies on platform</div>
            </div>
            <button className="btn btn-primary btn-sm">+ Add Society</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Society</th>
                  <th>Flats</th>
                  <th>Collected</th>
                  <th>Pending</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {SOCIETIES.map((s) => (
                  <tr key={s.name}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Building2 size={15} color="var(--accent-primary)" />
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</span>
                      </div>
                    </td>
                    <td>{s.flats}</td>
                    <td style={{ color: "#15803d", fontWeight: 700 }}>{s.collected}</td>
                    <td style={{ color: "#b45309", fontWeight: 700 }}>{s.pending}</td>
                    <td>
                      <span className={`badge ${s.status === "active" ? "badge-success" : "badge-warning"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-icon btn-sm">
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Recent Activity</div>
          </div>
          <div style={{ padding: "1rem" }}>
            {RECENT_ACTIVITY.map((a, i) => {
              const c = BADGE_COLORS[a.type];
              return (
                <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Activity size={14} color={c.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.4 }}>{a.action}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{a.society}</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Revenue Bar chart placeholder ─────── */}
      <div className="glass-card-flat" style={{ marginTop: "1.5rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <div className="section-title" style={{ marginBottom: "0.2rem" }}>Monthly Collection Overview</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>All societies · Last 6 months</div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["3M", "6M", "1Y"].map((t) => (
              <button key={t} className={`btn btn-sm ${t === "6M" ? "btn-secondary" : "btn-ghost"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Bar chart visual */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: 160 }}>
          {[
            { month: "Dec", val: 38, collected: "₹38.2L" },
            { month: "Jan", val: 42, collected: "₹42.0L" },
            { month: "Feb", val: 35, collected: "₹35.8L" },
            { month: "Mar", val: 48, collected: "₹48.5L" },
            { month: "Apr", val: 44, collected: "₹44.1L" },
            { month: "May", val: 52, collected: "₹52.6L" },
          ].map((b, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontWeight: 600 }}>{b.collected}</div>
              <div
                style={{
                  width: "100%", borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                  background: i === 5
                    ? "linear-gradient(180deg, #22c55e, #16a34a)"
                    : "rgba(34,197,94,0.2)",
                  height: `${b.val * 2.8}px`,
                  transition: "height 0.5s ease",
                  cursor: "pointer",
                }}
              />
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontWeight: 600 }}>{b.month}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
