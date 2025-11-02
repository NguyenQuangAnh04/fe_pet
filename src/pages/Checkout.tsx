import { AlertCircle, CheckCircle, CreditCard, Home, MapPin, Package, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { useQueryCartByUser } from "../hook/carts/useCart";
import { useAddOrder } from "../hook/order/useOrder";
import type { CartDTOItem } from "../types/cart";
import type { AddressDTO, ItemDTO, OrderDTO } from "../types/order";
import { formatPrice } from "../utils/format";

export default function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const buyNowItems = location.state?.mode === "buyNow" ? location.state.items : null;
  const { data } = useQueryCartByUser();
  const [formData, setFormData] = useState<OrderDTO>({ id: 0 });
  const [cart, setCart] = useState<CartDTOItem[]>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (buyNowItems) {
      setCart(buyNowItems);
    } else if (data?.cartItems) {
      setCart(data.cartItems);
    }
  }, [buyNowItems, data]);

  const handleInputChange = (field: keyof OrderDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChangeAddress = (field: keyof AddressDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      addressDTO: {
        ...prev?.addressDTO,
        [field]: value,
      },
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Họ tên phải có ít nhất 2 ký tự";
    }

    // Validate phone number
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ (VD: 0987654321)";
    }

    // Validate address fields
    if (!formData.addressDTO?.homeAddress || formData.addressDTO.homeAddress.trim().length < 5) {
      newErrors.homeAddress = "Địa chỉ phải có ít nhất 5 ký tự";
    }

    if (!formData.addressDTO?.district || formData.addressDTO.district.trim().length < 2) {
      newErrors.district = "Vui lòng nhập Phường/Xã";
    }

    if (!formData.addressDTO?.commune || formData.addressDTO.commune.trim().length < 2) {
      newErrors.commune = "Vui lòng nhập Quận/Huyện";
    }

    if (!formData.addressDTO?.city || formData.addressDTO.city.trim().length < 2) {
      newErrors.city = "Vui lòng nhập Tỉnh/Thành phố";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutateAsync: mutateAddOrder } = useAddOrder();

  const handleAddToOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
      return;
    }

    setIsSubmitting(true);

    try {
      const itemToSend: ItemDTO[] = (cart ?? []).map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }));

      await mutateAddOrder({ ...formData, items: itemToSend });
      window.location.href = "/orders";
    } catch (error) {
      toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
      setIsSubmitting(false);
    }
  };

  const totalMoney = (cart ?? []).reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity ?? 1),
    0
  );

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Thanh toán
              </h1>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="hover:text-orange-600 cursor-pointer">Giỏ hàng</span>
              <span className="mx-2">›</span>
              <span className="text-orange-600 font-medium">Thanh toán</span>
            </div>
          </div>

          <form onSubmit={handleAddToOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Thông tin giao hàng */}
              <div className="lg:col-span-2 space-y-6">
                {/* Thông tin cá nhân */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Thông tin người nhận
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData?.fullName || ""}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.fullName ? "border-red-500" : "border-gray-300"
                            }`}
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData?.phoneNumber || ""}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                            }`}
                          placeholder="0987654321"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Địa chỉ giao hàng */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Địa chỉ giao hàng
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Địa chỉ cụ thể */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa chỉ cụ thể <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData?.addressDTO?.homeAddress || ""}
                          onChange={(e) => handleInputChangeAddress("homeAddress", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.homeAddress ? "border-red-500" : "border-gray-300"
                            }`}
                          placeholder="Số nhà, tên đường, ấp/khu phố..."
                        />
                      </div>
                      {errors.homeAddress && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.homeAddress}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phường/Xã */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phường/Xã <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData?.addressDTO?.district || ""}
                          onChange={(e) => handleInputChangeAddress("district", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.district ? "border-red-500" : "border-gray-300"
                            }`}
                          placeholder="Phường 1, Xã ABC..."
                        />
                        {errors.district && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.district}
                          </p>
                        )}
                      </div>

                      {/* Quận/Huyện */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Quận/Huyện <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData?.addressDTO?.commune || ""}
                          onChange={(e) => handleInputChangeAddress("commune", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.commune ? "border-red-500" : "border-gray-300"
                            }`}
                          placeholder="Quận 1, Huyện XYZ..."
                        />
                        {errors.commune && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.commune}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tỉnh/Thành phố */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tỉnh/Thành phố <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData?.addressDTO?.city || ""}
                        onChange={(e) => handleInputChangeAddress("city", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="TP. Hồ Chí Minh, Hà Nội..."
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Ghi chú */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ghi chú (tùy chọn)
                      </label>
                      <textarea
                        value={formData?.note || ""}
                        onChange={(e) => handleInputChange("note", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        rows={3}
                        placeholder="Thời gian giao hàng, địa chỉ cụ thể hơn..."
                      />
                    </div>
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Phương thức thanh toán
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-1">
                            Thanh toán khi nhận hàng (COD)
                          </h3>
                          <p className="text-sm text-blue-700">
                            Quý khách vui lòng thanh toán bằng tiền mặt khi nhận hàng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tóm tắt đơn hàng */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm sticky top-24 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Đơn hàng của bạn
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Danh sách sản phẩm */}
                    <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                      {cart && cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={item.product?.imageUrl}
                              alt={item.product?.namePro}
                              className="w-full h-full object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src = "/src/assets/product_01.jpg";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                              {item.product?.namePro}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">
                                {item.size}
                              </span>
                              <span>x{item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-orange-600">
                            {item.product?.price && formatPrice(item.product.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tính toán */}
                    <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tạm tính:</span>
                        <span className="font-semibold text-lg">
                          {formatPrice(totalMoney)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        <span className="font-semibold text-green-600">Miễn phí</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                        <span className="text-3xl font-bold text-orange-600">
                          {formatPrice(totalMoney)}
                        </span>
                      </div>
                    </div>

                    {/* Nút đặt hàng */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
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
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Đặt hàng ngay
                        </>
                      )}
                    </button>

                    {/* Trust badges */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span>Thanh toán khi nhận hàng</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span>Miễn phí vận chuyển toàn quốc</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <span>Đổi trả trong 7 ngày</span>
                        </div>
                      </div>
                    </div>

                    {/* Chính sách */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      <p>
                        Bằng việc đặt hàng, bạn đồng ý với{" "}
                        <span className="text-orange-600 hover:underline cursor-pointer font-medium">
                          Điều khoản sử dụng
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}