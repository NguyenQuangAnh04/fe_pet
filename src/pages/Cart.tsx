import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  useDeleteCart,
  useQueryCartByUser,
  useUpdateCart,
} from "../hook/carts/useCart";
import { formatPrice } from "../utils/format";
import type { CartDTOItem } from "../types/cart";

export default function Cart() {
  const { data } = useQueryCartByUser();
  const { mutateAsync: updateCart } = useUpdateCart();
  const { mutateAsync: deleteCartUser } = useDeleteCart();
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
      <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen ">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-600">
            Bạn có {data?.cartItems.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        {data?.cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L3 3m0 0l-.4-2M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M17 17v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8.001"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Giỏ hàng trống
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {data?.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Hình ảnh sản phẩm */}
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.product?.imageUrl}
                        alt={item.product?.namePro}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/src/assets/product_01.jpg";
                        }}
                      />
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.product?.namePro}
                        </h3>

                        {/* <p className="text-sm text-gray-600">
                          <span className="font-medium">Kích thước:</span>
                          <span className="ml-1">{item.size}</span>
                        </p> */}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Giá */}
                        <div className="text-xl font-bold text-orange-600">
                          {item.product?.price
                            ? formatPrice(item.product?.price)
                            : 1}
                        </div>

                        {/* Số lượng và nút xóa */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item,
                                  (item.quantity || 1) - 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:text-orange-600 transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 text-lg font-medium border-x border-gray-300 min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:text-orange-600 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                            title="Xóa sản phẩm"
                            onClick={() => item.id && handleDeleteCart(item.id)}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Tổng tiền cho sản phẩm này */}
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Tổng: </span>
                        <span className="text-lg font-bold text-gray-900">
                          {item.totalPrice ? formatPrice(item.totalPrice) : "1"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h3> */}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">
                      {data?.totalMoney ? formatPrice(data.totalMoney) : "1"}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shipping.toLocaleString()}đ`
                      )}
                    </span>
                  </div> */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-orange-600">
                        {data?.totalMoney ? formatPrice(data.totalMoney) : "1"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                    <a href="/checkout">Tiến hành thanh toán</a>
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200">
                    <a href="/home">Tiếp tục mua sắm</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
