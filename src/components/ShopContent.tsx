import { useState } from "react";
import { BsEye } from "react-icons/bs";
import type { ProductDTO } from "../types/product";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 250000,
    img: "https://paddy.vn/cdn/shop/files/RoyalCaninBritishShorthairMeoAnhLongNgan.jpg?v=1694499644",
    img2: "https://paddy.vn/cdn/shop/files/2_af005783-383a-4e00-a403-68832cae3e34.jpg?v=1693241134",
  },
  {
    id: 2,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
    img2: "https://paddy.vn/cdn/shop/files/2_af005783-383a-4e00-a403-68832cae3e34.jpg?v=1693241134",
  },
  {
    id: 3,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
    img2: "https://paddy.vn/cdn/shop/files/2_af005783-383a-4e00-a403-68832cae3e34.jpg?v=1693241134",
  },
  {
    id: 4,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
    img2: "https://paddy.vn/cdn/shop/files/2_af005783-383a-4e00-a403-68832cae3e34.jpg?v=1693241134",
  },
  {
    id: 5,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
  {
    id: 1,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
  {
    id: 2,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
  {
    id: 3,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
  {
    id: 4,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
  {
    id: 5,
    name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
    price: 120000,
    img: "https://paddy.vn/cdn/shop/files/thuc-an-cho-meo-royal-canin-indoor.jpg?v=1724921575",
  },
];

const ShopContent = () => {
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();
  return (
    <div className=" py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((p) => (
            <div key={p.id} className=" rounded-xl p-4  cursor-pointer ">
              <div className="relative group">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-[250px] h-[250px] object-cover rounded-lg"
                />
                {p.img2 && (
                  <img
                    src={p.img2}
                    alt=""
                    className="w-[250px] h-[250px] object-cover rounded-lg absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
                <button className="absolute border border-gray-400 rounded-xl px-2 py-2 bg-white bottom-0 left-0 right-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Thêm vào giỏ hàng
                </button>
                <button className="absolute w-8 h-8 rounded-full bg-white text-black shadow flex items-center justify-center right-0 top-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <button
                    onClick={() => {
                      setShowModalProductCart(true);
                      setSelectedProduct(p);
                    }}
                  >
                    <BsEye size={20} />
                  </button>
                </button>
              </div>
              <h3 className="mt-3 font-semibold line-clamp-2">{p.name}</h3>
              <p className="text-pink-600 font-bold">
                {p.price.toLocaleString("vn-VN")}₫
              </p>
            </div>
          ))}
        </div>
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

export default ShopContent;
