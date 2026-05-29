"use client";

import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Search, Plus, Shield, Users, Home, Edit2, Trash2, X, Mail, Phone } from "lucide-react";

const USERS = [
  { id: 1, name: "Rajesh Sharma",    email: "superadmin@resicentral.in",    phone: "9876543210", role: "super_admin", society: "—",                 status: "active",   joined: "Jan 2025" },
  { id: 2, name: "Priya Mehta",      email: "admin@greenwoodssociety.in",    phone: "9123456789", role: "admin",       society: "Greenwoods CHS",    status: "active",   joined: "Jan 2025" },
  { id: 3, name: "Suresh Kumar",     email: "admin@heritage.in",             phone: "9988776655", role: "admin",       society: "Heritage Park",     status: "active",   joined: "Nov 2024" },
  { id: 4, name: "Arjun Patel",      email: "resident@greenwoodssociety.in", phone: "9111222333", role: "resident",    society: "Greenwoods CHS",    status: "active",   joined: "Feb 2025" },
  { id: 5, name: "Kavya Reddy",      email: "kavya@sunrise.in",              phone: "9444555666", role: "resident",    society: "Sunrise Apartments",status: "active",   joined: "Feb 2025" },
  { id: 6, name: "Deepak Singh",     email: "deepak@palmgrove.in",           phone: "9777888999", role: "admin",       society: "Palm Grove Society",status: "inactive", joined: "May 2025" },
  { id: 7, name: "Anita Joshi",      email: "anita@royal.in",                phone: "9222333444", role: "resident",    society: "Royal Residency",   status: "active",   joined: "Dec 2024" },
];

const ROLE_CONFIG = {
  super_admin: { label: "Super Admin",     icon: Shield, color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.25)" },
  admin:       { label: "Committee Admin", icon: Users,  color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.25)"  },
  resident:    { label: "Resident",        icon: Home,   color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.25)" },
};

export default function UsersPage() {
  const [search, setSearch]     = useState("");
  const [roleFilter, setRole]   = useState("all");
  const [addModal, setAddModal] = useState(false);

  const filtered = USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <AdminLayout title="User Management" subtitle="All platform users across societies">

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="var(--text-dim)" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input className="input-field" placeholder="Search users…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem", width: 220 }} />
          </div>
          <select className="select-field" style={{ width: 180 }} value={roleFilter} onChange={(e) => setRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Committee Admin</option>
            <option value="resident">Resident</option>
          </select>
        </div>
        <button id="add-user-btn" className="btn btn-primary" onClick={() => setAddModal(true)}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Summary badges */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {Object.entries(ROLE_CONFIG).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const count = USERS.filter((u) => u.role === key).length;
          return (
            <button
              key={key}
              onClick={() => setRole(roleFilter === key ? "all" : key)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.875rem", borderRadius: "99px", background: roleFilter === key ? cfg.bg : "rgba(255,255,255,0.04)", border: `1px solid ${roleFilter === key ? cfg.border : "var(--border-subtle)"}`, cursor: "pointer", transition: "all 0.2s" }}>
              <Icon size={13} color={cfg.color} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="glass-card-flat" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Society</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const rc = ROLE_CONFIG[u.role];
                const Icon = rc.icon;
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div className="avatar avatar-sm" style={{ background: `linear-gradient(135deg, ${rc.color}80, ${rc.color})` }}>
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem" }}>{u.name}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 700, color: rc.color, background: rc.bg, border: `1px solid ${rc.border}`, padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
                        <Icon size={11} /> {rc.label}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem" }}>{u.society}</td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Phone size={10} /> {u.phone}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${u.status === "active" ? "badge-success" : "badge-danger"}`}>{u.status}</span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>{u.joined}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={14} /></button>
                        <button className="btn btn-danger btn-icon btn-sm"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {addModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModal(false)}>
          <div className="modal-box">
            <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ color: "var(--text-primary)" }}>Add New User</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label className="label">First Name</label><input className="input-field" placeholder="Arjun" /></div>
                <div><label className="label">Last Name</label><input className="input-field" placeholder="Patel" /></div>
              </div>
              <div><label className="label">Email</label><input className="input-field" type="email" placeholder="user@example.com" /></div>
              <div><label className="label">Phone</label><input className="input-field" placeholder="+91 98765 43210" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Role</label>
                  <select className="select-field">
                    <option value="admin">Committee Admin</option>
                    <option value="resident">Resident</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="label">Society</label>
                  <select className="select-field">
                    <option>Greenwoods CHS</option>
                    <option>Heritage Park</option>
                    <option>Sunrise Apartments</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setAddModal(false)}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
