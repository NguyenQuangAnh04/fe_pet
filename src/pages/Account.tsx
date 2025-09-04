// import { useState } from "react";
// import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";

// interface UserInfo {
//   fullName: string;
//   email: string;
//   phone: string;
//   dateOfBirth: string;
//   gender: string;
//   address: string;
//   ward: string;
//   district: string;
//   city: string;
// }

// interface Order {
//   id: string;
//   date: string;
//   status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
//   total: number;
//   items: number;
// }

// type ActiveTab = "profile" | "orders" | "address" | "password" | "settings";

// export default function Account() {
//   const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState<UserInfo>({
//     fullName: "Nguyễn Văn Minus",
//     email: "nguyenvana@example.com",
//     phone: "0123456789",
//     dateOfBirth: "1990-01-01",
//     gender: "male",
//     address: "Khu 3 hoàng cương thanh ba phú thọ",
//     ward: "Phường One",
//     district: "Xóm Tranh",
//     city: "TP. Thái Bình",
//   });


//   const handleInputChange = (field: keyof UserInfo, value: string) => {
//     setUserInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSaveProfile = () => {
//     // Mock API call
//     setIsEditing(false);
//     alert("Cập nhật thông tin thành công!");
//   };




//   const tabs = [
//     { id: "profile" as ActiveTab, label: "Thông tin cá nhân", icon: "👤" },
//     { id: "orders" as ActiveTab, label: "Đơn hàng", icon: "📦" },
//     { id: "address" as ActiveTab, label: "Sổ địa chỉ", icon: "📍" },
//     { id: "password" as ActiveTab, label: "Đổi mật khẩu", icon: "🔒" },
//     { id: "settings" as ActiveTab, label: "Cài đặt", icon: "⚙️" },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Thông tin cá nhân
//               </h2>
//               <button
//                 onClick={() =>
//                   isEditing ? handleSaveProfile() : setIsEditing(true)
//                 }
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
//               >
//                 {isEditing ? "Lưu thông tin" : "Chỉnh sửa"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Họ và tên
//                 </label>
//                 <input
//                   type="text"
//                   value={userInfo.fullName}
//                   onChange={(e) =>
//                     handleInputChange("fullName", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   aria-label="Họ và tên"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={userInfo.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   disabled={!isEditing}
//                   aria-label="Email"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Số điện thoại
//                 </label>
//                 <input
//                   type="tel"
//                   value={userInfo.phone}
//                   onChange={(e) => handleInputChange("phone", e.target.value)}
//                   disabled={!isEditing}
//                   aria-label="Số điện thoại"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Ngày sinh
//                 </label>
//                 <input
//                   type="date"
//                   value={userInfo.dateOfBirth}
//                   onChange={(e) =>
//                     handleInputChange("dateOfBirth", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   aria-label="Ngày sinh"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Giới tính
//                 </label>
//                 <select
//                   value={userInfo.gender}
//                   onChange={(e) => handleInputChange("gender", e.target.value)}
//                   disabled={!isEditing}
//                   aria-label="Giới tính"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 >
//                   <option value="male">Nam</option>
//                   <option value="female">Nữ</option>
//                   <option value="other">Khác</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tỉnh/Thành phố
//                 </label>
//                 <input
//                   type="text"
//                   value={userInfo.city}
//                   onChange={(e) => handleInputChange("city", e.target.value)}
//                   disabled={!isEditing}
//                   aria-label="Tỉnh/Thành phố"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Địa chỉ
//                 </label>
//                 <input
//                   type="text"
//                   value={userInfo.address}
//                   onChange={(e) => handleInputChange("address", e.target.value)}
//                   disabled={!isEditing}
//                   aria-label="Địa chỉ"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
//                 />
//               </div>
//             </div>
//           </div>
//         );

//       case "orders":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Lịch sử đơn hàng
//             </h2>

          
//           </div>
//         );

//       case "address":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Sổ địa chỉ
//               </h2>
//               <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
//                 Thêm địa chỉ mới
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {userInfo.fullName}
//                     </h3>
//                     <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
//                       Mặc định
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="text-orange-600 hover:text-orange-700 text-sm">
//                       Sửa
//                     </button>
//                     <button className="text-red-600 hover:text-red-700 text-sm">
//                       Xóa
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-gray-600 text-sm space-y-1">
//                   <p>📞 {userInfo.phone}</p>
//                   <p>
//                     📍 {userInfo.address}, {userInfo.ward}, {userInfo.district},{" "}
//                     {userInfo.city}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case "password":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Đổi mật khẩu
//             </h2>

//             <form className="space-y-6 max-w-md">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mật khẩu hiện tại
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="Nhập mật khẩu hiện tại"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mật khẩu mới
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="Nhập mật khẩu mới"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Xác nhận mật khẩu mới
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="Nhập lại mật khẩu mới"
//                 />
//               </div>

//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-blue-900 mb-2">
//                   Yêu cầu mật khẩu:
//                 </h4>
//                 <ul className="text-sm text-blue-800 space-y-1">
//                   <li>• Ít nhất 8 ký tự</li>
//                   <li>• Có ít nhất 1 chữ hoa</li>
//                   <li>• Có ít nhất 1 chữ số</li>
//                   <li>• Có ít nhất 1 ký tự đặc biệt</li>
//                 </ul>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
//               >
//                 Cập nhật mật khẩu
//               </button>
//             </form>
//           </div>
//         );

//       case "settings":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">
//               Cài đặt tài khoản
//             </h2>

//             <div className="space-y-6">
//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="font-medium text-gray-900 mb-4">Thông báo</h3>
//                 <div className="space-y-4">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       defaultChecked
//                       className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
//                     />
//                     <span className="ml-3 text-sm text-gray-700">
//                       Nhận thông báo qua email về đơn hàng
//                     </span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       defaultChecked
//                       className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
//                     />
//                     <span className="ml-3 text-sm text-gray-700">
//                       Nhận thông báo về khuyến mãi
//                     </span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
//                     />
//                     <span className="ml-3 text-sm text-gray-700">
//                       Nhận tin tức sản phẩm mới
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="border-b border-gray-200 pb-6">
//                 <h3 className="font-medium text-gray-900 mb-4">Bảo mật</h3>
//                 <div className="space-y-3">
//                   <button className="text-orange-600 hover:text-orange-700 text-sm">
//                     Kích hoạt xác thực 2 bước
//                   </button>
//                   <br />
//                   <button className="text-orange-600 hover:text-orange-700 text-sm">
//                     Xem lịch sử đăng nhập
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-medium text-gray-900 mb-4">Tài khoản</h3>
//                 <div className="space-y-3">
//                   <button className="text-gray-600 hover:text-gray-700 text-sm">
//                     Tải xuống dữ liệu cá nhân
//                   </button>
//                   <br />
//                   <button className="text-red-600 hover:text-red-700 text-sm">
//                     Xóa tài khoản
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//             Tài khoản của tôi
//           </h1>
//           <p className="text-gray-600">
//             Quản lý thông tin cá nhân và đơn hàng của bạn
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
//               <div className="space-y-2">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                       activeTab === tab.id
//                         ? "bg-orange-50 text-orange-600 border border-orange-200"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     <span className="text-lg">{tab.icon}</span>
//                     <span className="font-medium">{tab.label}</span>
//                   </button>
//                 ))}
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
//                   <span className="text-lg">🚪</span>
//                   <span className="font-medium">Đăng xuất</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">{renderContent()}</div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
