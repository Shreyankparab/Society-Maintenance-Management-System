"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Search, Plus, Download, Filter, CreditCard, X, CheckCircle2 } from "lucide-react";

const PAYMENTS = [
  { id: "TXN-8821", flat: "A-101", name: "Arjun Patel",    amount: 3500, mode: "UPI",    ref: "UPI8821XYZQ",    date: "29 May 2025",  status: "paid",    period: "May 2025" },
  { id: "TXN-8820", flat: "B-204", name: "Sneha Rao",      amount: 3500, mode: "Card",   ref: "CARD20489ABD",   date: "29 May 2025",  status: "paid",    period: "May 2025" },
  { id: "TXN-8819", flat: "C-302", name: "Vikram Nair",    amount: 4200, mode: "NEFT",   ref: "NEFT38109XYZ",   date: "28 May 2025",  status: "paid",    period: "May 2025" },
  { id: "TXN-8818", flat: "D-403", name: "Meena Iyer",     amount: 3500, mode: "Cash",   ref: "CASH-RCPT-0091", date: "28 May 2025",  status: "pending", period: "May 2025" },
  { id: "TXN-8817", flat: "A-205", name: "Ravi Sharma",    amount: 3500, mode: "UPI",    ref: "UPI7123PQRS",    date: "27 May 2025",  status: "paid",    period: "May 2025" },
  { id: "TXN-8816", flat: "B-301", name: "Lakshmi Devi",   amount: 3500, mode: "Cheque", ref: "CHQ-009182",     date: "26 May 2025",  status: "pending", period: "May 2025" },
  { id: "TXN-8815", flat: "C-104", name: "Manoj Tiwari",   amount: 3500, mode: "UPI",    ref: "UPI6612ABCD",    date: "25 May 2025",  status: "paid",    period: "May 2025" },
  { id: "TXN-8814", flat: "A-303", name: "Sunita Kapoor",  amount: 4200, mode: "NEFT",   ref: "NEFT22110ABC",   date: "24 May 2025",  status: "failed",  period: "May 2025" },
];

const MODE_COLORS = {
  UPI: { bg: "rgba(34,197,94,0.1)", color: "#15803d" },
  Card: { bg: "rgba(59,130,246,0.1)", color: "#93c5fd" },
  NEFT: { bg: "rgba(168,85,247,0.1)", color: "#d8b4fe" },
  Cash: { bg: "rgba(245,158,11,0.1)", color: "#b45309" },
  Cheque: { bg: "rgba(239,68,68,0.1)", color: "#fca5a5" },
};

export default function PaymentsPage() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [manualModal, setManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({ flat: "", name: "", amount: "", mode: "Cash", ref: "", date: "" });
  const [successMsg, setSuccess]    = useState(false);

  const filtered = PAYMENTS.filter((p) => {
    const s = statusFilter === "all" || p.status === statusFilter;
    const q = search === "" || p.flat.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return s && q;
  });

  const totalPaid    = PAYMENTS.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = PAYMENTS.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <AdminLayout title="Payment Tracking" subtitle="Monitor all maintenance payments">

      {/* Summary */}
      <div className="grid-cols-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total Received",  value: `₹${(totalPaid/1000).toFixed(1)}K`,    color: "#15803d" },
          { label: "Pending Approval",value: `₹${(totalPending/1000).toFixed(1)}K`, color: "#b45309" },
          { label: "Transactions",    value: PAYMENTS.length,                        color: "var(--text-primary)" },
          { label: "Unique Modes",    value: "5",                                   color: "#93c5fd" },
        ].map((s) => (
          <div key={s.label} className="glass-card-flat" style={{ padding: "1.1rem 1.25rem", display: "flex", gap: "0.875rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input className="input-field" placeholder="Search flat, name or TXN ID…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 250 }} />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["all", "paid", "pending", "failed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-ghost"}`}
                style={{ textTransform: "capitalize" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          <button id="record-payment-btn" className="btn btn-primary" onClick={() => setManualModal(true)}>
            <Plus size={16} /> Record Payment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card-flat" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>TXN ID</th><th>Flat</th><th>Resident</th><th>Amount</th>
                <th>Mode</th><th>Reference</th><th>Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const mc = MODE_COLORS[p.mode] || { bg: "rgba(15,23,42,0.05)", color: "var(--text-muted)" };
                return (
                  <tr key={p.id}>
                    <td><code style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.id}</code></td>
                    <td><span style={{ fontWeight: 700, color: "#15803d", background: "rgba(34,197,94,0.1)", padding: "0.2rem 0.55rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>{p.flat}</span></td>
                    <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                    <td style={{ fontWeight: 700, color: "#15803d" }}>₹{p.amount.toLocaleString()}</td>
                    <td>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.65rem", borderRadius: "99px", background: mc.bg, color: mc.color }}>{p.mode}</span>
                    </td>
                    <td><code style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{p.ref}</code></td>
                    <td style={{ fontSize: "0.78rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{p.date}</td>
                    <td>
                      <span className={`badge ${p.status === "paid" ? "badge-success" : p.status === "pending" ? "badge-warning" : "badge-danger"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      {p.status === "pending" && (
                        <button className="btn btn-sm btn-primary" style={{ fontSize: "0.72rem", padding: "0.25rem 0.6rem" }}>Approve</button>
                      )}
                      {p.status === "paid" && (
                        <button className="btn btn-sm btn-ghost" style={{ fontSize: "0.72rem" }}><Download size={12} /></button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Payment Modal */}
      {manualModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setManualModal(false)}>
          <div className="modal-box">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "var(--text-primary)" }}>Record Manual Payment</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>For cash, cheque, or bank transfer payments</p>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => { setManualModal(false); setSuccess(false); }}><X size={18} /></button>
            </div>

            {successMsg ? (
              <div style={{ padding: "2.5rem", textAlign: "center" }}>
                <CheckCircle2 size={48} color="var(--accent-primary)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Payment Recorded!</h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Receipt will be auto-generated and sent to the resident.</p>
                <button className="btn btn-secondary" style={{ marginTop: "1.25rem" }} onClick={() => { setManualModal(false); setSuccess(false); }}>Close</button>
              </div>
            ) : (
              <>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="grid-cols-2">
                    <div><label className="label">Flat Number</label><input className="input-field" placeholder="A-101" value={manualForm.flat} onChange={(e) => setManualForm({ ...manualForm, flat: e.target.value })} /></div>
                    <div><label className="label">Resident Name</label><input className="input-field" placeholder="Arjun Patel" value={manualForm.name} onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })} /></div>
                  </div>
                  <div className="grid-cols-2">
                    <div>
                      <label className="label">Amount (₹)</label>
                      <input className="input-field" type="number" placeholder="3500" value={manualForm.amount} onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Payment Mode</label>
                      <select className="select-field" value={manualForm.mode} onChange={(e) => setManualForm({ ...manualForm, mode: e.target.value })}>
                        {["Cash","Cheque","NEFT","UPI"].map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className="label">Reference / Cheque Number</label><input className="input-field" placeholder="CHQ-XXXX or UTR number" value={manualForm.ref} onChange={(e) => setManualForm({ ...manualForm, ref: e.target.value })} /></div>
                  <div><label className="label">Payment Date</label><input className="input-field" type="date" value={manualForm.date} onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })} /></div>
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary" onClick={() => setManualModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setSuccess(true)}>Record Payment</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
