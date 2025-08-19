import React, { useEffect, useState } from "react";
import { BiUpload, BiX } from "react-icons/bi";
import type { ProductDTO2 } from "../../types/product";
import { useAddProduct, useUpdateProduct } from "../../hook/product/useProduct";
type ModalProduct = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: ProductDTO2;
};
const ModalProduct: React.FC<ModalProduct> = ({
  isOpen,
  onClose,
  mode,
  initialData,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      setPreviewImages((prev) => [
        ...prev,
        ...files.map((item) => URL.createObjectURL(item)),
      ]);
    }
  };
  const { mutateAsync: mutateAddProduct } = useAddProduct();
  const { mutateAsync: mutateUpdateProduct } = useUpdateProduct();

  useEffect(() => {
    if (mode === "update" && initialData) {
      setFormData(initialData);
      if (initialData.imagesDTO.length > 0 && initialData) {
        setPreviewImages(initialData.imagesDTO.map((item) => item.imageUrl));
      }
    }
  }, [mode, initialData]);
  const [formData, setFormData] = useState<ProductDTO2>({
    id: 0,
    namePro: "",
    imageUrl: "",
    description: "",
    price: 0,
    imagesDTO: [],
  });

  const handleSubmit = async () => {
    const cateId = 1;
    mode === "create"
      ? await mutateAddProduct({ cateId, productDTO: formData, images })
      : await mutateUpdateProduct({
          cateId: formData.id,
          productDTO: formData,
          images,
        });
    onClose();
  };
  const handleChangeInput = (field: keyof ProductDTO2, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 ">
      <div className=" max-w-lg w-full bg-white  shadow z-10 p-6">
        <div className="flex justify-between items-center">
          <h2>{mode ==='create' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}</h2>
          <button className="" onClick={onClose}>
            <BiX size={40} />
          </button>
        </div>
        <div>
          <div className="flex flex-col mt-5 space-y-2">
            <label htmlFor="">Tên sản phẩm</label>
            <input
              type="text"
              value={formData.namePro}
              onChange={(e) => handleChangeInput("namePro", e.target.value)}
              className="border border-gray-400 px-2 py-1 w-full rounded"
              placeholder="Nhập tên sản phẩm"
              name=""
              id=""
            />
          </div>

          <div className="flex flex-col mt-5 space-y-2">
            <label htmlFor="">Giá sản phẩm</label>
            <input
              type="text"
              className="border border-gray-400 px-2 py-1 w-full rounded"
              placeholder="Nhập giá sản phẩm"
              value={formData.price}
              onChange={(e) => handleChangeInput("price", e.target.value)}
              name=""
              id=""
            />
          </div>

          <div className="flex flex-col mt-5 space-y-2">
            <label htmlFor="">Mô tả sản phẩm</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChangeInput("description", e.target.value)}
              className="border border-gray-400 px-2 py-1 w-full rounded"
              placeholder="Nhập mô tả sản phẩm"
              name=""
              id=""
            />
          </div>
          <select
            name=""
            className="px-2 py-1 rounded border border-gray-400 focus:ring-0 focus:outline-none mt-4"
            id=""
          >
            <option value="">Tất cả danh mục</option>
            <option value="">1</option>
          </select>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="px-2 py-1 text-gray-400 text-4xl rounded flex items-center justify-center cursor-pointer"
            >
              <BiUpload />
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              name="image"
              id="image"
            />
            <p className="text-center text-gray-400 ">Chọn ảnh</p>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {previewImages.map((file, index) => (
                <img className="w-20 h-20" src={file} key={index} alt="" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 px-4 py-2 text-white rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 text-white rounded"
            >
              {mode === 'create' ? 'Thêm' : 'Cập nhật'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
