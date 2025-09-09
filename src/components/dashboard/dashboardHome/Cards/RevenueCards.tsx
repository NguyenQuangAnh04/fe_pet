// components/Dashboard/Cards/RevenueCards.tsx
interface RevenueCardsProps {
  orderTotalRevenue: number;
  appointTotalRevenue: number;
  formatCurrency: (value: number) => string;
}

export const RevenueCards = ({ orderTotalRevenue, appointTotalRevenue, formatCurrency }: RevenueCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
    {/* Card đơn hàng */}
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1">
          {formatCurrency(orderTotalRevenue + appointTotalRevenue || 0)} ₫
        </h3>
        <span className="text-xs text-gray-400 mt-2 block">Cập nhật hôm nay</span>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
    </div>

     <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-sm font-medium text-gray-500">Tổng doanh thu đơn hàng</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1">
          {formatCurrency(orderTotalRevenue || 0)} ₫
        </h3>
        <span className="text-xs text-gray-400 mt-2 block">Cập nhật hôm nay</span>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
    </div>

    {/* Card lịch khám */}
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition">
      <div>
        <p className="text-sm font-medium text-gray-500">Tổng doanh thu lịch khám</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1">
          {formatCurrency(appointTotalRevenue || 0)} ₫
        </h3>
        <span className="text-xs text-gray-400 mt-2 block">Cập nhật hôm nay</span>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  </div>
);
