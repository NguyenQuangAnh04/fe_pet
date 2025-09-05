// components/Dashboard/Shared/SkeletonLoader.tsx
export const DashboardSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Revenue Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-5">
            <div className="animate-pulse">
              <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Skeletons */}
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <div className="h-72 bg-gray-100 rounded animate-pulse"></div>
        </div>
      ))}
      
      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[1, 2].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-5">
            <div className="h-72 bg-gray-100 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};