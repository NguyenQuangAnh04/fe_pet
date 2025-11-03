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
    <footer id="contact" className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800 border-t border-orange-100">
      <div className="py-8">
        <div className="container mx-auto  max-w-[1440px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* About */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <img src={logo} alt="PetShop" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold text-orange-600">
                  PetShop
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Cửa hàng cung cấp đồ ăn, phụ kiện và dịch vụ chăm sóc thú cưng uy tín 🐾
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-orange-600 text-xs" />
                  </div>
                  <span>0123 456 789</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-orange-600 text-xs" />
                  </div>
                  <span>info@petshop.vn</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-orange-600 text-xs" />
                  </div>
                  <span>Xã Phúc Thịnh, Hà Nội</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-gray-800">
                Liên kết nhanh
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "Sản phẩm", href: "#" },
                  { name: "Dịch vụ", href: "#" },
                  { name: "Khuyến mãi", href: "#" },
                  { name: "Liên hệ", href: "#" },
                  { name: "Về chúng tôi", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-orange-600 transition-colors inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-gray-800">
                Kết nối
              </h3>

              {/* Social icons */}
              <div className="flex gap-2 mb-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow transition-all"
                >
                  <FaFacebook className="text-base" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-pink-500 hover:shadow transition-all"
                >
                  <FaInstagram className="text-base" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-sky-500 hover:shadow transition-all"
                >
                  <FaTwitter className="text-base" />
                </a>
              </div>

              {/* Newsletter */}
              <div className="bg-white/70 rounded-lg p-3 border border-orange-100">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Nhận tin khuyến mãi
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-orange-300 transition"
                  />
                  <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-xs font-medium whitespace-nowrap">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-orange-200/50 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
              <div>
                © {new Date().getFullYear()} PetShop. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Chính sách bảo mật
                </a>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Điều khoản
                </a>
                <span className="flex items-center gap-1">
                  Made with <FaHeart className="text-red-500 text-[10px]" /> in VN
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