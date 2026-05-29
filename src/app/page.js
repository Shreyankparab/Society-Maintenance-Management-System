"use client";

import Link from "next/link";
import { ArrowRight, Building2, Shield, Users, Home, Star, CheckCircle2, BarChart3, CreditCard, Bell } from "lucide-react";

const STATS = [
  { value: "30", label: "Flats" },
  { value: "1", label: "Wing (Wing A)" },
  { value: "₹1.05L", label: "Collected/Mo" },
  { value: "99.9%", label: "Uptime" },
];

const FEATURES = [
  { icon: Building2, title: "Society Management", desc: "Manage flats, owners and tenants in one place" },
  { icon: CreditCard, title: "Online Payments", desc: "UPI, card, NEFT — auto-receipts sent instantly" },
  { icon: BarChart3, title: "Real-time Reports", desc: "Monthly collection charts and breakdowns" },
  { icon: Bell, title: "Smart Reminders", desc: "Auto WhatsApp/email reminders to defaulters" },
];

const ROLES = [
  { role: "Committee Admin", icon: Users, color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", desc: "Manage your society", href: "/login?role=admin" },
  { role: "Resident", icon: Home, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", desc: "Pay dues & view bills", href: "/login?role=resident" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "var(--font-sans)" }}>

      {/* Navbar */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(15,23,42,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.875rem 1.5rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <img src="/images/logo.jpg" alt="Nirwana Logo" style={{ width: 48, height: 38, borderRadius: "var(--radius-md)", objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} />
          <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0f172a", letterSpacing: "-0.01em" }}>Nirwana</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link href="/login" className="btn btn-secondary btn-sm">Log In</Link>
          <Link href="/login" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span>Get Started</span> <ArrowRight size={13} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        paddingTop: "7rem", paddingBottom: "4rem", textAlign: "center",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(22,163,74,0.07) 0%, transparent 65%)",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem", borderRadius: "99px",
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            fontSize: "0.78rem", fontWeight: 700, color: "#15803d",
            marginBottom: "1.5rem",
          }}>
            <Star size={12} fill="#15803d" />
            India&#39;s #1 Society Management Platform
          </div>

          <h1 style={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Society Management,{" "}
            <span style={{ background: "linear-gradient(135deg, #15803d, #16a34a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Simplified
            </span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 2rem" }}>
            From bill generation to payment tracking — manage your entire residential society in one clean, modern platform.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="#demo" className="btn btn-secondary btn-lg">View Live Demo</Link>
          </div>

          {/* Trust bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.75rem", fontSize: "0.78rem", color: "#64748b" }}>
            <CheckCircle2 size={14} color="#16a34a" />
            No credit card required
            <span style={{ margin: "0 0.35rem", color: "#cbd5e1" }}>·</span>
            <CheckCircle2 size={14} color="#16a34a" />
            Free 30-day trial
            <span style={{ margin: "0 0.35rem", color: "#cbd5e1" }}>·</span>
            <CheckCircle2 size={14} color="#16a34a" />
            Setup in 5 minutes
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "2rem 1.25rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }} className="grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "0.875rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginTop: "0.35rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "4rem 1.25rem", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Everything your society needs</h2>
          <p style={{ color: "#64748b", fontSize: "1rem" }}>Built specifically for Indian residential societies — from small CHS to large complexes.</p>
        </div>
        <div className="grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={{ padding: "1.5rem", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "var(--radius-xl)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)", display: "flex", gap: "1.25rem", alignItems: "flex-start", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bbf7d0"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(22,163,74,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.06)"; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color="#15803d" />
                </div>
                <div>
                  <h3 style={{ color: "#0f172a", marginBottom: "0.4rem", fontWeight: 700 }}>{f.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Role selector */}
      <section id="demo" style={{ padding: "4rem 1.25rem", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Try the live demo</h2>
          <p style={{ color: "#64748b", marginBottom: "2.25rem" }}>Choose your role and explore the platform instantly — no signup required.</p>
          <div className="grid-cols-2" style={{ maxWidth: 560, margin: "0 auto" }}>
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <Link key={r.role} href={r.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "2rem 1.5rem",
                    background: "#ffffff",
                    border: `1px solid ${r.border}`,
                    borderRadius: "var(--radius-xl)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}20`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.05)"; }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: r.bg, border: `1.5px solid ${r.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                      <Icon size={24} color={r.color} />
                    </div>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1rem", marginBottom: "0.4rem" }}>{r.role}</div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b" }}>{r.desc}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginTop: "1rem", fontSize: "0.78rem", fontWeight: 700, color: r.color }}>
                      Explore <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "2rem 1.25rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
          <img src="/images/logo.jpg" alt="Nirwana Logo" style={{ width: 44, height: 34, borderRadius: "var(--radius-sm)", objectFit: "cover" }} />
          <span style={{ fontWeight: 800, color: "#0f172a", fontSize: "0.95rem" }}>Nirwana</span>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.78rem" }}>© 2025 Nirvana Beyond. Built for Indian Societies. All rights reserved.</p>
      </footer>
    </div>
  );
}
