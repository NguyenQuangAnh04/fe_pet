// components/Dashboard/Shared/CustomTooltip.tsx
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  chartType?: string;
}

export const CustomTooltip = ({ active, payload, label, chartType }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
        <p className="font-medium text-gray-800">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.dataKey === "revenue" ? " ₫" : ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};