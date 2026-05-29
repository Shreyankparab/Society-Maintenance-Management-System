"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Search, Send, AlertTriangle, Download, Phone, Mail } from "lucide-react";

const DEFAULTERS = [
  { flat: "A-102", name: "Rahul Gupta",    phone: "9123456789", email: "rahul@email.com", months: 2, amount: 7000,  lastPaid: "Mar 2025", wing: "A", severity: "high"   },
  { flat: "A-201", name: "Pooja Mehta",    phone: "9876543210", email: "pooja@email.com", months: 1, amount: 3500,  lastPaid: "Apr 2025", wing: "A", severity: "medium" },
  { flat: "A-304", name: "Anil Kumar",     phone: "9988776655", email: "anil@email.com",  months: 3, amount: 10500, lastPaid: "Feb 2025", wing: "A", severity: "critical"},
  { flat: "A-202", name: "Neeta Sharma",   phone: "9111222333", email: "neeta@email.com", months: 1, amount: 3500,  lastPaid: "Apr 2025", wing: "A", severity: "medium" },
];

const SEV_CONFIG = {
  critical: { label: "Critical (3+ months)", badge: "badge-danger",   color: "#dc2626", bg: "rgba(239,68,68,0.05)", border: "rgba(239,68,68,0.15)"  },
  high:     { label: "High (2 months)",      badge: "badge-warning",  color: "#b45309", bg: "rgba(245,158,11,0.05)", border: "rgba(245,158,11,0.15)" },
  medium:   { label: "Medium (1 month)",     badge: "badge-info",     color: "#93c5fd", bg: "rgba(59,130,246,0.05)", border: "rgba(59,130,246,0.15)"  },
};

export default function DefaultersPage() {
  const [search, setSearch]       = useState("");
  const [sevFilter, setSev]       = useState("all");
  const [remindAll, setRemindAll] = useState(false);
  const [reminded, setReminded]   = useState(new Set());

  const filtered = DEFAULTERS.filter((d) => {
    const q = search === "" || d.flat.toLowerCase().includes(search.toLowerCase()) || d.name.toLowerCase().includes(search.toLowerCase());
    const s = sevFilter === "all" || d.severity === sevFilter;
    return q && s;
  });

  const totalDues = DEFAULTERS.reduce((s, d) => s + d.amount, 0);

  const sendReminder = (flat) => setReminded((prev) => new Set([...prev, flat]));

  return (
    <AdminLayout title="Defaulters" subtitle="Residents with outstanding maintenance dues">

      {/* Summary */}
      <div className="grid-cols-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total Defaulters", value: DEFAULTERS.length, color: "#dc2626"       },
          { label: "Critical (3m+)",   value: DEFAULTERS.filter((d) => d.severity === "critical").length, color: "#dc2626" },
          { label: "Outstanding Dues", value: `₹${(totalDues / 1000).toFixed(1)}K`,   color: "#b45309" },
          { label: "Collection Rate",  value: "88.2%", color: "var(--accent-primary)" },
        ].map((s) => (
          <div key={s.label} className="glass-card-flat" style={{ padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input className="input-field" placeholder="Search flat or name…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 220 }} />
          </div>
          {["all", "critical", "high", "medium"].map((s) => (
            <button
              key={s}
              onClick={() => setSev(s)}
              className={`btn btn-sm ${sevFilter === s ? "btn-primary" : "btn-ghost"}`}
              style={{ textTransform: "capitalize" }}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export List</button>
          <button
            className="btn btn-danger"
            onClick={() => setRemindAll(true)}
            id="send-all-reminders-btn"
          >
            <Send size={15} /> Send All Reminders
          </button>
        </div>
      </div>

      {/* Reminder banner */}
      {remindAll && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "var(--radius-md)", padding: "0.875rem 1.25rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#15803d", fontWeight: 600, fontSize: "0.875rem" }}>
            ✓ Reminders sent to all {DEFAULTERS.length} defaulters via WhatsApp & Email
          </div>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setRemindAll(false)}>✕</button>
        </div>
      )}

      {/* Defaulters Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {filtered.map((d) => {
          const sc = SEV_CONFIG[d.severity];
          const isReminded = reminded.has(d.flat) || remindAll;
          return (
            <div
              key={d.flat}
              style={{
                padding: "1.25rem 1.5rem",
                background: sc.bg,
                border: `1px solid ${sc.border}`,
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              {/* Severity dot */}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${sc.color}1a`, border: `2px solid ${sc.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AlertTriangle size={20} color={sc.color} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem" }}>{d.flat} — {d.name}</span>
                  <span className={`badge ${sc.badge}`}>{d.months} month{d.months > 1 ? "s" : ""} overdue</span>
                </div>
                <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: "var(--text-dim)" }}>
                    <Phone size={11} /> {d.phone}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: "var(--text-dim)" }}>
                    <Mail size={11} /> {d.email}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>Last paid: {d.lastPaid}</div>
                </div>
              </div>

              {/* Amount */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 900, fontSize: "1.25rem", color: sc.color }}>₹{d.amount.toLocaleString()}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>outstanding</div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button
                  className={`btn btn-sm ${isReminded ? "btn-secondary" : "btn-danger"}`}
                  onClick={() => sendReminder(d.flat)}
                  disabled={isReminded}
                >
                  <Send size={13} />
                  {isReminded ? "Sent" : "Remind"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
