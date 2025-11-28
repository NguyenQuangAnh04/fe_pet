import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function OAuth2Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const {setAccessToken} = useAuth();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    
    if (token) {
      localStorage.setItem("accessToken", token);
      setAccessToken?.(token);
      const fetchData = async () => {
        try {
          const res = await api.get("/auth/getInfoUser");
          const role = res.data.nameRole;
          console.log("Thông tin người dùng:", res.data);
          console.log("Role set to:", role);

          if (role === "ADMIN" || role === "DOCTOR" || role === "USER") {
            navigate("/dashboard/dashboardHome", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } catch (err) {
          console.error("Lỗi khi gọi /auth/me:", err);
          navigate("/login", { replace: true });
        }
      };

      fetchData();
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
}
