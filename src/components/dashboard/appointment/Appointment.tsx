import { useState } from "react";
import { BiPackage, BiPhone, BiUser } from "react-icons/bi";
import {
  BsCheckCircle,
  BsClock,
  BsEye,
  BsFileMedical,
  BsPlusSquare,
  BsTrash,
} from "react-icons/bs";
import { FaDog, FaEnvelope, FaMoneyBillWave, FaTruck } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import {
  useDeleteAppointment,
  useQueryAppoint,
  useUpdateAppointment,
} from "../../../hook/appointment/useAppointment";
import {
  useQueryAppointCountStatus,
  useQueryAppointTotalRevenue,
} from "../../../hook/dashboard/useStatistics";
import { AppointStatus, type AppointmentDTO } from "../../../types/appointment";
import { formatPrice } from "../../../utils/format";
import ModalAppoint from "./ModalAppointment";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axiosClient";
import ModalExamSpecial from "./ModalExamSpecial";

export default function Appointment() {
  const [ownerName, setOwnerName] = useState<string>("");
  const { user } = useAuth();
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

  const downloadInvoice = async (id: number) => {
    const response = await api.get(`/appointment/generateInvoice/${id}`, {
      responseType: "blob", // bắt buộc để nhận file
    });

    // Tạo URL từ Blob
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    // Tạo link ẩn và click để tải về
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
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
      [AppointStatus.CANCELLED]: "text-red-700 bg-red-200",
      [AppointStatus.IN_QUEUE]: "text-indigo-700 bg-indigo-200",
      [AppointStatus.IN_PROGRESS]: "text-purple-700 bg-purple-200",
    };
    return color[status];
  };

  const getStatusLabel = (status: AppointStatus) => {
    const label: Record<AppointStatus, string> = {
      [AppointStatus.ALL]: "",
      [AppointStatus.PENDING]: "Đang xử lý",
      [AppointStatus.CONFIRMED]: "Đã xác nhận",
      [AppointStatus.IN_QUEUE]: "Đang chờ",
      [AppointStatus.IN_PROGRESS]: "Đang tiến hành",
      [AppointStatus.COMPLETED]: "Hoàn thành",
      [AppointStatus.CANCELLED]: "Đã hủy",
    };
    return label[status];
  };

  const statusSequence: AppointStatus[] = [
    AppointStatus.PENDING,
    AppointStatus.CONFIRMED,
    AppointStatus.IN_QUEUE,
    AppointStatus.IN_PROGRESS,
    AppointStatus.COMPLETED,
  ];

  const getForwardStatusOptions = (currentStatus?: AppointStatus) => {
    const indexOf = (s: AppointStatus) => {
      const idx = statusSequence.indexOf(s);
      if (idx >= 0) return idx;
      if (s === AppointStatus.CANCELLED) return statusSequence.length; // treat CANCELLED as final
      return -1;
    };

    if (!currentStatus) {
      return [...statusSequence, AppointStatus.CANCELLED];
    }

    if (currentStatus === AppointStatus.CANCELLED) return [];

    const currentIndex = indexOf(currentStatus);

    const forwardForAll =
      currentIndex >= 0
        ? statusSequence.slice(currentIndex + 1).concat(AppointStatus.CANCELLED)
        : [...statusSequence, AppointStatus.CANCELLED];

    if (user?.nameRole === "USER") {
      const allowedForUser: AppointStatus[] = [
        AppointStatus.PENDING,
        AppointStatus.CONFIRMED,
        AppointStatus.IN_QUEUE,
        AppointStatus.CANCELLED,
      ];
      return forwardForAll.filter(
        (s) => allowedForUser.includes(s) && s !== currentStatus
      );
    }

    return forwardForAll.filter((s) => s !== currentStatus);
  };

  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDTO>();
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const { mutateAsync: mutateUpdateAppointment } = useUpdateAppointment();
  const { data } = useQueryAppoint({
    ownerName: ownerName,
    phoneNumber: phoneNumber,
    petName: petName,
    status: status,
    email: email,
    vetName: vetName,
    page,
  });

  // State cho modal exam special - lưu appointment được chọn thay vì boolean
  const [selectedAppointmentForExam, setSelectedAppointmentForExam] =
    useState<AppointmentDTO | null>(null);

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
  console.log(data);

  const handleClearSearch = () => {
    setOwnerName("");
    setPhoneNumber("");
    setEmail("");
    setPetName("");
    setVetName("");
    setStatus("");
    setPage(0);
    setSearchParams({
      ownerName: "",
      phoneNumber: "",
      email: "",
      petName: "",
      vetName: "",
      status: "",
    });
  };
  console.log(data);

  return (
    <div className="p-4 bg-gray-50 min-h-screen ml-[250px]">
      <h1 className="text-xl font-semibold">Quản lý Lịch khám</h1>
      <p className="text-gray-600 text-xs">
        Theo dõi và quản lý tất cả lịch khám
      </p>
      <div className="grid grid-cols-4 mt-3 gap-3">
        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Tổng lịch khám</h1>
            <p className="text-gray-400 text-sm">{data?.content.length}</p>
          </div>
          <BiPackage size={26} className="text-blue-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Đang xử lý</h1>
            <p className="text-gray-400 text-sm">
              {countStatus?.find(([status]) => status === "PENDING")?.[1] ?? 0}
            </p>
          </div>
          <BsClock size={26} className="text-yellow-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Đã xác nhận</h1>
            <p className="text-gray-400 text-sm">
              {countStatus?.find(([status]) => status === "CONFIRMED")?.[1] ??
                0}
            </p>
          </div>
          <FaTruck size={26} className="text-purple-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Đã hoàn thành</h1>
            <p className="text-gray-400 text-sm">
              {countStatus?.find(([status]) => status === "COMPLETED")?.[1] ??
                0}
            </p>
          </div>
          <BsCheckCircle size={26} className="text-green-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Đã hủy</h1>
            <p className="text-gray-400 text-sm">
              {countStatus?.find(([status]) => status === "CANCELED")?.[1] ?? 0}
            </p>
          </div>
          <MdCancel size={26} className="text-red-500" />
        </div>

        <div className="flex justify-between items-center shadow rounded-xl border border-gray-200 px-3 py-2.5">
          <div>
            <h1 className="font-medium text-sm">Doanh thu</h1>
            <p className="text-sm text-green-400 font-semibold">
              {totalRevenue?.toLocaleString("vi-VN") ?? 0} VNĐ
            </p>
          </div>
          <FaMoneyBillWave size={26} className="text-green-500" />
        </div>
      </div>
      <div className="mb-4 bg-white p-4 rounded-lg shadow-md mt-3">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Tìm kiếm</h2>
        <form className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Tên khách hàng"
              className="border border-gray-300 rounded-lg pl-8 py-1.5 placeholder:text-sm text-sm w-44"
            />
            <BiUser
              size={20}
              className="absolute top-[7px] left-1 text-gray-400"
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại"
              className="border border-gray-300 rounded-lg pl-8 py-1.5 placeholder:text-sm text-sm w-44"
            />
            <BiPhone
              size={20}
              className="absolute top-[7px] left-1 text-gray-400"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-300 rounded-lg pl-8 py-1.5 placeholder:text-sm text-sm w-44"
            />
            <FaEnvelope
              size={20}
              className="absolute top-[7px] left-1 text-gray-400"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Tên thú cưng"
              className="border border-gray-300 rounded-lg pl-8 py-1.5 placeholder:text-sm text-sm w-44"
            />
            <FaDog
              size={20}
              className="absolute top-[7px] left-1 text-gray-400"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={vetName}
              onChange={(e) => setVetName(e.target.value)}
              placeholder="Tên bác sĩ"
              className="border border-gray-300 rounded-lg pl-8 py-1.5 placeholder:text-sm text-sm w-44"
            />
            <BiUser
              size={20}
              className="absolute top-[7px] left-1 text-gray-400"
            />
          </div>

          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="focus:ring-0 focus:outline-none border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-44"
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
            className="flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-3 py-1.5 bg-blue-500 text-white text-sm"
          >
            <FiFilter size={18} />
            Lọc
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            className="flex items-center justify-center border border-gray-300 rounded-lg px-3 py-1.5 bg-gray-500 text-white text-sm"
          >
            Xoá lọc
          </button>
        </form>
      </div>
      <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 border-b border-b-gray-200">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Mã lịch
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Khách hàng
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Dịch vụ
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Tổng tiền
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Thời gian
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày đặt
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.content.map((item) => (
              <tr
                key={item.id}
                className="shadow border-b border-b-gray-200 hover:bg-gray-50"
              >
                <td className="text-left px-3 py-2.5 text-sm">#{item.id}</td>
                <td className="text-left px-3 py-2.5 flex flex-col text-sm">
                  {item.ownerName}{" "}
                  <span className="text-xs text-gray-400">
                    {item.phoneNumber}
                  </span>
                </td>

                <td className="text-left px-3 py-2.5 text-sm">
                  {item.examination?.length} <span>Dịch vụ</span>
                </td>
                <td className="text-left px-3 py-2.5 text-sm font-semibold">
                  {item.totalPrice && formatPrice(item.totalPrice)}
                </td>
                <td className="text-left px-3 py-2.5">
                  <select
                    value={item.appointStatus ?? ""}
                    onChange={(e) => {
                      const nextStatus = e.target.value as AppointStatus;
                      if (!nextStatus || nextStatus === item.appointStatus)
                        return;
                      mutateUpdateAppointment({
                        id: item.id,
                        appointment: {
                          appointStatus: nextStatus,
                        },
                      });
                    }}
                    className={`rounded-xl px-2.5 py-1 inline-flex text-xs focus:ring-0 focus:outline-none cursor-pointer 
                      ${
                        item.appointStatus
                          ? getStatusColor(item.appointStatus)
                          : ""
                      }`}
                  >
                    {item.appointStatus ? (
                      <option
                        value={item.appointStatus}
                        className="bg-white text-black"
                        disabled
                      >
                        {getStatusLabel(item.appointStatus)}
                      </option>
                    ) : (
                      <option value="" disabled className="bg-white text-black">
                        Chọn trạng thái
                      </option>
                    )}
                    {getForwardStatusOptions(item.appointStatus).map(
                      (status) => (
                        <option
                          key={status}
                          className="bg-white text-black"
                          value={status}
                        >
                          {getStatusLabel(status)}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="text-left px-3 py-2.5 text-sm">
                  {item.start
                    ? new Date(item.start).toLocaleDateString("vi-VN") + " "
                    : ""}
                  {item.start
                    ? new Date(item.start).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                  -
                  {item.end
                    ? new Date(item.end).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>

                <td className="text-left px-3 py-2.5 text-sm">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : "-"}
                </td>
                <td className="px-3 py-2.5 text-left text-sm font-medium">
                  <div className="flex items-center gap-1.5">
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
                    {/* Nút thêm dịch vụ - chỉ hiện khi đang tiến hành */}
                    {user?.nameRole === "DOCTOR" &&
                      item.appointStatus === AppointStatus.IN_PROGRESS && (
                        <button
                          onClick={() => setSelectedAppointmentForExam(item)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                        >
                          <BsPlusSquare className="w-4 h-4" />
                        </button>
                      )}
                    {/* Nút in hóa đơn - chỉ hiện khi hoàn thành */}
                    {user?.nameRole === "DOCTOR" &&
                      item.appointStatus === AppointStatus.COMPLETED && (
                        <button
                          onClick={() => downloadInvoice(item.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        >
                          <BsFileMedical className="w-4 h-4" />
                        </button>
                      )}
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

      {showModalAppointment && (
        <ModalAppoint
          initialData={selectedAppointment}
          onClose={() => setShowModalAppointment(false)}
        />
      )}

      {selectedAppointmentForExam && (
        <ModalExamSpecial
          appointmentId={selectedAppointmentForExam.id}
          initialSelectedIds={
            selectedAppointmentForExam.examination
              ?.map((it) => it.id)
              .filter((id): id is number => typeof id === "number") || []
          }
          onClose={() => setSelectedAppointmentForExam(null)}
        />
      )}
    </div>
  );
}
