"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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
  const [users, setUsers]     = useState(MOCK_USERS);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUsers = localStorage.getItem("smms_users");
      if (localUsers) {
        setUsers(JSON.parse(localUsers));
      } else {
        localStorage.setItem("smms_users", JSON.stringify(MOCK_USERS));
      }

      const localPending = localStorage.getItem("smms_pending");
      if (localPending) {
        setPendingRegistrations(JSON.parse(localPending));
      }
    }
  }, []);

  const registerUser = useCallback(async (data) => {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 600));

    const emailExists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase()) ||
                        pendingRegistrations.some(p => p.email.toLowerCase() === data.email.toLowerCase());

    if (emailExists) {
      return { success: false, error: "This email address is already registered." };
    }

    const newPending = {
      id: "pending-" + Date.now(),
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      role: "resident",
      society: "Greenwoods CHS",
      flat: data.flat || "A-101",
      wing: data.wing || "A",
      avatar: data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      status: "pending"
    };

    const updatedPending = [...pendingRegistrations, newPending];
    setPendingRegistrations(updatedPending);
    localStorage.setItem("smms_pending", JSON.stringify(updatedPending));
    return { success: true };
  }, [users, pendingRegistrations]);

  const approveRegistration = useCallback((id) => {
    const record = pendingRegistrations.find(p => p.id === id);
    if (!record) return { success: false, error: "Record not found" };

    const newActiveUser = {
      ...record,
      id: "res-" + Date.now(),
      status: "active"
    };

    const updatedPending = pendingRegistrations.filter(p => p.id !== id);
    const updatedUsers = [...users, newActiveUser];

    setPendingRegistrations(updatedPending);
    setUsers(updatedUsers);

    localStorage.setItem("smms_pending", JSON.stringify(updatedPending));
    localStorage.setItem("smms_users", JSON.stringify(updatedUsers));

    return { success: true };
  }, [users, pendingRegistrations]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    let success = false;
    let targetRoute = "";
    try {
      // Simulate async auth
      await new Promise((r) => setTimeout(r, 800));

      const isPending = pendingRegistrations.some(
        (p) => p.email.toLowerCase() === email.toLowerCase() && p.password === password
      );
      if (isPending) {
        throw new Error("Your account is pending approval by the Committee Admin.");
      }

      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
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
  }, [router, users, pendingRegistrations]);

  const logout = useCallback(() => {
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, registerUser, approveRegistration, pendingRegistrations }}>
      {children}
    </AuthContext.Provider>
  );
};
