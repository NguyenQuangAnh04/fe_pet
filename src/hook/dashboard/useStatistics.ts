import {
  getOrderStatusCount,
  getAppointStatusCount,
  getAppointTotalRevenue,
  getOrderTotalRevenue,
  getAppointDailyRevenue,
  getAppointMonthlyRevenue,
  getOrderDailyRevenue,
  getOrderMonthlyRevenue,
  getTopExam,
  getTopProduct
} from "../../api/dashboardService"
import { useQuery } from "@tanstack/react-query";
import type { OrderDashboardDTO, AppointmentDashboardDTO } from "../../types/dashboard"

type StatusCount = [string, number];

//Order
export function useQueryCountStatus() {
  return useQuery<StatusCount[]>({
    queryKey: ["dashboard", "order", "status-count"],
    queryFn: async () => {
      const res = await getOrderStatusCount();
      return res.data.data as StatusCount[];
    },
    staleTime: 3 * 60 * 1000, // 3 phút cho status counts
  });
}

export function useQueryMonthlyRevenue(year : number) {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["dashboard", "order", "monthly-revenue", year],
    queryFn: async () => {
      const res = await getOrderMonthlyRevenue(year);
      return res.data.data as OrderDashboardDTO[];
    },
    staleTime: 5 * 60 * 1000, // 5 phút cho monthly data
  });
}

export function useQueryDailyRevenue() {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["dashboard", "order", "daily-revenue"],
    queryFn: async () => {
      const res = await getOrderDailyRevenue();
      return res.data.data as OrderDashboardDTO[];
    },
    staleTime: 2 * 60 * 1000, // 2 phút cho daily data (cần fresh hơn)
  });
}

export function useQueryTotalRevenue() {
  return useQuery<number>({
    queryKey: ["dashboard", "order", "total-revenue"],
    queryFn: async () => {
      const res = await getOrderTotalRevenue();
      return res.data.data as number;
    },
    staleTime: 3 * 60 * 1000, // 3 phút cho total revenue
  });
}

export function useQueryTopProduct() {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["dashboard", "order", "top-product"],
    queryFn: async () => {
      const res = await getTopProduct();
      return res.data.data as OrderDashboardDTO[];
    },
    staleTime: 5 * 60 * 1000, // 5 phút cho top products
  });
}

//Appointment
export function useQueryAppointCountStatus() {
  return useQuery<StatusCount[]>({
    queryKey: ["dashboard", "appointment", "status-count"],
    queryFn: async () => {
      const res = await getAppointStatusCount();
      return res.data.data as StatusCount[];
    },
    staleTime: 3 * 60 * 1000, // 3 phút cho status counts
  });
}

export function useQueryAppointTotalRevenue() {
  return useQuery<number>({
    queryKey: ["dashboard", "appointment", "total-revenue"],
    queryFn: async () => {
      const res = await getAppointTotalRevenue();
      return res.data.data as number;
    },
    staleTime: 3 * 60 * 1000, // 3 phút cho total revenue
  });
}

export function useQueryAppointDailyRevenue() {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["dashboard", "appointment", "daily-revenue"],
    queryFn: async () => {
      const res = await getAppointDailyRevenue();
      return res.data.data as AppointmentDashboardDTO[];
    },
    staleTime: 2 * 60 * 1000, // 2 phút cho daily data
  });
}

export function useQueryAppointMonthlyRevenue(year : number) {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["dashboard", "appointment", "monthly-revenue", year],
    queryFn: async () => {
      const res = await getAppointMonthlyRevenue(year);
      return res.data.data as AppointmentDashboardDTO[];
    },
    staleTime: 5 * 60 * 1000, // 5 phút cho monthly data
  });
}

export function useQueryTopExam() {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["dashboard", "appointment", "top-exam"],
    queryFn: async () => {
      const res = await getTopExam();
      return res.data.data as AppointmentDashboardDTO[];
    },
    staleTime: 5 * 60 * 1000, // 5 phút cho top exams
  });
}