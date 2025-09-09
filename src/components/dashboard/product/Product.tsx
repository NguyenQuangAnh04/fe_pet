import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

import ModalViewProduct from "./ModalViewProduct";
import {
  useDeleteProduct,
  useQueryProduct,
} from "../../../hook/product/useProduct";
import type { ProductDTO } from "../../../types/product";
import { formatPrice } from "../../../utils/format";
import ModalProduct from "./ModalProduct";
export type ProductResponse = {};
const Product = () => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState<string>("");
  const { data } = useQueryProduct({ page, name });
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [showModalViewProduct, setModalShowProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO>();
  const { mutateAsync: mutateDeleteProduct } = useDeleteProduct();
  const handleDelete = (id: number) => {
    mutateDeleteProduct(id);
  };
  return (
    <div className="p-4 ml-[250px]">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>

        <button
          className="bg-blue-500 text-white px-2 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Thêm sản phẩm
        </button>
      </div>
      <div className="mt-5">
        <p>Tìm kiếm</p>
        <input
          type="text"
          name=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          id=""
          className="border border-gray-300 rounded  px-3 py-1 "
          placeholder="Nhập từ khóa tìm kiếm"
        />
      </div>
      <table className="w-full mt-5 shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-gray-5  border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-4 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên sản phẩm</th>
            <th className="px-4 py-2 text-left">Ảnh</th>
            <th className="px-4 py-2 text-left">Giá</th>
            <th className="px-4 py-2 text-left">Số lượng</th>
            <th className="px-4 py-2 text-left">Ngày thêm</th>
            <th className="px-4 py-2 text-left">Ngày sửa</th>
            <th className="px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map((item) => (
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2 text-sm">{item.namePro}</td>
              <td className="px-4 py-2">
                <img src={item.imageUrl} alt="" className="w-12 h-12" />
              </td>
              <td className="px-4 py-2 font-medium text-sm">
                {formatPrice(item.price)}
              </td>
              <td className="px-4 py-2 font-medium text-sm">{item.sl}</td>

              <td className="px-4 py-2 text-sm">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-4 py-2 text-sm">
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button
                    className="text-yellow-500"
                    onClick={() => {
                      setModalShowProduct(true);
                      setSelectedProduct(item);
                    }}
                  >
                    <BsEye size={18} />
                  </button>
                  <button
                    className="text-green-500"
                    onClick={() => {
                      setSelectedProduct(item);
                      setEditShowModal(true);
                    }}
                  >
                    <BiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item.id)}
                  >
                    <BiTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedProduct && (
        <ModalProduct
          mode="create"
          initialData={selectedProduct}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEditModal && selectedProduct && (
        <ModalProduct
          mode="update"
          initialData={selectedProduct}
          isOpen={showEditModal}
          onClose={() => setEditShowModal(false)}
        />
      )}
      {showModalViewProduct && selectedProduct && (
        <ModalViewProduct
          onClose={() => setModalShowProduct(false)}
          initialData={selectedProduct}
        />
      )}
      <div className="flex justify-end mt-4">
        {data && data.content.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className={`w-[30px] h-[30px] rounded border ${
                page === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-400 text-white"
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: data?.totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`shadow w-[30px] h-[30px] text-black rounded ${
                  page === i ? "bg-blue-400 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, data.totalPages - 1))
              }
              disabled={page === data.totalPages - 1}
              className={` rounded border w-[30px] h-[30px] ${
                page === data.totalPages - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-400 text-white"
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
