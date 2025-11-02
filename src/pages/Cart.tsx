import { ArrowRight, CheckCircle, Minus, Package, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import {
  useDeleteCart,
  useQueryCartByUser,
  useUpdateCart,
} from "../hook/carts/useCart";
import type { CartDTOItem } from "../types/cart";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const navigate = useNavigate();
  const { data } = useQueryCartByUser();
  const { mutateAsync: updateCart } = useUpdateCart();
  const { mutateAsync: deleteCartUser } = useDeleteCart();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleUpdateQuantity = (item: CartDTOItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCart({ ...item, quantity: newQuantity });
  };

  const handleDeleteCart = async (id: number) => {
    return await deleteCartUser(id);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Giỏ hàng
            </h1>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-orange-600">{data?.cartItems.length || 0}</span> sản phẩm
            </p>
          </div>

          {data?.cartItems.length === 0 ? (
            // Empty Cart State
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Giỏ hàng trống
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center gap-2 text-sm"
              >
                Mua sắm ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {data?.cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={item.product?.imageUrl}
                          alt={item.product?.namePro}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = "/src/assets/product_01.jpg";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                          {item.product?.namePro}
                        </h3>

                        {/* Size */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <Package className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-xs text-gray-600">Size:</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            {item.size}
                          </span>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          {/* Price */}
                          <div className="text-base font-bold text-orange-600">
                            {item.product?.price ? formatPrice(item.product?.price) : "0đ"}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item, (item.quantity || 1) - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="p-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 py-2 text-sm font-semibold border-x border-gray-300 min-w-[50px] text-center bg-gray-50">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item, (item.quantity || 1) + 1)
                                }
                                className="p-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Delete Button */}
                            <button
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="Xóa"
                              onClick={() => item.id && handleDeleteCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-600">Thành tiền:</span>
                          <span className="text-base font-bold text-gray-900">
                            {item.totalPrice ? formatPrice(item.totalPrice) : "0đ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-20">
                  <h3 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                    Tóm tắt đơn hàng
                  </h3>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="font-semibold">
                        {data?.totalMoney ? formatPrice(data.totalMoney) : "0đ"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-semibold text-green-600">Miễn phí</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 mt-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">Tổng cộng:</span>
                        <span className="text-2xl font-bold text-orange-600">
                          {data?.totalMoney ? formatPrice(data.totalMoney) : "0đ"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-sm"
                    >
                      Thanh toán
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 hover:border-orange-300 transition flex items-center justify-center gap-2 text-sm"
                    >
                      Tiếp tục mua
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>Miễn phí vận chuyển</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>Đổi trả trong 7 ngày</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>Thanh toán an toàn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}