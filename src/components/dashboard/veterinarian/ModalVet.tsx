import { OrderStatus, type OrderDTO } from "../../../types/order";
import { formatPrice } from "../../../utils/format";

type ModalOrderProps = {
  onClose: () => void;
  initialData?: OrderDTO;
};

export default function ModalOrder({ onClose, initialData }: ModalOrderProps) {
  if (!initialData) return null;
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 overflow-hidden">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold">
            Chi tiết đơn hàng #{initialData.id}
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
            <span className="font-medium">Họ tên:</span> {initialData.fullName}
          </p>
          <p>
            <span className="font-medium">Số điện thoại:</span>{" "}
            {initialData.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Địa chỉ:</span>{" "}
            {initialData.addressDTO?.homeAddress},{" "}
            {initialData.addressDTO?.commune},{" "}
            {initialData.addressDTO?.district}, {initialData.addressDTO?.city}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Thông tin đơn hàng
          </h3>
          <p>
            <span className="font-medium">Ngày tạo:</span>{" "}
            {initialData.createdAt}
          </p>
          <p>
            <span className="font-medium">Trạng thái:</span>{" "}
            {initialData.status && getStatusLabel(initialData.status)}
          </p>
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
