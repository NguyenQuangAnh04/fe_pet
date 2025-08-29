import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { useQueryCartByUser } from "../../hook/carts/useCart";
import { useNavigate } from "react-router-dom";
import type { ProductDTO } from "../../types/product";
import { findAllProduct } from "../../api/productService";
import { formatPrice } from "../../utils/format";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data } = useQueryCartByUser();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const [product, setProduct] = useState<ProductDTO[]>([]);
  const [suggest, setSuggestProduct] = useState<ProductDTO[]>([]);
  useEffect(() => {
    const fetchDataProduct = async () => {
      const res = await findAllProduct();
      setProduct(res.data.data.content);
    };
    fetchDataProduct();
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchTerm) {
        const result = product.filter((item) =>
          item.namePro.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestProduct(result);
      } else {
        setSuggestProduct([]);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm, product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`shadow-lg sticky top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white" : "bg-white/90"
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between ">
        <div className="flex items-center gap-6 md:gap-8">
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="w-[70px] md:w-[80px]" />
          </a>
          <div className="relative flex-grow max-w-[500px]">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              className="border border-gray-300 px-12 py-2.5 rounded-full w-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchFocused(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              // onFocus={() => setIsSearchFocused(true)}
              // onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <BiSearch size={20} />
            </button>
            {isSearchFocused && searchTerm && suggest.length > 0 && (
              <ul className="absolute bg-white z-50 w-full rounded-xl mt-2 shadow-lg max-h-60 overflow-y-auto transform scale-y-100 transition-transform duration-300 origin-top">
                {suggest.map((item) => (
                  <li
                    onClick={() => navigate(`/product-details/${item.slug}`)}
                    key={item.id}
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                  >
                    <img
                      src={item.imageUrl}
                      className="w-12 h-12 rounded-lg object-cover"
                      alt={item.namePro}
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.namePro}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        {item.price && formatPrice(item.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className={`hidden sm:flex gap-6 md:gap-8 text-base font-medium transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-gray-800"
          }`}
        >
          <a href="/search" className="hover:text-blue-600 transition-colors">
            SẢN PHẨM
          </a>
          <a href="/services" className="hover:text-blue-600 transition-colors">
            DỊCH VỤ
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            LIÊN HỆ
          </a>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-xl">
          <a
            href="/cart"
            className="relative text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FiShoppingCart size={24} />
            {data && data.cartItems.length > 0 && (
              <span
                className={`absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[8px] font-bold rounded-full  text-white bg-blue-500 border-2 border-white`}
              >
                {data.cartItems.length}
              </span>
            )}
          </a>
          <a
            href="/account"
            className="relative text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaUser size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
