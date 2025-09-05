import { useState } from "react";
import { BiPackage, BiPhone, BiUser } from "react-icons/bi";
import { BsClock, BsCheckCircle, BsEye, BsTrash } from "react-icons/bs";
import { FaMoneyBillWave, FaTruck, FaEnvelope, FaDog } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { AppointStatus, type AppointmentDTO } from "../../../types/appointment";
import {
  useDeleteAppointment,
  useQueryAppoint,
  useUpdateAppointment
} from "../../../hook/appointment/useAppointment";
import { useQueryAppointCountStatus, useQueryAppointTotalRevenue } from "../../../hook/dashboard/useStatistics"
import { formatPrice } from "../../../utils/format";
import ModalAppoint from "./ModalAppointment";

export default function Appointment() {
  const [ownerName, setOwnerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [vetName, setVetName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const { data: countStatus } = useQueryAppointCountStatus();
  const { data: totalRevenue } = useQueryAppointTotalRevenue();
  const [searchParams, setSearchParams] = useState({
    ownerName: "",
    phoneNumber: "",
    email: "",
    petName: "",
    vetName: "",
    status: "",
  });
  const { mutateAsync: mutateDeleteOrder } = useDeleteAppointment();
  const handleDelete = (id: number) => {
    return mutateDeleteOrder(id);
  };
  const getStatusColor = (status: AppointStatus) => {
    const color: Record<AppointStatus, string> = {
      [AppointStatus.ALL]: "",
      [AppointStatus.PENDING]: "text-yellow-700 bg-yellow-200",
      [AppointStatus.CONFIRMED]: "text-blue-700  bg-blue-200",
      [AppointStatus.COMPLETED]: "text-emerald-700 bg-emerald-200",
      [AppointStatus.CANCELED]: "text-red-700 bg-red-200",
    };
    return color[status];
  };

  const getStatusLabel = (status: AppointStatus) => {
    const label: Record<AppointStatus, string> = {
      [AppointStatus.ALL]: "",
      [AppointStatus.PENDING]: "Đang xử lý",
      [AppointStatus.CONFIRMED]: "Đã xác nhận",
      [AppointStatus.COMPLETED]: "Hoàn thành",
      [AppointStatus.CANCELED]: "Đã hủy",
    };
    return label[status];
  };

  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDTO>();
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const { mutateAsync: mutateUpdateAppointment } = useUpdateAppointment();
  const { data} = useQueryAppoint({page});

  const handleSearch = () => {
    setSearchParams({
      ownerName: ownerName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      petName: petName.trim(),
      vetName: vetName.trim(),
      status: status.trim(),
  
    });
  };

  const handleClearSearch = () => {
    setOwnerName("");
    setPhoneNumber("");
    setEmail("");
    setPetName("");
    setVetName("");
    setStatus("");
    setSearchParams({
      ownerName: "",
      phoneNumber: "",
      email: "",
      petName: "",
      vetName: "",
      status: "",
      page: 0,
    });
  };
  console.log(data);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold">Quản lý Lịch khám</h1>
      <p className="text-gray-600 text-[15px]">
        Theo dõi và quản lý tất cả lịch khám
      </p>
      <div className="grid grid-cols-4 mt-4 gap-4">
        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Tổng lịch khám</h1>
            <p className="text-gray-400 text-sm">{data?.content.length}</p>
          </div>
          <BiPackage size={30} className="text-blue-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đang xử lý</h1>
            <p className="text-gray-400 text-sm">{countStatus?.find(([status]) => status === "PENDING")?.[1] ?? 0}</p>
          </div>
          <BsClock size={30} className="text-yellow-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đã xác nhận</h1>
            <p className="text-gray-400 text-sm">{countStatus?.find(([status]) => status === "CONFIRMED")?.[1] ?? 0}</p>
          </div>
          <FaTruck size={30} className="text-purple-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đã hoàn thành</h1>
            <p className="text-gray-400 text-sm">{countStatus?.find(([status]) => status === "COMPLETED")?.[1] ?? 0}</p>
          </div>
          <BsCheckCircle size={30} className="text-green-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Đã hủy</h1>
            <p className="text-gray-400 text-sm">{countStatus?.find(([status]) => status === "CANCELED")?.[1] ?? 0}</p>
          </div>
          <MdCancel size={30} className="text-red-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-4 py-2">
          <div>
            <h1 className="font-medium">Doanh thu</h1>
            <p className="text-sm text-green-400 font-semibold">
              {totalRevenue?.toLocaleString("vi-VN") ?? 0} VNĐ
            </p>
          </div>
          <FaMoneyBillWave size={30} className="text-green-500" />
        </div>
      </div>
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Tìm kiếm
        </h2>
        <form className="mt-4 flex gap-4">
          <div className="relative">
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Tên khách hàng"
              className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm w-50"
            />
            <BiUser
              size={25}
              className="absolute top-[9px]  left-1 text-gray-400 "
            />
          </div>

          <div className="relative ">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm w-50"
            />
            <BiPhone
              size={25}
              className="absolute top-[9px]  left-1 text-gray-400 "
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id=""
              placeholder="  Tìm kiếm theo email"
              className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm w-50"
            />
            <FaEnvelope
              size={25}
              className="absolute top-[9px]  left-1 text-gray-400 "
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder=" Tên thú cưng"
              className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm w-50"
            />
            <FaDog
              size={25}
              className="absolute top-[9px]  left-1 text-gray-400 "
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={vetName}
              onChange={(e) => setVetName(e.target.value)}
              placeholder="Tên bác sĩ"
              className="border border-gray-300 rounded-lg pl-8 py-2 placeholder:text-sm w-50"
            />
            <BiUser
              size={25}
              className="absolute top-[9px]  left-1 text-gray-400 "
            />
          </div>

          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus:ring-0 focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-50"
            >
              <option value="">Tất cả trạng thái</option>
              {Object.values(AppointStatus)
                .filter((i) => i !== "")
                .map((it) => (
                  <option key={it} className="bg-white text-black" value={it}>
                    {getStatusLabel(it)}
                  </option>
                ))}

            </select>
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center border border-gray-300  rounded-lg px-3 py-2 bg-blue-500 text-white"
          >
            <FiFilter size={25} />
            Lọc
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            className="flex items-center justify-center border border-gray-300  rounded-lg px-3 py-2 bg-blue-500 text-white"
          >
            Xoá lọc
          </button>
        </form>
      </div>
      <div className="mt-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 border-b border-b-gray-200">
            <tr className="">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Mã lịch khám
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Thời gian khám
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.content.map((item) => (
              <tr key={item.id} className="shadown border-b border-b-gray-200 hover:bg-gray-50">
                <td className="text-left px-6 py-3">#{item.id}</td>
                <td className="text-left px-6 py-3 flex flex-col">
                  {item.ownerName}{" "}
                  <span className="text-[12px] text-gray-400">
                    {item.phoneNumber}
                  </span>
                </td>

                <td className="text-left px-6 py-3 text-sm">
                  {item.examination?.length}{" "}
                  <span className="">Dịch vụ</span>
                </td>
                <td className="text-left px-6 py-3 text-sm font-semibold">
                  {item.totalPrice && formatPrice(item.totalPrice)}
                </td>
                <td className="text-left px-6 py-3">
                  <select
                    value={item.appointStatus}
                    onChange={(e) =>
                      mutateUpdateAppointment({
                        id: item.id,
                        appointment: { appointStatus: e.target.value as AppointStatus },
                      })
                    }
                    className={`rounded-xl px-3 inline-flex text-sm focus:ring-0 focus:outline-none cursor-pointer 
                      ${item.appointStatus ? getStatusColor(item.appointStatus) : ""}`}
                  >
                    <option value={item.age} className="bg-white text-black">
                      {item.appointStatus && getStatusLabel(item.appointStatus)}
                    </option>
                    {Object.values(AppointStatus)
                      .filter((i) => i !== item.appointStatus && i !== "")
                      .map((it) => (
                        <option className="bg-white text-black" value={it}>
                          {getStatusLabel(it)}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="text-left px-6 py-3">
                  {item.appointmentTime}
                  -
                  {item.appointmentDay
                    ? new Date(item.appointmentDay).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td className="text-left px-6 py-3">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td className="px-6 py-3  text-left text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAppointment(item);
                        setShowModalAppointment(true);
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
              className={`w-7 h-7 rounded shadow ${page === index
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

      {showModalAppointment && (
        <ModalAppoint
          initialData={selectedAppointment}
          onClose={() => setShowModalAppointment(false)}
        />
      )}
    </div>
  );
}
