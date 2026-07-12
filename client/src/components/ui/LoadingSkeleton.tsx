import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse py-8">
      {/* Hero skeleton */}
      <div className="w-full h-80 shimmer-wrap rounded-3xl" />
      {/* Judge skeleton */}
      <div className="w-full h-64 shimmer-wrap rounded-3xl" />
      {/* Cards row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="h-72 shimmer-wrap rounded-3xl" />
        <div className="h-72 shimmer-wrap rounded-3xl" />
      </div>
    </div>
  );
}
