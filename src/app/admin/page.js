"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import {
  TrendingUp, AlertTriangle, CreditCard, Users, FileText,
  ArrowUpRight, CheckCircle2, Clock, XCircle, Plus,
  Receipt, Megaphone, BarChart3, Building2,
} from "lucide-react";

const STATS = [
  { label: "Total Collected", value: "₹1.05L", sub: "This month", trend: "+12%", up: true, icon: TrendingUp, color: "green" },
  { label: "Pending Dues", value: "₹0.14L", sub: "From 4 flats", trend: "4 flats", up: false, icon: AlertTriangle, color: "amber" },
  { label: "Total Flats", value: "30", sub: "Wing E only", trend: "100% occ", up: true, icon: Building2, color: "blue" },
  { label: "Defaulters", value: "4", sub: "Need reminders", trend: "↓2 vs last", up: true, icon: Users, color: "red" },
];

const RECENT_PAYMENTS = [
  { flat: "E-101", name: "Arjun Patel", amount: "₹3,500", mode: "UPI", date: "Today, 10:30 AM", status: "paid" },
  { flat: "E-204", name: "Sneha Rao", amount: "₹3,500", mode: "Card", date: "Today, 09:15 AM", status: "paid" },
  { flat: "E-302", name: "Vikram Nair", amount: "₹4,200", mode: "NEFT", date: "Yesterday", status: "paid" },
  { flat: "E-103", name: "Meena Iyer", amount: "₹3,500", mode: "Cash", date: "Yesterday", status: "paid" },
  { flat: "E-205", name: "Ravi Sharma", amount: "₹3,500", mode: "UPI", date: "2 days ago", status: "paid" },
];

const DEFAULTERS = [
  { flat: "E-102", name: "Rahul Gupta", amount: "₹7,000", months: 2, lastReminder: "3 days ago" },
  { flat: "E-201", name: "Pooja Mehta", amount: "₹3,500", months: 1, lastReminder: "1 week ago" },
  { flat: "E-304", name: "Anil Kumar", amount: "₹10,500", months: 3, lastReminder: "Never" },
];

const QUICK_ACTIONS = [
  { label: "Generate Bills", icon: FileText, href: "/admin/bills", color: "#22c55e" },
  { label: "Record Payment", icon: CreditCard, href: "/admin/payments", color: "#3b82f6" },
  { label: "View Receipts", icon: Receipt, href: "/admin/receipts", color: "#a855f7" },
  { label: "Send Notice", icon: Megaphone, href: "/admin/notices", color: "#f59e0b" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard" subtitle="Nirvana Beyond — May 2025">

      {/* Stats */}
      <div className="grid-cols-4" style={{ marginBottom: "2rem" }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`glass-card stat-card ${s.color}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(15,23,42,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color="var(--text-muted)" />
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "99px", background: s.up ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: s.up ? "#15803d" : "#dc2626" }}>
                  {s.trend}
                </span>
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.4rem", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="section-title">Quick Actions</div>
        <div className="grid-cols-4">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <Link href={a.href} key={a.label} style={{ textDecoration: "none" }}>
                <div className="quick-action">
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: `${a.color}1a`, border: `1px solid ${a.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={a.color} />
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>{a.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid-sidebar">

        {/* Recent Payments */}
        <div className="glass-card-flat" style={{ overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Recent Payments</div>
            <Link href="/admin/payments" className="btn btn-ghost btn-sm" style={{ color: "var(--accent-primary)", fontSize: "0.78rem" }}>
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Flat</th><th>Resident</th><th>Amount</th><th>Mode</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_PAYMENTS.map((p, i) => (
                  <tr key={i}>
                    <td><span style={{ fontWeight: 700, color: "#15803d", background: "rgba(34,197,94,0.1)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>{p.flat}</span></td>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                    <td style={{ fontWeight: 700, color: "#15803d" }}>{p.amount}</td>
                    <td><span className="badge badge-muted">{p.mode}</span></td>
                    <td style={{ fontSize: "0.78rem" }}>{p.date}</td>
                    <td><span className="badge badge-success">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Defaulters */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Top Defaulters</div>
            <Link href="/admin/defaulters" className="btn btn-ghost btn-sm" style={{ color: "var(--accent-primary)", fontSize: "0.78rem" }}>
              All <ArrowUpRight size={13} />
            </Link>
          </div>
          <div style={{ padding: "1rem" }}>
            {DEFAULTERS.map((d, i) => (
              <div key={i} style={{ padding: "0.875rem 0", borderBottom: i < DEFAULTERS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem" }}>{d.flat} — {d.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{d.months} month{d.months > 1 ? "s" : ""} overdue · Last reminder: {d.lastReminder}</div>
                  </div>
                  <span style={{ fontWeight: 800, color: "#dc2626", fontSize: "0.9rem" }}>{d.amount}</span>
                </div>
                <button className="btn btn-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)", fontSize: "0.72rem", marginTop: "0.35rem" }}>
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection progress */}
      <div className="glass-card-flat" style={{ marginTop: "1.5rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <div className="section-title" style={{ marginBottom: "0.2rem" }}>May 2025 Collection Progress</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>₹1.05L of ₹1.19L collected · 88.2%</div>
          </div>
          <span className="badge badge-success">On Track</span>
        </div>
        <div className="progress-bar-track" style={{ height: 10, marginBottom: "1.5rem" }}>
          <div className="progress-bar-fill" style={{ width: "88.2%" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", maxWidth: 400 }}>
          {[
            { wing: "Wing E", collected: 26, total: 30, pct: 88.2 },
          ].map((w) => (
            <div key={w.wing} style={{ textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                <span>{w.wing}</span>
                <span>{w.collected}/{w.total} flats paid ({w.pct}%)</span>
              </div>
              <div className="progress-bar-track" style={{ marginTop: "0.5rem" }}>
                <div className="progress-bar-fill" style={{ width: `${w.pct}%`, background: "linear-gradient(90deg, #16a34a, #22c55e)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
