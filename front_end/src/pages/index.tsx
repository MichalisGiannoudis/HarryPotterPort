import { useEffect, useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';
import SpinnerComponent from '@/components/spinnerComponent';


  const [searchValue, setSearchValue] = useState('');
  const { houses, fetching, error } = useHouses(searchValue);
export default function HousesPage() {

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