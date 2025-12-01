import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Nếu là DOCTOR và đang ở dashboardHome hoặc /dashboard, redirect về appoint
    if (user?.nameRole === "DOCTOR") {
      if (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/" ||
        location.pathname === "/dashboard/dashboardHome"
      ) {
        navigate("/dashboard/appoint", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 h-screen flex flex-col">
        {/* <TopBar/> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
