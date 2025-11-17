import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { login } from "../api/authService";
import type { userLogin } from "../types/user";
import illustration from "/src/assets/posterlogin.png";
import hiddenAnimal from "/src/assets/cat2.png";
import hiddenAnimal2 from "/src/assets/ngunhubo.png";
import { useAuth } from "../context/AuthContext";

type FormErrors = {
  userNameOrEmail?: string;
  password?: string;
};
const BACKEND_URL = "http://localhost:8080";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<userLogin>({
    userName: "",
    password: "",
  });
 
  const handleLoginGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = BACKEND_URL + "/oauth2/authorization/google";
  };
  const [error, setError] = useState<FormErrors>({});
  const { setAccessToken, setRole } = useAuth();
  const handleChangeInput = (field: keyof userLogin, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (formData: userLogin) => {
      const response = await login(formData);
      setAccessToken(response.data.data.token);
      setRole(response.data.data.nameRole);
      console.log(response.data.data.nameRole);
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công!");
      window.location.href = "/";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newError: FormErrors = {};

    if (!formData.userName.trim()) {
      newError.userNameOrEmail = "Vui lòng nhập tài khoản hoặc email";
    }

    if (!formData.password.trim()) {
      newError.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newError.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setError(newError);

    // Nếu có lỗi thì không submit
    if (Object.keys(newError).length > 0) return;

    mutation.mutate(formData);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f7c884] items-center justify-center relative px-4 py-8">
      <div className="flex flex-col-reverse lg:flex-row-reverse w-full max-w-6xl relative">
        {/* Ảnh núp ngoài form - ẩn trên mobile */}
        <div className="hidden lg:block">
          <img
            src={hiddenAnimal2}
            alt="Hidden animal"
            className={`absolute bottom-[-15px] left-[-160px] w-[300px] xl:w-[400px] z-0 transform rotate-[10deg] transition-all duration-500 ease-in-out ${
              showPassword ? "translate-x-0" : "translate-x-[110px]"
            }`}
          />
        </div>

        {/* Khối form */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row-reverse w-full max-w-[1050px] overflow-hidden relative z-10 mx-auto">
          {/* Ảnh chính bên phải */}
          <div className="w-full lg:w-1/2 bg-[#FDE3B7] flex justify-center min-h-[200px] lg:min-h-auto">
            <img
              src={illustration}
              alt="Login illustration"
              className="w-full h-auto max-w-sm lg:max-w-none lg:w-full object-cover"
            />
          </div>

          {/* Ảnh núp trong form - ẩn trên mobile */}
          <img
            src={hiddenAnimal}
            alt="Hidden animal"
            className="hidden lg:block absolute bottom-[-20px] left-[350px] w-[120px] xl:w-[160px] z-0 transform rotate-[10deg]"
          />

          {/* Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-800 mb-2">
                  Welcome to PetShop
                </h1>
                <h2 className="text-amber-700 mb-6 text-base md:text-lg font-medium">
                  Đăng nhập để tiếp tục!
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Tài khoản:
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={(e) =>
                      handleChangeInput("userName", e.target.value)
                    }
                    placeholder="Nhập tài khoản"
                    className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                  />
                  {error.userNameOrEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {error.userNameOrEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Mật khẩu:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleChangeInput("password", e.target.value)
                      }
                      placeholder="Nhập mật khẩu"
                      className="w-full px-3 py-2.5 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                      title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={18} />
                      ) : (
                        <AiFillEye size={18} />
                      )}
                    </span>
                  </div>
                  {error.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {error.password}
                    </p>
                  )}
                </div>

                <a
                  href="/forgot-password"
                  className="text-amber-950 text-xs text-right hover:underline pt-2"
                >
                  Quên mật khẩu?
                </a>

                <button
                  type="submit"
                  className="w-full bg-[#F4A259] text-white font-semibold py-3 text-sm rounded-lg hover:bg-[#DFAF4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500">
                    Or continue with
                  </span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div className="grid grid-cols-1">
                  <button
                    onClick={handleLoginGoogle}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                      <path
                        fill="#4285F4"
                        d="M533.5 278.4c0-17.2-1.5-33.7-4.4-49.7H272v94.1h147.2c-6.4 34.3-25.4 63.3-54.2 82.8v68h87.3c51.1-47 80.2-116.1 80.2-195.2z"
                      />
                      <path
                        fill="#34A853"
                        d="M272 544.3c73.6 0 135.4-24.4 180.5-66.2l-87.3-68c-24.2 16.2-55 25.8-93.2 25.8-71.7 0-132.5-48.4-154.2-113.4H28.6v71.2C73.8 481.6 167.1 544.3 272 544.3z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M117.8 323.5c-4.4-12.8-6.9-26.5-6.9-40.5s2.5-27.7 6.9-40.5v-71.2H28.6C10.2 213.1 0 242.9 0 278s10.2 64.9 28.6 85.2l89.2-39.7z"
                      />
                      <path
                        fill="#EA4335"
                        d="M272 107.7c39.9 0 75.6 13.8 103.8 40.9l77.7-77.7C407.2 24.1 345.4 0 272 0 167.1 0 73.8 62.7 28.6 159.8l89.2 71.2C139.5 156.1 200.3 107.7 272 107.7z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">
                      Sign up with Google
                    </span>
                  </button>
                </div>
                <p className="mt-3 text-center text-amber-950 text-xs">
                  Chưa có tài khoản?{" "}
                  <a
                    href="./Register"
                    className="underline hover:text-amber-700 transition-colors"
                  >
                    Đăng ký
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
