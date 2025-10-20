import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Review {
    id: number;
    name: string;
    petName: string;
    rating: number;
    comment: string;
    image: string;
    date: string;
}

const CustomerFeedback = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const feedbackData: Review[] = [
            {
                id: 1,
                name: "Nguyễn Thị Lan",
                petName: "Miu (Mèo)",
                rating: 5,
                comment:
                    "Dịch vụ khám sức khỏe rất chuyên nghiệp. Các bác sĩ rất tận tâm và dễ dàng giao tiếp. Miu khỏe mạnh hơn rất nhiều sau khi khám!",
                image:
                    "https://images.unsplash.com/photo-1494256997604-b6f8dd0d9d78?w=400&h=400&fit=crop",
                date: "20/10/2025",
            },
            {
                id: 2,
                name: "Trần Minh Phong",
                petName: "Max (Chó)",
                rating: 5,
                comment:
                    "Chất lượng sản phẩm rất tốt, giá cả hợp lý. Tôi đã mua thức ăn cho Max ở đây và cảm thấy rất hài lòng. Max rất thích!",
                image:
                    "https://images.unsplash.com/photo-1587300411107-d7aa3c886b58?w=400&h=400&fit=crop",
                date: "18/10/2025",
            },
            {
                id: 3,
                name: "Phạm Hương",
                petName: "Bella (Chó)",
                rating: 4,
                comment:
                    "Giao dịch nhanh chóng, sản phẩm đảm bảo chất lượng. Bella rất yêu thích các sản phẩm và đồ chơi từ cửa hàng này!",
                image:
                    "https://images.unsplash.com/photo-1558159992-b280a9d65a0a?w=400&h=400&fit=crop",
                date: "15/10/2025",
            },
        ];
        setReviews(feedbackData);
    }, []);

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={16}
                        className={`${index < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="py-12 bg-white rounded-lg my-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ⭐ Đánh giá của Khách hàng
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Những phản hồi thực tế từ những người yêu thích thú cưng của chúng
                        tôi
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                        >
                            {/* Rating Stars */}
                            <div className="mb-4">
                                {renderStars(review.rating)}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 text-sm mb-4 leading-relaxed italic">
                                "{review.comment}"
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                                {/* <img
                                    src={review.image}
                                    alt={review.petName}
                                    className="w-12 h-12 rounded-full object-cover"
                                /> */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {review.name}
                                    </p>
                                    <p className="text-gray-600 text-xs">
                                        {review.petName} • {review.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Reviews Button */}
                <div className="text-center mt-8">
                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                        Xem tất cả đánh giá →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
