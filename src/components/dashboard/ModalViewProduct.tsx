import type React from "react";
import { BiX } from "react-icons/bi";
import type { ProductDTO2 } from "../../types/product";
import { formatPrice } from "../../utils/format";

type ModalViewProductProps = {
  onClose: () => void;
  initialData: ProductDTO2;
};

const ModalViewProduct: React.FC<ModalViewProductProps> = ({
  onClose,
  initialData,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">
            Thông tin sản phẩm
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <BiX size={28} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Tên sản phẩm
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {initialData?.namePro || "Chưa có tên"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Giá bán
                </label>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatPrice(initialData?.price) || "Chưa có giá"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Mô tả sản phẩm
                </label>
                <p className="text-gray-800 leading-relaxed">
                  {initialData?.description || "Chưa có mô tả"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ảnh chính
              </h3>
              <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-100">
                {initialData?.imageUrl ? (
                  <img
                    src={initialData.imageUrl}
                    alt={initialData?.namePro}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center text-gray-400">
                    <p>Chưa có ảnh chính</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Ảnh phụ của sản phẩm
            </h3>
            {initialData?.imagesDTO && initialData.imagesDTO.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {initialData.imagesDTO.map((item, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-md bg-gray-100 aspect-square"
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Ảnh phụ ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">
                  Sản phẩm này chưa có ảnh phụ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewProduct;
