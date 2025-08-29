import { useState } from "react";
import { BiPackage, BiPhone, BiUser } from "react-icons/bi";
import { BsClock, BsCheckCircle, BsEye, BsTrash } from "react-icons/bs";
import { FaMoneyBillWave, FaTruck } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import {
  useDeleteOrder,
  useQueryOrder,
  useUpdateOrderAdmin,
} from "../../../hook/order/useOrder";
import { OrderStatus, type OrderDTO } from "../../../types/order";
import { formatPrice } from "../../../utils/format";
import ModalOrder from "./ModalOrder";

export default function Order() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [nameInput, setNameInput] = useState<string>("");
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>("");
  const [pageInput] = useState<number>(0);
  const { data } = useQueryOrder({ name, phoneNumber, status, page });
  const { mutateAsync: mutateDeleteOrder } = useDeleteOrder();
  const handleDelete = (id: number) => {
    return mutateDeleteOrder(id);
  };
  const getStatusColor = (status: OrderStatus) => {
    const color: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "",
      [OrderStatus.PENDING]: "text-yellow-700 bg-yellow-200",
      [OrderStatus.CONFIRMED]: "text-blue-700  bg-blue-200",
      [OrderStatus.SHIPPING]: "text-purple-700 bg-purple-200",
      [OrderStatus.COMPLETED]: "text-emerald-700 bg-emerald-200",
      [OrderStatus.CANCELED]: "text-red-700 bg-red-200",
    };
    return color[status];
  };

  const getStatusLabel = (status: OrderStatus) => {
    const label: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "",
      [OrderStatus.PENDING]: "Đang xử lý",
      [OrderStatus.CONFIRMED]: "Đã xác nhận",
      [OrderStatus.SHIPPING]: "Đang giao hàng",
      [OrderStatus.COMPLETED]: "Hoàn thành",
      [OrderStatus.CANCELED]: "Đã hủy",
    };
    return label[status];
  };

  const [selectedOrder, setSelectedOrder] = useState<OrderDTO>();
  const [showModalOrder, setShowModalOrder] = useState(false);
  const { mutateAsync: mutateUpdateOrder } = useUpdateOrderAdmin();
  const handleFilter = () => {
    setName(nameInput);
    setPhoneNumber(phoneNumberInput);
    setStatus(statusInput);
    setPage(pageInput);
  };
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>
      <p className="text-gray-600 text-[15px]">
        Theo dõi và quản lý tất cả đơn hàng của bạn
      </p>
      <div className="grid grid-cols-4 mt-4 gap-4">
        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Tổng đơn hàng</h1>
            <p className="text-gray-400 text-sm">{data?.content.length}</p>
          </div>
          <BiPackage size={30} className="text-blue-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đang xử lý</h1>
            <p className="text-gray-400 text-sm">5</p>
          </div>
          <BsClock size={30} className="text-yellow-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đang giao</h1>
            <p className="text-gray-400 text-sm">5</p>
          </div>
          <FaTruck size={30} className="text-purple-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đã giao</h1>
            <p className="text-gray-400 text-sm">5</p>
          </div>
          <BsCheckCircle size={30} className="text-green-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đã hủy</h1>
            <p className="text-gray-400 text-sm">5</p>
          </div>
          <MdCancel size={30} className="text-red-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Doanh thu</h1>
            <p className=" text-sm text-green-400 font-semibold">
              200.000.000 VNĐ
            </p>
          </div>
          <FaMoneyBillWave size={30} className="text-green-500" />
        </div>
      </div>
      <form className="mt-4 flex gap-4">
        <div className="relative">
          <input
            type="text"
            name=""
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            id=""
            placeholder="Tìm kiếm theo tên"
            className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm "
          />
          <BiUser
            size={25}
            className="absolute top-[9px]  left-1 text-gray-400 "
          />
        </div>

        <div className="relative ">
          <input
            type="tel"
            name=""
            id=""
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
            placeholder="Nhập số điện thoại"
            className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm "
          />
          <BiPhone
            size={25}
            className="absolute top-[9px]  left-1 text-gray-400 "
          />
        </div>

        <div>
          <select
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
            name=""
            id=""
            className="focus:ring-0 focus:outline-none border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Tất cả trạng thái</option>
            {Object.values(OrderStatus)
              .filter((intem) => intem !== "")
              .map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => handleFilter()}
          className="flex items-center justify-center border border-gray-300  rounded-lg px-3 py-2 bg-blue-500 text-white"
        >
          <FiFilter size={25} />
          Lọc
        </button>
      </form>
      <div className="mt-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 border-b border-b-gray-200">
            <tr className="">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Khách hàng
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Sản phẩm
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Thanh toán
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.content.map((item) => (
              <tr className="shadown  border-b border-b-gray-200 hover:bg-gray-50">
                <td className="text-left px-6 py-3">#{item.id}</td>
                <td className="text-left px-6 py-3 flex flex-col">
                  {item.fullName}{" "}
                  <span className="text-[12px] text-gray-400">
                    {item.phoneNumber}
                  </span>
                </td>

                <td className="text-left px-6 py-3 text-sm">
                  {item.orderDetailDTO?.length}{" "}
                  <span className="">sản phẩm</span>
                </td>
                <td className="text-left px-6 py-3 text-sm font-semibold">
                  {item.totalAmount && formatPrice(item.totalAmount)}
                </td>
                <td className="text-left px-6 py-3">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      mutateUpdateOrder({
                        orderId: item.id,
                        orderDTO: { status: e.target.value as OrderStatus },
                      })
                    }
                    className={`rounded-xl px-3 inline-flex text-sm focus:ring-0 focus:outline-none cursor-pointer 
                      ${item.status ? getStatusColor(item.status) : ""}`}
                  >
                    <option value={item.status} className="bg-white text-black">
                      {item.status && getStatusLabel(item.status)}
                    </option>
                    {Object.values(OrderStatus)
                      .filter((i) => i !== item.status && i !== "")
                      .map((it) => (
                        <option className="bg-white text-black" value={it}>
                          {getStatusLabel(it)}
                        </option>
                      ))}
                  </select>
                </td>

                <td className="text-left px-6 py-3">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td className="text-left px-6 py-3">{item.paymentMethod}</td>
                <td className="px-6 py-3  text-left text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedOrder(item);
                        setShowModalOrder(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    >
                      <BsEye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => item.id && handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    >
                      <BsTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && data?.content.length > 0 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-white text-black w-7 h-7 border border-gray-200 rounded "
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 0}
          >
            {" "}
            &lt;
          </button>
          {Array.from({ length: data?.totalPages }, (_, index) => (
            <button
              className={`w-7 h-7 rounded shadow ${
                page === index
                  ? "text-white bg-blue-500 flex items-center justify-center"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((page) => page + 1)}
            className="bg-white text-black w-7 h-7 border border-gray-200 rounded"
            disabled={page === data.totalPages - 1}
          >
            &gt;
          </button>
        </div>
      )}

      {showModalOrder && (
        <ModalOrder
          initialData={selectedOrder}
          onClose={() => setShowModalOrder(false)}
        />
      )}
    </div>
  );
}
