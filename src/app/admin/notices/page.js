"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Plus, Megaphone, Pin, X, Eye, Edit2, Trash2 } from "lucide-react";

const NOTICES = [
  {
    id: 1, title: "Annual General Meeting – June 15, 2025",
    body: "All flat owners are requested to attend the Annual General Meeting on June 15, 2025 at 6:00 PM in the society hall. Agenda includes: maintenance charges revision, sinking fund update, and election of new secretary.",
    category: "Meeting", date: "25 May 2025", pinned: true, views: 98,
  },
  {
    id: 2, title: "Water Supply Disruption – 30th May (10 AM – 4 PM)",
    body: "Due to pipeline maintenance work, water supply will be disrupted on 30th May 2025 from 10:00 AM to 4:00 PM. Residents are requested to store adequate water beforehand. We regret the inconvenience.",
    category: "Maintenance", date: "27 May 2025", pinned: true, views: 112,
  },
  {
    id: 3, title: "May 2025 Maintenance Bills Generated",
    body: "Maintenance bills for May 2025 have been generated and sent to all residents. The due date is 10th May 2025. Please make your payments on time to avoid late payment charges.",
    category: "Financial", date: "01 May 2025", pinned: false, views: 87,
  },
  {
    id: 4, title: "Parking Rules Reminder",
    body: "Residents are reminded that vehicles must only be parked in their designated spots. Visitor parking is available near Gate 2 and is strictly for 2 hours. Violating vehicles may be towed.",
    category: "Rules", date: "20 Apr 2025", pinned: false, views: 64,
  },
];

const CAT_COLORS = {
  Meeting:     { bg: "rgba(168,85,247,0.1)", color: "#d8b4fe", border: "rgba(168,85,247,0.2)" },
  Maintenance: { bg: "rgba(245,158,11,0.1)", color: "#b45309", border: "rgba(245,158,11,0.2)" },
  Financial:   { bg: "rgba(34,197,94,0.1)",  color: "#15803d", border: "rgba(34,197,94,0.2)"  },
  Rules:       { bg: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "rgba(59,130,246,0.2)"  },
  General:     { bg: "rgba(15,23,42,0.05)", color: "var(--text-muted)", border: "var(--border-subtle)" },
};

export default function NoticesPage() {
  const [notices, setNotices]   = useState(NOTICES);
  const [addModal, setAddModal] = useState(false);
  const [viewNotice, setView]   = useState(null);
  const [form, setForm]         = useState({ title: "", body: "", category: "General", pinned: false });

  const addNotice = () => {
    if (!form.title || !form.body) return;
    setNotices([{ id: Date.now(), ...form, date: "Today", views: 0 }, ...notices]);
    setAddModal(false);
    setForm({ title: "", body: "", category: "General", pinned: false });
  };

  const deleteNotice = (id) => setNotices(notices.filter((n) => n.id !== id));

  return (
    <AdminLayout title="Notice Board" subtitle="Manage society announcements">

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>{notices.filter((n) => n.pinned).length} pinned · {notices.length} total notices</div>
        </div>
        <button id="add-notice-btn" className="btn btn-primary" onClick={() => setAddModal(true)}>
          <Plus size={16} /> Post Notice
        </button>
      </div>

      {/* Pinned notices */}
      {notices.filter((n) => n.pinned).length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <div className="section-title">📌 Pinned Notices</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {notices.filter((n) => n.pinned).map((n) => <NoticeCard key={n.id} n={n} onView={setView} onDelete={deleteNotice} />)}
          </div>
        </div>
      )}

      {/* All notices */}
      <div>
        <div className="section-title">All Notices</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notices.filter((n) => !n.pinned).map((n) => <NoticeCard key={n.id} n={n} onView={setView} onDelete={deleteNotice} />)}
        </div>
      </div>

      {/* Add Modal */}
      {addModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModal(false)}>
          <div className="modal-box modal-box-lg">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: "var(--text-primary)" }}>Post New Notice</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div><label className="label">Notice Title</label><input className="input-field" placeholder="e.g. Annual Meeting – June 2025" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div>
                <label className="label">Message</label>
                <textarea className="input-field" rows={5} placeholder="Write your notice here…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} style={{ resize: "vertical" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Category</label>
                  <select className="select-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {Object.keys(CAT_COLORS).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1.4rem" }}>
                  <input type="checkbox" id="pinned" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} style={{ accentColor: "var(--accent-primary)", width: 16, height: 16, cursor: "pointer" }} />
                  <label htmlFor="pinned" style={{ fontSize: "0.875rem", color: "var(--text-secondary)", cursor: "pointer", fontWeight: 600 }}>Pin this notice</label>
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addNotice}><Megaphone size={15} /> Post Notice</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewNotice && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setView(null)}>
          <div className="modal-box modal-box-lg">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  {viewNotice.pinned && <Pin size={14} color="var(--accent-primary)" />}
                  <span style={{ ...CAT_COLORS[viewNotice.category], fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.65rem", borderRadius: "99px", background: CAT_COLORS[viewNotice.category].bg, color: CAT_COLORS[viewNotice.category].color }}>
                    {viewNotice.category}
                  </span>
                </div>
                <h3 style={{ color: "var(--text-primary)" }}>{viewNotice.title}</h3>
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.3rem" }}>{viewNotice.date} · {viewNotice.views} views</div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setView(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{viewNotice.body}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function NoticeCard({ n, onView, onDelete }) {
  const cc = CAT_COLORS[n.category] || CAT_COLORS.General;
  return (
    <div className="glass-card-flat" style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: cc.bg, border: `1px solid ${cc.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Megaphone size={18} color={cc.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
          {n.pinned && <Pin size={12} color="var(--accent-primary)" />}
          <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>{n.title}</span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "99px", background: cc.bg, color: cc.color }}>{n.category}</span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{n.body}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.6rem" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{n.date}</span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{n.views} views</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onView(n)}><Eye size={14} /></button>
        <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={14} /></button>
        <button className="btn btn-danger btn-icon btn-sm" onClick={() => onDelete(n.id)}><Trash2 size={14} /></button>
      </div>
    </div>
  );
}
