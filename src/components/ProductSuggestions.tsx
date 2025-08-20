import React, { useMemo } from "react";
import type { ProductDTO } from "../types/product";

interface ProductSuggestionsProps {
  currentProductId?: number;
  maxProducts?: number;
  className?: string;
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
  currentProductId,
  maxProducts = 4,
  className = "",
}) => {
  // Danh sách tất cả sản phẩm (dữ liệu mẫu)
  const allProducts: ProductDTO[] = useMemo(
    () => [
      {
        id: 2,
        name: "Thức Ăn Hạt Cho Mèo Mẹ & Con Royal Canin Mother & Babycat",
        price: 180000,
        img: "/images/product_02.jpg",
        img2: "/images/product_02.jpg",
      },
      {
        id: 3,
        name: "Thức Ăn Ướt Cho Mèo Royal Canin Instinctive",
        price: 45000,
        img: "/images/product_05.jpg",
        img2: "/images/product_05.jpg",
      },
      {
        id: 4,
        name: "Thức Ăn Hạt Cho Chó Trưởng Thành Royal Canin Adult",
        price: 200000,
        img: "/images/product_07.jpg",
        img2: "/images/product_07.jpg",
      },
      {
        id: 5,
        name: "Snack Cho Mèo Royal Canin Cat Treats",
        price: 65000,
        img: "/images/product_12.jpg",
        img2: "/images/product_12.jpg",
      },
      {
        id: 6,
        name: "Thức Ăn Dinh Dưỡng Cho Mèo Già Royal Canin Senior",
        price: 220000,
        img: "/images/product_15.jpg",
        img2: "/images/product_15.jpg",
      },
      {
        id: 7,
        name: "Thức Ăn Hạt Cho Chó Con Royal Canin Puppy",
        price: 150000,
        img: "/images/product_01.jpg",
        img2: "/images/product_01.jpg",
      },
    ],
    []
  );

  // Lọc sản phẩm gợi ý
  const suggestedProducts = useMemo(
    () =>
      allProducts
        .filter((product) => product.id !== currentProductId)
        .slice(0, maxProducts),
    [allProducts, currentProductId, maxProducts]
  );

  //phần giao diện gợi ý sản phẩm
  return (
    
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sản phẩm gợi ý</h2>
        <p className="text-gray-600">
          Các sản phẩm tương tự mà bạn có thể quan tâm
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-50">
              <div className="aspect-square">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/src/assets/product_01.jpg";
                  }}
                />
              </div>

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Gợi ý
                </span>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                  aria-label={`Thêm ${product.name} vào giỏ hàng`}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight group-hover:text-orange-600 transition-colors min-h-[2.5rem] line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-lg font-bold text-orange-600">
                  {product.price.toLocaleString()}đ
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                </div>

                <span className="text-xs text-green-600 font-medium">
                  Còn hàng
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          Xem thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default ProductSuggestions;
