"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Users, Home, ArrowRight, CheckCircle2 } from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    role: "admin",
    label: "Committee Admin",
    icon: Users,
    color: "#15803d",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    email: "admin@greenwoodssociety.in",
    password: "admin123",
    desc: "Greenwoods CHS",
  },
  {
    role: "resident",
    label: "Resident",
    icon: Home,
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    email: "resident@greenwoodssociety.in",
    password: "flat101",
    desc: "Flat A-101",
  },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prefill = (acc) => { setEmail(acc.email); setPassword(acc.password); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "var(--font-sans)" }}>

      {/* Subtle grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100 }}>

        {/* Two-column on desktop, single column on mobile — uses CSS class */}
        <div className="login-grid">

          {/* Left — branding panel, hidden on small mobile via CSS */}
          <div className="login-hero" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
              <img src="/images/logo.jpg" alt="Nirwana Logo" style={{ width: 64, height: 50, borderRadius: "var(--radius-md)", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>Nirvana Beyond</div>
                <div style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Society Portal</div>
              </div>
            </div>

            <h1 style={{ fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>
              Welcome<br />
              <span style={{ background: "linear-gradient(135deg, #15803d, #16a34a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>back.</span>
            </h1>
            <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Society management, payments, and reporting — all in one platform built for Indian residential communities.
            </p>

            {[
              "Online maintenance bill payments",
              "Auto-generated PDF receipts",
              "WhatsApp defaulter reminders",
              "Wing-wise collection analytics",
            ].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span style={{ fontSize: "0.875rem", color: "#475569" }}>{b}</span>
              </div>
            ))}
          </div>

          {/* Right — login card */}
          <div>
            {/* Compact logo shown only on mobile via CSS */}
            <div className="login-mobile-logo">
              <img src="/images/logo.jpg" alt="Nirwana Logo" style={{ width: 52, height: 40, borderRadius: "var(--radius-md)", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0f172a" }}>Nirvana Beyond</div>
                <div style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Society Portal</div>
              </div>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "var(--radius-2xl)", boxShadow: "0 4px 32px rgba(15,23,42,0.1)", overflow: "hidden" }}>

              {/* Card header */}
              <div style={{ background: "linear-gradient(135deg, #052e16, #16a34a)", padding: "1.75rem 2rem" }}>
                <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.35rem" }}>Sign In</h2>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem" }}>Enter your credentials to access your dashboard</p>
              </div>

              <div style={{ padding: "1.5rem" }}>

                {/* Demo accounts */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.6rem" }}>
                    Quick Demo Access
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {DEMO_ACCOUNTS.map((acc) => {
                      const Icon = acc.icon;
                      return (
                        <button
                          key={acc.role}
                          type="button"
                          onClick={() => prefill(acc)}
                          id={`demo-${acc.role}`}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.75rem",
                            padding: "0.7rem 0.875rem",
                            background: email === acc.email ? acc.bg : "#f8fafc",
                            border: `1px solid ${email === acc.email ? acc.border : "#e2e8f0"}`,
                            borderRadius: "var(--radius-md)",
                            cursor: "pointer", transition: "all 0.18s", textAlign: "left",
                            width: "100%",
                          }}
                        >
                          <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: acc.bg, border: `1px solid ${acc.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Icon size={15} color={acc.color} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "#0f172a" }}>{acc.label}</div>
                            <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{acc.desc}</div>
                          </div>
                          <ArrowRight size={13} color="#94a3b8" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600, whiteSpace: "nowrap" }}>OR SIGN IN MANUALLY</span>
                  <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      id="login-email"
                      className="input-field"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <label className="label" style={{ margin: 0 }}>Password</label>
                      <button type="button" style={{ fontSize: "0.72rem", color: "#15803d", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                        Forgot password?
                      </button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <input
                        id="login-password"
                        className="input-field"
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: "2.75rem" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div style={{ padding: "0.65rem 0.875rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "#dc2626" }}>
                      {error}
                    </div>
                  )}

                  <button id="login-submit-btn" type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.25rem" }} disabled={loading}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin-slow 0.8s linear infinite" }}>
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Signing in…
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        Sign In <ArrowRight size={16} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.72rem", color: "#94a3b8" }}>
                  By signing in, you agree to our{" "}
                  <button style={{ background: "none", border: "none", color: "#15803d", fontWeight: 600, cursor: "pointer", fontSize: "0.72rem" }}>Terms of Service</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
