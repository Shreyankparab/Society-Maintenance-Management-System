"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Building2, Plus, Search, MapPin, Users, Home, MoreHorizontal, Edit2, Trash2, Eye, X } from "lucide-react";

const SOCIETIES = [
  { id: 1, name: "Greenwoods CHS",     city: "Mumbai",    state: "Maharashtra", flats: 120, admins: 3, status: "active",  plan: "Professional", joined: "Jan 2025" },
  { id: 2, name: "Sunrise Apartments", city: "Pune",      state: "Maharashtra", flats: 84,  admins: 2, status: "active",  plan: "Starter",      joined: "Feb 2025" },
  { id: 3, name: "Heritage Park",      city: "Bangalore", state: "Karnataka",   flats: 200, admins: 5, status: "active",  plan: "Enterprise",   joined: "Nov 2024" },
  { id: 4, name: "Palm Grove Society", city: "Chennai",   state: "Tamil Nadu",  flats: 56,  admins: 1, status: "trial",   plan: "Starter",      joined: "May 2025" },
  { id: 5, name: "Royal Residency",    city: "Hyderabad", state: "Telangana",   flats: 144, admins: 4, status: "active",  plan: "Professional", joined: "Dec 2024" },
  { id: 6, name: "Pearl Heights CHS",  city: "Navi Mumbai",state:"Maharashtra", flats: 96,  admins: 2, status: "active",  plan: "Professional", joined: "Apr 2025" },
];

const PLAN_COLORS = { Starter: "#3b82f6", Professional: "#22c55e", Enterprise: "#a855f7" };
const STATUS_MAP  = { active: "badge-success", trial: "badge-warning", inactive: "badge-danger" };

export default function SocietiesPage() {
  const [search, setSearch]   = useState("");
  const [addModal, setAddModal] = useState(false);
  const [form, setForm]       = useState({ name:"", city:"", state:"", flats:"", plan:"Starter" });

  const filtered = SOCIETIES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Societies" subtitle="Manage all registered housing societies">

      {/* Header actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input className="input-field" placeholder="Search societies…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 240 }} />
          </div>
          <select className="select-field" style={{ width: 160 }}>
            <option value="">All Plans</option>
            <option>Starter</option>
            <option>Professional</option>
            <option>Enterprise</option>
          </select>
        </div>
        <button id="add-society-btn" className="btn btn-primary" onClick={() => setAddModal(true)}>
          <Plus size={16} /> Add Society
        </button>
      </div>

      {/* Grid of society cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {filtered.map((s) => (
          <div key={s.id} className="glass-card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Building2 size={20} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.9rem" }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.15rem" }}>
                    <MapPin size={11} color="var(--text-dim)" />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{s.city}, {s.state}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button className="btn btn-ghost btn-icon btn-sm"><Eye size={14} /></button>
                <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={14} /></button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0.75rem", background: "rgba(34,197,94,0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--text-primary)" }}>{s.flats}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Flats</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "0.75rem", background: "rgba(34,197,94,0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--text-primary)" }}>{s.admins}</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Admins</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: PLAN_COLORS[s.plan], background: `${PLAN_COLORS[s.plan]}1a`, padding: "0.2rem 0.65rem", borderRadius: "99px", border: `1px solid ${PLAN_COLORS[s.plan]}30` }}>
                {s.plan}
              </span>
              <span className={`badge ${STATUS_MAP[s.status]}`}>{s.status}</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.75rem" }}>Joined {s.joined}</div>
          </div>
        ))}
      </div>

      {/* Add Society Modal */}
      {addModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModal(false)}>
          <div className="modal-box">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ color: "var(--text-primary)" }}>Add New Society</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>Fill in the society details below</p>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="label">Society Name</label>
                <input className="input-field" placeholder="e.g. Greenwoods CHS" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">City</label>
                  <input className="input-field" placeholder="Mumbai" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <label className="label">State</label>
                  <input className="input-field" placeholder="Maharashtra" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Number of Flats</label>
                  <input className="input-field" type="number" placeholder="120" value={form.flats} onChange={(e) => setForm({ ...form, flats: e.target.value })} />
                </div>
                <div>
                  <label className="label">Plan</label>
                  <select className="select-field" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                    <option>Starter</option>
                    <option>Professional</option>
                    <option>Enterprise</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setAddModal(false)}>Create Society</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
