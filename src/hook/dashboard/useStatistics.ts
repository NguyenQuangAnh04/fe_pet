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
    queryKey: ["order"],
    queryFn: async () => {
      const res = await getOrderStatusCount();
      return res.data.data as StatusCount[];
    },
  });
}

export function useQueryMonthlyRevenue(year : number) {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["monthRevenueOrder"],
    queryFn: async () => {
      const res = await getOrderMonthlyRevenue(year);
      return res.data.data as OrderDashboardDTO[];
    },
  });
}

export function useQueryDailyRevenue() {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["dailyRevenueOrder"],
    queryFn: async () => {
      const res = await getOrderDailyRevenue();
      return res.data.data as OrderDashboardDTO[];
    },
  });
}

export function useQueryTotalRevenue() {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["orderTotalRevenue"],
    queryFn: async () => {
      const res = await getOrderTotalRevenue();
      return res.data.data as OrderDashboardDTO[];
    },
  });
}

export function useQueryTopProduct() {
  return useQuery<OrderDashboardDTO[]>({
    queryKey: ["topProduct"],
    queryFn: async () => {
      const res = await getTopProduct();
      return res.data.data as OrderDashboardDTO[];
    },
  });
}

//Appointment
export function useQueryAppointCountStatus() {
  return useQuery<StatusCount[]>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const res = await getAppointStatusCount();
      return res.data.data as StatusCount[];
    },
  });
}

export function useQueryAppointTotalRevenue() {
  return useQuery<number>({
    queryKey: ["appointTotalRevenue"],
    queryFn: async () => {
      const res = await getAppointTotalRevenue();
      return res.data.data as number;
    },
  });
}

export function useQueryAppointDailyRevenue() {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["dailyRevenueAppoint"],
    queryFn: async () => {
      const res = await getAppointDailyRevenue();
      return res.data.data as AppointmentDashboardDTO[];
    },
  });
}

export function useQueryAppointMonthlyRevenue(year : number) {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["monthRevenueAppoint"],
    queryFn: async () => {
      const res = await getAppointMonthlyRevenue(year);
      return res.data.data as AppointmentDashboardDTO[];
    },
  });
}

export function useQueryTopExam() {
  return useQuery<AppointmentDashboardDTO[]>({
    queryKey: ["topExam"],
    queryFn: async () => {
      const res = await getTopExam();
      return res.data.data as AppointmentDashboardDTO[];
    },
  });
}