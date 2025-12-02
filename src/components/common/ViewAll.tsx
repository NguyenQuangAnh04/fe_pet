import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

export default function ViewAll() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={() => navigate("/search")}
        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <span>Xem tất cả sản phẩm</span>
        <BsArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
