"use client";

const FooterContentSkeleton = () => {
  return (
    <>
      <div className="space-y-4">
        {/* Tab buttons skeleton */}
        <div className="flex gap-2 pb-5">
          <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Tab 1 Skeleton */}

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-end">
            <div className="w-28 h-10 bg-blue-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Tab 2 Skeleton */}

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-between items-center p-2 mb-5 bg-slate-200 rounded animate-pulse">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <div className="w-28 h-10 bg-blue-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Tab 3 Skeleton */}

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-16 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-end">
            <div className="w-28 h-10 bg-blue-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterContentSkeleton;
