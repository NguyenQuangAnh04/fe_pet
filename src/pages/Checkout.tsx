import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQueryCartByUser } from "../hook/carts/useCart";
import type { AddressDTO, OrderDTO } from "../types/order";

import { formatPrice } from "../utils/format";
import { useAddOrder } from "../hook/order/useOrder";
import { toast } from "react-toastify";

export default function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useQueryCartByUser();
  const [formData, setFormData] = useState<OrderDTO>();

  const handleInputChange = (field: keyof OrderDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChangeAddress = (field: keyof AddressDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      addressDTO: {
        ...prev?.addressDTO,
        [field]: value,
      },
    }));
  };
  const { mutateAsync: mutateAddOrder } = useAddOrder();
  const handleAddToOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) {
      toast.error("Vui lòng điền đủ các trường thông tin!");
      return;
    }
    return await mutateAddOrder(formData);
  };
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Thanh toán
          </h1>
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-orange-600 cursor-pointer">
              Giỏ hàng
            </span>
            <svg
              className="w-4 h-4 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-orange-600 font-medium">Thanh toán</span>
          </div>
        </div>

        <form onSubmit={handleAddToOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Thông tin giao hàng và thanh toán */}
            <div className="lg:col-span-2 space-y-8">
              {/* Thông tin giao hàng */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Thông tin giao hàng
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData?.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập email"
                      required
                    />
                  </div> */}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ cụ thể <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData?.addressDTO?.homeAddress}
                      onChange={(e) =>
                        handleInputChangeAddress("homeAddress", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Số nhà, tên đường"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData?.addressDTO?.district}
                      onChange={(e) =>
                        handleInputChangeAddress("district", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập phường/xã"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData?.addressDTO?.commune}
                      onChange={(e) =>
                        handleInputChangeAddress("commune", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập quận/huyện"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData?.addressDTO?.city}
                      onChange={(e) =>
                        handleInputChangeAddress("city", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập tỉnh/thành phố"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      // value={shippingInfo.note}
                      onChange={(e) =>
                        handleInputChange("note", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      rows={3}
                      placeholder="Ghi chú về đơn hàng (thời gian giao hàng, địa điểm cụ thể...)"
                    />
                  </div>
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Phương thức thanh toán
                </h2>

                {/* <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) =>
                            setPaymentMethod(e.target.value as PaymentMethod)
                          }
                          className="mt-1 mr-4 text-orange-600 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3">{method.icon}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {method.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          {paymentMethod === method.id && (
                            <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-sm text-orange-800">
                                {method.details}
                              </p>

                              {method.id === "bank_transfer" && (
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="font-medium text-orange-900">
                                    Thông tin chuyển khoản:
                                  </div>
                                  <div>
                                    🏦 <strong>Ngân hàng:</strong> MBBank
                                  </div>
                                  <div>
                                    📋 <strong>Số tài khoản:</strong> 032759761
                                  </div>
                                  <div>
                                    👤 <strong>Chủ tài khoản:</strong> Nguyen
                                    Duc Dung
                                  </div>
                                  <div>
                                    💬 <strong>Nội dung:</strong> Mã đơn h + [Số
                                    điện thoại]
                                  </div>
                                </div>
                              )}

                              {method.id === "momo" && (
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="font-medium text-orange-900">
                                    Thông tin MoMo:
                                  </div>
                                  <div>
                                    📱 <strong>Số điện thoại:</strong>{" "}
                                    0327599761
                                  </div>
                                  <div>
                                    👤 <strong>Tên:</strong> Nguyen Duc Dung
                                  </div>
                                  <div>
                                    💬 <strong>Nội dung:</strong> Mã đơn hàng +
                                    [Số điện thoại]
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Đơn hàng của bạn
                </h3>

                {/* Danh sách sản phẩm */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {data?.cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={item.product?.imageUrl}
                        alt={item.product?.namePro}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/product_01.jpg";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product?.namePro}
                        </h4>
                        <p className="text-xs text-gray-500">{item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.product?.price &&
                          formatPrice(item.product?.price)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tính toán */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">
                      {data?.totalMoney && formatPrice(data.totalMoney)}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shipping}đ`
                      )}
                    </span>
                  </div> */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-orange-600">
                        {data?.totalMoney && formatPrice(data.totalMoney)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nút đặt hàng */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang xử lý...
                    </div>
                  ) : (
                    `Đặt hàng`
                  )}
                </button>

                {/* Chính sách */}
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>
                    Bằng việc đặt hàng, bạn đồng ý với{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                      Điều khoản sử dụng
                    </span>{" "}
                    và{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                      Chính sách bảo mật
                    </span>{" "}
                    của chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
