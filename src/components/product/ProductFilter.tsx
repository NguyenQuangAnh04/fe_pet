import React, { useState } from "react";
import { Filter, Search } from "lucide-react";

export default function PetProductFilter() {
  const [keyword, setKeyword] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [size, setSize] = useState<string>("");
  
  return (
    <div className="max-w-[280px] w-full h-screen bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Bộ lọc</h2>
        </div>

        {/* Keyword Search */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Tìm kiếm</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập tên sản phẩm..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Danh mục</h3>
          <select
            value={categoryId ?? ""}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value={1}>Chó</option>
            <option value={2}>Mèo</option>
          </select>
        </div>

        {/* Price range */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Khoảng giá</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Từ"
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Đến"
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Size - chỉ chọn 1 */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Kích thước</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded-lg border ${
                  size === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
