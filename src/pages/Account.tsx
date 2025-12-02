import React, { useState, useEffect } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateProfile } from "../api/userService";
import {
  getProvinces,
  getDistricts,
  getWards,
  type Province,
  type District,
  type Ward,
} from "../api/addressService";
import type { userDTO } from "../types/user";

export default function Account() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<userDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setEmail(user?.email || "");
        setPhoneNumber(user?.phoneNumber || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async () => {
    if (!phoneNumber.trim()) {
      showMsg("error", "Vui lòng nhập số điện thoại");
      return;
    }
    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      showMsg("error", "Số điện thoại phải có 10-11 chữ số");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg("error", "Email không hợp lệ");
      return;
    }

    // Password validation if changing password
    if (showPasswordSection) {
      if (!currentPassword.trim()) {
        showMsg("error", "Vui lòng nhập mật khẩu hiện tại");
        return;
      }
      if (newPassword && newPassword.length < 6) {
        showMsg("error", "Mật khẩu mới phải có ít nhất 6 ký tự");
        return;
      }
      if (newPassword !== confirmPassword) {
        showMsg("error", "Xác nhận mật khẩu không khớp");
        return;
      }
    }

    setSaving(true);
    try {
      const updateData: any = {
        ...profile,
        phoneNumber,
        email,
        id: user?.userId,
      };

      if (newPassword) {
        updateData.password = currentPassword;
        updateData.newPassword = newPassword;
        updateData.confirmPassword = confirmPassword;
      }
      console.log(updateData);

      await updateProfile(updateData);
      showMsg("success", "Cập nhật thông tin thành công!");
      setShowPasswordSection(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      showMsg("error", error.response?.data.message || "Cập nhật thất bại");
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    // Reset to original values
    if (profile) {
      const nameParts = (profile.userName || "").split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setPhoneNumber(profile.phoneNumber || "");
      setEmail(profile.email || "");
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordSection(false);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Modal Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Chỉnh sửa thông tin cá nhân
              </h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mx-6 mt-4 p-3 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-6">
              {/* Delivery contact section */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  Thông tin liên hệ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone number */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0123 456 789"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Password section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Đổi mật khẩu
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                  {/* Current password */}
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">
                      Mật khẩu hiện tại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* New password */}
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">
                      Mật khẩu mới <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-md transition-colors"
              >
                Hủy thay đổi
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
