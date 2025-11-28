import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="font-bold">Loading...</div>;
  console.log("PrivateRoute: user", user);  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (
    user.nameRole !== "ADMIN" &&
    user.nameRole !== "DOCTOR" &&
    user.nameRole !== "USER"
  )
    return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default PrivateRoute;
