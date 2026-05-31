"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { CheckCircle2, Clock, Download, ArrowUpRight } from "lucide-react";

const PAYMENTS = [
  { id: "—",        period: "April - June 2026",      amount: 8900, date: "—",           mode: "—",     status: "overdue", txn: "—"             },
  { id: "RCP-0112", period: "January - March 2026",   amount: 8400, date: "05 Apr 2026", mode: "UPI",   status: "paid",    txn: "UPI8912PQRS"   },
  { id: "RCP-0098", period: "October - December 2025",amount: 8400, date: "04 Jan 2026", mode: "Card",  status: "paid",    txn: "CARD4400ABCD"  },
  { id: "RCP-0086", period: "July - September 2025",  amount: 8400, date: "08 Oct 2025", mode: "UPI",   status: "paid",    txn: "UPI5511XYZQ"   },
  { id: "RCP-0074", period: "April - June 2025",      amount: 8400, date: "12 Jul 2025", mode: "UPI",   status: "paid",    txn: "UPI4400ABCD"   },
  { id: "RCP-0061", period: "January - March 2025",   amount: 8400, date: "02 Apr 2025", mode: "Card",  status: "paid",    txn: "CARD19900XYZ"  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function PaymentHistoryPage() {
  const [toast, setToast] = useState(null);
  const paid   = PAYMENTS.filter((p) => p.status === "paid");
  const totalPaid = paid.reduce((s, p) => s + p.amount, 0);

  const handleDownload = (p) => {
    setToast(`Generating PDF receipt for ${p.period}...`);
    setTimeout(() => {
      import("@/lib/receipt").then((mod) => {
        mod.downloadReceiptPDF(p);
        setToast(`Receipt generated successfully for ${p.period}!`);
        setTimeout(() => setToast(null), 3000);
      }).catch((err) => {
        console.error(err);
        setToast("Failed to generate receipt PDF.");
        setTimeout(() => setToast(null), 3000);
      });
    }, 800);
  };

  return (
    <AdminLayout title="Payment History" subtitle="All your maintenance payment records">

      {/* Summary */}
      <div className="grid-cols-3" style={{ marginBottom: "2rem" }}>
        {[
          { label: "Total Paid (2025)", value: `₹${totalPaid.toLocaleString()}`, color: "#15803d" },
          { label: "Payments Made",     value: paid.length,                       color: "var(--text-primary)" },
          { label: "Payment Streak",    value: "4 months",                        color: "#93c5fd" },
        ].map((s) => (
          <div key={s.label} className="glass-card-flat" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Year calendar heatmap */}
      <div className="glass-card-flat" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div className="section-title" style={{ marginBottom: "1rem" }}>2025 Payment Calendar</div>
        <div style={{ overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "0.5rem", minWidth: 420 }}>
          {MONTHS.map((m, i) => {
            const isPaid    = i < 4;
            const isOverdue = i === 4;
            const isFuture  = i > 4;
            return (
              <div key={m} style={{ textAlign: "center" }}>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: "var(--radius-sm)",
                  background: isFuture ? "rgba(255,255,255,0.03)" : isPaid ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.2)",
                  border: `1px solid ${isFuture ? "var(--border-subtle)" : isPaid ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "0.35rem",
                }}>
                  {isPaid    && <CheckCircle2 size={14} color="var(--accent-primary)" />}
                  {isOverdue && <span style={{ fontSize: "0.75rem" }}>⚠️</span>}
                  {isFuture  && <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>—</span>}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600 }}>{m}</div>
              </div>
            );
          })}
        </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem" }}>
          {[
            { color: "rgba(34,197,94,0.4)", label: "Paid on time" },
            { color: "rgba(239,68,68,0.4)", label: "Overdue"      },
            { color: "rgba(15,23,42,0.05)", label: "Upcoming"  },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
              <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontWeight: 600 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card-flat" style={{ overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Transaction Timeline</div>
        </div>
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <div className="timeline">
            {PAYMENTS.map((p, i) => (
              <div key={i} className="timeline-item" style={{ paddingBottom: "1.25rem" }}>
                <div className={`timeline-dot`} style={{
                  background: p.status === "paid" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  borderColor: p.status === "paid" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
                }}>
                  {p.status === "paid"
                    ? <CheckCircle2 size={16} color="var(--accent-primary)" />
                    : <Clock size={16} color="#dc2626" />}
                </div>
                <div style={{ flex: 1, paddingLeft: "0.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{p.period} Maintenance</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                        {p.date !== "—" ? p.date : "Not yet paid"} {p.mode !== "—" && `· ${p.mode}`} {p.txn !== "—" && `· ${p.txn}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontWeight: 900, color: p.status === "paid" ? "#15803d" : "#dc2626", fontSize: "1.05rem" }}>₹{p.amount.toLocaleString()}</span>
                      <span className={`badge ${p.status === "paid" ? "badge-success" : "badge-danger"}`}>
                        {p.status === "paid" ? "Paid" : "Overdue"}
                      </span>
                      {p.status === "paid" && (
                        <button onClick={() => handleDownload(p)} className="btn btn-ghost btn-icon btn-sm"><Download size={14} /></button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999,
          background: "linear-gradient(135deg, #15803d, #16a34a)",
          border: "1px solid rgba(34,197,94,0.35)",
          color: "white", padding: "1rem 1.5rem", borderRadius: "var(--radius-lg)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)", fontWeight: 700, fontSize: "0.875rem",
          display: "flex", alignItems: "center", gap: "0.75rem",
          animation: "slide-up 0.3s ease-out",
        }}>
          <CheckCircle2 size={18} color="#064e3b" strokeWidth={2.5} />
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}
