import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { register } from "../api/authService";
import type { userRegister } from "../types/user";
import illustration from "/src/assets/posterregister.jpg";
import hiddenAnimal from "/src/assets/cat2.png";
import hiddenAnimal2 from "/src/assets/ngunhubo.png";
type FormErrors = {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
};
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setComfirmShowPassword] = useState(false);
  const [formData, setFormData] = useState<userRegister>({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<FormErrors>({});
  const handleChangeInput = (field: keyof userRegister, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (formData: userRegister) => {
      await register(formData);
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newError: FormErrors = {};

    if (!formData.userName.trim()) {
      newError.userName = "Vui lòng điền tài khoản";
    }
    if (!formData.email.trim()) {
      newError.email = "Vui lòng điền email";
    }
    if (!formData.phoneNumber.trim()) {
      newError.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (
      !/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5|8|9]|9[0-9])\d{7}$/.test(
        formData.phoneNumber
      )
    ) {
      newError.phoneNumber = "Số điện thoại không hợp lệ (phải là số Việt Nam)";
    }

    if (!formData.password.trim()) {
      newError.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newError.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Mật khẩu không khớp";
    }

    setError(newError);

    // Nếu có lỗi thì không submit
    if (Object.keys(newError).length > 0) return;

    mutation.mutate(formData);
  };
  
//giao diện đăng ký
  return (
    <div className="flex w-full h-screen bg-[#f7c884] items-center justify-center relative px-4">
      <div className="flex flex-row-reverse w-full max-w-6xl relative">
        {/* Ảnh núp ngoài form */}
        <div>
          <img
            src={hiddenAnimal2}
            alt="Hidden animal"
            className={`absolute bottom-[-15px] left-[-160px] w-[400px] z-0 transform rotate-[10deg] transition-all duration-500 ease-in-out ${
              showPassword || showComfirmPassword ? "translate-x-0" : "translate-x-[110px]"
            }`}
          />
        </div>

        {/* Khối form */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-row-reverse w-full max-w-5xl overflow-hidden relative z-10 mx-auto">
          {/* Ảnh chính bên phải */}
          <div className="w-1/2 bg-[#FDE3B7] flex items-center justify-start p-0">
            <img
              src={illustration}
              alt="Register illustration"
              className="w-8xl h-auto object-contain"
            />
          </div>

          {/* Ảnh núp trong form */}
          <img
            src={hiddenAnimal}
            alt="Hidden animal"
            className="absolute bottom-[-20px] left-[350px] w-[160px] z-0 transform rotate-[10deg]"
          />

          {/* Form */}
          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h1 className="text-xl text-center font-extrabold p-1">Welcome to PetShop</h1>
              <h2 className="font-bold text-center text-amber-800 mb-4">
                Đăng ký tài khoản mới!
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">Tài khoản:</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData?.userName}
                    onChange={(e) => handleChangeInput("userName", e.target.value)}
                    placeholder="Nhập tài khoản"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  {error.userName && (
                    <p className="text-red-500 text-xs mt-1">{error.userName}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-600">Email:</label>
                  <input
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleChangeInput("email", e.target.value)}
                    placeholder="Nhập email"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  {error.email && (
                    <p className="text-red-500 text-xs mt-1">{error.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-600">Số điện thoại:</label>
                  <input
                    type="text"
                    value={formData?.phoneNumber}
                    onChange={(e) => handleChangeInput("phoneNumber", e.target.value)}
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  {error.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{error.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-600">Mật khẩu:</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData?.password}
                      onChange={(e) => handleChangeInput("password", e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-2.5 right-3 text-gray-500 cursor-pointer hover:text-gray-700"
                      title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                    </span>
                  </div>
                  {error.password && (
                    <p className="text-red-500 text-xs mt-1">{error.password}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-600">Nhập lại mật khẩu:</label>
                  <div className="relative">
                    <input
                      type={showComfirmPassword ? "text" : "password"}
                      onChange={(e) => handleChangeInput("confirmPassword", e.target.value)}
                      value={formData?.confirmPassword}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                    <span
                      onClick={() => setComfirmShowPassword(!showComfirmPassword)}
                      className="absolute top-2.5 right-3 text-gray-500 cursor-pointer hover:text-gray-700"
                      title={showComfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showComfirmPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                    </span>
                  </div>
                  {error.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms"
                    title="Chấp nhận điều khoản"
                    className="w-4 h-4"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    Chấp nhận các điều khoản
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F4A259] text-white font-semibold py-2.5 text-sm rounded-lg hover:bg-[#DFAF4A] transition disabled:opacity-50"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Đang đăng ký..." : "Đăng ký tài khoản"}
                </button>

                <p className="mt-3 text-center text-amber-950 text-xs">
                  Đã có tài khoản? <a href="#" className="underline hover:text-amber-700">Đăng nhập</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
