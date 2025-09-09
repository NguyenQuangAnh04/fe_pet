export interface OrderDashboardDTO {
    date: Date | null;
    revenue: number;
    status: OrderStatus;
    orderCount: number;
    productName: string;
    totalPro: number;
    month: number;
}

export enum OrderStatus {
    ALL = "",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export interface AppointmentDashboardDTO {
    date: Date | null;
    month: number;
    revenue: number;
    status: AppointStatus;
    appointCount: number;
    examinationName: string;
    totalExamination: number;
}

export enum AppointStatus {
    ALL = "",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}