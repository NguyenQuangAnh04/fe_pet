import api from "./axiosClient";

export interface VNPayPaymentRequest {
    orderId: string;
    amount: number;
}

export interface VNPayReturnResponse {
    status: string;
    orderId: string;
    message: string;
}

export function createPayment(orderId: string, amount: number) {
    return api.get<string>("/vnpay/create-payment", {
        params: { orderId, amount }
    });
}

export async function vnPayReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());

    try {
        const response = await api.get<VNPayReturnResponse>("/vnpay/return", {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error("VNPay return error:", error);
        throw error;
    }
}