import { useState } from 'react';
import { useHouses } from '@/hooks/useHouses';
import HouseList from '@/components/houseList';
import SearchInput from '@/components/searchInput';

export default function HomePage() {

  const [searchValue, setSearchValue] = useState('');
  const { houses, fetching, error } = useHouses(searchValue);

  if (fetching) {
    return <div style={{ fontFamily: 'Verdana' }}>Loading...</div>;
  }
  
  if (error) {
    return <div style={{ fontFamily: 'Verdana', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SearchInput placeholder='Search houses' searchValue={searchValue} onSearchChange={setSearchValue}/>
      <HouseList houses={houses} />
    </div>
  );
}