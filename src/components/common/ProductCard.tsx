import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus, BiX } from "react-icons/bi";
import { useAddCart } from "../../hook/carts/useCart";
import type { CartDTOItem } from "../../types/cart";
import type { ProductDTO } from "../../types/product";
import type { VariantDTO } from "../../types/variant";
import { formatPrice } from "../../utils/format";

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
  const [sizes, setSizes] = useState(0);
  const [selectSize, setSelectSize] = useState<VariantDTO>();

  const [selectedImage, setSelectedImage] = useState(0);
  const { mutateAsync: useMutationAddCart } = useAddCart();
  const [formData, setFormData] = useState<CartDTOItem>({
    productId: initalData.id,
    quantity: 1,
  });
  const addToCart = async () => {
    const cartItem: CartDTOItem = {
      productId: initalData?.id,
      quantity: formData?.quantity,
      size: selectSize?.size,
    };
    console.log(cartItem);
    return await useMutationAddCart(cartItem);
  };
  useEffect(() => {
    if (initalData?.variants && initalData.variants.length > 0) {
      setSizes(0);
      setSelectSize(initalData.variants[0]);
    } else {
      setSelectSize(undefined);
    }
  }, [initalData]);
  const handleChangeQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setFormData((prev) => ({ ...prev, quantity: newQuantity }));
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 mt-16 ">
      <div className="max-w-4xl w-full bg-white relative shadow-lg border border-gray-300 rounded ">
        <div
          className=" absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          <BiX size={20} />
        </div>
        <div className="flex justify-between p-6 gap-4">
          <div className="flex flex-col items-center w-3/5">
            <div className="w-[400px] h-[400px] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage} // phải có key để trigger animation khi đổi ảnh
                  src={initalData.imagesDTO[selectedImage].imageUrl}
                  alt=""
                  className="absolute w-full h-full object-cover rounded-xl shadow"
                  initial={{ x: 300, opacity: 0 }} // ảnh mới xuất hiện từ bên phải
                  animate={{ x: 0, opacity: 1 }} // trượt vào giữa
                  exit={{ x: -300, opacity: 0 }} // ảnh cũ trượt sang trái
                  transition={{ duration: 0.1 }}
                />
              </AnimatePresence>
            </div>
            <div className="flex gap-2 mt-2">
              {initalData.imagesDTO.map((item, i) => (
                <img
                  src={item.imageUrl}
                  alt=""
                  onClick={() => setSelectedImage(i)}
                  className={`w-[70px] h-[70px] cursor-pointer ${selectedImage === i ? "border" : ""
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-2/5">
            <h3 className="font-semibold text-xl">{initalData.namePro}</h3>
            <div className="mt-10">
              <p>Thương hiệu: Royal Canin</p>
              <p>Kho hàng: Còn hàng</p>
              <p>Loại sản phầm: Thức ăn khô</p>
            </div>
            <p className="text-red-600 font-semibold mt-5">
              {initalData.variants &&
                initalData.variants[sizes].price !== undefined &&
                formatPrice(initalData.variants[sizes].price)}
            </p>

            <div className="mt-5">
              <p>
                Size: {initalData.variants && initalData.variants[sizes].size}
              </p>
              <div className="flex gap-2 mt-2">
                {initalData.variants &&
                  initalData.variants.map((size, i) => (
                    <span
                      onClick={() => {
                        setSizes(i);
                        setSelectSize(size);
                      }}
                      className={` px-2 py-2 cursor-pointer ${sizes === i ? "border border-amber-600" : "border"
                        }`}
                    >
                      {size.size}
                    </span>
                  ))}
              </div>
            </div>
            <p className="mt-5">Số lượng:</p>
            <div className="relative w-[100px] rounded mt-1">
              <button className="absolute top-2 left-2">
                <BiPlus
                  onClick={() => handleChangeQuantity(formData.quantity! + 1)}
                />
              </button>
              <input
                type="number"
                name=""
                id=""
                value={formData?.quantity}
                readOnly
                className="w-[100px] border border-gray-400 px-2 py-1 text-center"
              />
              <button className="absolute top-2 right-2">
                <button disabled={formData.quantity === 1}>
                  {" "}
                  <BiMinus
                    onClick={() =>
                      handleChangeQuantity(
                        formData?.quantity! > 1 ? formData?.quantity! - 1 : 1
                      )
                    }
                  />
                </button>
              </button>
            </div>
            <p className="mt-2">
              Tổng tiền :{" "}
              <span>
                {initalData.variants &&
                  initalData.variants[sizes] !== undefined &&
                  initalData.variants[sizes].price !== undefined &&
                  formatPrice(
                    (initalData.variants[sizes]?.price ?? 0) * (formData?.quantity ?? 1)
                  )}
              </span>
            </p>
            <button
              onClick={() => addToCart()}
              className="bg-[#f5cb8d] px-2 py-2 text-center text-white rounded hover:bg-[#f3d8b0] transform duration-300  overflow-hidden mt-3"
            >
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
