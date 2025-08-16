import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
      className={`shadow-lg sticky top-0 left-0 z-50 transition duration-300 ${
        scrolled ? "bg-white" : "bg-[#f7c883]"
      }`}
    >
      <div className="container mx-auto max-w-[1300px] w-full flex items-center justify-between">
        <div className="flex gap-7  items-center">
          <a href="">
            <img src={logo} alt="" className="w-[100px]" />
          </a>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm một sản phẩm phù hợp"
              name=""
              id=""
              className="border bg-white border-gray-300 px-8 py-2 rounded-xl w-auto md:w-[500px] "
            />
            <button className="absolute top-2 left-2">
              <BiSearch size={25} />
            </button>
          </div>
        </div>
        <div
          className={`flex gap-4 text-sm sm:text-xl transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          <a className="link" href="">
            SẢN PHẨM
          </a>
          <a href="" className="link">
            DỊCH VỤ
          </a>
          <a href="" className="link">
            LIÊN HỆ
          </a>
        </div>

        <div className="flex gap-4 text-xl">
          <button>
            <FiShoppingCart size={25} />
          </button>
          <button>
            <FaUser size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
