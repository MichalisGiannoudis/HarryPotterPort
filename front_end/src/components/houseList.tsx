import { House } from '@/models/house.interface';
import HouseCard from './houseCard';

const HouseList = ({ houses, emptyResultsLabel, houseCardProps }: { houses: House[], emptyResultsLabel: string, houseCardProps: { founderLabel: string, houseTraitSearchLabel: string } }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {houses.map(house => (
        <HouseCard key={house.id} house={house} {...houseCardProps} />
      ))}
      {houses.length == 0 && emptyResultsLabel}
    </div>
  );
};

export default HouseList;