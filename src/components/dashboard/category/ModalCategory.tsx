import React, { useEffect, useState } from "react";
import type { CategoriesDTO } from "../../../types/category";
import { BiX } from "react-icons/bi";
import { BsUpload, BsImage } from "react-icons/bs";
import {
  useAddCategory,
  useUpdateCategory,
} from "../../../hook/category/useCategoty";
import { toast } from "react-toastify";

type CategoryProps = {
  onClose: () => void;
  initialData?: CategoriesDTO;
  mode: "create" | "update";
};

const CategoryModal: React.FC<CategoryProps> = ({
  onClose,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<CategoriesDTO>({
    id: 0,
    nameCate: "",
    description: "",
    imageUrl: "",
    product: [],
  });

  const { mutateAsync: useMutateAddCategory, isPending: isAddPending } =
    useAddCategory();
  const { mutateAsync: useMutateUpdateCategory, isPending: isUpdatePending } =
    useUpdateCategory();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [errors, setErrors] = useState({
    nameCate: "",
    description: "",
    image: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isLoading = isAddPending || isUpdatePending;

  useEffect(() => {
    if (initialData && mode === "update") {
      setFormData(initialData);
      setPreviewImage(initialData.imageUrl);
    }
  }, [initialData, mode]);

  const handleChangeInput = (field: keyof CategoriesDTO, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước ảnh không được vượt quá 5MB!");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file hình ảnh hợp lệ!");
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      nameCate: "",
      description: "",
      image: "",
    };

    if (!formData.nameCate.trim()) {
      newErrors.nameCate = "Vui lòng nhập tên danh mục";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả danh mục";
    }

    if (mode === "create" && !image) {
      newErrors.image = "Vui lòng chọn ảnh danh mục";
    }

    setErrors(newErrors);
    return !newErrors.nameCate && !newErrors.description && !newErrors.image;
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      if (mode === "create") {
        await useMutateAddCategory({ categoryDTO: formData, image: image! });
        console.log(formData);
      }

      if (mode === "update") {
        await useMutateUpdateCategory({
          id: formData.id,
          categoryDTO: formData,
          image,
        });
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.Error || "Có lỗi xảy ra!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "create" ? "Tạo danh mục mới" : "Cập nhật danh mục"}
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
              Tên danh mục *
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg ${
                hasSubmitted && errors.nameCate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Nhập tên danh mục"
              value={formData.nameCate}
              onChange={(e) => handleChangeInput("nameCate", e.target.value)}
            />
            {hasSubmitted && errors.nameCate && (
              <p className="text-sm text-red-600">{errors.nameCate}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Mô tả danh mục *
            </label>
            <textarea
              className={`w-full px-4 py-3 border rounded-lg focus:ring-0 focus:outline-none min-h-[100px] ${
                hasSubmitted && errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Nhập mô tả chi tiết cho danh mục"
              value={formData.description}
              onChange={(e) => handleChangeInput("description", e.target.value)}
              rows={4}
            />
            {hasSubmitted && errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Hình ảnh danh mục {mode === "create" && "*"}
            </label>

            {!previewImage ? (
              <>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 ${
                    hasSubmitted && errors.image
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <label
                    htmlFor="files"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <BsUpload className="text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center text-lg">
                      <span className="font-semibold text-blue-600">
                        Nhấn để chọn ảnh
                      </span>{" "}
                      hoặc kéo thả file vào đây
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)
                    </p>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="files"
                    onChange={handleImage}
                    className="hidden"
                  />
                </div>
                {hasSubmitted && errors.image && (
                  <p className="text-sm text-red-600">{errors.image}</p>
                )}
              </>
            ) : (
              <div className="relative">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-80 object-contain"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <label
                    htmlFor="files"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
                    title="Thay đổi ảnh"
                  >
                    <BsImage size={16} />
                  </label>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="files"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-xl">
          <button
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            } text-white`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {mode === "create" ? "Đang tạo..." : "Đang cập nhật..."}
              </div>
            ) : mode === "create" ? (
              "Tạo danh mục"
            ) : (
              "Cập nhật danh mục"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
