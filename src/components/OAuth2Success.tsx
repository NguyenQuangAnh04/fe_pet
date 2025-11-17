import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OAuth2Success() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      const timer = setTimeout(() => {
        localStorage.setItem("accessToken", token);
        navigate("/");
      }, 1000);

      return () => clearTimeout(timer); 
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
}
