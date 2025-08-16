import * as React from "react";

export default function Login() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-amber-800">Đăng nhập để tiếp tục!</h2>
      <h1 className="text-3xl font-extrabold mb-6">Welcome to PetCare</h1>

      <form className="flex flex-col space-y-5">
        <div>
          <label className="block mb-2 text-gray-600">Tài khoản:</label>
          <input
            type="text"
            placeholder="Nhập tài khoản"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-600">Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        <a href="#" className="text-amber-950 text-sm text-right">
          Quên mật khẩu?
        </a>

        <button
          type="submit"
          className="w-full bg-[#F4A259] text-white font-semibold py-2 rounded-lg hover:bg-[#DFAF4A] transition"
        >
          Đăng nhập
        </button>

        <p className="mt-6 text-center text-amber-950 text-sm text-gray-500">
          <a href="#">Tạo tài khoản</a>
        </p>
      </form>
    </div>
  );
}
