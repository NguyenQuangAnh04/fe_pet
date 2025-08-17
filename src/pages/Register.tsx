import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { register } from "../api/authService";
import type { userRegister } from "../types/user";
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

    setError(newError);

    // Nếu có lỗi thì không submit
    if (Object.keys(newError).length > 0) return;

    mutation.mutate(formData);
  };

  return (
    <div
      className="bg-[#f7c884] flex items-center justify-center fixed inset-0 px-4"
    >
      <div className="bg-white shadow-lg max-w-5xl w-full rounded overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-3/5">
            <img
              src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYW5kJTIwZG9nfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000"
              alt=""
              className="h-full w-full object-cover rounded-l"
            />
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="md:w-2/5 p-3 space-y-5"
          >
            <h2 className="text-center font-semibold text-xl">
              Đăng ký tài khoản
            </h2>

            <div className="flex flex-col">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor=""
              >
                Tài khoản
              </label>
              <input
                type="text"
                name="userName"
                value={formData?.userName}
                onChange={(e) => handleChangeInput("userName", e.target.value)}
                id=""
                placeholder="Nhập tài khoản "
                className="py-1 px-4 border border-gray-400 rounded"
              />
              {error.userName && (
                <p className="text-red-500 text-sm">{error.userName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor=""
              >
                Email
              </label>
              <input
                type="email"
                value={formData?.email}
                onChange={(e) => handleChangeInput("email", e.target.value)}
                name=""
                id=""
                placeholder="Nhập email "
                className="py-1 px-4 border border-gray-400 rounded"
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor=""
              >
                Số điện thoại
              </label>
              <input
                type="text"
                value={formData?.phoneNumber}
                onChange={(e) =>
                  handleChangeInput("phoneNumber", e.target.value)
                }
                name="phoneNumber"
                id=""
                placeholder="Nhập số điện thoại "
                className="py-1 px-4 border border-gray-400 rounded"
              />
              {error.phoneNumber && (
                <p className="text-red-500 text-sm">{error.phoneNumber}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor=""
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData?.password}
                  onChange={(e) =>
                    handleChangeInput("password", e.target.value)
                  }
                  name=""
                  id=""
                  placeholder="Nhập mật khẩu "
                  className="py-1 px-4 border border-gray-400 rounded w-full"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor=""
              >
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showComfirmPassword ? "text" : "password"}
                  name=""
                  onChange={(e) =>
                    handleChangeInput("confirmPassword", e.target.value)
                  }
                  value={formData?.confirmPassword}
                  id=""
                  placeholder="Nhập lại mật khẩu "
                  className="py-1 px-4 border border-gray-400 rounded w-full"
                />
                <span
                  onClick={() => setComfirmShowPassword(!showComfirmPassword)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  {showComfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                {error.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {error.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="" id="" />
              <span className="text-sm">Chấp nhận các điều khoản</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-fuchsia-950 text-white  w-full  rounded cursor-pointer"
            >
              Đăng ký tài khoản
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
