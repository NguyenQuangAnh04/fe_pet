import {  useState } from "react";
import { BsEye } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useQueryAllProducts } from "../../hook/product/useProduct";
import type { ProductDTO } from "../../types/product";
// import { useAddCart } from "../../hook/carts/useCart";
// import type { CartDTOItem } from "../../types/cart";
import ProductCard from "../common/ProductCard";
import ViewAll from "../common/ViewAll";
import { formatPrice } from "../../utils/format";

const ShopContent = () => {
  const { data } = useQueryAllProducts();
  const [showModalProductCart, setShowModalProductCart] = useState(false);
  const [selectProduct, setSelectedProduct] = useState<ProductDTO>();
  // const { mutateAsync: useMutationAddCart } = useAddCart();

  // const addToCart = async (id: number) => {
  //   const cartDTOItem: CartDTOItem = {
  //     productId: id,
  //     quantity: 1,
  //   };
  //   return await useMutationAddCart(cartDTOItem);
  // };

  const navigate = useNavigate();
  return (
    <div className=" py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {data?.map((p) => (
            <div key={p.id} className=" rounded-xl p-4  cursor-pointer ">
              <div className="relative group">
                <img
                  src={p.imageUrl}
                  alt={p.namePro}
                  onClick={() => navigate(`product-details/${p.slug}`)}
                  className="w-[250px] h-[250px] object-cover rounded-lg"
                />
                {p.imagesDTO && (
                  <img
                    src={p.imagesDTO[1].imageUrl}
                    alt=""
                    onClick={() => navigate(`product-details/${p.slug}`)}
                    className="w-[250px] h-[250px] object-cover rounded-lg absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
                {/* <button
                  onClick={() => addToCart(p.id)}
                  className="absolute border border-gray-400 rounded-xl px-2 py-2 bg-white bottom-0 left-0 right-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                  Thêm vào giỏ hàng
                </button> */}
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
              <h3 className="mt-3 font-semibold line-clamp-2">{p.namePro}</h3>
              <p className="text-pink-600 font-bold">
                {p.price && formatPrice(p.price)}
              </p>
            </div>
          ))}
        </div>
        <ViewAll/>
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
