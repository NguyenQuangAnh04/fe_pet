import { useEffect, useState } from "react";
import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import type { ProductDTO } from "../types/product";

type ProductCard = {
  isOpen: boolean;
  onClose: () => void;
  initalData: ProductDTO;
};
const ProductCard: React.FC<ProductCard> = ({
  isOpen,
  onClose,
  initalData,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  const sizes = ["400g", "1kg", "2kg", "3kg"];
  const [selectSize, setSelectSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 mt-16 shadow">
      <div className="max-w-4xl w-full bg-white relative shadow rounded ">
        <div
          className=" absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          <BiX size={20} />
        </div>
        <div className="flex justify-between p-6 gap-4">
          <div className="flex flex-col items-center w-3/5">
            <img src={initalData.img} alt="" className="w-[400px] h-[400px]" />
            <div className="flex gap-2 mt-2">
              <img
                src="https://paddy.vn/cdn/shop/products/thuc-an-hat-meo-con-royal-canin-kitten-36-paddy-1.jpg?v=1737351672"
                alt=""
                className="w-[70px] h-[70px]"
              />
              <img
                src="https://paddy.vn/cdn/shop/products/thuc-an-hat-meo-con-royal-canin-kitten-36-paddy-1.jpg?v=1737351672"
                alt=""
                className="w-[70px] h-[70px]"
              />
              <img
                src="https://paddy.vn/cdn/shop/products/thuc-an-hat-meo-con-royal-canin-kitten-36-paddy-1.jpg?v=1737351672"
                alt=""
                className="w-[70px] h-[70px]"
              />
              <img
                src="https://paddy.vn/cdn/shop/products/thuc-an-hat-meo-con-royal-canin-kitten-36-paddy-1.jpg?v=1737351672"
                alt=""
                className="w-[70px] h-[70px]"
              />
              <img
                src="https://paddy.vn/cdn/shop/products/thuc-an-hat-meo-con-royal-canin-kitten-36-paddy-1.jpg?v=1737351672"
                alt=""
                className="w-[70px] h-[70px]"
              />
            </div>
          </div>
          <div className="flex flex-col w-2/5">
            <h3 className="font-semibold text-xl">{initalData.name}</h3>
            <div className="mt-10">
              <p>Thương hiệu: Royal Canin</p>
              <p>Kho hàng: Còn hàng</p>
              <p>Loại sản phầm: Thức ăn khô</p>
            </div>
            <p className="text-red-600 font-semibold mt-5">
              {initalData.price.toLocaleString("vi-VN")}₫
            </p>

            <div className="mt-5">
              <p>Size: {sizes[selectSize]}</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((size, i) => (
                  <span
                    onClick={() => setSelectSize(i)}
                    className={` px-2 py-2 cursor-pointer ${
                      selectSize === i ? "border border-amber-600" : "border"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-5">Số lượng:</p>
            <div className="relative w-[100px] rounded mt-1">
              <button className="absolute top-2 left-2">
                <BiPlus onClick={() => setQuantity(quantity + 1)} />
              </button>
              <input
                type="number"
                name=""
                id=""
                value={quantity}
                readOnly
                defaultValue={1}
                className="w-[100px] border border-gray-400 px-2 py-1 text-center"
              />
              <button className="absolute top-2 right-2">
                <button disabled={quantity === 1}>
                  {" "}
                  <BiMinus
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  />
                </button>
              </button>
            </div>
            <p className="mt-2">
              Tổng tiền :{" "}
              <span>
                {(initalData.price * quantity).toLocaleString("vi-VN")}₫
              </span>
            </p>
            <button className="bg-[#f5cb8d] px-2 py-2 text-center text-white rounded hover:bg-[#f3d8b0] transform duration-300  overflow-hidden mt-3">
              Thêm vào giỏ hàng
            </button>
            <button className="bg-[#f5cb8d] px-2 py-2 text-center text-white rounded hover:bg-[#f3d8b0] transform duration-300  overflow-hidden mt-3">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
