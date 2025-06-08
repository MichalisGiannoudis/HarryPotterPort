import { House } from '@/models/house.interface';
import HouseCard from './houseCard';

const HouseList = ({ houses }: { houses: House[] }) => {
  
  return (
    <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {houses.map(house => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  );
};

export default HouseList;