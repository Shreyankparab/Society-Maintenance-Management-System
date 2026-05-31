"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { Search, Plus, Building2, Edit2, Trash2, Users, Home, X, ChevronDown, ChevronRight, Check } from "lucide-react";

const WINGS = [
  {
    wing: "Wing E",
    flats: [
      { no: "E-101", owner: "Arjun Patel", tenant: "—", area: 850, parking: 1, type: "2BHK", status: "occupied" },
      { no: "E-102", owner: "Sunita Verma", tenant: "Raj Kapoor", area: 850, parking: 1, type: "2BHK", status: "rented" },
      { no: "E-201", owner: "Harish Jain", tenant: "—", area: 1050, parking: 2, type: "3BHK", status: "occupied" },
      { no: "E-202", owner: "Deepa Nair", tenant: "—", area: 850, parking: 1, type: "2BHK", status: "vacant" },
      { no: "E-301", owner: "Ravi Kumar", tenant: "—", area: 950, parking: 1, type: "2BHK", status: "occupied" },
      { no: "E-302", owner: "Rahul Gupta", tenant: "—", area: 950, parking: 1, type: "2BHK", status: "occupied" },
    ],
  },
];

const STATUS_CONFIG = {
  occupied: { badge: "badge-success", label: "Occupied" },
  rented: { badge: "badge-info", label: "Rented" },
  vacant: { badge: "badge-muted", label: "Vacant" },
};

export default function FlatsPage() {
  const [tab, setTab] = useState("directory"); // "directory" | "pending"
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({ "Wing E": true });
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ wing: "E", flatNo: "", owner: "", tenant: "", area: "", type: "2BHK", parking: "1" });

  const { pendingRegistrations, approveRegistration } = useAuth();
  const pendingCount = pendingRegistrations?.length || 0;

  const toggle = (w) => setExpanded((e) => ({ ...e, [w]: !e[w] }));
  const allFlats = WINGS.flatMap((w) => w.flats);
  const filtered = search
    ? allFlats.filter((f) => f.no.toLowerCase().includes(search.toLowerCase()) || f.owner.toLowerCase().includes(search.toLowerCase()))
    : null;

  const totalOccupied = allFlats.filter((f) => f.status === "occupied").length;
  const totalRented = allFlats.filter((f) => f.status === "rented").length;
  const totalVacant = allFlats.filter((f) => f.status === "vacant").length;

  return (
    <AdminLayout title="Flat Management" subtitle="Nirvana Beyond · 30 total flats · Wing E">

      {/* Stats */}
      <div className="grid-cols-4" style={{ marginBottom: "1.5rem" }}>
        {[
          { label: "Total Flats", value: 30, color: "var(--text-primary)" },
          { label: "Owner-occupied", value: 24, color: "#15803d" },
          { label: "Rented", value: 5, color: "#93c5fd" },
          { label: "Vacant", value: 1, color: "var(--text-dim)" },
        ].map((s) => (
          <div key={s.label} className="glass-card-flat" style={{ padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section Tabs */}
      <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setTab("directory")}
          style={{
            background: "none", border: "none", borderBottom: tab === "directory" ? "2px solid var(--accent-primary)" : "2px solid transparent",
            padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
            color: tab === "directory" ? "var(--accent-primary)" : "var(--text-dim)",
            transition: "all 0.2s"
          }}
        >
          Flat Directory
        </button>
        <button
          onClick={() => setTab("pending")}
          style={{
            background: "none", border: "none", borderBottom: tab === "pending" ? "2px solid var(--accent-primary)" : "2px solid transparent",
            padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
            color: tab === "pending" ? "var(--accent-primary)" : "var(--text-dim)",
            display: "flex", alignItems: "center", gap: "0.5rem",
            transition: "all 0.2s"
          }}
        >
          Pending Approvals
          {pendingCount > 0 && (
            <span style={{
              background: "#dc2626", color: "white", borderRadius: "99px",
              padding: "0.15rem 0.45rem", fontSize: "0.68rem", fontWeight: 800
            }}>
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {tab === "directory" ? (
        <>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input className="input-field" placeholder="Search flats or owners…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 260 }} />
            </div>
          </div>

          {/* If searching — flat table */}
          {filtered ? (
            <div className="glass-card-flat" style={{ overflow: "hidden" }}>
              <table className="data-table">
                <thead><tr><th>Flat No</th><th>Owner</th><th>Type</th><th></th></tr></thead>
                <tbody>
                  {filtered.map((f) => (
                    <FlatRow key={f.no} f={f} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Wing-wise accordion */
            WINGS.map((w) => (
              <div key={w.wing} className="glass-card-flat" style={{ marginBottom: "1rem", overflow: "hidden" }}>
                <div
                  onClick={() => toggle(w.wing)}
                  style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: expanded[w.wing] ? "1px solid var(--border-subtle)" : "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Building2 size={18} color="var(--accent-primary)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{w.wing}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>30 flats total</div>
                    </div>
                  </div>
                  {expanded[w.wing] ? <ChevronDown size={18} color="var(--text-dim)" /> : <ChevronRight size={18} color="var(--text-dim)" />}
                </div>
                {expanded[w.wing] && (
                  <div style={{ overflowX: "auto" }}>
                    <table className="data-table">
                      <thead><tr><th>Flat No</th><th>Owner</th><th>Type</th><th></th></tr></thead>
                      <tbody>
                        {w.flats.map((f) => <FlatRow key={f.no} f={f} />)}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </>
      ) : (
        /* PENDING APPROVALS TAB VIEW */
        pendingCount === 0 ? (
          <div className="glass-card-flat" style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Check size={20} color="#16a34a" />
            </div>
            <h3 style={{ fontWeight: 700, color: "var(--text-primary)" }}>All Caught Up!</h3>
            <p style={{ color: "var(--text-dim)", fontSize: "0.875rem", marginTop: "0.4rem" }}>There are no resident registration profiles awaiting approval.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            {pendingRegistrations.map((p) => (
              <div key={p.id} className="glass-card-flat" style={{ padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div className="avatar" style={{ background: "rgba(34,197,94,0.1)", color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%" }}>
                    {p.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>{p.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.25rem" }}>
                      {p.email} · <span style={{ fontWeight: 700, color: "#15803d" }}>Flat {p.wing}-{p.flat}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => {
                      approveRegistration(p.id);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <Check size={14} /> Approve Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Add Flat Modal */}
      {addModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModal(false)}>
          <div className="modal-box">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: "var(--text-primary)" }}>Add New Flat</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Flat Number</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)", background: "var(--surface-0)", padding: "0.5rem 0.75rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>A-</span>
                    <input className="input-field" placeholder="101" value={form.flatNo} onChange={(e) => setForm({ ...form, flatNo: e.target.value })} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
              <div><label className="label">Owner Name</label><input className="input-field" placeholder="Full name" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} /></div>
              <div><label className="label">Tenant Name (if applicable)</label><input className="input-field" placeholder="Leave blank if owner-occupied" value={form.tenant} onChange={(e) => setForm({ ...form, tenant: e.target.value })} /></div>
              <div className="grid-cols-3">
                <div>
                  <label className="label">Area (sqft)</label>
                  <input className="input-field" type="number" placeholder="850" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
                </div>
                <div>
                  <label className="label">Type</label>
                  <select className="select-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    {["1BHK", "2BHK", "3BHK", "4BHK"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Parking Slots</label>
                  <select className="select-field" value={form.parking} onChange={(e) => setForm({ ...form, parking: e.target.value })}>
                    {["0", "1", "2"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setAddModal(false)}>Add Flat</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function FlatRow({ f }) {
  return (
    <tr>
      <td><span style={{ fontWeight: 700, color: "#15803d", background: "rgba(34,197,94,0.1)", padding: "0.2rem 0.55rem", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>{f.no}</span></td>
      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{f.owner}</td>
      <td><span className="badge badge-muted">{f.type}</span></td>
      <td>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={13} /></button>
          <button className="btn btn-danger btn-icon btn-sm"><Trash2 size={13} /></button>
        </div>
      </td>
    </tr>
  );
}
