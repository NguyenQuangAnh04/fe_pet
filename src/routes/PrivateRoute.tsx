// PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { accessToken, role } = useAuth();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "ADMIN") return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default PrivateRoute;
