import { AppointStatus, type AppointmentDTO } from "../../../types/appointment";
import { formatPrice } from "../../../utils/format";

type ModalAppointProps = {
  onClose: () => void;
  initialData?: AppointmentDTO;
};

export default function ModalOrder({ onClose, initialData }: ModalAppointProps) {
  if (!initialData) return null;
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 overflow-hidden">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">
            Chi tiết lịch khám #{initialData.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Thông tin khách hàng
          </h3>
          <p>
            <span className="font-medium">Họ tên:</span> {initialData.ownerName}
          </p>
          <p>
            <span className="font-medium">Số điện thoại:</span>{" "}
            {initialData.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {initialData.email}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Thông tin thú cưng
          </h3>
          <p>
            <span className="font-medium">Tên Pet:</span>{" "}
            {initialData.petName}
          </p>
            <p>
            <span className="font-medium">Giới tính:</span>{" "}
            {initialData.petGender}
          </p>
            <p>
            <span className="font-medium">Tuổi:</span>{" "}
            {initialData.age}
          </p>
          {/* <p>
            <span className="font-medium">Trạng thái:</span>{" "}
            {initialData.appointStatus && getStatusLabel(initialData.appointStatus)}
          </p> */}
          <p>
            <span className="font-medium">Thanh toán:</span>{" "}
            {initialData.paymentMethod}
          </p>
          {initialData.note && (
            <p>
              <span className="font-medium">Ghi chú:</span> {initialData.note}
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Sản phẩm</h3>
          <div className="divide-y-1 border border-gray-300  rounded-lg overflow-y-auto">
            {initialData.orderDetailDTO?.map((item) => (
              <div key={item.id} className="flex items-center p-3 gap-3">
                <img
                  src={item.urlProductImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg "
                />
                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    SL: {item.quantity} ×{" "}
                    {item.price && formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  {item.price &&
                    item.quantity &&
                    formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right font-bold text-lg">
          Tổng:{" "}
          {initialData.totalAmount && formatPrice(initialData.totalAmount)}
        </div>
      </div>
    </div>
  );
}
