import {
  FaBoxOpen,
  FaCalendarCheck,
  FaChartBar,
  FaClipboardList,
  FaListAlt,
  FaSignOutAlt,
  FaTags,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-blue-950 w-[250px]">
      <div className="mt-10">
        <a
          href="/"
          className="text-2xl text-white font-semibold px-5 text-center"
        >
          ADMIN
        </a>
      </div>
      <nav className="flex flex-col mt-10 text-white">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaChartBar /> Thống kê
        </Link>
        <Link
          to="/dashboard/products"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaBoxOpen /> Sản phẩm
        </Link>
        <Link
          to="/dashboard/categories"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaListAlt /> Danh mục
        </Link>
        <Link
          to="/dashboard/brands"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaTags /> Thương hiệu
        </Link>
        <Link
          to="/dashboard/customers"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaUserFriends /> Khách hàng
        </Link>
        <Link
          to="/dashboard/orders"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaClipboardList /> Đơn hàng
        </Link>
        <Link
          to="/dashboard/account"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaUser /> Tài khoản
        </Link>
        <Link
          to="/dashboard/schedules"
          className="flex items-center gap-4 hover:bg-blue-800 px-5 py-5"
        >
          <FaCalendarCheck /> Quản lý lịch khám
        </Link>
      </nav>
      <div className="fixed bottom-4 left-0 right-0 px-6 text-white mb-2">
        <Link
          to="/logout"
          className="text-white text-sm flex items-center gap-2"
        >
          <FaSignOutAlt /> Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
