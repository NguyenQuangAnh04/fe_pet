import React, { useEffect, useState } from "react";
import type { VeterinarianDTO } from "../../../types/veterinarian";
import { BiX } from "react-icons/bi";
import {
  useAddVeterinarian,
  useUpdateVeterinarian,
} from "../../../hook/veterinarian/useVeterinarian";
import { toast } from "react-toastify";

type VetProps = {
  onClose: () => void;
  initialData?: VeterinarianDTO;
  mode: "create" | "update";
};

const VetModal: React.FC<VetProps> = ({
  onClose,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<VeterinarianDTO>({
    id: 0,
    email: "",
    name: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
  });

  const { mutateAsync: useMutateAddVet } = useAddVeterinarian();
  const { mutateAsync: useMutateUpdateVet } = useUpdateVeterinarian();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData && mode === "update") {
      setFormData(initialData);
    }
  }, [initialData, mode]);

  const handleChangeInput = (field: keyof VeterinarianDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // if (!validateForm()) {
    //   toast.error("Vui lòng điền đầy đủ thông tin!");
    //   return;
    // }

    setIsLoading(true);
    try {
      if (mode === "create") {
        await useMutateAddVet(formData);
        toast.success("Tạo bác sĩ thành công!");
      }

      if (mode === "update") {
        await useMutateUpdateVet({
          id: formData.id as number,
          updateVet: formData,

        });
      }
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "create" ? "Tạo bác sĩ mới" : "Cập nhật bác sĩ mục"}
          </h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            <BiX size={28} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Tên bác sĩ *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  "
              placeholder="Nhập tên bác sĩ"
              value={formData.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email bác sĩ *
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Nhập email bác sĩ"
              value={formData.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
            />

          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Số điện thoại bác sĩ *
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Nhập sđt bác sĩ"
              value={formData.phoneNumber}
              onChange={(e) => handleChangeInput("phoneNumber", e.target.value)}
            />

          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-xl">
            <button
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === "create" ? "Đang tạo..." : "Đang cập nhật..."}
                </div>
              ) : mode === "create" ? (
                "Tạo bác sĩ"
              ) : (
                "Cập nhật bác sĩ"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VetModal;
