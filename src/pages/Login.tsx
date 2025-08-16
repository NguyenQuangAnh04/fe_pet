import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import illustration from "/src/assets/ngunhubo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full h-screen bg-[#f7c883] items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] max-w-5xl overflow-hidden">
        <div className="w-1/2 bg-[#FDE3B7] flex items-center justify-center p-8">
          <img
            src={illustration}
            alt="Login illustration"
            className="w-72 h-72 object-contain"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-10">
          <div className="w-full">
            <h2 className="text-xl font-bold text-amber-800">
              Đăng nhập để tiếp tục!
            </h2>
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

              <div className="">
                <label className="block mb-2 text-gray-600">Mật khẩu:</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-2 text-gray-500"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
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
        </div>
      </div>
    </div>
  );
}
