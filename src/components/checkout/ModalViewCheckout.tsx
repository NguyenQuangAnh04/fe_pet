import React from "react";
import type { OrderDTO } from "../../types/order";

type ModalViewCheckOutProps = {
  onClose: () => void;
  initialData?: OrderDTO;
};

export default function ModalViewCheckOut({
  onClose,
  initialData,
}: ModalViewCheckOutProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative max-w-4xl w-full bg-white shadow-lg rounded p-6 z-10 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Địa chỉ nhận hàng</h2>

        {initialData ? (
          <>
            {/* Thông tin khách hàng */}
            <div className="space-y-1 mb-4">
              <p><span className="font-medium">Họ tên:</span> {initialData.fullName}</p>
              <p><span className="font-medium">Thành phố:</span> {initialData.addressDTO?.city}</p>
              <p><span className="font-medium">Số điện thoại:</span> {initialData.phoneNumber}</p>
            </div>

            {/* Danh sách sản phẩm */}
            <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
            <div className="space-y-3">
              {initialData.orderDetailDTO?.map((item) => (
                <div key={item.id} className="flex items-center border rounded p-2">
                  {item.urlProductImage && (
                    <img
                      src={item.urlProductImage}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Giá: {item.price?.toLocaleString()} VNĐ</p>
                    <p>Tổng: {item.totalPrice?.toLocaleString()} VNĐ</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
    </div>
  );
}
