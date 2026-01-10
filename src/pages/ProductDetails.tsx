import { CheckCircle, Package, ShoppingCart, Star, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findProductBySlug } from "../api/productService";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ProductDescription from "../components/product/ProductDescription";
import ProductImages from "../components/product/ProductImages";
import ProductReviews from "../components/product/ProductReviews";
import { useAddCart } from "../hook/carts/useCart";
import type { CartDTOItem } from "../types/cart";
import type { ProductDTO } from "../types/product";
import type { VariantDTO } from "../types/variant";
import { formatPrice } from "../utils/format";
import ProductCard from "../components/common/ProductCard";
import { useQueryProduct } from "../hook/product/useProduct";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync: mutateAddCart } = useAddCart();
  const [product, setProduct] = useState<ProductDTO>();
  const [size, setSize] = useState(0);
  const [selectedSize, setSelectedSize] = useState<VariantDTO>();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    const getData = async () => {
      const res = await findProductBySlug(slug);
      setProduct(res.data);
      console.log(res);
      setCategoryId(res.data.categoryId || null);
      if (res.data?.variants && res.data.variants.length > 0) {
        setSelectedSize(res.data.variants[0]);
        setSize(0);
      }
    };
    getData();
  }, [slug]);
  const { data } = useQueryProduct({ categoryId: categoryId || undefined, size: 5 });
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
            <a href="/" className="hover:text-orange-600 transition">
              Trang chủ
            </a>
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

                  {/* Rating & Category */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Rating */}
                    {product?.averageRating !== undefined &&
                      product.averageRating > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(product.averageRating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {product.averageRating.toFixed(1)}
                          </span>
                        </div>
                      )}

                    {/* Category badge */}
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {product?.categoryName}
                      </span>
                    </div>
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
                    <p className="font-semibold text-gray-900 text-sm">
                      Chọn kích thước:
                    </p>
                    {selectedSize && (
                      <span className="text-xs">
                        {selectedSize.stock !== undefined &&
                        selectedSize.stock > 0 ? (
                          <span className="text-gray-600">
                            <Package className="w-3.5 h-3.5 inline mr-1" />
                            Còn{" "}
                            <span className="font-semibold text-green-600">
                              {selectedSize.stock}
                            </span>
                          </span>
                        ) : (
                          <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                            Hết hàng
                          </span>
                        )}
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
                          className={`relative border-2 px-3 py-2.5 rounded-lg font-semibold transition-all text-sm ${
                            size === index
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
                {selectedSize?.stock !== undefined &&
                  selectedSize?.stock > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900 text-sm">
                        Số lượng:
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                          <button
                            disabled={quantity <= 1}
                            onClick={() =>
                              setQuantity((prev) => Math.max(1, prev - 1))
                            }
                            className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={selectedSize?.stock || 1}
                            value={quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              const maxStock = selectedSize?.stock || 1;
                              setQuantity(
                                Math.min(Math.max(1, value), maxStock)
                              );
                            }}
                            className="px-4 py-2 text-base font-bold border-x-2 border-gray-300 min-w-[60px] text-center bg-gray-50 focus:outline-none focus:bg-white"
                          />
                          {product?.variants &&
                            product?.variants[size].stock && (
                              <button
                                disabled={
                                  quantity >= product?.variants[size].stock
                                }
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
                  )}

                {/* Tổng tiền */}
                {selectedSize?.stock !== undefined &&
                  selectedSize.stock > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                          Tổng tiền:
                        </span>
                        {product?.variants && product?.variants[size].price && (
                          <span className="text-2xl font-bold text-orange-600">
                            {formatPrice(
                              product.variants[size].price * quantity
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                {/* Nút hành động */}
                <div className="space-y-2 pt-2">
                  {selectedSize && selectedSize.stock === 0 ? (
                    <div className="w-full bg-red-50 border-2 border-red-300 text-red-700 font-semibold py-3 px-4 rounded-lg text-center text-sm">
                      Sản phẩm tạm thời hết hàng
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
            <div className="mt-8 space-y-6">
              <ProductDescription product={product} />

              {/* Phần đánh giá sản phẩm - CALL API */}
              {slug && <ProductReviews slug={slug} />}
            </div>
          )}
          <div>
            <h1 className="mt-4 text-xl font-bold text-gray-900 mb-4 p-4">
              Sản phẩm cùng loại
            </h1>
            <div className=" space-y-16">
              <section>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                  {data?.content
                    ?.sort((a, b) => b.id - a.id)
                    .slice(0, 5)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="bg-white p-4 rounded-2xl cursor-pointer flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                      >
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            onClick={() =>
                              navigate(`/product-details/${p.slug}`)
                            }
                            src={p.imageUrl}
                            alt=""
                            className="w-full h-[250px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                          />
                          {p.imagesDTO.length > 1 && (
                            <img
                              onClick={() =>
                                navigate(`/product-details/${p.slug}`)
                              }
                              src={p.imagesDTO?.[1]?.imageUrl ?? p.imageUrl}
                              className="w-full h-[250px] object-cover rounded-xl absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                              alt=""
                            />
                          )}
                          {/* Badge */}
                         
                        </div>
                        <p className="font-semibold text-gray-800 line-clamp-2 mt-4 min-h-[3rem] group-hover:text-green-600 transition-colors">
                          {p.namePro}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(p.averageRating || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-500">
                            ({(p.averageRating || 0).toFixed(1)})
                          </span>
                        </div>

                        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mt-auto pt-3">
                          {p.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    ))}
                </div>
              </section>
             
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
