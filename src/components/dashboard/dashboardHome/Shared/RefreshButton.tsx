// components/Dashboard/Shared/RefreshButton.tsx
import { useState } from "react";

interface RefreshButtonProps {
  onRefresh: () => void;
  className?: string;
}

export const RefreshButton = ({ onRefresh, className = "" }: RefreshButtonProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      // Dừng animation sau 1 giây
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
      aria-label="Làm mới dữ liệu"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Làm mới
    </button>
  );
};