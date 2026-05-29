"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Bell, Pin, X, Megaphone } from "lucide-react";

const NOTICES = [
  {
    id: 1,
    title: "Annual General Meeting – June 15, 2025",
    body: "All flat owners are requested to attend the Annual General Meeting on June 15, 2025 at 6:00 PM in the society hall. Agenda includes: maintenance charges revision, sinking fund update, and election of new secretary. Attendance is mandatory for all flat owners. Proxies will be accepted.",
    category: "Meeting",
    date: "25 May 2025",
    pinned: true,
    from: "Society Committee",
  },
  {
    id: 2,
    title: "Water Supply Disruption – 30th May (10 AM – 4 PM)",
    body: "Due to pipeline maintenance work scheduled by the municipal corporation, water supply will be disrupted on 30th May 2025 from 10:00 AM to 4:00 PM. Residents are requested to store adequate water beforehand. We regret the inconvenience caused.",
    category: "Maintenance",
    date: "27 May 2025",
    pinned: true,
    from: "Society Admin",
  },
  {
    id: 3,
    title: "May 2025 Maintenance Bills Generated",
    body: "Maintenance bills for May 2025 have been generated and are now visible in your dues section. The due date is 10th May 2025. Please make your payments on time to avoid a late payment penalty of ₹200. You can pay online via UPI, card, or net banking.",
    category: "Financial",
    date: "01 May 2025",
    pinned: false,
    from: "Society Admin",
  },
  {
    id: 4,
    title: "Parking Rules Reminder",
    body: "Residents are reminded that vehicles must only be parked in their designated spots as assigned during flat registration. Visitor parking is available near Gate 2 for a maximum of 2 hours. Violating vehicles may be towed at owner's expense. Please cooperate.",
    category: "Rules",
    date: "20 Apr 2025",
    pinned: false,
    from: "Society Committee",
  },
  {
    id: 5,
    title: "Elevator Maintenance – 22nd April (9 AM – 1 PM)",
    body: "Scheduled annual maintenance of all three elevators will be conducted on 22nd April 2025 between 9 AM and 1 PM. Please use stairs during this period. We apologize for the inconvenience and appreciate your cooperation.",
    category: "Maintenance",
    date: "18 Apr 2025",
    pinned: false,
    from: "Society Admin",
  },
];

const CAT_COLORS = {
  Meeting:     { bg: "rgba(168,85,247,0.1)", color: "#d8b4fe", border: "rgba(168,85,247,0.2)" },
  Maintenance: { bg: "rgba(245,158,11,0.1)", color: "#b45309", border: "rgba(245,158,11,0.2)" },
  Financial:   { bg: "rgba(34,197,94,0.1)",  color: "#15803d", border: "rgba(34,197,94,0.2)"  },
  Rules:       { bg: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "rgba(59,130,246,0.2)"  },
};

export default function ResidentNoticesPage() {
  const [view, setView] = useState(null);

  return (
    <AdminLayout title="Society Notices" subtitle="Announcements from the management committee">

      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Pinned */}
        {NOTICES.filter((n) => n.pinned).length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <div className="section-title">📌 Pinned</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {NOTICES.filter((n) => n.pinned).map((n) => (
                <NoticeCard key={n.id} n={n} onView={setView} />
              ))}
            </div>
          </div>
        )}

        {/* All */}
        <div>
          <div className="section-title">All Notices</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {NOTICES.filter((n) => !n.pinned).map((n) => (
              <NoticeCard key={n.id} n={n} onView={setView} />
            ))}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {view && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setView(null)}>
          <div className="modal-box modal-box-lg">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, paddingRight: "1rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                  {view.pinned && <Pin size={13} color="var(--accent-primary)" />}
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "99px", background: (CAT_COLORS[view.category] || {}).bg || "rgba(15,23,42,0.05)", color: (CAT_COLORS[view.category] || {}).color || "var(--text-muted)" }}>{view.category}</span>
                </div>
                <h3 style={{ color: "var(--text-primary)", lineHeight: 1.35 }}>{view.title}</h3>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.4rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{view.date}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>From: {view.from}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setView(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9rem" }}>{view.body}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function NoticeCard({ n, onView }) {
  const cc = CAT_COLORS[n.category] || {};
  return (
    <div
      className="glass-card"
      style={{ padding: "1.25rem 1.5rem", cursor: "pointer" }}
      onClick={() => onView(n)}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: cc.bg || "rgba(15,23,42,0.05)", border: `1px solid ${cc.border || "var(--border-subtle)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Megaphone size={20} color={cc.color || "var(--text-muted)"} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
            {n.pinned && <Pin size={12} color="var(--accent-primary)" />}
            <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.55rem", borderRadius: "99px", background: cc.bg || "rgba(15,23,42,0.05)", color: cc.color || "var(--text-muted)" }}>{n.category}</span>
          </div>
          <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem", marginBottom: "0.35rem" }}>{n.title}</div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{n.body}</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{n.date}</span>
            <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>— {n.from}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
