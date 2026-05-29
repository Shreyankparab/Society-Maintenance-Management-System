"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { CreditCard, CheckCircle2, AlertCircle, ArrowRight, Smartphone, Building2, Banknote } from "lucide-react";
import { downloadReceiptPDF } from "@/lib/receipt";

const BILL_ITEMS = [
  { label: "Maintenance Charges (3 Months)",  amount: 8400, required: true  },
  { label: "Late Payment Fee",               amount: 500,  required: true  },
];

const PAYMENT_METHODS = [
  { id: "upi",  label: "UPI",          icon: Smartphone, desc: "PhonePe, GPay, Paytm" },
  { id: "card", label: "Debit/Credit", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "neft", label: "Net Banking",  icon: Building2,  desc: "NEFT / IMPS transfer" },
];

export default function DuesPage() {
  const [method, setMethod]     = useState("upi");
  const [upiId, setUpiId]       = useState("");
  const [paying, setPaying]     = useState(false);
  const [paid, setPaid]         = useState(false);
  const [cycle, setCycle]       = useState("quarterly");

  const isYearly = cycle === "yearly";
  const maintenanceAmt = isYearly ? 2800 * 12 : 2800 * 3;
  const penaltyAmt = isYearly ? 0 : 500;
  const discountAmt = isYearly ? 1000 : 0;
  const total = maintenanceAmt - discountAmt + penaltyAmt;

  const currentItems = isYearly ? [
    { label: "Maintenance Charges (12 Months)", amount: maintenanceAmt },
    { label: "Yearly Payment Discount",         amount: -discountAmt, isDiscount: true },
  ] : [
    { label: "Maintenance Charges (3 Months)",  amount: maintenanceAmt },
    { label: "Late Payment Fee",               amount: penaltyAmt, isPenalty: true },
  ];

  const handlePay = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPaying(false);
    setPaid(true);
  };

  if (paid) {
    return (
      <AdminLayout title="Payment Successful" subtitle="Flat A-101 · Greenwoods CHS">
        <div style={{ maxWidth: 520, margin: "4rem auto", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "3px solid rgba(34,197,94,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle2 size={40} color="var(--accent-primary)" />
          </div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: "0.6rem" }}>Payment Successful!</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: "0.4rem" }}>₹{total.toLocaleString()} paid for {cycle === "yearly" ? "Yearly" : "Quarterly"} maintenance</p>
          <p style={{ color: "var(--text-dim)", fontSize: "0.82rem", marginBottom: "2rem" }}>Transaction ID: TXN-{Math.random().toString(36).slice(2, 10).toUpperCase()} · Receipt sent to your email</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button className="btn btn-secondary" onClick={() => setPaid(false)}>Back to Dues</button>
            <button 
              className="btn btn-primary"
              onClick={() => downloadReceiptPDF({
                id: "RCP-" + Math.floor(1000 + Math.random() * 9000),
                period: isYearly ? "May 2025 - Apr 2026 (Yearly)" : "May-Jul 2025 (Quarterly)",
                amount: total,
                date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
                mode: PAYMENT_METHODS.find((m) => m.id === method)?.label || "UPI",
                txn: "TXN" + Math.random().toString(36).slice(2, 10).toUpperCase()
              })}
            >
              Download Receipt
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="My Dues" subtitle="Flat A-101 · Greenwoods CHS">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Overdue alert */}
        <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <AlertCircle size={18} color="var(--accent-primary)" />
          <span style={{ fontSize: "0.875rem", color: "#a7f3d0" }}>
            Payment is due on <strong>10 May 2025</strong>. Please complete your payment on time.
          </span>
        </div>

        {/* Segmented billing cycle selector */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", background: "rgba(255,255,255,0.03)", padding: "0.35rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)" }}>
          <button
            onClick={() => setCycle("quarterly")}
            className={`btn btn-sm ${cycle === "quarterly" ? "btn-primary" : "btn-ghost"}`}
            style={{ flex: 1, padding: "0.6rem", fontWeight: 700, fontSize: "0.82rem" }}
          >
            Quarterly (3 Months)
          </button>
          <button
            onClick={() => setCycle("yearly")}
            className={`btn btn-sm ${cycle === "yearly" ? "btn-primary" : "btn-ghost"}`}
            style={{ flex: 1, padding: "0.6rem", fontWeight: 700, fontSize: "0.82rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}
          >
            Yearly (12 Months)
            <span style={{ fontSize: "0.65rem", background: "rgba(34,197,94,0.2)", color: "#22c55e", padding: "0.1rem 0.4rem", borderRadius: "99px", fontWeight: 800 }}>-₹1,000 Disc.</span>
          </button>
        </div>

        <div className="grid-sidebar">

          {/* Bill breakdown */}
          <div className="glass-card-flat" style={{ overflow: "hidden", alignSelf: "start" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="section-title" style={{ marginBottom: 0 }}>Bill Breakdown — May 2025</div>
            </div>
            <div style={{ padding: "1rem 1.5rem" }}>
              {currentItems.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 0", borderBottom: i < currentItems.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <span style={{ fontSize: "0.875rem", color: item.isDiscount ? "#22c55e" : item.isPenalty ? "#ef4444" : "var(--text-secondary)", fontWeight: (item.isDiscount || item.isPenalty) ? 700 : 500 }}>
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 700, color: item.isDiscount ? "#22c55e" : item.isPenalty ? "#ef4444" : "var(--text-primary)" }}>
                    {item.isDiscount ? "- " : ""}₹{Math.abs(item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ padding: "1.25rem 1.5rem", background: "rgba(34,197,94,0.06)", borderTop: "1px solid var(--border-medium)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem" }}>Total Amount Due</span>
              <span style={{ fontWeight: 900, color: "#15803d", fontSize: "1.5rem" }}>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment form */}
          <div className="glass-card-flat">
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="section-title" style={{ marginBottom: 0 }}>Pay Online</div>
            </div>
            <div style={{ padding: "1.25rem" }}>
              {/* Method selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.875rem",
                        padding: "0.875rem 1rem", borderRadius: "var(--radius-md)",
                        background: method === m.id ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.03)",
                        border: `1px solid ${method === m.id ? "var(--border-strong)" : "var(--border-subtle)"}`,
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", background: method === m.id ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={18} color={method === m.id ? "var(--accent-primary)" : "var(--text-dim)"} />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: method === m.id ? "#15803d" : "var(--text-secondary)" }}>{m.label}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{m.desc}</div>
                      </div>
                      <div style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: "50%", border: `2px solid ${method === m.id ? "var(--accent-primary)" : "var(--border-medium)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {method === m.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-primary)" }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {method === "upi" && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="label">UPI ID</label>
                  <input className="input-field" placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
              )}

              {/* Total */}
              <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount to Pay</div>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#15803d", letterSpacing: "-0.02em" }}>₹{total.toLocaleString()}</div>
              </div>

              <button
                id="pay-now-btn"
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                onClick={handlePay}
                disabled={paying}
              >
                {paying ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin-slow 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Processing…
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Pay ₹{total.toLocaleString()} <ArrowRight size={16} />
                  </span>
                )}
              </button>

              <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", textAlign: "center", marginTop: "0.75rem" }}>
                🔒 Secured by Razorpay · 256-bit SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
