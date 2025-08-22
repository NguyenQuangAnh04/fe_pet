import { useQueryUser } from "../../hook/user/useUser";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

export default function User() {

const { data } = useQueryUser();
    return (
        <div className="p-4">
            <div className="flex justify-between ">
                <h1 className="text-2xl font-semibold">Quản lý User</h1>

                <button
                    className="bg-blue-500 text-white px-2 py-2 rounded"

                >
                    + Thêm User
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
                        <th className="px-4 py-2 text-left">UserName</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Sdt</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Ngày thêm</th>
                        <th className="px-4 py-2 text-left">Ngày sửa</th>
                        <th className="px-4 py-2 text-left">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr>
                            <td className="px-4 py-2">{item.id}</td>
                            <td className="px-4 py-2">{item.userName}</td>
                            <td className="px-4 py-2">{item.email}</td>
                            <td className="px-4 py-2">{item.phoneNumber}</td>
                            <td className="px-4 py-2">{item.roleName}</td>
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

                                        }}
                                    >
                                        <BiEdit size={18} />
                                    </button>
                                    <button className="text-red-500" >
                                        <BiTrash size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}