import { Star } from "lucide-react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useQueryAllProducts,
  useQueryProduct,
} from "../../hook/product/useProduct";
import type { ProductDTO } from "../../types/product";
import ProductCard from "../common/ProductCard";
import ViewAll from "../common/ViewAll";

const NewArrivals = () => {
  const { data } = useQueryProduct({ size: 10 });
  console.log(data);
  const navigate = useNavigate();
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  return (
    <div className="py-16 space-y-16">
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hàng mới về</h2>
            <p className="text-gray-500 mt-1">Cập nhật sản phẩm mới nhất</p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-gray-200 via-green-300 to-gray-200 mx-8" />
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {data?.content
            ?.sort((a, b) => b.id - a.id)
            .slice(0, 5)
            .map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-2xl cursor-pointer flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    onClick={() => navigate(`/product-details/${p.slug}`)}
                    src={p.imageUrl}
                    alt=""
                    className="w-full h-[250px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  />
                  {p.imagesDTO.length > 1 && (
                    <img
                      onClick={() => navigate(`/product-details/${p.slug}`)}
                      src={p.imagesDTO?.[1]?.imageUrl ?? p.imageUrl}
                      className="w-full h-[250px] object-cover rounded-xl absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      alt=""
                    />
                  )}
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      MỚI
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-gray-800 line-clamp-2 mt-4 min-h-[3rem] group-hover:text-green-600 transition-colors">
                  {p.namePro}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(p.averageRating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    ({(p.averageRating || 0).toFixed(1)})
                  </span>
                </div>

                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mt-auto pt-3">
                  {p.price.toLocaleString("vi-VN")}₫
                </p>
              </div>
            ))}
        </div>
        <ViewAll />
      </section>
      {showModalProductCart && selectProduct && (
        <ProductCard
          isOpen={showModalProductCart}
          onClose={() => setShowModalProductCart(false)}
          initalData={selectProduct}
        />
      )}
    </div>
  );
};

export default NewArrivals;
