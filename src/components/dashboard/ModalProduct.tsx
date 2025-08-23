import React, { useEffect, useState } from "react";
import { BiUpload, BiX } from "react-icons/bi";
import type { ProductDTO } from "../../types/product";
import { useAddProduct, useUpdateProduct } from "../../hook/product/useProduct";
import { toast } from "react-toastify";
import { useQueryAllCategory } from "../../hook/category/useCategoty";

type ModalProduct = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: ProductDTO;
};

const ModalProduct: React.FC<ModalProduct> = ({
  isOpen,
  onClose,
  mode,
  initialData,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductDTO>({
    id: 0,
    namePro: "",
    imageUrl: "",
    description: "",
    price: 0,
    imagesDTO: [],
  });

  const { mutateAsync: mutateAddProduct } = useAddProduct();
  const { mutateAsync: mutateUpdateProduct } = useUpdateProduct();
  const [categoryId, setCategoryId] = useState(1);
  const { data } = useQueryAllCategory();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      setPreviewImages((prev) => [
        ...prev,
        ...files.map((item) => URL.createObjectURL(item)),
      ]);
    }
  };

  useEffect(() => {
    if (mode === "update" && initialData) {
      setFormData(initialData);
      if (initialData.imagesDTO.length > 0 && initialData) {
        setPreviewImages(initialData.imagesDTO.map((item) => item.imageUrl));
      }
    }
  }, [mode, initialData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "create") {
        if (images.length === 0) {
          toast.error("Bạn chưa chọn ảnh!");
          return;
        }
        await mutateAddProduct({
          cateId: categoryId,
          productDTO: formData,
          images,
        });
      } else if (mode === "update") {
        await mutateUpdateProduct({
          cateId: formData.id,
          productDTO: formData,
          images,
        });
      }
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (
    field: keyof ProductDTO,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    return (
      formData.namePro.trim() !== "" &&
      formData.price > 0 &&
      formData.description.trim() !== "" &&
      (mode === "update" || images.length > 0)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30  z-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "create" ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}
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
              Tên sản phẩm *
            </label>
            <input
              type="text"
              value={formData.namePro}
              onChange={(e) => handleChangeInput("namePro", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Giá sản phẩm *
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Nhập giá sản phẩm"
              value={formData.price || ""}
              onChange={(e) =>
                handleChangeInput("price", parseFloat(e.target.value) || 0)
              }
              min="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Mô tả sản phẩm *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChangeInput("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 2 focus:ring-0 focus:outline-none min-h-[100px]"
              placeholder="Nhập mô tả chi tiết về sản phẩm"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Danh mục sản phẩm
            </label>
            <select
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
            >
              <option value="">Chọn danh mục</option>
              {data?.map((item) => (
                <option className="text-sm rounded" value={item.id}>
                  {item.nameCate}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Hình ảnh sản phẩm {mode === "create" && "*"}
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 0 ">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <BiUpload className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600 text-center">
                  <span className="font-semibold text-blue-600">
                    Nhấn để chọn ảnh
                  </span>{" "}
                  hoặc kéo thả file vào đây
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB mỗi ảnh)
                </p>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                id="image"
              />
            </div>

            {previewImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Ảnh đã chọn ({previewImages.length})
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                  {previewImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        className="w-full h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                        src={file}
                        alt={`Preview ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !validateForm()}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              loading || !validateForm()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {mode === "create" ? "Đang thêm..." : "Đang cập nhật..."}
              </div>
            ) : mode === "create" ? (
              "Thêm sản phẩm"
            ) : (
              "Cập nhật sản phẩm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
