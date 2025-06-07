import styles from './homepage.module.css';
import { useHouses } from '../hooks/useHouses';

export default function HomePage() {

  const { houses, fetching, error } = useHouses();

  if (fetching) {
    return <div style={{ fontFamily: 'Verdana' }}>Loading...</div>;
  }
  
  if (error) {
    return <div style={{ fontFamily: 'Verdana', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
    </div>
  );
}