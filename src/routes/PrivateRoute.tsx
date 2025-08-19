// PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getToken = () => localStorage.getItem("accessToken");

const PrivateRoute: React.FC = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
