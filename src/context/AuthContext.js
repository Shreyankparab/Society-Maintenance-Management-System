"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// ─── Mock users for demo ───────────────────────────────────────────────────
const MOCK_USERS = [
  {
    id: "ad-001",
    email: "admin@greenwoodssociety.in",
    password: "admin123",
    role: "admin",
    name: "Priya Mehta",
    avatar: "PM",
    society: "Greenwoods CHS",
    flat: null,
  },
  {
    id: "res-001",
    email: "resident@greenwoodssociety.in",
    password: "flat101",
    role: "resident",
    name: "Arjun Patel",
    avatar: "AP",
    society: "Greenwoods CHS",
    flat: "A-101",
    wing: "A",
  },
];

const ROLE_ROUTES = {
  admin: "/admin",
  resident: "/resident",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const router = useRouter();

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    let success = false;
    let targetRoute = "";
    try {
      // Simulate async auth
      await new Promise((r) => setTimeout(r, 800));
      const found = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) throw new Error("Invalid credentials. Check email & password.");
      setUser(found);
      success = true;
      targetRoute = ROLE_ROUTES[found.role];
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }

    if (success && targetRoute) {
      router.push(targetRoute);
    }
    return { success: true };
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
