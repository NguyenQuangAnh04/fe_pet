import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordService } from "../api/forgotPasswordService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Vui lòng nhập email của bạn!");
      return;
    }

    try {
      setLoading(true);
      await forgotPasswordService.forgotPassword(email);
      toast.success("Email reset password đã được gửi!");
      window.location.href = "/Login";
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quên mật khẩu</h1>
        <p className="text-gray-600 mb-6">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi liên kết"}
          </button>
        </form>
      </div>
    </div>
  );
}
