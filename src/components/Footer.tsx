import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f7c883] text-gray-800 py-10 mt-12">
      <div className="container mx-auto max-w-[1300px] w-full  grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">PetShop</h2>
          <p>
            Cửa hàng cung cấp đồ ăn, phụ kiện và dịch vụ chăm sóc thú cưng uy
            tín cho boss yêu của bạn 🐾
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Dịch vụ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Về chúng tôi
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#">
              <FaFacebook className="hover:text-blue-600" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-sky-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} PetShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
