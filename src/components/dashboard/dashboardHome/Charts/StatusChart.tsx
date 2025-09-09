import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatusChartProps {
  statusData: any[];
  statusChartType: "order" | "appoint";
  setStatusChartType: (type: "order" | "appoint") => void;
  COLORS: string[];
}

export const StatusChart = ({ statusData, statusChartType, setStatusChartType, COLORS }: StatusChartProps) => (
  <div className="bg-white rounded-2xl shadow-lg p-5">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
      <div className="font-semibold text-lg text-gray-800 mb-2 md:mb-0">Trạng thái</div>
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${statusChartType === "order" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setStatusChartType("order")}
        >
          Đơn hàng
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${statusChartType === "appoint" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
          onClick={() => setStatusChartType("appoint")}
        >
          Lịch khám
        </button>
      </div>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
            {statusData.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Số lượng"]}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);