"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Search, Download, Eye, Mail, Receipt, CheckCircle2 } from "lucide-react";

const WhatsAppIcon = ({ size = 14, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.03-5.114-2.905-6.99C16.246 1.875 13.763 1.041 11.99 1.04c-5.438 0-9.863 4.42-9.866 9.865-.001 1.78.474 3.52 1.378 5.068L2.457 21.54l5.59-1.465zm11.393-7.25c-.273-.136-1.62-.8-1.87-.892-.252-.093-.437-.136-.62.136-.18.273-.703.89-.86 1.072-.158.18-.317.2-.59.063-.272-.135-1.15-.424-2.19-1.353-.81-.722-1.355-1.616-1.514-1.89-.158-.27-.017-.417.118-.552.123-.122.273-.318.41-.478.136-.158.18-.27.27-.45.09-.18.046-.337-.023-.473-.068-.136-.62-1.492-.85-2.04-.224-.54-.47-.464-.62-.472-.15-.008-.316-.01-.482-.01-.167 0-.438.063-.668.313-.23.25-1.355 1.325-1.355 3.225s1.388 3.725 1.583 3.987c.195.263 2.73 4.17 6.61 5.85 2.115.912 3.23 1.212 4.137 1.126.98-.094 3.023-1.233 3.447-2.42.423-1.187.423-2.203.298-2.42-.125-.218-.463-.35-.736-.486z" />
  </svg>
);
import { downloadReceiptPDF, downloadBulkReceiptsPDF } from "@/lib/receipt";

const RECEIPTS = [
  { id: "RCP-0112", flat: "E-101", name: "Arjun Patel", amount: 8400, period: "January - March 2026", date: "05 Apr 2026", mode: "UPI", txn: "UPI8912PQRS" },
  { id: "RCP-0098", flat: "E-204", name: "Sneha Rao", amount: 8400, period: "October - December 2025", date: "04 Jan 2026", mode: "Card", txn: "CARD4400ABCD" },
  { id: "RCP-0086", flat: "E-302", name: "Vikram Nair", amount: 8400, period: "July - September 2025", date: "08 Oct 2025", mode: "UPI", txn: "UPI5511XYZQ" },
  { id: "RCP-0074", flat: "E-205", name: "Ravi Sharma", amount: 8400, period: "April - June 2025", date: "12 Jul 2025", mode: "UPI", txn: "UPI4400ABCD" },
  { id: "RCP-0061", flat: "E-403", name: "Meena Iyer", amount: 8400, period: "January - March 2025", date: "02 Apr 2025", mode: "Cash", txn: "CASH-RCPT-0089" },
];

export default function ReceiptsPage() {
const [search, setSearch] = useState("");
const [preview, setPreview] = useState(null);
const [period, setPeriod] = useState("all");
const [toast, setToast] = useState(null);

const handleExport = () => {
  if (filtered.length === 0) {
    setToast("No receipts found to export.");
    setTimeout(() => setToast(null), 3000);
    return;
  }
  setToast(`Generating bulk PDFs for ${filtered.length} receipts...`);
  setTimeout(() => {
    downloadBulkReceiptsPDF(filtered);
    setToast("Bulk export sent to printer / PDF creator!");
    setTimeout(() => setToast(null), 3000);
  }, 800);
};

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
        { label: "This Quarter", value: RECEIPTS.filter((r) => r.period === "January - March 2026").length },
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
        <select className="select-field" style={{ width: 220 }} value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="all">All Periods</option>
          <option>January - March 2026</option>
          <option>October - December 2025</option>
          <option>July - September 2025</option>
        </select>
      </div>
      <button className="btn btn-secondary btn-sm" onClick={handleExport}><Download size={14} /> Bulk Export</button>
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
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => downloadReceiptPDF(r)} title="Download PDF"><Download size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Email"><Mail size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="WhatsApp"><WhatsAppIcon size={14} /></button>
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
            <button className="btn btn-primary" onClick={() => downloadReceiptPDF(preview)}><Download size={15} /> Download PDF</button>
          </div>
        </div>
      </div>
    )}
    {toast && (
      <div style={{
        position: "fixed", bottom: "2rem", right: "2rem",
        background: "linear-gradient(135deg, #16a34a, #22c55e)",
        color: "#022010", padding: "1rem 1.5rem", borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)", fontWeight: 700, fontSize: "0.875rem",
        zIndex: 9999, display: "flex", alignItems: "center", gap: "0.5rem",
        animation: "slideIn 0.3s ease"
      }}>
        <CheckCircle2 size={16} /> {toast}
      </div>
    )}
    </AdminLayout>
  );
}
