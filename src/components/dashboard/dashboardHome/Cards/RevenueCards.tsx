// components/Dashboard/Cards/RevenueCards.tsx
interface RevenueCardsProps {
  orderTotalRevenue: number;
  appointTotalRevenue: number;
  formatCurrency: (value: number) => string;
}

export const RevenueCards = ({ orderTotalRevenue, appointTotalRevenue, formatCurrency }: RevenueCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
    {/* Card đơn hàng */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-5 text-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium opacity-90">Tổng doanh thu đơn hàng</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(orderTotalRevenue || 0)} ₫</div>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>
      <div className="text-xs mt-3 opacity-80">
        <span className="bg-white/20 py-1 px-2 rounded-md">Cập nhật hôm nay</span>
      </div>
    </div>

    {/* Card lịch khám */}
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-5 text-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-medium opacity-90">Tổng doanh thu lịch khám</div>
          <div className="text-2xl font-bold mt-1">{formatCurrency(appointTotalRevenue || 0)} ₫</div>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className="text-xs mt-3 opacity-80">
        <span className="bg-white/20 py-1 px-2 rounded-md">Cập nhật hôm nay</span>
      </div>
    </div>
  </div>
);