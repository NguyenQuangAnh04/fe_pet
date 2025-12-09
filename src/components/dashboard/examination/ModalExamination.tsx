import React, { useEffect, useState } from "react";
import type { ExaminationDTO } from "../../../types/examination";
import { BiX } from "react-icons/bi";
import {
  userAddExamination,
  userUpdateExamination,
} from "../../../hook/examination/useExamination";
import { toast } from "react-toastify";

type Error = {
  errorName: string;
  errorPrice: string;
  errorDescription: string;
};

type ExamProps = {
  onClose: () => void;
  initialData?: ExaminationDTO;
  mode: "create" | "update";
};

const VetModal: React.FC<ExamProps> = ({ onClose, mode, initialData }) => {
  const [formData, setFormData] = useState<ExaminationDTO>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    active: false,
  });

  const { mutateAsync: useMutateAddExam } = userAddExamination();
  const { mutateAsync: useMutateUpdateExam } = userUpdateExamination();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error>({
    errorName: "",
    errorPrice: "",
    errorDescription: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (initialData && mode === "update") {
      setFormData(initialData);
    }
  }, [initialData, mode]);

  const handleChangeInput = (field: keyof ExaminationDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  // Validate và set errors khi submit
  const validateForm = () => {
    const newErrors: Error = {
      errorName: "",
      errorPrice: "",
      errorDescription: "",
    };

    if (!formData.name.trim()) {
      newErrors.errorName = "Tên dịch vụ không được để trống!";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.errorPrice = "Giá dịch vụ phải lớn hơn 0!";
    }

    if (!formData?.description?.trim()) {
      newErrors.errorDescription = "Mô tả dịch vụ không được để trống!";
    }

    setErrors(newErrors);
    return (
      newErrors.errorName === "" &&
      newErrors.errorPrice === "" &&
      newErrors.errorDescription === ""
    );
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);

    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "create") {
        await useMutateAddExam(formData);
        toast.success("Tạo bác sĩ thành công!");
      }

      if (mode === "update") {
        await useMutateUpdateExam({
          id: formData.id as number,
          updateExam: formData,
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
            {mode === "create"
              ? "Tạo dịch vụ khám mới"
              : "Cập nhật dịch vụ khám mục"}
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
              Tên dịch vụ khám *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  "
              placeholder="Nhập dịch vụ khám"
              value={formData.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
            />
            {hasSubmitted && errors.errorName && (
              <p className="text-red-500 text-sm mt-1">{errors.errorName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Giá dịch vụ khám *
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Nhập giá dịch vụ khám"
              value={formData.price}
              onChange={(e) => handleChangeInput("price", e.target.value)}
            />
            {hasSubmitted && errors.errorPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.errorPrice}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Mô tả dịch vụ khám *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Nhập mô tả dịch vụ khám"
              value={formData.description}
              onChange={(e) => handleChangeInput("description", e.target.value)}
            />
            {hasSubmitted && errors.errorDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.errorDescription}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isAdditional"
              checked={formData.active || false}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, active: e.target.checked }))
              }
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="isAdditional"
              className="text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Đây là dịch vụ chính
            </label>
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
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                isLoading
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
                "Tạo dịch vụ khám"
              ) : (
                "Cập nhật dịch vụ khám"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VetModal;
