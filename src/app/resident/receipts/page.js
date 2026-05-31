"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Download, Eye, Share2, Mail, X, Receipt as ReceiptIcon } from "lucide-react";
import { downloadReceiptPDF } from "@/lib/receipt";

const RECEIPTS = [
  { id: "RCP-0086", period: "Apr 2025", amount: 3500, date: "02 Apr 2025", mode: "UPI", txn: "UPI5511XYZQ" },
  { id: "RCP-0074", period: "Mar 2025", amount: 3500, date: "05 Mar 2025", mode: "UPI", txn: "UPI4400ABCD" },
  { id: "RCP-0061", period: "Feb 2025", amount: 3500, date: "08 Feb 2025", mode: "Card", txn: "CARD19900XYZ" },
  { id: "RCP-0049", period: "Jan 2025", amount: 3500, date: "12 Jan 2025", mode: "UPI", txn: "UPI3300PQRS" },
];

export default function ResidentReceiptsPage() {
  const [preview, setPreview] = useState(null);

  return (
    <AdminLayout title="My Receipts" subtitle="Download and view your payment receipts">

      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Summary */}
        <div className="grid-cols-3" style={{ marginBottom: "1.5rem" }}>
          {[
            { label: "Total Receipts", value: RECEIPTS.length },
            { label: "Total Paid", value: `₹${(RECEIPTS.reduce((s, r) => s + r.amount, 0)).toLocaleString()}` },
            { label: "Year", value: "2025" },
          ].map((s) => (
            <div key={s.label} className="glass-card-flat" style={{ padding: "1rem 1.25rem", display: "flex", gap: "0.875rem", alignItems: "center" }}>
              <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Receipt cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {RECEIPTS.map((r) => (
            <div key={r.id} className="glass-card-flat" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              {/* Icon */}
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ReceiptIcon size={22} color="var(--accent-primary)" />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 150 }}>
                <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "0.95rem" }}>{r.id}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                  {r.period} Maintenance · {r.date} · {r.mode}
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
                  Txn: {r.txn}
                </div>
              </div>

              {/* Amount */}
              <div style={{ fontWeight: 900, color: "#15803d", fontSize: "1.25rem", flexShrink: 0 }}>
                ₹{r.amount.toLocaleString()}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPreview(r)}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Eye size={14} /> Preview
                </button>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => downloadReceiptPDF(r)}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Download size={14} /> PDF
                </button>
                <button className="btn btn-ghost btn-icon btn-sm" title="Email receipt"><Mail size={14} /></button>
                <button className="btn btn-ghost btn-icon btn-sm" title="Share on WhatsApp"><Share2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Preview */}
      {preview && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className="modal-box modal-box-lg">
            {/* PDF Preview */}
            <div style={{ background: "white", color: "#111", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {/* Society header */}
              <div style={{ background: "linear-gradient(135deg, #0a2e18, #16a34a)", padding: "1.75rem 2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "white", letterSpacing: "-0.01em" }}>Nirvana Beyond</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", marginTop: "0.25rem" }}>Plot 12, Sector 9, Navi Mumbai – 400706</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: "0.1rem" }}>Reg. No: MH/MUM/CHS/12345/2020</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Receipt No.</div>
                    <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "#15803d" }}>{preview.id}</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "1.75rem 2rem" }}>
                {/* Resident details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[
                    { l: "Resident Name", v: "Arjun Patel" },
                    { l: "Flat Number", v: "E-101" },
                    { l: "Wing", v: "Whing E" },
                    { l: "Mobile", v: "9876543210" },
                    { l: "Payment Period", v: preview.period },
                    { l: "Payment Date", v: preview.date },
                    { l: "Payment Mode", v: preview.mode },
                    { l: "Transaction ID", v: preview.txn },
                  ].map((f) => (
                    <div key={f.l} style={{ paddingBottom: "0.6rem", borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: "0.65rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.l}</div>
                      <div style={{ fontWeight: 700, color: "#111827", marginTop: "0.15rem", fontSize: "0.875rem" }}>{f.v}</div>
                    </div>
                  ))}
                </div>

                {/* Bill items */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem", fontSize: "0.82rem" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "left", color: "#6b7280", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase" }}>Description</th>
                      <th style={{ padding: "0.6rem 0.75rem", textAlign: "right", color: "#6b7280", fontWeight: 700, fontSize: "0.68rem", textTransform: "uppercase" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Maintenance Charges", "₹2,500"],
                      ["Water Charges", "₹300"],
                      ["Sinking Fund", "₹200"],
                      ["Parking Charges", "₹300"],
                    ].map(([l, v]) => (
                      <tr key={l} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "0.6rem 0.75rem", color: "#374151" }}>{l}</td>
                        <td style={{ padding: "0.6rem 0.75rem", textAlign: "right", fontWeight: 600, color: "#111827" }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total */}
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "1.25rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.68rem", color: "#15803d", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>TOTAL AMOUNT PAID</div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "#14532d", letterSpacing: "-0.02em" }}>₹{preview.amount.toLocaleString()}</div>
                  <div style={{ fontSize: "0.72rem", color: "#15803d", marginTop: "0.25rem", fontWeight: 600 }}>IN FULL — NO BALANCE DUE</div>
                </div>

                <div style={{ fontSize: "0.68rem", color: "#9ca3af", textAlign: "center", marginTop: "1rem" }}>
                  This is a computer-generated receipt and does not require a signature. · Powered by Nirvana Beyond
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <div style={{ padding: "1rem", display: "flex", gap: "0.75rem", justifyContent: "flex-end", borderTop: "1px solid var(--border-subtle)" }}>
              <button className="btn btn-secondary" onClick={() => setPreview(null)}>Close</button>
              <button className="btn btn-ghost btn-sm"><Mail size={14} /> Email</button>
              <button 
                className="btn btn-primary"
                onClick={() => downloadReceiptPDF(preview)}
              >
                <Download size={15} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
