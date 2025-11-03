export interface ReviewDTO {
    id: number;
    userId: number | null;
    fullName: string;
    productId: number;
    variant: string;
    variantId: number | null;
    productName: string | null;
    orderId: number | null;
    rating: number;
    comment: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "ARCHIVED";
    createdAt: string;
    updatedAt: string | null;
}

export interface ReviewResponse {
    reviews: {
        content: ReviewDTO[];
        pageable: {
            pageNumber: number;
            pageSize: number;
            offset: number;
            unpaged: boolean;
            paged: boolean;
        };
        last: boolean;
        totalElements: number;
        totalPages: number;
        first: boolean;
        numberOfElements: number;
        size: number;
        number: number;
        empty: boolean;
    };
    totalPage: number;
    page: number;
}

export interface CreateReviewDTO {
    productId: number;
    variantId: number;
    orderId: number;
    rating: number;
    comment: string;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}
