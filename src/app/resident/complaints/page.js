"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Plus, MessageSquare, X, Clock, CheckCircle2, AlertCircle, Image, Upload } from "lucide-react";

const COMPLAINTS = [
  {
    id: "CMP-009",
    title: "Water leakage in bathroom ceiling",
    desc: "There is water dripping from the ceiling in the master bathroom. It seems to be from the flat above. Started 3 days ago.",
    category: "Plumbing",
    status: "in_progress",
    raised: "26 May 2025",
    updatedBy: "Maintenance Team",
    update: "Plumber visit scheduled for 30th May 10 AM",
  },
  {
    id: "CMP-007",
    title: "Elevator not working — Whing E",
    desc: "The main elevator in Whing E has been stuck on the 3rd floor since yesterday evening. Urgent.",
    category: "Elevator",
    status: "resolved",
    raised: "20 May 2025",
    updatedBy: "Admin",
    update: "Lift technician repaired the issue on 21st May. Working normally now.",
  },
  {
    id: "CMP-005",
    title: "Parking area lights not working",
    desc: "The lights in the B-wing parking area have been off for a week. Safety concern at night.",
    category: "Electrical",
    status: "open",
    raised: "15 May 2025",
    updatedBy: "—",
    update: "Awaiting assignment to electrician",
  },
];

const STATUS_CONFIG = {
  open:        { label: "Open",        badge: "badge-warning",  icon: Clock,         color: "#b45309" },
  in_progress: { label: "In Progress", badge: "badge-info",     icon: AlertCircle,   color: "#93c5fd" },
  resolved:    { label: "Resolved",    badge: "badge-success",  icon: CheckCircle2,  color: "#15803d" },
};

const CAT_COLORS = {
  Plumbing:   "#3b82f6",
  Elevator:   "#a855f7",
  Electrical: "#f59e0b",
  General:    "#6b7280",
};

export default function ComplaintsPage() {
  const [newModal, setNewModal]   = useState(false);
  const [form, setForm]           = useState({ title: "", desc: "", category: "Plumbing" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <AdminLayout title="My Complaints" subtitle="Track maintenance requests and complaints">

      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
            {COMPLAINTS.filter((c) => c.status === "open").length} open · {COMPLAINTS.filter((c) => c.status === "in_progress").length} in progress · {COMPLAINTS.filter((c) => c.status === "resolved").length} resolved
          </div>
          <button id="raise-complaint-btn" className="btn btn-primary" onClick={() => setNewModal(true)}>
            <Plus size={16} /> Raise Complaint
          </button>
        </div>

        {/* Complaints */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {COMPLAINTS.map((c) => {
            const sc  = STATUS_CONFIG[c.status];
            const Icon = sc.icon;
            const catColor = CAT_COLORS[c.category] || "#6b7280";
            return (
              <div key={c.id} className="glass-card-flat" style={{ overflow: "hidden" }}>
                {/* Top */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: `${catColor}1a`, border: `1px solid ${catColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageSquare size={20} color={catColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                      <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>{c.id}</span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "99px", background: `${catColor}1a`, color: catColor }}>{c.category}</span>
                      <span className={`badge ${sc.badge}`}>{sc.label}</span>
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem", marginBottom: "0.3rem" }}>{c.title}</div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6 }}>{c.desc}</p>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>Raised: {c.raised}</div>
                  </div>
                </div>

                {/* Status update */}
                <div style={{ padding: "0.875rem 1.5rem", background: "rgba(34,197,94,0.03)", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Icon size={15} color={sc.color} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.15rem" }}>Latest Update · {c.updatedBy}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{c.update}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Complaint Modal */}
      {newModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setNewModal(false); setSubmitted(false); } }}>
          <div className="modal-box modal-box-lg">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "var(--text-primary)" }}>Raise New Complaint</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>Describe your issue and we'll assign it to our team</p>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => { setNewModal(false); setSubmitted(false); }}><X size={18} /></button>
            </div>

            {submitted ? (
              <div style={{ padding: "2.5rem", textAlign: "center" }}>
                <CheckCircle2 size={48} color="var(--accent-primary)" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>Complaint Raised!</h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.875rem" }}>Ticket CMP-010 has been created. You'll be notified when our team updates the status.</p>
                <button className="btn btn-secondary" style={{ marginTop: "1.25rem" }} onClick={() => { setNewModal(false); setSubmitted(false); }}>Close</button>
              </div>
            ) : (
              <>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="label">Issue Title</label>
                    <input className="input-field" placeholder="e.g. Water leakage in bathroom" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Category</label>
                    <select className="select-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {["Plumbing", "Electrical", "Elevator", "Structural", "Pest Control", "Cleaning", "Security", "General"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Description</label>
                    <textarea className="input-field" rows={4} placeholder="Describe the problem in detail…" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <div>
                    <label className="label">Attach Images (optional)</label>
                    <div style={{ border: "1px dashed var(--border-medium)", borderRadius: "var(--radius-md)", padding: "1.5rem", textAlign: "center", cursor: "pointer", background: "rgba(34,197,94,0.03)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                      <Upload size={20} color="var(--text-dim)" />
                      <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Click or drag images here</span>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>PNG, JPG up to 5MB each</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary" onClick={() => setNewModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setSubmitted(true)}>
                    <MessageSquare size={15} /> Submit Complaint
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
