import { useState, useMemo } from "react";
import {
  useQueryAppointCountStatus,
  useQueryAppointDailyRevenue,
  useQueryAppointMonthlyRevenue,
  useQueryAppointTotalRevenue,
  useQueryCountStatus,
  useQueryDailyRevenue,
  useQueryMonthlyRevenue,
  useQueryTopExam,
  useQueryTopProduct,
  useQueryTotalRevenue
} from "../../../hook/dashboard/useStatistics";

import { RevenueCards } from "./Cards/RevenueCards";
import { DailyRevenueChart } from "./Charts/DailyRevenueChart";
import { MonthlyRevenueChart } from "./Charts/MonthlyRevenueChart";
import { StatusChart } from "./Charts/StatusChart";
import { TopItemsChart } from "./Charts/TopItemsChart";
import { DashboardSkeleton } from "./Shared/SkeletonLoader";
import { RefreshButton } from "./Shared/RefreshButton";

export default function Dashboard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartType, setChartType] = useState<"product" | "exam">("product");
  const [statusChartType, setStatusChartType] = useState<"order" | "appoint">("order");
  const [dailyChartType, setDailyChartType] = useState<"order" | "appoint">("order");
  const [monthlyChartType, setMonthlyChartType] = useState<"order" | "appoint">("order");
  const [refreshKey, setRefreshKey] = useState(0);

  // Gọi API với refreshKey để trigger refetch khi cần
  const { data: appointStatusCounts, isLoading: appointStatusLoading, refetch: refetchAppointStatus } = useQueryAppointCountStatus();
  const { data: appointTotalRevenue, isLoading: appointRevenueLoading, refetch: refetchAppointRevenue } = useQueryAppointTotalRevenue();
  const { data: appointDaily, isLoading: appointDailyLoading, refetch: refetchAppointDaily } = useQueryAppointDailyRevenue();
  const { data: appointMonthly, isLoading: appointMonthlyLoading, refetch: refetchAppointMonthly } = useQueryAppointMonthlyRevenue(year);
  const { data: topExam, isLoading: topExamLoading, refetch: refetchTopExam } = useQueryTopExam();

  const { data: orderDaily, isLoading: orderDailyLoading, refetch: refetchOrderDaily } = useQueryDailyRevenue();
  const { data: orderMonthly, isLoading: orderMonthlyLoading, refetch: refetchOrderMonthly } = useQueryMonthlyRevenue(year);
  const { data: topProduct, isLoading: topProductLoading, refetch: refetchTopProduct } = useQueryTopProduct();
  const { data: orderStatusCounts, isLoading: orderStatusLoading, refetch: refetchOrderStatus } = useQueryCountStatus();
  const { data: orderTotalRevenue, isLoading: orderRevenueLoading, refetch: refetchOrderRevenue } = useQueryTotalRevenue();

  // Kiểm tra trạng thái loading tổng thể
  const isLoading = useMemo(() =>
    appointStatusLoading || appointRevenueLoading || appointDailyLoading ||
    appointMonthlyLoading || topExamLoading || orderDailyLoading ||
    orderMonthlyLoading || topProductLoading || orderStatusLoading || orderRevenueLoading,
    [
      appointStatusLoading, appointRevenueLoading, appointDailyLoading,
      appointMonthlyLoading, topExamLoading, orderDailyLoading,
      orderMonthlyLoading, topProductLoading, orderStatusLoading, orderRevenueLoading
    ]);

  // Hàm refresh tất cả data
  const refreshAllData = () => {
    refetchAppointStatus();
    refetchAppointRevenue();
    refetchAppointDaily();
    refetchAppointMonthly();
    refetchTopExam();
    refetchOrderDaily();
    refetchOrderMonthly();
    refetchTopProduct();
    refetchOrderStatus();
    refetchOrderRevenue();
    setRefreshKey(prev => prev + 1);
  };

  // Xử lý dữ liệu chung
  const monthsBase = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ month: i + 1, revenue: 0, count: 0 })), []);

  const monthlyOrderData = useMemo(() => {
    if (!orderMonthly) return monthsBase;
    const merged = monthsBase.map((m) => ({ ...m }));
    orderMonthly.forEach((item) => {
      const idx = item.month - 1;
      merged[idx].revenue = item.revenue ?? 0;
      merged[idx].count = item.orderCount ?? 0;
    });
    return merged;
  }, [orderMonthly, refreshKey]);

  const monthlyAppointData = useMemo(() => {
    if (!appointMonthly) return monthsBase;
    const merged = monthsBase.map((m) => ({ ...m }));
    appointMonthly.forEach((item) => {
      const idx = item.month - 1;
      merged[idx].revenue = item.revenue ?? 0;
      merged[idx].count = item.appointCount ?? 0;
    });
    return merged;
  }, [appointMonthly, refreshKey]);

  const dailyOrderData = useMemo(() =>
    (orderDaily ?? []).map((d) => ({
      date: d.date ? new Date(d.date).toLocaleDateString() : "",
      revenue: d.revenue ?? 0,
      count: d.orderCount ?? 0,
    })),
    [orderDaily, refreshKey]);

  const dailyAppointData = useMemo(() =>
    (appointDaily ?? []).map((d) => ({
      date: d.date ? new Date(d.date).toLocaleDateString() : "",
      revenue: d.revenue ?? 0,
      count: d.appointCount ?? 0,
    })),
    [appointDaily, refreshKey]);

  const dailyData = dailyChartType === "order" ? dailyOrderData : dailyAppointData;
  const monthlyData = monthlyChartType === "order" ? monthlyOrderData : monthlyAppointData;

  const statusData = useMemo(() =>
    statusChartType === "order"
      ? (orderStatusCounts ?? []).map(([status, count]) => ({ name: status, value: count }))
      : (appointStatusCounts ?? []).map(([status, count]) => ({ name: status, value: count })),
    [orderStatusCounts, appointStatusCounts, statusChartType, refreshKey]);

  const COLORS = useMemo(() =>
    statusChartType === "order"
      ? ["#2563eb", "#16a34a", "#60a5fa", "#f59e0b", "#ef4444"]
      : ["#7c3aed", "#dc2626", "#a78bfa", "#f97316", "#10b981"],
    [statusChartType]);

  const topItemsData = useMemo(() =>
    chartType === "product"
      ? (topProduct ?? []).map((item) => ({ name: item.productName, total: item.totalPro, fullName: item.productName }))
      : (topExam ?? []).map((item) => ({ name: item.examinationName, total: item.totalExamination, fullName: item.examinationName })),
    [topProduct, topExam, chartType, refreshKey]);

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN");

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-[250px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Thống kê</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Năm</span>
            <select
              className="border rounded px-2 py-1"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              aria-label="Chọn năm"
            >
              {[year - 2, year - 1, year, year + 1].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <RefreshButton onRefresh={refreshAllData} />
        </div>
      </div>

      {/* Cards */}
      <div className="gap-5">
        <RevenueCards
          orderTotalRevenue={orderTotalRevenue || 0}
          appointTotalRevenue={appointTotalRevenue || 0}
          formatCurrency={formatCurrency}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DailyRevenueChart
          dailyData={dailyData}
          dailyChartType={dailyChartType}
          setDailyChartType={setDailyChartType}
        />
        <MonthlyRevenueChart
          monthlyData={monthlyData}
          monthlyChartType={monthlyChartType}
          setMonthlyChartType={setMonthlyChartType}
          year={year}
        />
      </div>
      {/* Trạng thái + Top cùng 1 hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StatusChart
          statusData={statusData}
          statusChartType={statusChartType}
          setStatusChartType={setStatusChartType}
          COLORS={COLORS}
        />
        <TopItemsChart
          topItemsData={topItemsData}
          chartType={chartType}
          setChartType={setChartType}
        />
      </div>
    
    </div>
  );
}