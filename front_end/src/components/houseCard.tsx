import { House } from '@/models/house.interface';
import SearchInput from './searchInput';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const HouseCard = ({ house, founderLabel, houseTraitSearchLabel }: { house: House, founderLabel?: string, houseTraitSearchLabel?: string }) => {

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const getHouseGradient = (houseColors?: string) => {

    if (!houseColors) {
      return 'linear-gradient(to right, white, black)';
    }

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
  }, [debouncedSearchValue, house.traits]);

  const isValidCSSColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return !!s.color;
  };

  return (
    <div data-testid={`house-card-${house.id}`} className="flex flex-col gap-2 max-w-sm rounded-lg border border-gray-300 shadow-xl bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold font-f">{house.name}</h2>
        <span className="text-md font-semibold">{house.animal}</span>
      </div>
      <div>
        <div className="h-5 rounded-md" style={{ background: getHouseGradient(house.houseColours) }}></div>
      </div>
      <p className="mb-2">
        <span className="font-semibold">{founderLabel}: </span>
        <span className="font-bold">{house.founder}</span>
      </p>
      <SearchInput data-testid={`house-card-${house.id}-trait-search`} placeholder={houseTraitSearchLabel ?? 'Search...'} searchValue={searchValue} onSearchChange={setSearchValue} />
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