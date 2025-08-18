import React, { useState } from 'react';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface RatingProps {
  initialReviews?: Review[];
}

const Rating: React.FC<RatingProps> = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState<Review[]>(
    initialReviews.length > 0 ? initialReviews : [
      {
        id: 1,
        userName: "Nguyễn Minh Anh",
        rating: 5,
        comment: "Sản phẩm rất tốt, mèo nhà tôi rất thích. Chất lượng đúng như mô tả.",
        date: "2024-03-15",
        avatar: "https://ui-avatars.com/api/?name=Nguyen+Minh+Anh&background=ff6b35&color=fff"
      },
      {
        id: 2,
        userName: "Trần Văn Bình",
        rating: 4,
        comment: "Thức ăn tốt, mèo ăn ngon. Giá cả hợp lý. Sẽ mua lại.",
        date: "2024-03-10",
        avatar: "https://ui-avatars.com/api/?name=Tran+Van+Binh&background=34d399&color=fff"
      },
      {
        id: 3,
        userName: "Lê Thị Hoa",
        rating: 5,
        comment: "Giao hàng nhanh, đóng gói cẩn thận. Mèo nhà tôi rất thích loại thức ăn này.",
        date: "2024-03-08",
        avatar: "https://ui-avatars.com/api/?name=Le+Thi+Hoa&background=8b5cf6&color=fff"
      }
    ]
  );

  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  // Tính điểm trung bình
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  // Đếm số lượng đánh giá theo sao
  const ratingCounts = [5, 4, 3, 2, 1].map(star => 
    reviews.filter(review => review.rating === star).length
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.userName.trim() && newReview.comment.trim()) {
      const review: Review = {
        id: Date.now(),
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newReview.userName)}&background=ff6b35&color=fff`
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ userName: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderInteractiveStars = (currentRating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            title={`Đánh giá ${star} sao`}
            aria-label={`Đánh giá ${star} sao`}
            className={`w-8 h-8 ${
              star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">({currentRating}/5)</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h2>
        
        {/* Tổng quan đánh giá */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                {renderStars(Math.round(averageRating), 'w-6 h-6')}
                <span className="ml-2 text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
                <span className="ml-1 text-gray-600">/ 5</span>
              </div>
              <p className="text-gray-600">
                Dựa trên {reviews.length} đánh giá
              </p>
            </div>
            
            {/* Phân bố đánh giá */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="flex items-center text-sm">
                  <span className="w-4 text-gray-600">{star}</span>
                  <svg className="w-4 h-4 text-yellow-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mx-2">
                    <div
                      className={`bg-yellow-400 h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${reviews.length > 0 ? (ratingCounts[index] / reviews.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-600">({ratingCounts[index]})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nút viết đánh giá */}
        <div className="mb-6">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {showReviewForm ? 'Hủy đánh giá' : 'Viết đánh giá'}
          </button>
        </div>

        {/* Form viết đánh giá */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đánh giá
                </label>
                {renderInteractiveStars(newReview.rating, (rating) => 
                  setNewReview({...newReview, rating})
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhận xét
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Danh sách đánh giá */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Các đánh giá ({reviews.length})</h3>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating, 'w-4 h-4')}
                          <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;