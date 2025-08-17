import React, { useState } from "react";
import ProductImages from "../components/ProductImages";

export default function ProductDetails() {
  const [size, setSize] = useState("400g");
  const [quantity, setQuantity] = useState(1);
  
  // Giá theo size
  const priceBySize = {
    "400g": 120000,
    "1kg": 280000,
    "2kg": 520000,
    "3kg": 750000,
  };

  const sizes = ["400g", "1kg", "2kg", "3kg"];
  const price = priceBySize[size as keyof typeof priceBySize];
  const total = price * quantity;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Hình ảnh sản phẩm */}
        <div className="order-2 lg:order-1">
          <ProductImages />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Tiêu đề và thông tin cơ bản */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27
            </h1>
            
            <div className="space-y-2 text-sm md:text-base">
              <p className="text-gray-700">
                <span className="font-medium">Thương hiệu:</span> 
                <span className="text-orange-600 font-semibold ml-2">Royal Canin</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Kho hàng:</span> 
                <span className="text-green-600 font-semibold ml-2">✓ Còn hàng</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Loại sản phẩm:</span> 
                <span className="ml-2">Thức ăn khô</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Xuất xứ:</span> 
                <span className="ml-2">Pháp</span>
              </p>
            </div>
          </div>

          {/* Giá */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-3xl md:text-4xl font-bold text-orange-600">
              {price.toLocaleString()}đ
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Giá đã bao gồm VAT
            </p>
          </div>

          {/* Chọn size */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-900">Chọn kích thước:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    size === s 
                      ? "border-orange-500 bg-orange-50 text-orange-700" 
                      : "border-gray-300 hover:border-orange-300 text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Số lượng */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-900">Số lượng:</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-lg font-medium border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Tổng tiền:</span>
              <span className="text-2xl font-bold text-orange-600">
                {total.toLocaleString()}đ
              </span>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="space-y-3">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Mua ngay
            </button>
            <button className="w-full bg-white hover:bg-orange-50 text-orange-600 font-semibold py-4 px-6 rounded-lg border-2 border-orange-500 transition-colors duration-200">
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* Thông tin bổ sung */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
            <h3 className="font-semibold text-blue-900">🎯 Đặc điểm nổi bật:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Dành riêng cho mèo trưởng thành nuôi trong nhà</li>
              <li>• Giảm mùi phân nhờ công thức đặc biệt</li>
              <li>• Hỗ trợ tiêu hóa và kiểm soát cân nặng</li>
              <li>• Chất lượng Premium từ Pháp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
