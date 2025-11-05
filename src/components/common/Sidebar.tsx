import axios from "axios";
import {
  FaBoxOpen,
  FaCalendarCheck,
  FaChartBar,
  FaClipboardList,
  FaListAlt,
  FaSignOutAlt,
  FaStar,
  FaStethoscope,
  FaUser,
  FaUserMd,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
  return (
    <div className="fixed min-h-screen h-full bg-gradient-to-b from-blue-900 to-blue-950 w-[250px] overflow-y-auto shadow-xl">
      <div className="py-6 border-b border-blue-800">
        <a
          href="/"
          className="text-xl text-white font-bold px-5 flex items-center justify-center gap-2"
        >
          {/* <FaChartBar className="text-orange-400" /> */}
          PET ADMIN
        </a>
      </div>
      <div className="flex justify-between flex-col h-[calc(100vh-80px)]">
        <nav className="flex flex-col mt-4 text-white">
          <Link
            to="/dashboard/dashboardHome"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaChartBar size={16} /> Thống kê
          </Link>
          <Link
            to="/dashboard/products"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaBoxOpen size={16} /> Sản phẩm
          </Link>
          <Link
            to="/dashboard/categories"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaListAlt size={16} /> Danh mục
          </Link>
          <Link
            to="/dashboard/orders"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaClipboardList size={16} /> Đơn hàng
          </Link>
          <Link
            to="/dashboard/account"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaUser size={16} /> Tài khoản
          </Link>
          <Link
            to="/dashboard/vet"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaUserMd size={16} /> Bác sĩ
          </Link>
          <Link
            to="/dashboard/exam"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaStethoscope size={16} /> Dịch vụ khám
          </Link>
          <Link
            to="/dashboard/appoint"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaCalendarCheck size={16} /> Lịch khám
          </Link>
          <Link
            to="/dashboard/reviews"
            className="flex items-center gap-3 hover:bg-blue-800 px-5 py-3 text-sm transition-colors"
          >
            <FaStar size={16} /> Đánh giá
          </Link>
        </nav>
        <div className="px-5 text-white border-t border-blue-800 py-4 mt-auto">
          <button
            onClick={handleLogout}
            className="text-white text-sm flex items-center gap-2 hover:text-orange-400 transition-colors w-full"
          >
            <FaSignOutAlt size={16} /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;