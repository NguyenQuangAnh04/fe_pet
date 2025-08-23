import { useState } from "react";
import { useQueryUser, roleQuery, userUpdateRoleUser, useDeleteUser } from "../../hook/user/useUser";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import type { Role } from "../../types/user";

export default function User() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [searchParams, setSearchParams] = useState({
        name: undefined,
        email: undefined,
        phoneNumber: undefined,
    });

    const { data, isLoading, error } = useQueryUser(searchParams);
    const { data: roleData } = roleQuery();
    const { mutate: mutateUpdateRoleUser } = userUpdateRoleUser();
    const { mutateAsync: mutateDeleteUser } = useDeleteUser();

    const handleDelete = async (id: number) => {
        await mutateDeleteUser(id);
    };

    const handleSearch = () => {
        setSearchParams({
            name: name.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
        });
    };

    const handleClearSearch = () => {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setSearchParams({});
    };

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý User</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2">
                    <span>+</span> Thêm User
                </button>
            </div>

            {/* Search Section */}
            <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Tìm kiếm User</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tên người dùng"
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
            {error && <p className="text-center text-red-500">Lỗi: {error.message}</p>}

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">UserName</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Sdt</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Ngày thêm</th>
                            <th className="px-6 py-3 text-left">Ngày sửa</th>
                            <th className="px-6 py-3 text-left">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data?.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.userName}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.phoneNumber}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={item.role?.id}
                                        className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) =>
                                            mutateUpdateRoleUser({
                                                id: item.id,
                                                userUpdateRole: { role: { id: Number(e.target.value) } },
                                            })
                                        }
                                    >
                                        {roleData?.map((role: Role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
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
                                        <button className="text-blue-600 hover:text-blue-800 transition duration-150">
                                            <BsEye size={20} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 transition duration-150">
                                            <BiEdit size={20} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 transition duration-150"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <BiTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}