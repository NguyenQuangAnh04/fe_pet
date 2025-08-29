import {
  FaEnvelope,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 text-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200/40 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-200/20 rounded-full translate-x-20 translate-y-20"></div>

      <div className="relative z-10 py-5 mt-12">
        <div className="container mx-auto max-w-[1300px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br  rounded-xl flex items-center justify-center">
                  <img src={logo} alt="" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  PetShop
                </h2>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed max-w-md">
                Cửa hàng cung cấp đồ ăn, phụ kiện và dịch vụ chăm sóc thú cưng
                uy tín cho boss yêu của bạn 🐾
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-orange-600 text-sm" />
                  </div>
                  <span>0123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-orange-600 text-sm" />
                  </div>
                  <span>info@petshop.vn</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-orange-600 text-sm" />
                  </div>
                  <span>Xã Phúc Thịnh, Hà Nội</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Liên kết nhanh
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Sản phẩm", href: "#" },
                  { name: "Dịch vụ", href: "#" },
                  { name: "Khuyến mãi", href: "#" },
                  { name: "Liên hệ", href: "#" },
                  { name: "Về chúng tôi", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-700 group">
                      <span className=" border-orange-600">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">
                Kết nối với chúng tôi
              </h3>

              {/* Social icons */}
              <div className="flex gap-3 mb-6">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-pink-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-sky-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>

              {/* Newsletter signup */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 border border-orange-100">
                <h4 className="font-medium text-gray-800 mb-3">
                  Nhận tin khuyến mãi
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="px-2 py-1 rounded-lg border border-gray-200 text-sm  placeholder:text-sm "
                  />
                  <button className="px-2 py-2 bg-gradient-to-r  from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 text-sm font-medium ">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-orange-200/50 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                © {new Date().getFullYear()} PetShop. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Chính sách bảo mật
                </a>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Điều khoản sử dụng
                </a>
                <span className="flex items-center gap-1">
                  Made with <FaHeart className="text-red-500 text-xs" /> in
                  Vietnam
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
