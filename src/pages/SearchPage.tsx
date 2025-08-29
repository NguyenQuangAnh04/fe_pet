import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProductDTO } from "../types/product";
import { findAllProduct } from "../api/productService";
import { formatPrice } from "../utils/format";
import { BsEye } from "react-icons/bs";

import ProductCard from "../components/common/ProductCard";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";
  const [data, setData] = useState<ProductDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await findAllProduct(page, q);
      setData(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    };
    fetchData();
  }, [page, q]);
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="flex container max-w-[1440px] mx-auto px-4 mt-10 mb-10 ">
        <ProductFilter/>
        <div className=" flex-1 pl-2">
          <h2 className="text-xl font-semibold  ">
            Hiển thị {data.length} sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-6 gap-5 mt-5">
            {data.map((item) => (
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
                  {item.price && formatPrice(item.price)}
                </p>
              </div>
            ))}
          </div>
          {totalPages && (
            <div className="flex gap-2 mt-5 justify-center">
              <button
                onClick={() => setPage((prev) => (prev === 0 ? 0 : prev - 1))}
                className="border border-gray-400 rounded w-8 h-8 "
              >
                {" "}
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  onClick={() => setPage(i)}
                  className={`w-8 h-8 rounded shadow-lg flex items-center justify-center ${
                    i === page ? "bg-blue-500 text-white" : ""
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
      </div>
      {showModalProductCart && selectProduct && (
        <ProductCard
          isOpen={showModalProductCart}
          onClose={() => setShowModalProductCart(false)}
          initalData={selectProduct}
        />
      )}
      <Footer />
    </div>
  );
}
