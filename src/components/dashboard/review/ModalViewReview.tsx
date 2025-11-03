import { Star, User, X } from "lucide-react";
import type { ReviewDTO } from "../../../types/review";

interface ModalViewReviewProps {
    review: ReviewDTO;
    onClose: () => void;
    onUpdateStatus: (id: number, status: "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED") => Promise<void>;
}

const ModalViewReview = ({ review, onClose, onUpdateStatus }: ModalViewReviewProps) => {
    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
            APPROVED: "bg-green-100 text-green-800 border-green-300",
            REJECTED: "bg-red-100 text-red-800 border-red-300",
            ARCHIVED: "bg-gray-100 text-gray-800"
        };
        return colors[status as keyof typeof colors];
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            PENDING: "Chờ duyệt",
            APPROVED: "Đã duyệt",
            REJECTED: "Đã từ chối",
            ARCHIVED: "Đã gỡ"

        };
        return labels[status as keyof typeof labels];
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Chi tiết đánh giá #{review.id}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <span
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
                                review.status
                            )}`}
                        >
                            {getStatusLabel(review.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                            {formatDate(review.createdAt)}
                        </span>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Thông tin khách hàng
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <User className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{review.fullName}</p>
                                {review.userId && (
                                    <p className="text-sm text-gray-500">User ID: {review.userId}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Thông tin sản phẩm
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Sản phẩm:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {review.productName || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Phân loại:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {review.variant}
                                </span>
                            </div>
                            {review.orderId && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Mã đơn hàng:</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        #{review.orderId}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Đánh giá</h3>
                        <div className="flex items-center gap-3">
                            {renderStars(review.rating)}
                            <span className="text-lg font-bold text-orange-600">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Nội dung đánh giá</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {review.comment}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        {review.status === "PENDING" && (
                            <>
                                <button
                                    onClick={() => {
                                        onUpdateStatus(review.id, "APPROVED");
                                        onClose();
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                                >
                                    Duyệt đánh giá
                                </button>
                                <button
                                    onClick={() => {
                                        onUpdateStatus(review.id, "REJECTED");
                                        onClose();
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
                                >
                                    Từ chối
                                </button>
                            </>
                        )}

                        {review.status === "APPROVED" && (
                            <button
                                onClick={() => {
                                    onUpdateStatus(review.id, "ARCHIVED");
                                    onClose();
                                }}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
                            >
                                Gỡ đánh giá
                            </button>
                        )}

                        {review.status === "ARCHIVED" && (
                            <button
                                onClick={() => {
                                    onUpdateStatus(review.id, "APPROVED");
                                    onClose();
                                }}
                                className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                            >
                                Duyệt lại
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalViewReview;
