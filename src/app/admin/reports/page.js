"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { Download, BarChart3, TrendingUp } from "lucide-react";

const MONTHLY = [
  { month: "Dec", collected: 105000, pending: 0, defaulters: 0 },
  { month: "Jan", collected: 105000, pending: 0, defaulters: 0 },
  { month: "Feb", collected: 98000, pending: 7000, defaulters: 2 },
  { month: "Mar", collected: 105000, pending: 0, defaulters: 0 },
  { month: "Apr", collected: 101500, pending: 3500, defaulters: 1 },
  { month: "May", collected: 105000, pending: 14000, defaulters: 4 },
];

const WING_STATS = [
  { wing: "Wing E", flats: 30, paid: 26, amount: 105000, pct: 88 },
];

const max = Math.max(...MONTHLY.map((m) => m.collected));
const fmt = (n) => `₹${(n / 1000).toFixed(1)}K`;

export default function AdminReportsPage() {
  return (
    <AdminLayout title="Reports" subtitle="Nirvana Beyond · Wing E Overview">

      {/* KPIs */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        {[
          { label: "YTD Collected", value: "₹6.19L", sub: "Jan–May 2025", color: "green" },
          { label: "YTD Pending", value: "₹24.5K", sub: "Across Wing E", color: "amber" },
          { label: "Avg Rate", value: "96.2%", sub: "+3.1% vs 2024", color: "blue" },
          { label: "Total Defaulters", value: "4", sub: "Active in Wing E", color: "red" },
        ].map((k) => (
          <div key={k.label} className={`glass-card stat-card ${k.color}`}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.4rem" }}>{k.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-sidebar" style={{ marginBottom: "1.5rem" }}>
        {/* Monthly chart */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Monthly Collection</div>
            <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", height: 160, marginBottom: "0.75rem" }}>
              {MONTHLY.map((m, i) => {
                const h = (m.collected / max) * 150;
                const ph = (m.pending / max) * 150;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600 }}>{fmt(m.collected)}</div>
                    <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 150 }}>
                      <div style={{ flex: 2, height: h, borderRadius: "3px 3px 0 0", background: i === 5 ? "linear-gradient(180deg, #22c55e, #16a34a)" : "rgba(34,197,94,0.25)" }} />
                      <div style={{ flex: 1, height: ph, borderRadius: "3px 3px 0 0", background: "rgba(245,158,11,0.4)" }} />
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600 }}>{m.month}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center" }}>
              {[{ label: "Collected", color: "#22c55e" }, { label: "Pending", color: "#f59e0b" }].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                  <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontWeight: 600 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wing breakdown */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Wing-wise Rate</div>
          </div>
          <div style={{ padding: "1.25rem" }}>
            {WING_STATS.map((w, i) => (
              <div key={i} style={{ marginBottom: "1.1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>{w.wing}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 800, color: w.pct === 100 ? "#15803d" : w.pct >= 80 ? "var(--text-primary)" : "#b45309" }}>{w.pct}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${w.pct}%`, background: w.pct === 100 ? "linear-gradient(90deg, #16a34a, #22c55e)" : "linear-gradient(90deg, #d97706, #f59e0b)" }} />
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.25rem" }}>{w.paid}/{w.flats} flats · {fmt(w.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data table */}
      <div className="glass-card-flat" style={{ overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Monthly Report</div>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> CSV</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th><th>Collected</th><th>Pending</th><th>Defaulters</th>
                <th>Total Expected</th><th>Collection Rate</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY.map((m, i) => {
                const total = m.collected + m.pending;
                const rate = Math.round((m.collected / total) * 100);
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>{m.month} 2025</td>
                    <td style={{ fontWeight: 700, color: "#15803d" }}>{fmt(m.collected)}</td>
                    <td style={{ fontWeight: 700, color: m.pending > 0 ? "#b45309" : "#15803d" }}>{m.pending > 0 ? fmt(m.pending) : "—"}</td>
                    <td><span className={`badge ${m.defaulters === 0 ? "badge-success" : m.defaulters <= 4 ? "badge-warning" : "badge-danger"}`}>{m.defaulters || "None"}</span></td>
                    <td>{fmt(total)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 50, height: 5, background: "rgba(34,197,94,0.1)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${rate}%`, background: rate === 100 ? "#22c55e" : "#f59e0b", borderRadius: "99px" }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "0.78rem", color: rate === 100 ? "#15803d" : "#b45309" }}>{rate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
