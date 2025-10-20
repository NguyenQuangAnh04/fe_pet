// components/Dashboard/Charts/TopItemsChart.tsx
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopItemsChartProps {
  topItemsData: any[];
  chartType: "product" | "exam";
  setChartType: (type: "product" | "exam") => void;
}

export const TopItemsChart = ({ topItemsData, chartType, setChartType }: TopItemsChartProps) => (
  <div className="bg-white rounded-lg shadow p-5 overflow-hidden mb-10">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
      <div className="font-semibold text-lg text-gray-800 mb-2 md:mb-0">
        Sản phẩm & Dịch vụ
      </div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-wrap">
        <button
          className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${
            chartType === "product"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setChartType("product")}
        >
          Sản phẩm
        </button>
        <button
          className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md ${
            chartType === "exam"
              ? "bg-white text-purple-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setChartType("exam")}
        >
          Dịch vụ
        </button>
      </div>
    </div>

    {/* Chart */}
    <div className="h-64 md:h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topItemsData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal vertical={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => v.toLocaleString()}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <Tooltip
            formatter={(value) => [`${value}`, "Số lượng"]}
            labelFormatter={(v, payload) => payload[0]?.payload.fullName || v}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="total"
            name="Số lượng"
            fill={chartType === "product" ? "#2563eb" : "#7c3aed"}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
