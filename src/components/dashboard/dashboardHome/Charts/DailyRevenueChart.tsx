// components/Dashboard/Charts/DailyRevenueChart.tsx
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../Shared/CustomTooltip";
import { RenderLegend } from "../Shared/RenderLegend";

interface DailyRevenueChartProps {
  dailyData: any[];
  dailyChartType: "order" | "appoint";
  setDailyChartType: (type: "order" | "appoint") => void;
}

export const DailyRevenueChart = ({ dailyData, dailyChartType, setDailyChartType }: DailyRevenueChartProps) => (
  <div className="bg-white rounded-lg shadow p-5 mb-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
      <div className="font-semibold text-lg text-gray-800 mb-2 md:mb-0">
        Doanh thu theo ngày
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-wrap">
        <button
          className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${dailyChartType === "order" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setDailyChartType("order")}
        >
          Đơn hàng
        </button>
        <button
          className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${dailyChartType === "appoint" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setDailyChartType("appoint")}
        >
          Lịch khám
        </button>
      </div>
    </div>
    <div className="h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} minTickGap={8} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip content={<CustomTooltip chartType={dailyChartType} />} />
          <Legend content={<RenderLegend />} />
          <Line type="monotone" dataKey="revenue" name="Doanh thu"
            stroke={dailyChartType === "order" ? "#2563eb" : "#7c3aed"} strokeWidth={2} />
          <Line type="monotone" dataKey="count" name={dailyChartType === "order" ? "Số đơn" : "Số lịch"}
            stroke={dailyChartType === "order" ? "#16a34a" : "#dc2626"} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);