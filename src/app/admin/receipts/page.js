"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Search, Download, Eye, Mail, Share2, Receipt } from "lucide-react";

const RECEIPTS = [
  { id: "RCP-0091", flat: "E-101", name: "Arjun Patel", amount: 2800, period: "May 2025", date: "29 May 2025", mode: "UPI", txn: "UPI8821XYZQ" },
  { id: "RCP-0090", flat: "B-204", name: "Sneha Rao", amount: 2800, period: "May 2025", date: "29 May 2025", mode: "Card", txn: "CARD20489ABD" },
  { id: "RCP-0089", flat: "C-302", name: "Vikram Nair", amount: 4200, period: "May 2025", date: "28 May 2025", mode: "NEFT", txn: "NEFT38109XYZ" },
  { id: "RCP-0088", flat: "E-205", name: "Ravi Sharma", amount: 2800, period: "May 2025", date: "27 May 2025", mode: "UPI", txn: "UPI7123PQRS" },
  { id: "RCP-0087", flat: "C-104", name: "Manoj Tiwari", amount: 2800, period: "May 2025", date: "25 May 2025", mode: "UPI", txn: "UPI6612ABCD" },
  { id: "RCP-0086", flat: "E-101", name: "Arjun Patel", amount: 2800, period: "Apr 2025", date: "02 Apr 2025", mode: "UPI", txn: "UPI5511XYZQ" },
  { id: "RCP-0085", flat: "B-204", name: "Sneha Rao", amount: 2800, period: "Apr 2025", date: "01 Apr 2025", mode: "Card", txn: "CARD11489ABD" },
  { id: "RCP-0084", flat: "D-403", name: "Meena Iyer", amount: 2800, period: "Apr 2025", date: "01 Apr 2025", mode: "Cash", txn: "CASH-RCPT-0089" },
];

export default function ReceiptsPage() {
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [period, setPeriod] = useState("all");

  const filtered = RECEIPTS.filter((r) => {
    const q = search === "" || r.flat.toLowerCase().includes(search.toLowerCase()) || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const p = period === "all" || r.period === period;
    return q && p;
  });

  return (
    <AdminLayout title="Receipt Management" subtitle="All auto-generated payment receipts">

      {/* Stats */}
      <div className="grid-cols-3" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total Receipts", value: RECEIPTS.length },
          { label: "This Month", value: RECEIPTS.filter((r) => r.period === "May 2025").length },
          { label: "Total Value", value: `₹${(RECEIPTS.reduce((s, r) => s + r.amount, 0) / 1000).toFixed(1)}K` },
        ].map((s) => (
          <div key={s.label} className="glass-card-flat" style={{ padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input className="input-field" placeholder="Search receipts…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 220 }} />
          </div>
          <select className="select-field" style={{ width: 160 }} value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">All Periods</option>
            <option>May 2025</option>
            <option>Apr 2025</option>
          </select>
        </div>
        <button className="btn btn-secondary btn-sm"><Download size={14} /> Bulk Export</button>
      </div>

      {/* Table */}
      <div className="glass-card-flat" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt No.</th><th>Flat</th><th>Resident</th><th>Amount</th>
                <th>Period</th><th>Date</th><th>Mode</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Receipt size={14} color="var(--accent-primary)" />
                      <code style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-primary)" }}>{r.id}</code>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 700, color: "#15803d", background: "rgba(34,197,94,0.1)", padding: "0.2rem 0.55rem", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>{r.flat}</span></td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</td>
                  <td style={{ fontWeight: 700, color: "#15803d" }}>₹{r.amount.toLocaleString()}</td>
                  <td>{r.period}</td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{r.date}</td>
                  <td><span className="badge badge-muted">{r.mode}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setPreview(r)} title="Preview"><Eye size={14} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="Download PDF"><Download size={14} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="Email"><Mail size={14} /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="WhatsApp"><Share2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Preview Modal */}
      {preview && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className="modal-box modal-box-lg">
            {/* Receipt PDF-style preview */}
            <div style={{ background: "white", color: "#111", borderRadius: "var(--radius-lg)", overflow: "hidden", margin: 0 }}>
              {/* Header */}
              <div style={{ background: "linear-gradient(135deg, #0a2e18, #16a34a)", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: "1.15rem", color: "white" }}>Nirvana Beyond</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: "0.2rem" }}>Plot 12, Sector 9, Navi Mumbai – 400706</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#15803d" }}>{preview.id}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>PAYMENT RECEIPT</div>
                </div>
              </div>

              <div style={{ padding: "1.5rem 2rem" }}>
                {/* Flat & resident */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  {[
                    { l: "Flat Number", v: preview.flat },
                    { l: "Resident", v: preview.name },
                    { l: "Period", v: preview.period },
                    { l: "Payment Date", v: preview.date },
                    { l: "Payment Mode", v: preview.mode },
                    { l: "Transaction ID", v: preview.txn },
                  ].map((f) => (
                    <div key={f.l} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "0.5rem" }}>
                      <div style={{ fontSize: "0.68rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.l}</div>
                      <div style={{ fontWeight: 700, color: "#111", marginTop: "0.15rem" }}>{f.v}</div>
                    </div>
                  ))}
                </div>

                {/* Amount */}
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "1.25rem", textAlign: "center", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Amount Paid</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#14532d", letterSpacing: "-0.02em" }}>₹{preview.amount.toLocaleString()}</div>
                </div>

                {/* Footer */}
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", textAlign: "center" }}>
                  This is a computer-generated receipt and does not require a signature. · Nirvana Beyond © 2025
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "1rem", display: "flex", gap: "0.75rem", justifyContent: "flex-end", borderTop: "1px solid var(--border-subtle)" }}>
              <button className="btn btn-secondary" onClick={() => setPreview(null)}>Close</button>
              <button className="btn btn-primary"><Download size={15} /> Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
