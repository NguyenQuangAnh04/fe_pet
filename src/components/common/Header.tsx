import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { findAllProduct } from "../../api/productService";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useQueryCartByUser } from "../../hook/carts/useCart";
import type { ProductDTO } from "../../types/product";
import { formatPrice } from "../../utils/format";
import api from "../../api/axiosClient";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data } = useQueryCartByUser();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
  const token = localStorage.getItem("accessToken");
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
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavigateToService = () => {
    // Nếu div "service" ở trang chủ
    navigate("/#service");

    // Hoặc nếu ở trang khác, ví dụ trang services
    // navigate('/services#service');

    // Đợi một chút để trang load xong rồi cuộn
    setTimeout(() => {
      const serviceElement = document.getElementById("service");
      if (serviceElement) {
        serviceElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const handleNavigateToContact = () => {
    // Nếu div "service" ở trang chủ
    navigate("/#contact");

    // Hoặc nếu ở trang khác, ví dụ trang services
    // navigate('/services#service');

    // Đợi một chút để trang load xong rồi cuộn
    setTimeout(() => {
      const serviceElement = document.getElementById("contact");
      if (serviceElement) {
        serviceElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  };
  // const [role, setRole] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchRole = async () => {
  //     try {
  //       const res = await api.get("/auth/me");
  //       setRole(res.data.role);
  //     } catch {
  //       setRole(null);
  //     }
  //   }
  //   fetchRole();
  // }, [])
  // console.log("Vai trò người dùng:", role);
  const { user } = useAuth();
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
          <div className="relative flex-grow max-w-[600px]">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              className="border border-gray-300 px-12 py-1.5 rounded-full w-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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

        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link to="/search" className="hidden md:inline hover:text-blue-600">
            SẢN PHẨM
          </Link>
          <button
            onClick={handleNavigateToService}
            className="hidden md:inline hover:text-blue-600 bg-transparent border-none cursor-pointer font-inherit text-inherit"
          >
            DỊCH VỤ
          </button>
          <Link to="/blog" className="hidden md:inline hover:text-blue-600">
            BLOG
          </Link>
          <button
            onClick={handleNavigateToContact}
            className="hidden md:inline hover:text-blue-600"
          >
            LIÊN HỆ
          </button>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600"
            >
              <FiShoppingCart size={22} />
              {data && data.cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3 h-3 rounded-full flex items-center justify-center">
                  {data.cartItems.length}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                title="User menu"
                aria-haspopup="true"
                className="text-gray-700 hover:text-blue-600"
              >
                <FaUser size={20} />
              </button>
              {/* simple user menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded py-2 text-sm space-y-1">
                  <Link
                    to="/orders"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Đơn hàng
                  </Link>
                  <Link
                    to="/appointments"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Lịch khám
                  </Link>
                  {user?.provide !== "google" && user && (
                    <Link
                      to="/account"
                      className="block px-3 py-2 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                  )}

                  {/* {user?.nameRole !== "CUSTOMER" && (
                    <Link
                      to="/dashboard/dashboardHome"
                      className="block px-3 py-2 hover:bg-gray-50"
                    >
                      Quản trị
                    </Link>
                  )} */}
                  {token ? (
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="block px-3 py-2 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-3 py-2 hover:bg-gray-50"
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
    // <section className="flex items-center justify-between px-4 py-2 sticky top-0 left-0 z-50 transition-all duration-300 bg-white backdrop-blur-sm max-w-[1440px] mx-auto">
    //   <div className="flex gap-3">
    //     <a href="">Trang chủ</a>
    //     <a href="">Dịch vụ</a>
    //     <a href="">Shop</a>
    //     <a href="">Giới thiệu</a>
    //     <a href="">Liên hệ</a>
    //   </div>
    //   <div className="flex items-center gap-6 justify-center">
    //     <p>+0965693740</p>
    //     {
    //       data && data.cartItems.length > 0 && (
    //         <div className="relative">
    //           <p className="w-10 h-10 "> <FiShoppingCart size={25} /></p>
    //           <p className="absolute -top-2 right-1 ">{data.cartItems.length}</p>
    //         </div>
    //       )
    //     }
    //     <a className="bg-yellow-500 text-white px-4 py-2 rounded-2xl">Đặt lịch hẹn!</a>
    //   </div>
    // </section>
  );
};

export default Header;
