export interface DashboardDTP {
    date: Date | null;
    revenue: number;
    status: OrderStatus;
    orderCount: number;
    productName: string;
    totalPro: number;
}

export enum OrderStatus {
    ALL = "",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}