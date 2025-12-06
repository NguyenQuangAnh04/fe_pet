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

// ✅ Chuẩn hóa dữ liệu 7 ngày gần nhất
function normalizeLast7Days(data: any[]) {
  const map = new Map();
  data.forEach((item) => {
    map.set(item.date, item); // item.date dạng "02/12"
  });

  const result = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const dateString =
      String(d.getDate()).padStart(2, "0") +
      "/" +
      String(d.getMonth() + 1).padStart(2, "0");

    result.push(
      map.get(dateString) || {
        date: dateString,
        revenue: 0,
        count: 0,
      }
    );
  }

  return result;
}

export const DailyRevenueChart = ({
  dailyData,
  dailyChartType,
  setDailyChartType,
}: DailyRevenueChartProps) => {
  const normalizedData = normalizeLast7Days(dailyData);

  return (
    <div className="bg-white rounded-lg shadow p-5 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
        <div className="font-semibold text-lg text-gray-800 mb-2 md:mb-0">
          Doanh thu 7 ngày gần nhất
        </div>

        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-wrap">
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${
              dailyChartType === "order"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setDailyChartType("order")}
          >
            Đơn hàng
          </button>

          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${
              dailyChartType === "appoint"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setDailyChartType("appoint")}
          >
            Lịch khám
          </button>
        </div>
      </div>

      <div className="h-64 md:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={normalizedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />

            <Tooltip content={<CustomTooltip chartType={dailyChartType} />} />
            <Legend content={<RenderLegend />} />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke={dailyChartType === "order" ? "#2563eb" : "#7c3aed"}
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="count"
              name={dailyChartType === "order" ? "Số đơn" : "Số lịch"}
              stroke={dailyChartType === "order" ? "#16a34a" : "#dc2626"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
