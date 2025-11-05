import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

export default function PaymentResult() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    // Lấy params từ URL
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");
    const message = searchParams.get("message");

    useEffect(() => {
        // Giả lập loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const getStatusConfig = () => {
        // Status "00" = SUCCESS
        if (status === "00") {
            return {
                icon: <CheckCircle className="w-24 h-24 text-green-500" />,
                title: "Thanh toán thành công!",
                description: message || "Đơn hàng của bạn đã được thanh toán thành công.",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                textColor: "text-green-800",
                buttonColor: "bg-green-600 hover:bg-green-700"
            };
        }
        // Status "24" = CANCELLED
        else if (status === "24") {
            return {
                icon: <Clock className="w-24 h-24 text-yellow-500" />,
                title: "Thanh toán đã bị hủy",
                description: message || "Bạn đã hủy giao dịch thanh toán.",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
                textColor: "text-yellow-800",
                buttonColor: "bg-yellow-600 hover:bg-yellow-700"
            };
        }
        // Status "FAILED" hoặc các mã lỗi khác
        else if (status === "FAILED" || (status && status !== "00" && status !== "24")) {
            return {
                icon: <XCircle className="w-24 h-24 text-red-500" />,
                title: "Thanh toán thất bại",
                description: message || `Giao dịch không thành công. Mã lỗi: ${status}`,
                bgColor: "bg-red-50",
                borderColor: "border-red-200",
                textColor: "text-red-800",
                buttonColor: "bg-red-600 hover:bg-red-700"
            };
        }
        // Default
        else {
            return {
                icon: <AlertCircle className="w-24 h-24 text-gray-500" />,
                title: "Đang xử lý...",
                description: "Vui lòng đợi trong giây lát.",
                bgColor: "bg-gray-50",
                borderColor: "border-gray-200",
                textColor: "text-gray-800",
                buttonColor: "bg-gray-600 hover:bg-gray-700"
            };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Đang xử lý kết quả thanh toán...</p>
                </div>
            </div>
        );
    }

    const config = getStatusConfig();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-2xl p-8 shadow-xl`}>
                        <div className="text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                {config.icon}
                            </div>

                            {/* Title */}
                            <h1 className={`text-3xl font-bold ${config.textColor} mb-4`}>
                                {config.title}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 text-base">
                                {config.description}
                            </p>

                            {/* Order ID Card */}
                            {orderId && (
                                <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                                    <p className="text-xl font-bold text-gray-900">#{orderId}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                {/* Nếu thành công - Hiển thị nút "Xem đơn hàng" */}
                                {status === "00" && (
                                    <button
                                        onClick={() => navigate("/orders")}
                                        className={`w-full ${config.buttonColor} text-white py-3 px-6 rounded-lg transition-colors font-semibold text-base shadow-md`}
                                    >
                                        Xem đơn hàng của tôi
                                    </button>
                                )}

                                {/* Nếu hủy hoặc thất bại - Hiển thị nút "Thử lại" */}
                                {(status === "24" || (status && status !== "00")) && (
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className={`w-full ${config.buttonColor} text-white py-3 px-6 rounded-lg transition-colors font-semibold text-base shadow-md`}
                                    >
                                        Thử thanh toán lại
                                    </button>
                                )}

                                {/* Nút về trang chủ */}
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-base"
                                >
                                    Về trang chủ
                                </button>
                            </div>

                            {/* Footer note */}
                            {status === "00" && (
                                <p className="mt-6 text-sm text-gray-500">
                                    Cảm ơn bạn đã mua sắm tại PetCare! 🐾
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}