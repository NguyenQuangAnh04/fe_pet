import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="font-bold">Loading...</div>;

  if (user && (user.nameRole === "ADMIN" || user.nameRole === "USER")) {
    return <Navigate to="/dashboard/dashboardHome" replace />;
  }

  if (user && user.nameRole === "DOCTOR") {
    return <Navigate to="/dashboard/appoint" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
