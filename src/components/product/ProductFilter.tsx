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
    <div>
      <Header />
      <div className="flex container max-w-[1440px] mx-auto px-4 mt-10 mb-10 ">
        <div className="max-w-[280px] w-full h-screen bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Bộ lọc</h2>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Danh mục</h3>
              <select
                value={categoryIdInput ?? ""}
                onChange={(e) =>
                  setCategoryIdInput(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả</option>
                {categoryData?.content.map(it => (
                  <option key={it.id} value={it.id}>
                    {it.nameCate}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Khoảng giá</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice ?? ""}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="Từ"
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  value={maxPrice ?? ""}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Đến"
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Kích thước</h3>
              <div className="flex flex-wrap gap-2">
                {["100G", "200G", "500G", "1KG", "2KG"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 rounded-lg border ${size === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => applyFilters()} className="bg-blue-400 mt-5 text-white px-4 py-2 rounded-lg w-full">Lọc</button>

          </div>
        </div>
        {productData && <SearchPage page={page} setPage={setPage} data={productData} />}

      </div>
      <Footer />
    </div>
  );
}
