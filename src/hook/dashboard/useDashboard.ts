import { getOrderStatusCount, getAppointStatusCount, getAppointTotalRevenue, getOrderTotalRevenue } from "../../api/dashboardService"
import { useQuery } from "@tanstack/react-query";

type StatusCount = [string, number];

export function useQueryCountStatus() {
  return useQuery<StatusCount[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await getOrderStatusCount();
      return res.data.data as StatusCount[];
    },
  });
}

export function useQueryAppointCountStatus() {
  return useQuery<StatusCount[]>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const res = await getAppointStatusCount();
      return res.data.data as StatusCount[];
    },
  });
}

export function useQueryTotalRevenue() {
  return useQuery<number>({
    queryKey: ["orderTotalRevenue"],
    queryFn: async () => {
      const res = await getOrderTotalRevenue();
      return res.data.data as number;
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
