import type { CreateReviewDTO, ReviewResponse } from "../types/review";
import api from "./axiosClient";
import axiosClient from "./axiosClient";

// Lấy tất cả đánh giá (có thể filter theo phoneNumber)
export const getAllReviews = (page: number = 0, phoneNumber?: string) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (phoneNumber) {
        params.append("phoneNumber", phoneNumber);
    }
    return api.get<ReviewResponse>(`/product-review?${params.toString()}`);
};

// Lấy đánh giá theo slug sản phẩm - CALL API THỰC TẾ
export const getProductReviewsBySlug = (slug: string, page: number = 0) => {
    return api.get<ReviewResponse>(
        `/product-review/details?slug=${slug}&page=${page}`
    );
};

// Tạo đánh giá mới - CALL API THỰC TẾ
export const createReview = (data: CreateReviewDTO) => {
    return api.post<string>("/product-review/create-review", data);
};

// Cập nhật trạng thái đánh giá (admin only)
export const updateReviewStatus = (
    id: number,
    status: "PENDING" | "APPROVED" | "REJECTED"
) => {
    return api.patch(`/product-review/${id}/status?status=${status}`);
};
