import { useState } from "react";
import { BsEye } from "react-icons/bs";
import ProductCard from "../common/ProductCard";
import type { ProductDTO } from "../../types/product";
import ViewAll from "../common/ViewAll";
import { useQueryAllProducts } from "../../hook/product/useProduct";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const { data } = useQueryAllProducts();
  const navigate = useNavigate();
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  return (
    <div className=" py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Hàng mới về</h2>
        <div className="grid grid-cols-5 gap-6 ">
          {data?.map((p) => (
            <div className=" p-4 rounded-2xl  cursor-pointer">
              <div className="relative group">
                <img
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                  src={p.imageUrl}
                  alt=""
                  className="w-[250px] h-[250px] object-cover rounded-lg"
                />
                <img
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                  src={p.imagesDTO[1].imageUrl}
                  className="absolute top-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  alt=""
                />
                {/* <button className="absolute bottom-0 left-0 right-0 border border-gray-400 rounded-xl px-2 py-2 bg-white translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ">
                  Thêm vào giỏ hàng
                </button> */}
                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowModalProductCart(true);
                  }}
                  className="absolute w-8 h-8 rounded-full bg-white text-black shadow flex items-center justify-center right-0 top-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                >
                  <BsEye size={20} />
                </button>
              </div>
              <p className="font-semibold line-clamp-2 mt-2">{p.namePro}</p>
              <p className="font-bold text-pink-600">
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
