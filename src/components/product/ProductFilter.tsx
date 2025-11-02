import { Filter } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryCategory } from "../../hook/category/useCategoty";
import { useQueryProduct } from "../../hook/product/useProduct";
import SearchPage from "../../pages/SearchPage";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default function PetProductFilter() {
  const [categoryIdInput, setCategoryIdInput] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [appliedCategory, setAppliedCategory] = useState<number | null>(null);
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);
  const [appliedSize, setAppliedSize] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";
  const [size, setSize] = useState<string | null>(null);
  const { data: productData } = useQueryProduct({ page, keyword: q, categoryId: appliedCategory ?? undefined, minPrice: appliedMinPrice, maxPrice: appliedMaxPrice, size: appliedSize ?? undefined });
  const applyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedCategory(categoryIdInput);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setAppliedSize(size?.toLowerCase() ?? null);
    setPage(0);
  };

  const [name, setName] = useState<string>("");

  const { data: categoryData } = useQueryCategory({ page: 0, name });
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex container max-w-[1440px] mx-auto px-4 py-8 gap-6">
        {/* Sidebar Filter */}
        <div className="max-w-[280px] w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Bộ lọc</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Danh mục</h3>
                <select
                  value={categoryIdInput ?? ""}
                  onChange={(e) =>
                    setCategoryIdInput(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                >
                  <option value="">Tất cả danh mục</option>
                  {categoryData?.content.map(it => (
                    <option key={it.id} value={it.id}>
                      {it.nameCate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Khoảng giá</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={minPrice ?? ""}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
                      placeholder="Từ"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    />
                  </div>
                  <span className="text-gray-400 font-medium">-</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={maxPrice ?? ""}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
                      placeholder="Đến"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                    />
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Kích thước</h3>
                <div className="flex flex-wrap gap-2">
                  {["100G", "200G", "500G", "1KG", "2KG"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(size === s ? null : s)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${size === s
                          ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Filter Button */}
              <button
                onClick={() => applyFilters()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1">
          {productData && <SearchPage page={page} setPage={setPage} data={productData} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}