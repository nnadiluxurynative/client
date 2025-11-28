"use client";

import { twMerge } from "tailwind-merge";

type LoaderProps = {
  count?: number;
  className?: string;
  imgHeight?: string;
};

export default function Loader({
  count = 12,
  className = "",
  imgHeight = "sm:h-[650px]",
}: LoaderProps) {
  return (
    <div>
      <div
        className={twMerge(
          "grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8",
          className && className
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white">
            <div className={`bg-gray-200 w-full h-[350px] ${imgHeight} mb-4`} />
            <div className="h-4 bg-gray-200 w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
