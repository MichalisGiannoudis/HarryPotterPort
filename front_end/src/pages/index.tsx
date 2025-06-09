import { useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';
import SpinnerComponent from '@/components/spinnerComponent';

export default function HomePage() {

  const [searchValue, setSearchValue] = useState('');
  const { houses, fetching, error } = useHouses(searchValue);

  if (fetching) {
    return <div>
      <SpinnerComponent />
    </div>;
  }
  
  if (error) {
    return <div className="text-red-500 flex justify-center items-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SearchInput placeholder='Search houses' searchValue={searchValue} onSearchChange={setSearchValue}/>
      <HouseList houses={houses} />
    </div>
  );
}