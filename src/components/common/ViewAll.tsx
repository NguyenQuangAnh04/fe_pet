import { useNavigate } from "react-router-dom";

export default function ViewAll() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => navigate("/search")}
        className="relative overflow-hidden rounded-xl shadow border border-gray-300 px-6 py-2 text-black group"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
          Xem thêm
        </span>
        <span className="absolute inset-0 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full group-hover:border-blue-400"></span>
      </button>
    </div>
  );
}
