import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../state/auth";

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { loading, user } = useAuth();
  if (loading) return <div className="container">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function AdminRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}
