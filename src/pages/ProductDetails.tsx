import { CheckCircle, Package, ShoppingCart, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findProductBySlug } from "../api/productService";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ProductDescription from "../components/product/ProductDescription";
import ProductImages from "../components/product/ProductImages";
import { useAddCart } from "../hook/carts/useCart";
import type { CartDTOItem } from "../types/cart";
import type { ProductDTO } from "../types/product";
import type { VariantDTO } from "../types/variant";
import { formatPrice } from "../utils/format";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync: mutateAddCart } = useAddCart();
  const [product, setProduct] = useState<ProductDTO>();
  const [size, setSize] = useState(0);
  const [selectedSize, setSelectedSize] = useState<VariantDTO>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    const getData = async () => {
      const res = await findProductBySlug(slug);
      setProduct(res.data);
      if (res.data?.variants && res.data.variants.length > 0) {
        setSelectedSize(res.data.variants[0]);
        setSize(0);
      }
    };
    getData();
  }, [slug]);

  const handleAddToCart = (id: number) => {
    const cartItem: CartDTOItem = {
      productId: id,
      quantity: quantity,
      size: selectedSize?.size,
    };
    return mutateAddCart(cartItem);
  };

  const handleBuyNow = (product: ProductDTO) => {
    navigate("/checkout", {
      state: {
        items: [
          {
            id: null,
            productId: product.id,
            price: selectedSize?.price && selectedSize?.price * quantity,
            size: selectedSize?.size,
            quantity: quantity,
            product: {
              id: product.id,
              namePro: product.namePro,
              imageUrl: product.imageUrl,
              price: selectedSize?.price,
            },
          },
        ],
        mode: "buyNow",
      },
    });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-6 mt-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <a href="/" className="hover:text-orange-600 transition">Trang chủ</a>
            <span>›</span>
            <span className="text-gray-700">{product?.namePro}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hình ảnh sản phẩm */}
            <div>
              {product?.imagesDTO && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
                  <ProductImages
                    images={product.imagesDTO.map((item) => item.imageUrl)}
                  />
                </div>
              )}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
                {/* Tiêu đề */}
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                    {product?.namePro}
                  </h1>

                  {/* Category badge */}
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {product?.categoryName}
                    </span>
                  </div>
                </div>

                {/* Giá */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl md:text-3xl font-bold text-orange-600">
                      {product?.variants &&
                        product.variants[size].price &&
                        formatPrice(product.variants[size].price)}
                    </p>
                    <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded">
                      / {selectedSize?.size}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    Giá đã bao gồm VAT
                  </p>
                </div>

                {/* Chọn size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 text-sm">Chọn kích thước:</p>
                    {selectedSize && (
                      <span className="text-xs text-gray-600">
                        <Package className="w-3.5 h-3.5 inline mr-1" />
                        Còn <span className="font-semibold text-green-600">{selectedSize.stock}</span>
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {product?.variants &&
                      product?.variants.map((s, index) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSize(index);
                            setQuantity(1);
                            setSelectedSize(s);
                          }}
                          className={`relative border-2 px-3 py-2.5 rounded-lg font-semibold transition-all text-sm ${size === index
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-gray-300 hover:border-orange-300 text-gray-700"
                            }`}
                        >
                          <div className="text-center">
                            <div className="font-bold">{s.size}</div>
                            <div className="text-xs text-gray-500">
                              {formatPrice(s.price || 0)}
                            </div>
                          </div>
                          {size === index && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Số lượng */}
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 text-sm">Số lượng:</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                      <button
                        disabled={quantity <= 1}
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-base font-bold border-x-2 border-gray-300 min-w-[60px] text-center bg-gray-50">
                        {quantity}
                      </span>
                      {product?.variants && product?.variants[size].stock && (
                        <button
                          disabled={quantity >= product?.variants[size].stock}
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                        >
                          +
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      Tối đa: {selectedSize?.stock || 0}
                    </span>
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">
                      Tổng tiền:
                    </span>
                    {product?.variants && product?.variants[size].price && (
                      <span className="text-2xl font-bold text-orange-600">
                        {formatPrice(product.variants[size].price * quantity)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Nút hành động */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => product && handleBuyNow(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-sm hover:shadow flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Mua ngay
                  </button>
                  <button
                    onClick={() => product && handleAddToCart(product.id)}
                    className="w-full bg-white hover:bg-orange-50 text-orange-600 font-semibold py-3 px-4 rounded-lg border-2 border-orange-500 transition hover:shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>

              {/* Thông tin bổ sung */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Thanh toán khi nhận hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          {product && (
            <div className="mt-8">
              <ProductDescription product={product} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}