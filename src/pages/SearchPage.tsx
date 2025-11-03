import { Star } from "lucide-react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import type { ProductDTO } from "../types/product";
import { formatPrice } from "../utils/format";

import ProductCard from "../components/common/ProductCard";
import type { ProductResponse } from "../hook/product/useProduct";

type SearchPageProps = {
  data: ProductResponse;
  page: number;
  setPage: (p: number) => void;
}
export default function SearchPage({ data, page, setPage }: SearchPageProps) {

  const [showModalProductCart, setShowModalProductCart] = useState(false);
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Tìm thấy <span className="text-blue-600">{data.content.length}</span> sản phẩm
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.content.length > 0 && data.content.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group flex flex-col h-full"
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              {/* Quick View Button */}
              <button
                onClick={() => {
                  setShowModalProductCart(true);
                  setSelectedProduct(item);
                }}
                className="absolute top-3 right-3 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full shadow-md flex items-center h-10 w-10 justify-center"
              >
                <BsEye size={20} />
              </button>

              {/* Product Images */}
              <div className="aspect-square relative">
                <img
                  src={item.imageUrl}
                  onClick={() => navigate(`/product-details/${item.slug}`)}
                  alt={item.namePro}
                  className="w-full h-full object-contain cursor-pointer transition-opacity duration-300"
                />
                {item.imagesDTO[1] && (
                  <img
                    src={item.imagesDTO[1].imageUrl}
                    onClick={() => navigate(`/product-details/${item.slug}`)}
                    alt={item.namePro}
                    className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2 flex flex-col flex-grow">
              <h3
                onClick={() => navigate(`/product-details/${item.slug}`)}
                className="font-semibold text-gray-800 line-clamp-2 min-h-[3rem] cursor-pointer hover:text-blue-600 transition-colors"
              >
                {item.namePro}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${star <= Math.round(item.averageRating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {(item.averageRating || 0).toFixed(1)}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="text-lg font-bold text-red-500">
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.content.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-600">Vui lòng thử lại với bộ lọc khác</p>
        </div>
      )}

      {/* Pagination */}
      {data.totalPages && data.totalPages > 1 && (
        <div className="flex gap-2 mt-8 pt-6 border-t border-gray-200 justify-center items-center">
          <button
            onClick={() => setPage(page === 0 ? 0 : page - 1)}
            disabled={page === 0}
            className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all duration-200 ${page === 0
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
              }`}
            aria-label="previous page"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {Array.from({ length: data.totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${i === page
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-110"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(page === data.totalPages - 1 ? page : page + 1)}
            disabled={page === data.totalPages - 1}
            className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all duration-200 ${page === data.totalPages - 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
              }`}
            aria-label="next page"
          >
            ›
          </button>
        </div>
      )}

      {/* Product Card Modal */}
      {showModalProductCart && selectProduct && (
        <ProductCard
          isOpen={showModalProductCart}
          onClose={() => setShowModalProductCart(false)}
          initalData={selectProduct}
        />
      )}
    </div>
  );
}