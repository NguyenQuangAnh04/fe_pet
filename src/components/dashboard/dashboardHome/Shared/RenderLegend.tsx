// components/Dashboard/Shared/RenderLegend.tsx
interface RenderLegendProps {
  payload?: any[];
}

export const RenderLegend = ({ payload }: RenderLegendProps) => (
  <div className="flex justify-center gap-4 mt-2">
    {payload?.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center text-sm">
        <div className="w-3 h-3 mr-1" style={{ backgroundColor: entry.color }}></div>
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);