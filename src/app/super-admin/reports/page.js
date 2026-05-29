"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { TrendingUp, Download, BarChart3 } from "lucide-react";

const MONTHLY = [
  { month: "Dec 2024", collected: 3820000, pending: 480000, defaulters: 12 },
  { month: "Jan 2025", collected: 4200000, pending: 320000, defaulters: 8  },
  { month: "Feb 2025", collected: 3580000, pending: 620000, defaulters: 15 },
  { month: "Mar 2025", collected: 4850000, pending: 250000, defaulters: 6  },
  { month: "Apr 2025", collected: 4410000, pending: 390000, defaulters: 10 },
  { month: "May 2025", collected: 5260000, pending: 140000, defaulters: 3  },
];

const SOCIETY_BREAKDOWN = [
  { name: "Heritage Park",      collected: 580000, percent: 82 },
  { name: "Greenwoods CHS",     collected: 360000, percent: 75 },
  { name: "Royal Residency",    collected: 420000, percent: 90 },
  { name: "Sunrise Apartments", collected: 210000, percent: 68 },
  { name: "Palm Grove Society", collected: 140000, percent: 55 },
];

const fmt = (n) => `₹${(n / 100000).toFixed(1)}L`;
const max = Math.max(...MONTHLY.map((m) => m.collected));

export default function ReportsPage() {
  return (
    <AdminLayout title="Platform Reports" subtitle="Revenue and collection analytics across all societies">

      {/* Summary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
        {[
          { label: "Total Collected (YTD)", value: "₹2.61Cr", sub: "Across all 24 societies", color: "green" },
          { label: "Outstanding Dues",      value: "₹22L",    sub: "As of today",              color: "amber" },
          { label: "Avg Collection Rate",   value: "78.3%",   sub: "+4.2% vs last year",       color: "blue"  },
          { label: "Total Defaulters",      value: "54",      sub: "Across all societies",     color: "red"   },
        ].map((k) => (
          <div key={k.label} className={`glass-card stat-card ${k.color}`}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.4rem" }}>{k.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{k.label}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }}>
        {/* Monthly collection chart */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="section-title" style={{ marginBottom: "0.15rem" }}>Monthly Collection vs Pending</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>Last 6 months</div>
            </div>
            <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", height: 180, marginBottom: "1rem" }}>
              {MONTHLY.map((m, i) => {
                const collectedH = (m.collected / max) * 160;
                const pendingH   = (m.pending / max) * 160;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "100%", display: "flex", gap: "3px", alignItems: "flex-end", height: 160 }}>
                      <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "linear-gradient(180deg, #22c55e, #16a34a)", height: collectedH }} />
                      <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "rgba(245,158,11,0.4)", height: pendingH }} />
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600, textAlign: "center" }}>{m.month.split(" ")[0]}</div>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
              {[{ label: "Collected", color: "#22c55e" }, { label: "Pending", color: "#f59e0b" }].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontWeight: 600 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Society breakdown */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Society Collection Rate</div>
          </div>
          <div style={{ padding: "1.25rem" }}>
            {SOCIETY_BREAKDOWN.map((s, i) => (
              <div key={i} style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 600 }}>{s.name}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: s.percent >= 80 ? "#15803d" : s.percent >= 65 ? "#b45309" : "#dc2626" }}>
                    {s.percent}%
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{
                    width: `${s.percent}%`,
                    background: s.percent >= 80 ? "linear-gradient(90deg, #16a34a, #22c55e)"
                              : s.percent >= 65 ? "linear-gradient(90deg, #d97706, #f59e0b)"
                              : "linear-gradient(90deg, #dc2626, #ef4444)",
                  }} />
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.25rem" }}>{fmt(s.collected)} collected</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly data table */}
      <div className="glass-card-flat" style={{ marginTop: "1.5rem", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Monthly Breakdown</div>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> CSV Export</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Collected</th>
                <th>Pending Dues</th>
                <th>Defaulters</th>
                <th>Collection Rate</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY.map((m, i) => {
                const total = m.collected + m.pending;
                const rate  = Math.round((m.collected / total) * 100);
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{m.month}</td>
                    <td style={{ color: "#15803d", fontWeight: 700 }}>{fmt(m.collected)}</td>
                    <td style={{ color: "#b45309", fontWeight: 700 }}>{fmt(m.pending)}</td>
                    <td>
                      <span className={`badge ${m.defaulters <= 6 ? "badge-success" : m.defaulters <= 12 ? "badge-warning" : "badge-danger"}`}>
                        {m.defaulters}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 60, height: 6, background: "rgba(34,197,94,0.1)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${rate}%`, background: rate >= 80 ? "#22c55e" : "#f59e0b", borderRadius: "99px" }} />
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: rate >= 80 ? "#15803d" : "#b45309" }}>{rate}%</span>
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
