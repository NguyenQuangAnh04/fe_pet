import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";

const Dashboard = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 h-screen flex flex-col">
        <TopBar/>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
