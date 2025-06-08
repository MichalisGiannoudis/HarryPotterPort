import { useHouses } from '../hooks/useHouses';
import HouseList from '../components/houseList';

export default function HomePage() {

  const { houses, fetching, error } = useHouses();

  if (fetching) {
    return <div style={{ fontFamily: 'Verdana' }}>Loading...</div>;
  }
  
  if (error) {
    return <div style={{ fontFamily: 'Verdana', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <HouseList houses={houses} />
    </div>
  );
}