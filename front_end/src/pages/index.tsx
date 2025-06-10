import { useEffect, useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';
import HouseCardSkeletonGrid from '@/components/houseCardSkeletonGrid';
import { useHouseStore } from '@/store/house.store';
import { useSearchParams, useRouter } from 'next/navigation';
import { useContent } from '@/hooks/useContent';
import { HouseContent } from '@/models/content.interface';
import SpinnerComponent from '@/components/spinnerComponent';

const PAGE_ID = 'houses-page'

export default function HousesPage() {

  const { houseSearchEmptyResultsLabel, houseSearchLabel, houseSearchErrorLabel, founderLabel, houseTraitSearchLabel } = useContent(PAGE_ID) as HouseContent;

  const searchParams = useSearchParams();
  const router = useRouter();
  const houses = useHouseStore(state => state.houses);
  const setHouses = useHouseStore(state => state.setHouses);
  const [searchValue, setSearchValue] = useState(searchParams.get('name') || '');
  const [searchInProgress, setSearchInProgress] = useState(false);
  const { houses: fetchedHouses, fetching, error } = useHouses(searchValue);

  useEffect(() => {
    const searchFromUrl = searchParams.get('name') || '';
    if (searchFromUrl !== searchValue) {
      setSearchValue(searchFromUrl);
      setSearchInProgress(true);
    }
  }, [searchParams]);

  const handleSearch = (val: string) => {
    setSearchInProgress(true);
    setSearchValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set('name', val);
    } else {
      params.delete('name');
    }
    router.push(`?${params.toString()}`);
  }

  useEffect(() => {
    if (searchInProgress) {
      setSearchInProgress(false)
    }
    setHouses(fetchedHouses)
  }, [fetchedHouses])

  return (
    <div className="container mx-auto p-4 max-w-[800px] w-fit">
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