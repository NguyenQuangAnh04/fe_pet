import { Star, X } from "lucide-react";
import { useState } from "react";
import { useCreateReview } from "../../hook/review/useReview";
import type { CreateReviewDTO } from "../../types/review";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    productName: string;
    variantId: number;
    variantSize: string;
    orderId: number;
    productImage?: string;
}

export default function ReviewModal({
    isOpen,
    onClose,
    productId,
    productName,
    variantId,
    variantSize,
    orderId,
    productImage,
}: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");

    // CALL API THỰC TẾ - Gửi đánh giá lên backend
    const { mutateAsync: createReview, isPending } = useCreateReview();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Vui lòng nhập nội dung đánh giá");
            return;
        }

        const reviewData: CreateReviewDTO = {
            productId,
            variantId,
            orderId,
            rating,
            comment: comment.trim(),
        };

        try {
            // GỬI REQUEST LÊN SERVER
            await createReview(reviewData);
            setRating(5);
            setComment("");
            onClose();
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Đánh giá sản phẩm
                </h2>

                {/* Product Info */}
                <div className="flex gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                    {productImage && (
                        <img
                            src={productImage}
                            alt={productName}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                    )}
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900 line-clamp-2">
                            {productName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Kích thước: {variantSize}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Đánh giá của bạn <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2 items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-700">
                                {rating === 5 && "Tuyệt vời"}
                                {rating === 4 && "Hài lòng"}
                                {rating === 3 && "Bình thường"}
                                {rating === 2 && "Không tốt"}
                                {rating === 1 && "Rất tệ"}
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Nhận xét của bạn <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                            rows={5}
                            maxLength={500}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {comment.length}/500 ký tự
                        </p>
                    </div>

                    {/* Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-700">
                            <strong>Lưu ý:</strong> Đánh giá của bạn sẽ được kiểm duyệt trước
                            khi hiển thị công khai. Vui lòng đánh giá khách quan và trung
                            thực.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            disabled={isPending}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isPending || !comment.trim()}
                        >
                            {isPending ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
