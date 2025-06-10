import React from 'react';
import HouseCardSkeleton from './houseCardSkeleton';

const HouseCardSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[...Array(4)].map((_, index) => (
        <HouseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default HouseCardSkeletonGrid; 