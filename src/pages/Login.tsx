import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { login } from "../api/authService";
import type { userLogin } from "../types/user";
import illustration from "/src/assets/posterlogin.png";
import hiddenAnimal from "/src/assets/cat2.png";
import hiddenAnimal2 from "/src/assets/ngunhubo.png";

type FormErrors = {
  userNameOrEmail?: string;
  password?: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<userLogin>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState<FormErrors>({});

  const handleChangeInput = (field: keyof userLogin, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (formData: userLogin) => {
      const response = await login(formData);
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.data.token);
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
                  href="#"
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

                <p className="mt-3 text-center text-amber-950 text-xs">
                  Chưa có tài khoản?{" "}
                  <a
                    href="#"
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
