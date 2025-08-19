import { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import {
  useDeleteProduct,
  useQueryProduct,
} from "../../hook/product/useProduct";
import ModalProduct from "./ModalProduct";
import type { ProductDTO2 } from "../../types/product";
export type ProductResponse = {
  
}
const Product = () => {
  const { data } = useQueryProduct();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO2>();
  const { mutateAsync: mutateDeleteProduct } = useDeleteProduct();
  const handleDelete = (id: number) => {
    mutateDeleteProduct(id);
  };
  return (
    <div className="p-4">
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
        <p>Nhập từ khóa tìm kiếm</p>
        <input
          type="text"
          name=""
          id=""
          className="border border-gray-400 rounded  px-3 py-1 "
          placeholder="Nhập từ khóa tìm kiếm"
        />
      </div>
      <table className="w-full mt-5 shadow rounded">
        <thead className=" border-b">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên sản phẩm</th>
            <th className="px-4 py-2 text-left">Ảnh</th>
            <th className="px-4 py-2 text-left">Giá</th>
            <th className="px-4 py-2 text-left">Ngày thêm</th>
            <th className="px-4 py-2 text-left">Ngày sửa</th>
            <th className="px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr>
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.namePro}</td>
              <td className="px-4 py-2">
                <img src={item.imageUrl} alt="" className="w-10 h-10" />
              </td>
              <td className="px-4 py-2">{item.price}</td>

              <td className="px-4 py-2">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-4 py-2">
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button className="text-yellow-500">
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
                  <button className="text-red-500" onClick={() => handleDelete(item.id)}>
                    <BiTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalProduct
          mode="create"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEditModal && (
        <ModalProduct
          mode="update"
          initialData={selectedProduct}
          isOpen={showEditModal}
          onClose={() => setEditShowModal(false)}
        />
      )}
    </div>
  );
};

export default Product;
