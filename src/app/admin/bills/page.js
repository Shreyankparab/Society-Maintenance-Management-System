"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { FileText, Plus, CheckSquare, X, Zap, Building2, Users } from "lucide-react";

const BILL_COMPONENTS = [
  { key: "maintenance", label: "Maintenance Charges", defaultAmt: 2800, required: true },
  { key: "penalty", label: "Late Payment Fee", defaultAmt: 500, required: false },
];

const PAST_BILLS = [
  { id: "BILL-0524", period: "Q1 2025 (Jan-Mar)", flats: 30, total: "₹2.52L", generated: "01 Jan 2025", status: "closed" },
  { id: "BILL-0424", period: "Apr-Jun 2025", flats: 30, total: "₹2.52L", generated: "01 Apr 2025", status: "active" },
];

export default function BillsPage() {
  const [step, setStep] = useState(1);
  const [scope, setScope] = useState("all");
  const [freq, setFreq] = useState("quarterly");
  const [period, setPeriod] = useState("May-Jul 2025");
  const [dueDate, setDueDate] = useState("10");
  const [comps, setComps] = useState(
    BILL_COMPONENTS.reduce((acc, c) => ({ ...acc, [c.key]: { enabled: c.required, amount: c.defaultAmt } }), {})
  );
  const [generated, setGenerated] = useState(false);

  const toggleComp = (key) => setComps((c) => ({ ...c, [key]: { ...c[key], enabled: !c[key].enabled } }));
  const setAmt = (key, val) => setComps((c) => ({ ...c, [key]: { ...c[key], amount: Number(val) } }));

  const multiplier = freq === "yearly" ? 12 : 3;
  const totalPerFlat = Object.entries(comps).reduce((s, [k, v]) => {
    if (!v.enabled) return s;
    let amt = v.amount;
    if (k === "maintenance") {
      amt = amt * multiplier;
      if (freq === "yearly") {
        amt -= 1000; // Apply ₹1,000 discount
      }
    }
    return s + amt;
  }, 0);
  const totalSociety = totalPerFlat * 30;

  return (
    <AdminLayout title="Bill Generation" subtitle="Generate and manage maintenance bills">

      <div className="grid-sidebar">

        {/* Generator wizard */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>New Bill Generation</div>
            {/* Step indicator */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.78rem",
                    background: step >= s ? "linear-gradient(135deg, #16a34a, #22c55e)" : "rgba(34,197,94,0.08)",
                    border: step >= s ? "none" : "1px solid var(--border-medium)",
                    color: step >= s ? "#022010" : "var(--text-dim)",
                  }}>{s}</div>
                  {s < 3 && <div style={{ width: 32, height: 1, background: step > s ? "var(--accent-primary)" : "var(--border-subtle)" }} />}
                </div>
              ))}
              <div style={{ marginLeft: "0.5rem" }}>
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  {step === 1 ? "Scope & Period" : step === 2 ? "Bill Components" : "Review & Generate"}
                </span>
              </div>
            </div>
          </div>

          <div style={{ padding: "1.5rem" }}>
            {/* Step 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label className="label">Generate For</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem", maxWidth: 400 }}>
                    {[
                      { val: "all", label: "All Flats (Wing E)", icon: Users },
                      { val: "selected", label: "Selected Flats", icon: CheckSquare },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.val}
                          onClick={() => setScope(opt.val)}
                          style={{
                            padding: "0.875rem", borderRadius: "var(--radius-md)", cursor: "pointer",
                            background: scope === opt.val ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.04)",
                            border: `1px solid ${scope === opt.val ? "var(--border-strong)" : "var(--border-subtle)"}`,
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
                          }}
                        >
                          <Icon size={20} color={scope === opt.val ? "var(--accent-primary)" : "var(--text-dim)"} />
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: scope === opt.val ? "#15803d" : "var(--text-dim)" }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="label">Frequency</label>
                    <select className="select-field" value={freq} onChange={(e) => setFreq(e.target.value)}>
                      <option value="quarterly">Quarterly (3 Months)</option>
                      <option value="yearly">Yearly (12 Months - ₹1,000 Discount)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Period</label>
                    <input className="input-field" value={period} onChange={(e) => setPeriod(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">Due Date (Day of Month)</label>
                  <select className="select-field" style={{ width: 120 }} value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>Bills due on {dueDate}th of {period}</div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {BILL_COMPONENTS.map((c) => (
                    <div key={c.key} style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "0.875rem 1rem", borderRadius: "var(--radius-md)",
                      background: comps[c.key].enabled ? "rgba(34,197,94,0.07)" : "rgba(34,197,94,0.03)",
                      border: `1px solid ${comps[c.key].enabled ? "var(--border-medium)" : "var(--border-subtle)"}`,
                      transition: "all 0.2s",
                    }}>
                      <input
                        type="checkbox"
                        checked={comps[c.key].enabled}
                        onChange={() => !c.required && toggleComp(c.key)}
                        disabled={c.required}
                        style={{ accentColor: "var(--accent-primary)", width: 16, height: 16, cursor: c.required ? "not-allowed" : "pointer" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: comps[c.key].enabled ? "var(--text-primary)" : "var(--text-dim)" }}>{c.label} ({freq === "yearly" ? "12 Months" : "3 Months"})</div>
                        {c.required && <div style={{ fontSize: "0.65rem", color: "var(--accent-primary)", fontWeight: 700 }}>REQUIRED</div>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>₹</span>
                        <input
                          type="number"
                          className="input-field"
                          value={comps[c.key].amount}
                          onChange={(e) => setAmt(c.key, e.target.value)}
                          disabled={!comps[c.key].enabled}
                          style={{ width: 90, textAlign: "right", padding: "0.35rem 0.6rem" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.25rem", padding: "1rem", background: "rgba(34,197,94,0.08)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-medium)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Total per flat:</span>
                    <span style={{ fontWeight: 900, color: "#15803d", fontSize: "1.1rem" }}>₹{totalPerFlat.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Total society (30 flats):</span>
                    <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>₹{totalSociety.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && !generated && (
              <div>
                <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1.25rem" }}>
                  <h4 style={{ color: "var(--text-primary)", marginBottom: "1rem" }}>Bill Summary</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.82rem" }}>
                    {[
                      { l: "Period", v: period },
                      { l: "Frequency", v: freq.charAt(0).toUpperCase() + freq.slice(1) },
                      { l: "Scope", v: scope === "all" ? "All 30 Flats" : "Selected Flats" },
                      { l: "Due Date", v: `${dueDate}th ${period}` },
                      { l: "Amount/flat", v: `₹${totalPerFlat.toLocaleString()}` },
                      { l: "Total Expected", v: `₹${totalSociety.toLocaleString()}` },
                    ].map((r) => (
                      <div key={r.l} style={{ padding: "0.6rem 0.75rem", background: "rgba(34,197,94,0.04)", borderRadius: "var(--radius-sm)" }}>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{r.l}</div>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{r.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent-primary)", marginTop: 2 }} />
                  <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>Send bill notification to all residents via email and WhatsApp</span>
                </div>
              </div>
            )}

            {/* Generated success */}
            {step === 3 && generated && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Zap size={28} color="var(--accent-primary)" />
                </div>
                <h3 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Bills Generated!</h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>30 bills generated for {period}. Residents will be notified.</p>
                <button className="btn btn-secondary" style={{ marginTop: "1.25rem" }} onClick={() => { setStep(1); setGenerated(false); }}>
                  Generate New Batch
                </button>
              </div>
            )}

            {/* Actions */}
            {!generated && (
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "space-between", marginTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                {step > 1
                  ? <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
                  : <div />
                }
                {step < 3
                  ? <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue →</button>
                  : <button className="btn btn-primary" onClick={() => setGenerated(true)}>
                    <Zap size={16} /> Generate Bills
                  </button>
                }
              </div>
            )}
          </div>
        </div>

        {/* Past Bills */}
        <div className="glass-card-flat">
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Past Bills</div>
          </div>
          <div style={{ padding: "0.75rem" }}>
            {PAST_BILLS.map((b, i) => (
              <div key={i} style={{
                padding: "0.875rem 0.75rem", borderRadius: "var(--radius-md)",
                borderBottom: i < PAST_BILLS.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.875rem" }}>{b.period}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{b.id} · {b.flats} flats · {b.generated}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "#15803d" }}>{b.total}</div>
                    <span className={`badge ${b.status === "active" ? "badge-success" : "badge-muted"}`} style={{ marginTop: "0.25rem" }}>{b.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
