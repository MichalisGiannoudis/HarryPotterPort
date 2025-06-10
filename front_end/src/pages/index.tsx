import { useEffect, useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';
import HouseCardSkeletonGrid from '@/components/houseCardSkeletonGrid';
import { useHouseStore } from '@/store/house.store';
import { useContent } from '@/hooks/useContent';
import { HouseContent } from '@/models/content.interface';
import SpinnerComponent from '@/components/spinnerComponent';

const PAGE_ID = 'houses-page'

export default function HousesPage() {

  const { houseSearchEmptyResultsLabel, houseSearchLabel, houseSearchErrorLabel, founderLabel, houseTraitSearchLabel } = useContent(PAGE_ID) as HouseContent;
  const houses = useHouseStore(state => state.houses);
  const setHouses = useHouseStore(state => state.setHouses);
  }

  useEffect(() => {
    if (searchInProgress) {
      setSearchInProgress(false)
    }
    setHouses(fetchedHouses)
  }, [fetchedHouses])

  return (
    <div className="container mx-auto p-4 max-w-[800px]">
      <div className='flex gap-4'>       
        <SearchInput placeholder={houseSearchLabel} searchValue={searchValue} onSearchChange={handleSearch} />
        {(fetching || searchInProgress) && <SpinnerComponent />}
      </div>

      {(fetching || searchInProgress) && <HouseCardSkeletonGrid />}

      {error && <div className="text-red-500 flex justify-center items-center min-h-screen">{houseSearchErrorLabel}: {error}</div>}

      {!(fetching || searchInProgress) && !error && <HouseList emptyResultsLabel={houseSearchEmptyResultsLabel} houses={houses} houseCardProps={{ founderLabel, houseTraitSearchLabel }} />}
    </div >
  );
}