import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  brand: string;
}

interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  note: string;
}

type PaymentMethod = 'bank_transfer' | 'momo' | 'cod';

export default function Checkout() {
  // Mock data giỏ hàng (trong thực tế sẽ lấy từ context/store)
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27",
      price: 280000,
      quantity: 2,
      size: "1kg",
      image: "/public/images/product_01.jpg",
      brand: "Royal Canin"
    },
    {
      id: 2,
      name: "Thức Ăn Cho Chó Con Pedigree Puppy",
      price: 150000,
      quantity: 1,
      size: "500g",
      image: "/public/images/product_02.jpg",
      brand: "Pedigree"
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    ward: '',
    district: '',
    city: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 500000 ? 0 : 30000;
  const finalTotal = total + shipping;

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'ward', 'district', 'city'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof ShippingInfo]);
    
    if (missingFields.length > 0) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      setIsSubmitting(false);
      return;
    }

    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
      // Redirect to success page or home
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    {
      id: 'cod' as PaymentMethod,
      name: 'Trả tiền khi nhận hàng (COD)',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
      icon: '💰',
      details: 'Bạn sẽ thanh toán trực tiếp cho shipper khi nhận hàng. Phí COD: 0đ'
    },
    {
      id: 'bank_transfer' as PaymentMethod,
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua số tài khoản ngân hàng',
      icon: '🏦',
      details: 'Thông tin tài khoản sẽ được gửi qua email sau khi đặt hàng'
    },
    {
      id: 'momo' as PaymentMethod,
      name: 'Ví điện tử MoMo',
      description: 'Thanh toán nhanh chóng qua ví MoMo',
      icon: '📱',
      details: 'Quét mã QR hoặc chuyển khoản qua số điện thoại MoMo'
    }
  ];

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-orange-600 cursor-pointer">Giỏ hàng</span>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-orange-600 font-medium">Thanh toán</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Thông tin giao hàng và thanh toán */}
            <div className="lg:col-span-2 space-y-8">
              {/* Thông tin giao hàng */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin giao hàng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập email"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ cụ thể <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
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
                      value={shippingInfo.ward}
                      onChange={(e) => handleInputChange('ward', e.target.value)}
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
                      value={shippingInfo.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
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
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
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
                      value={shippingInfo.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      rows={3}
                      placeholder="Ghi chú về đơn hàng (thời gian giao hàng, địa điểm cụ thể...)"
                    />
                  </div>
                </div>
              </div>

              {/* Phương thức thanh toán */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Phương thức thanh toán</h2>
                
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="mt-1 mr-4 text-orange-600 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3">{method.icon}</span>
                            <div>
                              <h3 className="font-semibold text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          {paymentMethod === method.id && (
                            <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-sm text-orange-800">{method.details}</p>
                              
                              {method.id === 'bank_transfer' && (
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="font-medium text-orange-900">Thông tin chuyển khoản:</div>
                                  <div>🏦 <strong>Ngân hàng:</strong> MBBank</div>
                                  <div>📋 <strong>Số tài khoản:</strong> 032759761</div>
                                  <div>👤 <strong>Chủ tài khoản:</strong> Nguyen Duc Dung</div>
                                  <div>💬 <strong>Nội dung:</strong> Mã đơn h + [Số điện thoại]</div>
                                </div>
                              )}
                              
                              {method.id === 'momo' && (
                                <div className="mt-3 space-y-2 text-sm">
                                  <div className="font-medium text-orange-900">Thông tin MoMo:</div>
                                  <div>📱 <strong>Số điện thoại:</strong> 0327599761</div>
                                  <div>👤 <strong>Tên:</strong> Nguyen Duc Dung</div>
                                  <div>💬 <strong>Nội dung:</strong> Mã đơn hàng + [Số điện thoại]</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h3>
                
                {/* Danh sách sản phẩm */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/product_01.jpg";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.size} x {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tính toán */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{total.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shipping.toLocaleString()}đ`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-orange-600">{finalTotal.toLocaleString()}đ</span>
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
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </div>
                  ) : (
                    `Đặt hàng (${finalTotal.toLocaleString()}đ)`
                  )}
                </button>

                {/* Chính sách */}
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>Bằng việc đặt hàng, bạn đồng ý với <span className="text-orange-600 hover:underline cursor-pointer">Điều khoản sử dụng</span> và <span className="text-orange-600 hover:underline cursor-pointer">Chính sách bảo mật</span> của chúng tôi.</p>
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
