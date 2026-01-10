import React, { useEffect, useState } from "react";
import { BiPlus, BiUpload, BiX } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { useQueryAllCategory } from "../../../hook/category/useCategoty";
import {
  useAddProduct,
  useUpdateProduct,
} from "../../../hook/product/useProduct";
import { useDeleteVariant } from "../../../hook/variant/useVariant";
import type { ProductDTO } from "../../../types/product";
import type { VariantDTO } from "../../../types/variant";
type Error = {
  errorNameProduct: string;
  errorDescription: string;
  errorCategory: string;
  errorPriceVariant: string;
  errorVariant: string;
  errorQuantityVariant: string;
  errorSizeVariant: string;
  errorImageProduct: string;
};
type ModalProduct = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: ProductDTO;
};
type VariantError = {
  price?: string;
  quantity?: string;
  size?: string;
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
    sl: 1,
    description: "",
    price: 0,
    imagesDTO: [],
    averageRating: 0,
  });

  const { mutateAsync: mutateAddProduct } = useAddProduct();
  const { mutateAsync: mutateUpdateProduct } = useUpdateProduct();
  const { mutateAsync: mutateDeleteVariant } = useDeleteVariant();
  const [categoryId, setCategoryId] = useState(0);
  const [errors, setErrors] = useState<Error>({
    errorNameProduct: "",
    errorDescription: "",
    errorCategory: "",
    errorPriceVariant: "",
    errorVariant: "",
    errorQuantityVariant: "",
    errorSizeVariant: "",
    errorImageProduct: "",
  });
  const [variantErrors, setVariantErrors] = useState<VariantError[]>([]);

  const validate = () => {
    const newErrors: Error = {
      errorNameProduct: "",
      errorDescription: "",
      errorCategory: "",
      errorPriceVariant: "",
      errorVariant: "",
      errorQuantityVariant: "",
      errorSizeVariant: "",
      errorImageProduct: "",
    };
    const newVariantErrors: VariantError[] = [];

    if (!formData.namePro.trim()) {
      newErrors.errorNameProduct = "Tên sản phẩm không được để trống!";
    }

    if (!formData.description.trim()) {
      newErrors.errorDescription = "Mô tả sản phẩm không được để trống!";
    }

    if (!categoryId && categoryId === 0) {
      newErrors.errorCategory = "Bạn phải chọn danh mục sản phẩm!";
    }

    if (variants.length === 0) {
      newErrors.errorVariant = "Bạn phải thêm ít nhất 1 biến thể cho sản phẩm!";
    }

    if (images.length === 0 && mode === "create") {
      newErrors.errorImageProduct = "Bạn phải chọn ảnh cho sản phẩm!";
    }
    // Kiểm tra giá của các biến thể
    variants.forEach((v, index) => {
      newVariantErrors[index] = {};

      if (!v.price || v.price <= 0) {
        newVariantErrors[index].price = "Giá phải lớn hơn 0!";
      }

      if (v.stock == null || v.stock < 0) {
        newVariantErrors[index].quantity = "Số lượng không hợp lệ!";
      }

      if (!v.size || v.size.trim() === "") {
        newVariantErrors[index].size = "Kích cỡ không được để trống!";
      }
    });

    setErrors(newErrors);
    setVariantErrors(newVariantErrors);

    // Kiểm tra nếu có bất kỳ lỗi nào
    const variantHasError = newVariantErrors.some(
      (err) => err.price || err.quantity || err.size
    );

    const commonHasError = !Object.values(newErrors).every(
      (error) => error === ""
    );

    if (variants?.length === 0) {
      toast.error("Sản phẩm phải có ít nhất một biến thể!");
    }
    // Trả về true nếu không có lỗi
    return !(commonHasError || variantHasError);
  };
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
      if (
        initialData.imagesDTO.length > 0 &&
        initialData &&
        initialData.variants &&
        initialData.variants.length > 0
      ) {
        setPreviewImages(initialData.imagesDTO.map((item) => item.imageUrl));
        setCategoryId(initialData.categoryId || 0);
        setVariants(initialData.variants);
      }
    }
  }, [mode, initialData]);
  const handleSubmit = async () => {
    // Gọi hàm validate trước khi submit
    if (!validate()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Kiểm tra thông tin variant
      const invalidVariant = variants.find(
        (variant) =>
          !variant.size?.trim() ||
          !variant.price ||
          variant.price <= 0 ||
          !variant.stock ||
          variant.stock <= 0
      );

      if (invalidVariant) {
        toast.error(
          "Tất cả biến thể phải có đầy đủ thông tin: kích cỡ, giá > 0 và số lượng > 0!"
        );
        setLoading(false);
        return;
      }
      if (mode === "create") {
        if (images.length === 0) {
          toast.error("Bạn chưa chọn ảnh!");
          return;
        }
        await mutateAddProduct({
          cateId: categoryId,
          productDTO: {
            ...formData,
            variants: variants,
          },
          images,
        });
      } else if (mode === "update") {
        console.log("Category:", categoryId);
        console.log("FormData:", formData);
        await mutateUpdateProduct({
          cateId: formData.id,

          productDTO: {
            ...formData,
            categoryId: categoryId,
            variants: variants,
          },
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

  // const validateForm = () => {
  //   return (
  //     formData.namePro.trim() !== "" &&
  //     formData.description.trim() !== "" &&

  //     (mode === "update" || images.length > 0)
  //   );
  // };
  const [action, setAction] = useState(0);
  const [variants, setVariants] = useState<VariantDTO[]>([]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: null,
        size: "",
        stock: 0,
        productId: initialData?.id,
      },
    ]);
    // Clear lỗi của variant mới
    setVariantErrors((prev) => [
      ...prev,
      { price: "", quantity: "", size: "" },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30  z-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800 flex flex-col">
            {mode === "create" ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}
          </h2>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            <BiX size={28} className="text-gray-600 hover:text-gray-800 0" />
          </button>
        </div>
        <div className="sticky top-[92px] flex gap-5 shadow-lg px-6 py-3 z-50 border-b border-gray-100 bg-white">
          <button
            onClick={() => setAction(0)}
            className={`${action === 0 ? "border-b-2 border-blue-500" : ""}`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => setAction(1)}
            className={`${action === 1 ? "border-b-2 border-blue-500" : ""}`}
          >
            Biến thể
          </button>
        </div>
        {action === 0 && (
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
              {errors.errorNameProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.errorNameProduct}
                </p>
              )}
            </div>

            {/* <div className="space-y-2">
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
            </div> */}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mô tả sản phẩm *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleChangeInput("description", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 2 focus:ring-0 focus:outline-none min-h-[100px]"
                placeholder="Nhập mô tả chi tiết về sản phẩm"
                rows={4}
              />
              {errors.errorDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.errorDescription}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Danh mục sản phẩm
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
              >
                <option value="">Chọn danh mục</option>
                {data?.map((item) => (
                  <option
                    key={item.id}
                    className="text-sm rounded"
                    value={item.id}
                  >
                    {item.nameCate}
                  </option>
                ))}
              </select>
              {errors.errorCategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.errorCategory}
                </p>
              )}
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
              {errors.errorImageProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.errorImageProduct}
                </p>
              )}
            </div>
          </div>
        )}
        {action === 1 && (
          <div className="bg-white p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold ">Biến thể sản phẩm</h2>
              <button
                onClick={() => addVariant()}
                className="flex gap-1 items-center bg-blue-500 px-4 py-2 text-white rounded-xl "
              >
                <BiPlus size={20} />
                Thêm biến thể
              </button>
            </div>
            <div className="space-y-2">
              {variants.map((item, index) => (
                <div key={index} className="grid gap-2 grid-cols-3 relative">
                  <div className="flex flex-col ">
                    <label htmlFor="">Kích cỡ</label>
                    <input
                      type="text"
                      value={item.size || ""}
                      onChange={(e) => {
                        setVariants((prev) => {
                          const newVariants = [...prev];
                          newVariants[index].size = e.target.value;
                          return newVariants;
                        });
                      }}
                      className="border border-gray-300 rounded px-4 py-1 placeholder:text-sm "
                      placeholder="Nhập kích cỡ sản phẩm"
                      name=""
                      id=""
                    />
                    {variantErrors[index]?.size && (
                      <p className="text-red-500 text-sm mt-1">
                        {variantErrors[index].size}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Giá</label>
                    <input
                      type="number"
                      value={item.price ?? ""}
                      onChange={(e) => {
                        setVariants((prev) => {
                          const newVariants = [...prev];
                          newVariants[index].price = Number(e.target.value);
                          return newVariants;
                        });
                      }}
                      className="border border-gray-300 rounded px-4 py-1 placeholder:text-sm "
                      placeholder="Nhập giá biến thể"
                      name=""
                      id=""
                    />
                    {variantErrors[index]?.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {variantErrors[index].price}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Số lượng</label>
                    <input
                      type="number"
                      value={item.stock || 1}
                      onChange={(e) => {
                        setVariants((prev) => {
                          const newVariants = [...prev];
                          newVariants[index].stock = Number(e.target.value);
                          return newVariants;
                        });
                      }}
                      className="border border-gray-300 rounded px-4 py-1 placeholder:text-sm "
                      placeholder="Nhập số lượng"
                      name=""
                      id=""
                    />
                    {variantErrors[index]?.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {variantErrors[index].quantity}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (item.id) {
                        // Nếu có id (đã tồn tại trong DB), gọi API xóa
                        mutateDeleteVariant(item.id);
                      } else {
                        // Nếu chưa có id (mới thêm), chỉ filter ra khỏi state
                        setVariants((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }
                    }}
                    className="absolute right-0 top-0 bg-red-500 rounded-full text-white"
                  >
                    <BsX />
                  </button>
                </div>
              ))}
            </div>
            {errors.errorVariant && (
              <p className="text-red-500 text-sm">{errors.errorVariant}</p>
            )}
          </div>
        )}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              loading
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
