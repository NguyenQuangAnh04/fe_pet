import { AppointStatus, type AppointmentDTO } from "../../../types/appointment";
import { formatPrice } from "../../../utils/format";
import { BiPackage, BiPhone, BiUser } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaMoneyBillWave, FaEnvelope, FaDog } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdNotes } from "react-icons/md";
import { GiBabyFace } from "react-icons/gi";

type ModalAppointProps = {
  onClose: () => void;
  initialData?: AppointmentDTO;
};

export default function ModalAppoint({
  onClose,
  initialData,
}: ModalAppointProps) {
  if (!initialData) return null;

  const getStatusLabel = (status: AppointStatus) => {
    const label: Record<AppointStatus, string> = {
      [AppointStatus.ALL]: "",
      [AppointStatus.PENDING]: "Đang xử lý",
      [AppointStatus.CONFIRMED]: "Đã xác nhận",
      [AppointStatus.COMPLETED]: "Hoàn thành",
      [AppointStatus.CANCELLED]: "Đã hủy",
      [AppointStatus.IN_QUEUE]: "Đang chờ",
      [AppointStatus.IN_PROGRESS]: "Đang tiến hành",
    };
    return label[status];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 m-4 transition-all duration-300">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Chi tiết lịch khám #{initialData.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Thông tin khách hàng
              </h3>
              <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                <BiUser className="text-blue-500 flex-shrink-0" />
                <span className="font-medium text-gray-800">Họ tên:</span>
                <span className="text-gray-600">{initialData.ownerName}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                <BiPhone className="text-green-500 flex-shrink-0" />
                <span className="font-medium text-gray-800">
                  Số điện thoại:
                </span>
                <span className="text-gray-600">{initialData.phoneNumber}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                <FaEnvelope className="text-purple-500 flex-shrink-0" />
                <span className="font-medium text-gray-800">Email:</span>
                <span className="text-gray-600">{initialData.email}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Thông tin thú cưng
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <FaDog className="text-teal-500 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Tên Pet:
                  </span>{" "}
                  {initialData.petName}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <BsGenderAmbiguous className="text-pink-500 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Giới tính:
                  </span>{" "}
                  {initialData.petGender}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <GiBabyFace className="text-orange-500 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Tuổi:
                  </span>{" "}
                  {initialData.age}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <FiFilter className="text-yellow-500 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Trạng thái:
                  </span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      initialData.appointStatus === AppointStatus.PENDING
                        ? "bg-yellow-100 text-yellow-800"
                        : initialData.appointStatus === AppointStatus.CONFIRMED
                        ? "bg-green-100 text-green-800"
                        : initialData.appointStatus === AppointStatus.COMPLETED
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {initialData.appointStatus &&
                      getStatusLabel(initialData.appointStatus)}
                  </span>
                </p>
                {initialData.note && (
                  <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                    <MdNotes className="text-indigo-500 hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      Ghi chú:
                    </span>{" "}
                    {initialData.note}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Thông tin bác sĩ
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <BiUser className="text-blue-700 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Họ tên:
                  </span>{" "}
                  {initialData.veterinarian?.name}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <BiPhone className="text-green-700 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Số điện thoại:
                  </span>{" "}
                  {initialData.veterinarian?.phoneNumber}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                  <FaEnvelope className="text-purple-700 hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-800 whitespace-nowrap">
                    Email:
                  </span>
                  {initialData.veterinarian?.email}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Dịch vụ
              </h3>
              <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {initialData.examination?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 break-words">
                      <BiPackage className="text-cyan-500 hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        {/* <p className="text-sm text-gray-600">{item.description}</p> */}
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800 whitespace-nowrap">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right font-bold text-xl text-gray-800 mt-6 flex items-center justify-end gap-3">
          <FaMoneyBillWave className="text-emerald-500 hover:scale-110 transition-transform" />
          Tổng: {initialData.totalPrice && formatPrice(initialData.totalPrice)}
        </div>
      </div>
    </div>
  );
}
