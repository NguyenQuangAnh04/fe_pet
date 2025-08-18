import React from "react";
import { BiX } from "react-icons/bi";
type ModalProduct = {
  isOpen: boolean;
  onClose: () => void;
};
const ModalProduct: React.FC<ModalProduct> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pl-5">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="relative mx-auto max-w-5xl bg-white w-full shadow z-10">
        <div className=" flex justify-end">
          <button className="" onClick={onClose}>
            <BiX />
          </button>
        </div>
        <div className="flex flex-col items-center">
              <h1>Thêm sản phẩm</h1>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
