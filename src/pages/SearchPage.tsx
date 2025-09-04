import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ProductDTO } from "../types/product";
import { formatPrice } from "../utils/format";
import { BsEye } from "react-icons/bs";

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
    <div>
      <div className=" flex-1 pl-2">
        <h2 className="text-xl font-semibold  ">
          Hiển thị {data.content.length} sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-6 gap-5 mt-5">
          {data.content.map((item) => (
            <div className="max-h-[380px] p-3 ">
              <div className="relative group">
                <button
                  onClick={() => {
                    setShowModalProductCart(true);
                    setSelectedProduct(item);
                  }}
                  className="absolute top-8 right-2 z-10 opacity-0 transition-all translate-x-full group-hover:opacity-100 group-hover:translate-x-0
                 bg-white text-black rounded-full shadow  flex items-center h-8 w-8 justify-center duration-500"
                >
                  <BsEye size={20} />
                </button>
                <img
                  src={item.imageUrl}
                  onClick={() => navigate(`/product-details/${item.slug}`)}
                  alt=""
                  className="w-[250px] h-[250px] object-contain cursor-pointer"
                />
                <img
                  src={item.imagesDTO[1].imageUrl}
                  onClick={() => navigate(`/product-details/${item.slug}`)}
                  alt=""
                  className={`absolute w-[250px] h-[250px] object-contain top-0 left-0 right-0 opacity-0 transition-all group-hover:opacity-100 duration-500 cursor-pointer`}
                />
                {/* <button>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="absolute border border-gray-400 rounded-xl px-2 py-2 bg-white bottom-0 left-0 right-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </button> */}
              </div>
              <p className="font-semibold line-clamp-2">{item.namePro}</p>
              <p className="text-red-500 font-semibold">
                {formatPrice(item.price)}
              </p>
            </div>
          ))}
        </div>
        {data.totalPages && data.totalPages > 0 && (
          <div className="flex gap-2 mt-5 justify-center">
            <button
              onClick={() => setPage((prev) => (prev === 0 ? 0 : prev - 1))}
              className="border border-gray-400 rounded w-8 h-8 "
              disabled={page === 0}
              aria-label="previous page"
            >
              &lt;
            </button>
            {Array.from({ length: data.totalPages }, (_, i) => (
              <button
                onClick={() => setPage(i)}
                className={`w-8 h-8 rounded shadow-lg flex items-center justify-center ${i === page ? "bg-blue-500 text-white" : ""
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button className="border border-gray-400 rounded w-8 h-8">
              &gt;
            </button>
          </div>
        )}
      </div>
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
