import React from 'react';

const HouseCardSkeleton = () => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-300 shadow-xl bg-white p-4 animate-[pulse_1s_ease-in-out_infinite] gap-2">
      <div className="flex justify-between items-center mb-2 gap">
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="h-5 rounded-md bg-gray-200 mb-2"></div>
      <div className="mb-2 h-6 w-24 bg-gray-200 rounded"></div>
      <div className="mb-4 h-10 w-full bg-gray-200 rounded"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-8 w-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default HouseCardSkeleton; 