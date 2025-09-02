import { useState, useEffect } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
    useQueryVeterinarian,
    deleteVeterinarian,
} from "../../../hook/veterinarian/useVeterinarian"
import VetModal from "./ModalVet";
import type { VeterinarianDTO } from "../../../types/veterinarian";

export default function Veterinarian() {
    const [page, setPage] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [searchParams, setSearchParams] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        page,
    });
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const { data, isLoading, error } = useQueryVeterinarian(searchParams);
    const { mutateAsync: mutateDeleteVet } = deleteVeterinarian();
    const [selectedVet, setSelectedVet] = useState<VeterinarianDTO>();

    useEffect(() => {
        setSearchParams((prev) => ({ ...prev, page }));
    }, [page]);

    const handleDelete = async (id: number) => {
        await mutateDeleteVet(id);
    };

    const handleSearch = () => {
        setSearchParams({
            name: name.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            page: 0,
        });
    };

    const handleClearSearch = () => {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setSearchParams({
            name: "",
            email: "",
            phoneNumber: "",
            page: 0,
        });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between ">
                <h1 className="text-2xl font-semibold">Quản lý bác sĩ</h1>

                <button
                    className="bg-blue-500 text-white px-2 py-2 rounded"
                    onClick={() => setShowModalCreate(true)}
                >
                    + Thêm bác sĩ
                </button>
            </div>
            <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Tìm kiếm Bác sĩ
                </h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tên bác sĩ"
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Số điện thoại"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Tìm kiếm
                    </button>
                    <button
                        onClick={handleClearSearch}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        Xóa tìm kiếm
                    </button>
                </div>
            </div>

            {/* Loading and Error States */}
            {isLoading && <p className="text-center text-gray-600">Đang tải...</p>}
            {error && (
                <p className="text-center text-red-500">Lỗi: {error.message}</p>
            )}

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="px-4 py-5 text-left">ID</th>
                            <th className="px-4 py-5 text-left">Tên</th>
                            <th className="px-4 py-5 text-left">Email</th>
                            <th className="px-4 py-5 text-left">Sdt</th>
                            <th className="px-4 py-5 text-left">Ngày thêm</th>
                            <th className="px-4 py-5 text-left">Ngày sửa</th>
                            <th className="px-4 py-5 text-left">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data?.content && data.content.length > 0 ? (
                            data.content.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="px-4 py-2 text-sm">{item.id}</td>
                                    <td className="px-4 py-2 text-sm">{item.name}</td>
                                    <td className="px-4 py-2 text-sm">{item.email}</td>
                                    <td className="px-4 py-2 text-sm">{item.phoneNumber}</td>
                                    <td className="px-6 py-4">
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.updatedAt
                                            ? new Date(item.updatedAt).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">

                                            <button className="text-green-600 hover:text-green-800 transition duration-150"
                                                onClick={() => {
                                                    setEditShowModal(true);
                                                    setSelectedVet(item);
                                                }}>
                                                <BiEdit size={20} />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 transition duration-150"
                                                onClick={() => handleDelete(item.id as number)}
                                            >
                                                <BiTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModalCreate && (
                <VetModal
                    mode="create"
                    onClose={() => setShowModalCreate(false)}
                />
            )}

            {showEditModal && (
                <VetModal
                    mode="update"
                    onClose={() => setEditShowModal(false)}
                    initialData={selectedVet}>
                </VetModal>
            )}

            {data && data.totalPages > 0 && (
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className={`w-[30px] h-[30px] rounded border ${page === 0
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
                  ${page === i
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
                        className={`rounded border w-[30px] h-[30px] ${page === data.totalPages - 1
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