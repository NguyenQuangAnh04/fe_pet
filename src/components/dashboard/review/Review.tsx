import { Eye, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetAllReviews,
  useUpdateReviewStatus,
} from "../../../hook/review/useReview";
import type { ReviewDTO } from "../../../types/review";
import ModalViewReview from "./ModalViewReview";
import { useAuth } from "../../../context/AuthContext";

type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED";

const Review = () => {
  const { user } = useAuth();
  const isUser = user?.nameRole === "USER";
  const [page, setPage] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data, isLoading } = useGetAllReviews(page, phoneNumber);
  console.log(data);

  const { mutateAsync: updateStatus } = useUpdateReviewStatus();

  const [selectedReview, setSelectedReview] = useState<ReviewDTO | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: ReviewStatus) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      ARCHIVED: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: ReviewStatus) => {
    const labels = {
      PENDING: "Chờ duyệt",
      APPROVED: "Đã duyệt",
      REJECTED: "Đã từ chối",
      ARCHIVED: "Đã gỡ bài",
    };
    return labels[status];
  };

  const handleUpdateStatus = async (id: number, status: ReviewStatus) => {
    const result = await Swal.fire({
      title: "Xác nhận",
      text: `Bạn có chắc muốn ${
        status === "APPROVED" ? "duyệt" : "từ chối"
      } đánh giá này?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "APPROVED" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: status === "APPROVED" ? "Duyệt" : "Từ chối",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await updateStatus({ id, status });
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: `Đã ${status === "APPROVED" ? "duyệt" : "từ chối"} đánh giá!`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: error?.response?.data?.Error || "Có lỗi xảy ra!",
        });
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
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

  return (
    <div className="p-6 ml-[250px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h1>
        <p className="text-[10px] text-gray-600 mt-1">
          Duyệt và quản lý đánh giá sản phẩm từ khách hàng
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-medium text-gray-700 mb-2">
              Tìm theo số điện thoại
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-yellow-800">
                Chờ duyệt
              </p>
              <p className="text-2xl font-bold text-yellow-900">
                {data?.data.reviews.content.filter(
                  (r) => r.status === "PENDING"
                ).length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-green-800">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-900">
                {data?.data.reviews.content.filter(
                  (r) => r.status === "APPROVED"
                ).length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-green-700 fill-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-red-800">Đã từ chối</p>
              <p className="text-2xl font-bold text-red-900">
                {data?.data.reviews.content.filter(
                  (r) => r.status === "REJECTED"
                ).length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-gray-700">Đã gỡ</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.data.reviews.content.filter(
                  (r) => r.status === "ARCHIVED"
                ).length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nội dung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  </td>
                </tr>
              ) : data?.data.reviews.content.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Không có đánh giá nào
                  </td>
                </tr>
              ) : (
                data?.data.reviews.content.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-[10px] font-medium text-gray-900">
                      #{review.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[10px] font-medium text-gray-900">
                        {review.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-gray-900 max-w-xs truncate">
                        {review.productName || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {review.variant}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-gray-900 max-w-md truncate">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          review.status
                        )}`}
                      >
                        {getStatusLabel(review.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[10px] text-gray-500">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        {!isUser && review.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(review.id, "APPROVED")
                              }
                              className="px-3 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(review.id, "REJECTED")
                              }
                              className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition"
                            >
                              Từ chối
                            </button>
                          </>
                        )}

                        {!isUser && review.status === "APPROVED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(review.id, "ARCHIVED")
                            }
                            className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 border border-red-600 rounded transition"
                          >
                            Gỡ
                          </button>
                        )}

                        {!isUser && review.status === "REJECTED" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(review.id, "APPROVED")
                            }
                            className="px-3 py-1 text-xs font-medium text-green-600 hover:text-green-800 border border-green-600 rounded transition"
                          >
                            Duyệt lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.data.reviews.totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-gray-700">
                Trang <span className="font-medium">{page + 1}</span> /{" "}
                {data.data.reviews.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 text-[10px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Trước
                </button>
                <button
                  onClick={() =>
                    setPage(
                      Math.min(data.data.reviews.totalPages - 1, page + 1)
                    )
                  }
                  disabled={page >= data.data.reviews.totalPages - 1}
                  className="px-4 py-2 text-[10px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal xem chi tiết */}
      {showModal && selectedReview && (
        <ModalViewReview
          review={selectedReview}
          onClose={() => {
            setShowModal(false);
            setSelectedReview(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      <div className="flex justify-end mt-4">
        {data && data.data.totalPage > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className={`w-[30px] h-[30px] rounded border ${
                page === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-400 text-white"
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: data.data.totalPage }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`shadow w-[30px] h-[30px] text-black rounded ${
                  page === i ? "bg-blue-400 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, data.data.totalPage - 1))
              }
              disabled={page === data.data.totalPage - 1}
              className={` rounded border w-[30px] h-[30px] ${
                page === data.data.totalPage - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-400 text-white"
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
