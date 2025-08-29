import React, { useState } from "react";
import {
  useDeleteCategory,
  useQueryCategory,
} from "../../../hook/category/useCategoty";
import { BiEdit, BiTrash, BiPlus, BiSearch } from "react-icons/bi";
import type { CategoriesDTO } from "../../../types/category";
import CategoryModal from "./ModalCategory";

export default function Category() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState<string>("");
  const { data } = useQueryCategory({ page, name });
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesDTO>();
  const { mutateAsync: mutateDeleteCategory } = useDeleteCategory();
  const handleDeleteCategory = async (id: number) => {
    await mutateDeleteCategory(id);
  };
  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Danh mục sản phẩm
            </h2>
          </div>
          <button
            onClick={() => setShowModalCreate(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <BiPlus size={20} />
            Thêm danh mục
          </button>
        </div>

        <div className="mt-6">
          <div className="relative max-w-md">
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left   px-6 py-4 font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Tên danh mục
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Ảnh
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Mô tả
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Ngày tạo
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Ngày cập nhật
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.content && data.content.length > 0 ? (
                data.content.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        #{item.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {item.nameCate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-[70px] h-[70px]"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p
                        className="text-sm text-gray-600 "
                        title={item.description}
                      >
                        {item.description || "Chưa có mô tả"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.updatedAt
                          ? new Date(item.updatedAt).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-green-600 hover:text-green-800 hover:bg-blue-50 p-2 rounded-full transition-all duration-200"
                          title="Chỉnh sửa"
                        >
                          <BiEdit
                            onClick={() => {
                              setSelectedCategory(item);
                              setShowModalUpdate(true);
                            }}
                            size={18}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(item.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                          title="Xóa"
                        >
                          <BiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <div className="text-lg font-medium mb-2">
                        Không có dữ liệu
                      </div>
                      <p className="text-sm">Chưa có danh mục nào được tạo</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModalCreate && (
        <CategoryModal
          mode="create"
          onClose={() => setShowModalCreate(false)}
        />
      )}

      {showModalUpdate && (
        <CategoryModal
          mode="update"
          onClose={() => setShowModalUpdate(false)}
          initialData={selectedCategory}
        />
      )}
      {data && data.content.length > 0 && (
        <div className="flex justify-end mt-4 gap-2">
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

          {Array.from({ length: data.totalPages }, (_, i) => (
            <button
              onClick={() => setPage(i)}
              className={`rounded w-[30px] h-[30px] flex items-center justify-center
          ${
            page === i
              ? "bg-blue-600 text-white"
              : " text-black shadow border border-gray-300 "
          }
        `}
              key={i}
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
  );
}
