import { Star, User } from "lucide-react";
import { useMemo } from "react";
import { useProductReviewsBySlug } from "../../hook/review/useReview";
import type { ReviewDTO, ReviewStats } from "../../types/review";

interface ProductReviewsProps {
    slug: string;
}

export default function ProductReviews({ slug }: ProductReviewsProps) {
    // CALL API THỰC TẾ - Lấy reviews từ backend
    const { data, isLoading, error } = useProductReviewsBySlug(slug, 0);

    // Tính toán thống kê từ dữ liệu reviews (chỉ APPROVED)
    const stats: ReviewStats = useMemo(() => {
        if (!data?.data.reviews.content) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
            };
        }

        // Chỉ lấy review đã được duyệt
        const approvedReviews = data.data.reviews.content.filter(
            (r) => r.status === "APPROVED"
        );

        const total = approvedReviews.length;
        const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
        const avg = total > 0 ? sum / total : 0;

        const distribution = approvedReviews.reduce(
            (acc, r) => {
                acc[r.rating as keyof typeof acc]++;
                return acc;
            },
            { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        );

        return {
            averageRating: avg,
            totalReviews: total,
            ratingDistribution: distribution,
        };
    }, [data]);

    const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
        const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${starSize} ${star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-red-600 text-center">
                    Không thể tải đánh giá. Vui lòng thử lại sau.
                </p>
            </div>
        );
    }

    // Chỉ hiển thị review đã được duyệt
    const approvedReviews = data?.data.reviews.content.filter(
        (r) => r.status === "APPROVED"
    ) || [];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Đánh giá sản phẩm
            </h2>

            {stats.totalReviews === 0 ? (
                // Chưa có đánh giá
                <div className="text-center py-12 text-gray-500">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Chưa có đánh giá nào</p>
                    <p className="text-sm mt-2">
                        Mua sản phẩm và trở thành người đầu tiên đánh giá!
                    </p>
                </div>
            ) : (
                <>
                    {/* Rating Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                        {/* Average Rating */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-2">
                                {stats.averageRating.toFixed(1)}
                            </div>
                            {renderStars(Math.round(stats.averageRating), "lg")}
                            <p className="text-sm text-gray-600 mt-2">
                                {stats.totalReviews} đánh giá
                            </p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="col-span-2 space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count =
                                    stats.ratingDistribution[
                                    star as keyof typeof stats.ratingDistribution
                                    ];
                                const percentage =
                                    stats.totalReviews > 0
                                        ? (count / stats.totalReviews) * 100
                                        : 0;

                                return (
                                    <div key={star} className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700 w-8">
                                            {star}{" "}
                                            <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" />
                                        </span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-yellow-400 h-2 rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600 w-12 text-right">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reviews List - DATA TỪ API */}
                    <div className="space-y-4">
                        {approvedReviews.map((review: ReviewDTO) => (
                            <div
                                key={review.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                            >
                                {/* Review Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {review.fullName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(review.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {renderStars(review.rating)}
                                        {review.variant && (
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                {review.variant}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="ml-13">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button - nếu cần */}
                    {data?.data.reviews.totalPages && data.data.reviews.totalPages > 1 && (
                        <div className="mt-6 text-center">
                            <button className="px-6 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition font-medium text-sm">
                                Xem thêm đánh giá
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
