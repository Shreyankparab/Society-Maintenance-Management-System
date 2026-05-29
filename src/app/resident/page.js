"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import {
  Wallet, CreditCard, Receipt, Bell, CheckCircle2,
  Clock, AlertCircle, ArrowRight, Download, TrendingDown,
} from "lucide-react";

const CURRENT_DUE = {
  period: "May 2025",
  dueDate: "10 May 2025",
  amount: 3500,
  status: "overdue",
  daysOverdue: 19,
  items: [
    { label: "Maintenance Charges",  amount: 2500 },
    { label: "Water Charges",        amount: 300  },
    { label: "Sinking Fund",         amount: 200  },
    { label: "Parking Charges",      amount: 300  },
    { label: "Late Payment Penalty", amount: 200  },
  ],
};

const PAYMENT_HISTORY = [
  { period: "Apr 2025", amount: 3500, date: "02 Apr 2025", mode: "UPI",  status: "paid", id: "RCP-0086" },
  { period: "Mar 2025", amount: 3500, date: "05 Mar 2025", mode: "UPI",  status: "paid", id: "RCP-0074" },
  { period: "Feb 2025", amount: 3500, date: "08 Feb 2025", mode: "Card", status: "paid", id: "RCP-0061" },
];

const NOTICES = [
  { title: "AGM – June 15, 2025",              date: "25 May", category: "Meeting"     },
  { title: "Water Disruption – 30th May",       date: "27 May", category: "Maintenance" },
  { title: "May 2025 Bills Generated",          date: "01 May", category: "Financial"   },
];

export default function ResidentDashboard() {
  const totalDue = CURRENT_DUE.items.reduce((s, i) => s + i.amount, 0);

  return (
    <AdminLayout title="My Dashboard" subtitle="Flat A-101 · Greenwoods CHS · Arjun Patel">

      {/* Current due banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: "var(--radius-xl)",
        padding: "1.75rem 2rem",
        marginBottom: "1.75rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.25rem",
      }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(239,68,68,0.15)", border: "2px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertCircle size={24} color="#dc2626" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h3 style={{ color: "var(--text-primary)" }}>₹{totalDue.toLocaleString()} Due</h3>
              <span className="badge badge-danger">Overdue by {CURRENT_DUE.daysOverdue} days</span>
            </div>
            <div style={{ color: "var(--text-dim)", fontSize: "0.875rem", marginTop: "0.2rem" }}>
              {CURRENT_DUE.period} maintenance · was due {CURRENT_DUE.dueDate}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/resident/dues" className="btn btn-secondary">View Details</Link>
          <Link href="/resident/dues" className="btn btn-primary btn-lg">
            Pay Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
        {[
          { label: "This Month Due",      value: `₹${totalDue.toLocaleString()}`, sub: "Including penalty",   color: "red",    icon: AlertCircle   },
          { label: "Last Payment",        value: "₹3,500",                         sub: "02 Apr 2025",         color: "green",  icon: CheckCircle2  },
          { label: "Total Paid (2025)",   value: "₹10,500",                        sub: "3 payments made",     color: "blue",   icon: TrendingDown  },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`glass-card stat-card ${s.color}`}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <Icon size={20} color="var(--text-muted)" />
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600, marginTop: "0.35rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem" }}>

        {/* Recent payments */}
        <div className="glass-card-flat" style={{ overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Recent Payments</div>
            <Link href="/resident/payments" className="btn btn-ghost btn-sm" style={{ color: "var(--accent-primary)", fontSize: "0.78rem" }}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            {PAYMENT_HISTORY.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1.5rem", borderBottom: i < PAYMENT_HISTORY.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={18} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem" }}>{p.period} Maintenance</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{p.date} · {p.mode} · {p.id}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, color: "#15803d" }}>₹{p.amount.toLocaleString()}</div>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", marginTop: "0.2rem" }}>
                    <Download size={11} /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Latest Notices</div>
            <Link href="/resident/notices" className="btn btn-ghost btn-sm" style={{ color: "var(--accent-primary)", fontSize: "0.78rem" }}>
              All <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            {NOTICES.map((n, i) => (
              <div key={i} style={{ padding: "0.875rem 1.5rem", borderBottom: i < NOTICES.length - 1 ? "1px solid var(--border-subtle)" : "none", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(34,197,94,0.04)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "99px", background: "rgba(34,197,94,0.1)", color: "var(--accent-primary)" }}>{n.category}</span>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>{n.title}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{n.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: "1.5rem" }}>
        <div className="section-title">Quick Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {[
            { label: "Pay Dues",        icon: Wallet,    href: "/resident/dues",     color: "#ef4444" },
            { label: "View History",    icon: CreditCard,href: "/resident/payments", color: "#22c55e" },
            { label: "My Receipts",     icon: Receipt,   href: "/resident/receipts", color: "#a855f7" },
            { label: "Notices",         icon: Bell,      href: "/resident/notices",  color: "#f59e0b" },
          ].map((a) => {
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
    </AdminLayout>
  );
}
