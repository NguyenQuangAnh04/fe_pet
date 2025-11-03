import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
    createReview,
    getAllReviews,
    getProductReviewsBySlug,
    updateReviewStatus,
} from "../../api/reviewService";
import type { CreateReviewDTO } from "../../types/review";

// Hook lấy tất cả đánh giá - CALL API THỰC TẾ
export const useGetAllReviews = (page: number = 0, phoneNumber?: string) => {
    return useQuery({
        queryKey: ["reviews", page, phoneNumber],
        queryFn: () => getAllReviews(page, phoneNumber),
    });
};

// Hook lấy đánh giá theo slug sản phẩm - CALL API THỰC TẾ
export const useProductReviewsBySlug = (slug: string, page: number = 0) => {
    return useQuery({
        queryKey: ["reviews", slug, page],
        queryFn: () => getProductReviewsBySlug(slug, page),
        enabled: !!slug,
    });
};

// Hook tạo đánh giá - CALL API THỰC TẾ
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewDTO) => createReview(data),
        onSuccess: () => {
            toast.success("Đánh giá của bạn đã được gửi và đang chờ duyệt!");
            // Invalidate để reload lại danh sách reviews
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Có lỗi xảy ra khi gửi đánh giá"
            );
        },
    });
};

// Hook cập nhật trạng thái đánh giá (admin) - CALL API THỰC TẾ
export const useUpdateReviewStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: number;
            status: "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED";
        }) => updateReviewStatus(id, status),
        onSuccess: () => {
            toast.success("Cập nhật trạng thái đánh giá thành công!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: () => {
            toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
        },
    });
};
