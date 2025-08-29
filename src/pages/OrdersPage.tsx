import React, { useEffect, useState } from "react";
import { OrderStatus, type OrderDTO } from "../types/order";
import { formatPrice } from "../utils/format";
import { useQueryOrderByUser } from "../hook/order/useOrder";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function OrdersPage() {
  const getStatusLabel = (status: OrderStatus) => {
    const label: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "Tất cả",
      [OrderStatus.PENDING]: "Đang xử lý",
      [OrderStatus.CONFIRMED]: "Đã xác nhận",
      [OrderStatus.SHIPPING]: "Đang giao hàng",
      [OrderStatus.COMPLETED]: "Hoàn thành",
      [OrderStatus.CANCELED]: "Đã hủy",
    };
    return label[status];
  };
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO>();
  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "bg-gray-100 text-gray-700",
      [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-700",
      [OrderStatus.CONFIRMED]: "bg-blue-100 text-blue-700",
      [OrderStatus.SHIPPING]: "bg-purple-100 text-purple-700",
      [OrderStatus.COMPLETED]: "bg-green-100 text-green-700",
      [OrderStatus.CANCELED]: "bg-red-100 text-red-700",
    };
    return colors[status];
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { data } = useQueryOrderByUser(selectedStatus);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1440px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đơn hàng của tôi
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý các đơn hàng của bạn
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {Object.values(OrderStatus).map((item) => (
              <button
                key={item}
                onClick={() => setSelectedStatus(item)}
                className={`
                  flex-1 min-w-max px-6 py-4 text-sm font-medium transition-all duration-200
                  hover:bg-gray-50 focus:outline-none
                  ${
                    selectedStatus === item
                      ? "border-b-3 border-blue-500 bg-blue-50 text-blue-600"
                      : "text-gray-600 border-b border-gray-200"
                  }
                `}
              >
                {getStatusLabel(item)}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            {data?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có đơn hàng
                </h3>
                <p className="text-gray-500">
                  Bạn chưa có đơn hàng nào với trạng thái này.
                </p>
              </div>
            ) : (
              data &&
              data.map((order, orderIndex) => (
                <div
                  key={orderIndex}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Mã đơn hàng #{order.id || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.fullName}
                          </p>
                          <p>
                            {order.createdAt &&
                              new Date(order.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.phoneNumber}
                          </p>
                          <div className="flex gap-2 text-sm text-gray-500">
                            <p>{order.addressDTO?.homeAddress}</p>
                            <p>{order.addressDTO?.commune}</p>
                            <p>{order.addressDTO?.district}</p>
                            <p>{order.addressDTO?.city}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {order.paymentMethod}
                          </p>
                        </div>
                        {order.createdAt && (
                          <div>
                            <p className="text-sm text-gray-600">Ngày đặt</p>
                            <p className="font-medium text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                      {order.status && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {order.orderDetailDTO?.map((orderItem, itemIndex) => (
                      <div key={itemIndex} className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={orderItem.urlProductImage}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                              alt={orderItem.productName || "Product image"}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">
                                  {orderItem.productName ||
                                    "Tên sản phẩm không có"}
                                </h4>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                  <span>
                                    Số lượng:{" "}
                                    <span className="font-medium">
                                      {orderItem.quantity}
                                    </span>
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  {orderItem.price
                                    ? formatPrice(orderItem.price)
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          Tổng cộng:{" "}
                          <span className="text-lg font-semibold text-gray-900">
                            {order.totalAmount
                              ? formatPrice(order.totalAmount)
                              : "N/A"}
                          </span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
                        >
                          Xem chi tiết
                        </button>
                        {order.status === OrderStatus.PENDING && (
                          <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md transition-colors">
                            Hủy đơn
                          </button>
                        )}
                        {order.status === OrderStatus.COMPLETED && (
                          <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md transition-colors">
                            Mua lại
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
