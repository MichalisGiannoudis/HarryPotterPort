import { useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';
import SpinnerComponent from '@/components/spinnerComponent';

export default function HomePage() {

  const [searchValue, setSearchValue] = useState('');
  const { houses, fetching, error } = useHouses(searchValue);

  }

  return (
    <div className="container mx-auto p-4 max-w-[800px]">
      <div className='flex gap-4'>       
        <SearchInput placeholder={houseSearchLabel} searchValue={searchValue} onSearchChange={handleSearch} />
        {(fetching || searchInProgress) && <SpinnerComponent />}
      </div>

      {(fetching || searchInProgress) && <HouseCardSkeletonGrid />}
  );
}