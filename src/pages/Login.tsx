import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { login } from "../api/authService";
import type { userLogin } from "../types/user";
import hiddenAnimal from "/src/assets/cat2.png";
import illustration from "/src/assets/cho1.png";
import hiddenAnimal2 from "/src/assets/ngunhubo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [formData, setFormData] = useState<userLogin>({
    userName: "",
    password: "",
  });
  const handleChangeInput = (field: keyof userLogin, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const mutation = useMutation({
    mutationFn: async (formData: userLogin) => {
      const res = await login(formData);
      localStorage.setItem("accessToken", res.data.data.accessToken);
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };
  return (
    <div className="flex w-full h-screen bg-[#f7c884] items-center justify-center relative">
      <div className="flex flex-row-reverse w-[2500px] max-w-5xl relative">
        {/* Ảnh núp ngoài form */}
        <div>
          <img
            src={hiddenAnimal2}
            alt="Hidden animal"
            className={`absolute bottom-[-15px] left-[-90px] w-[360px] z-0 transform rotate-[10deg] transition-all duration-500 ease-in-out ${
              showPassword ? "translate-x-0" : "translate-x-[110px]"
            }`}
          />
        </div>

        {/* Khối form */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-row-reverse w-[900px] max-w-5xl overflow-hidden relative z-10">
          {/* Ảnh chính bên phải */}
          <div className="w-1/2 bg-[#FDE3B7] flex items-center justify-end p-0">
            <img
              src={illustration}
              alt="Login illustration"
              className="w-[90%] h-auto object-contain"
            />
          </div>

          {/* Ảnh núp trong form */}
          <img
            src={hiddenAnimal}
            alt="Hidden animal"
            className="absolute bottom-[-20px] left-[300px] w-[180px] z-0 transform rotate-[10deg]"
          />

          {/* Form */}
          <div className="w-1/2 flex items-center justify-center p-10">
            <div className="w-full">
              <h1 className="text-3xl text-center font-extrabold p-1">Welcome to PetShop</h1>
              <h2 className="font-bold text-center text-amber-800 mb-6">
                Đăng nhập để tiếp tục!
              </h2>
<<<<<<< HEAD
              <h1 className="text-3xl font-extrabold mb-6">
                Welcome to PetShop
              </h1>

              <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
=======
              <form className="flex flex-col space-y-5">
>>>>>>> 0ff791097a8da9ea23f683552f42c897f64ca202
                <div>
                  <label className="block mb-2 text-gray-600">Tài khoản:</label>
                  <input
                    type="text"
                    value={formData?.userName}
                    name="userName"
                    onChange={(e) =>
                      handleChangeInput("userName", e.target.value)
                    }
                    placeholder="Nhập tài khoản"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-600">Mật khẩu:</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData?.password}
                      onChange={(e) =>
                        handleChangeInput("password", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                    <span
                      onClick={togglePassword}
                      className="absolute top-3 right-2 text-gray-500 cursor-pointer"
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

                <p className="mt-6 text-center text-amber-950 text-sm">
                  <a href="/register">Tạo tài khoản</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
