import { Star } from "lucide-react";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQueryAllProducts } from "../../hook/product/useProduct";
import type { ProductDTO } from "../../types/product";
import ProductCard from "../common/ProductCard";
import ViewAll from "../common/ViewAll";

const NewArrivals = () => {
  const { data } = useQueryAllProducts();
  const navigate = useNavigate();
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  return (
    <div className=" py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Hàng mới về</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {data?.map((p) => (
            <div className="p-4 rounded-2xl cursor-pointer flex flex-col h-full">
              <div className="relative group">
                <img
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                  src={p.imageUrl}
                  alt=""
                  className="w-full h-[250px] object-cover rounded-lg"
                />
                <img
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                  src={p.imagesDTO?.[1]?.imageUrl ?? p.imageUrl}
                  className="w-full h-[250px] object-cover rounded-lg absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  alt=""
                />
                {/* <button className="absolute bottom-0 left-0 right-0 border border-gray-400 rounded-xl px-2 py-2 bg-white translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ">
                  Thêm vào giỏ hàng
                </button> */}
                {/* <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowModalProductCart(true);
                  }}
                  className="absolute w-8 h-8 rounded-full bg-white text-black shadow flex items-center justify-center right-0 top-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                >
                  <BsEye size={20} />
                </button> */}
              </div>
              <p className="font-semibold line-clamp-2 mt-2 min-h-[3rem]">
                {p.namePro}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(p.averageRating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {(p.averageRating || 0).toFixed(1)}
                </span>
              </div>

              <p className="font-bold text-pink-600 mt-auto pt-2">
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
