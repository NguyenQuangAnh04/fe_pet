import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Phone,
  Star,
  Truck,
  User,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ReviewModal from "../components/product/ReviewModal";
import {
  useCancelOrderUser,
  useQueryOrderByUser,
} from "../hook/order/useOrder";
import { OrderStatus } from "../types/order";
import { formatPrice } from "../utils/format";

export default function OrdersPage() {
  const getStatusLabel = (status: OrderStatus) => {
    const label: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "Tất cả",
      [OrderStatus.PENDING]: "Chờ xác nhận",
      [OrderStatus.CONFIRMED]: "Đã xác nhận",
      [OrderStatus.SHIPPING]: "Đang giao",
      [OrderStatus.COMPLETED]: "Hoàn thành",
      [OrderStatus.CANCELED]: "Đã hủy",
    };
    return label[status];
  };

  const navigate = useNavigate();
  const { mutateAsync: mutateCancelOrder } = useCancelOrderUser();

  // State cho review modal
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productId: number;
    productName: string;
    variantId: number;
    variantSize: string;
    orderId: number;
    productImage?: string;
  } | null>(null);

  const openReviewModal = (
    productId: number,
    productName: string,
    variantId: number,
    variantSize: string,
    orderId: number,
    productImage?: string
  ) => {
    setReviewModal({
      isOpen: true,
      productId,
      productName,
      variantId,
      variantSize,
      orderId,
      productImage,
    });
  };

  const closeReviewModal = () => {
    setReviewModal(null);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      [OrderStatus.ALL]: "bg-gray-50 text-gray-700",
      [OrderStatus.PENDING]: "bg-yellow-50 text-yellow-700",
      [OrderStatus.CONFIRMED]: "bg-blue-50 text-blue-700",
      [OrderStatus.SHIPPING]: "bg-purple-50 text-purple-700",
      [OrderStatus.COMPLETED]: "bg-green-50 text-green-700",
      [OrderStatus.CANCELED]: "bg-red-50 text-red-700",
    };
    return colors[status];
  };

  const getStatusIcon = (status: OrderStatus) => {
    const icons: Record<OrderStatus, React.ReactNode> = {
      [OrderStatus.ALL]: <Package className="w-3.5 h-3.5" />,
      [OrderStatus.PENDING]: <Clock className="w-3.5 h-3.5" />,
      [OrderStatus.CONFIRMED]: <CheckCircle className="w-3.5 h-3.5" />,
      [OrderStatus.SHIPPING]: <Truck className="w-3.5 h-3.5" />,
      [OrderStatus.COMPLETED]: <CheckCircle className="w-3.5 h-3.5" />,
      [OrderStatus.CANCELED]: <XCircle className="w-3.5 h-3.5" />,
    };
    return icons[status];
  };

  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      await mutateCancelOrder(orderId);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [loading] = useState(false);
  const { data } = useQueryOrderByUser(selectedStatus);
  console.log(data)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Đơn hàng của tôi
          </h1>
          <p className="text-sm text-gray-600">
            Quản lý đơn hàng của bạn
          </p>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-4 border border-gray-200">
          <div className="flex overflow-x-auto">
            {Object.values(OrderStatus).map((item) => (
              <button
                key={item}
                onClick={() => setSelectedStatus(item)}
                className={`
                  flex-1 min-w-max px-4 py-3 text-sm font-medium transition-all relative
                  ${selectedStatus === item
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center justify-center gap-1.5">
                  {getStatusIcon(item)}
                  <span>{getStatusLabel(item)}</span>
                </div>
                {selectedStatus === item && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-orange-500"></div>
          </div>
        )}

        {/* Orders List */}
        {!loading && (
          <div className="space-y-4">
            {data?.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Chưa có đơn hàng
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Bạn chưa có đơn hàng nào
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              data &&
              data.map((order, orderIndex) => (
                <div
                  key={orderIndex}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition"
                >
                  {/* Order Header */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Mã đơn hàng</p>
                          <p className="text-sm font-semibold text-gray-900">#{order.id}</p>
                        </div>
                        {order.createdAt && (
                          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                      {order.status && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="px-4 py-3 bg-white border-b border-gray-100">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{order.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{order.phoneNumber}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-gray-600 mt-2">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">
                        {order.addressDTO?.homeAddress}, {order.addressDTO?.district},{" "}
                        {order.addressDTO?.commune}, {order.addressDTO?.city}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-gray-100">
                    {order.orderDetailDTO?.map((orderItem, itemIndex) => (
                      <div key={itemIndex} className="px-4 py-3 hover:bg-gray-50 transition">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <img
                              src={orderItem.urlProductImage}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              alt={orderItem.productName || "Product"}
                              onError={(e) => {
                                e.currentTarget.src = "/src/assets/product_01.jpg";
                              }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                              {orderItem.productName}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <span className="px-2 py-0.5 bg-gray-100 rounded">
                                {orderItem.size}
                              </span>
                              <span>x{orderItem.quantity}</span>
                            </div>

                            {/* Nút đánh giá cho đơn hàng hoàn thành */}
                            {order.status === OrderStatus.COMPLETED && orderItem.productId && (
                             <>
                                {orderItem.reviewed ? (
                                  // ĐÃ ĐÁNH GIÁ - Hiển thị badge xanh
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Đã đánh giá
                                  </div>
                                ) : (
                                  // CHƯA ĐÁNH GIÁ - Hiển thị nút đánh giá
                                  <button
                                    onClick={() =>
                                      openReviewModal(
                                        orderItem.productId!,
                                        orderItem.productName || "",
                                        orderItem.variantId || 0,
                                        orderItem.size || "",
                                        order.id,
                                        orderItem.urlProductImage
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition shadow-sm hover:shadow"
                                  >
                                    <Star className="w-3.5 h-3.5 fill-white" />
                                    Đánh giá sản phẩm
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-orange-600">
                              {orderItem.price ? formatPrice(orderItem.price) : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-600">Tổng cộng:</span>
                        <span className="text-xl font-bold text-orange-600">
                          {order.totalAmount ? formatPrice(order.totalAmount) : "N/A"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {order.status === OrderStatus.PENDING && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 border border-red-300 hover:border-red-400 rounded-lg transition"
                          >
                            Hủy đơn
                          </button>
                        )}
                        {/* <button className="text-xs font-medium text-orange-600 hover:text-orange-700 px-3 py-1.5 border border-orange-300 hover:border-orange-400 rounded-lg transition">
                          Chi tiết
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Review Modal - CALL API KHI SUBMIT */}
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal.isOpen}
          onClose={closeReviewModal}
          productId={reviewModal.productId}
          productName={reviewModal.productName}
          variantId={reviewModal.variantId}
          variantSize={reviewModal.variantSize}
          orderId={reviewModal.orderId}
          productImage={reviewModal.productImage}
        />
      )}

      <Footer />
    </div>
  );
}