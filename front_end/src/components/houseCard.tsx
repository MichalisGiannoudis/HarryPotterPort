import { House } from '@/models/house.interface';
import SearchInput from './searchInput';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const HouseCard = ({ house }: { house: House }) => {

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300); 

  const getHouseGradient = (houseColors?: string) => {
    
    // If no house colors are provided, return a default gradient (white to black)
    if (!houseColors){
       return 'linear-gradient(to right, white, black)';
    }   
   
    // Split the house colors by "and" and trim whitespace, then validate each color
    const colors = houseColors
      .split(/\s+and\s+/i)
      .map(c => c.trim().toLowerCase());
    const allColorsValid = colors.every(isValidCSSColor);
    
    return allColorsValid
    ? `linear-gradient(to right, ${colors.join(', ')})`
    : 'linear-gradient(to right, white, black)';
  };

  const filteredTraits = useMemo(() => {
  if (!debouncedSearchValue) return house.traits;
  return house.traits.filter((trait) =>
    trait.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
}, [debouncedSearchValue]);

  // Function to check if a string is a valid CSS color
  const isValidCSSColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return !!s.color;
  };

  return (
    <div className="max-w-sm rounded-lg border border-gray-300 shadow-xl bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold font-f">{house.name}</h2>
        <span className="text-md font-semibold">{house.animal}</span>
      </div>
      <div>
        <div className="h-5 rounded-md" style={{ background: getHouseGradient(house.houseColours) }}></div>
      </div>
      <p className="mb-2">
        <span className="font-semibold">Founder: </span>
        <span className="font-bold">{house.founder}</span>
      </p>
      <SearchInput placeholder='Search houses traits' searchValue={searchValue} onSearchChange={setSearchValue}/>
      <div className="flex flex-wrap gap-2">
        {filteredTraits.map((trait) => (
          <span key={trait.id} className="bg-gray-800 text-white flex items-center justify-center px-3 rounded-lg text-sm">
            {trait.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HouseCard;